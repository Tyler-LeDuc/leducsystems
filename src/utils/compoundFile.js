/* =========================================================================
   Compound File Binary reader (MS-CFB).

   The VBA project inside a macro-enabled workbook is not XML. It is a
   whole second filesystem — the same OLE container format as a 1997 .doc —
   embedded as xl/vbaProject.bin. To name the code modules inside a
   workbook you have to walk it.

   A compound file is a FAT filesystem in a single blob: a header, a sector
   allocation table, a red-black tree of directory entries, and a secondary
   "mini" allocation for streams under 4096 bytes. All three are needed;
   the VBA module streams are usually small enough to live in the mini
   stream, so an implementation that skips it finds nothing.
   ========================================================================= */

const SIGNATURE = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];

const FREE_SECTOR = 0xffffffff;
const END_OF_CHAIN = 0xfffffffe;

const TYPE_STORAGE = 1;
const TYPE_STREAM = 2;

/** Cheap check before committing to a parse. */
export function isCompoundFile(bytes) {
  if (!bytes || bytes.length < 512) return false;
  return SIGNATURE.every((byte, i) => bytes[i] === byte);
}

/* Chains are followed with a hard iteration cap. A malformed or hostile
   file can point a sector at itself; without the cap that is a hung tab. */
function followChain(fat, start, limit) {
  const chain = [];
  let sector = start;
  while (sector !== END_OF_CHAIN && sector !== FREE_SECTOR && sector < fat.length) {
    chain.push(sector);
    if (chain.length > limit) break;
    sector = fat[sector];
  }
  return chain;
}

/**
 * Parse a compound file into its streams.
 * Returns null when the bytes are not a compound file, so the caller can
 * report "no VBA project" instead of crashing.
 */
export function readCompoundFile(bytes) {
  if (!isCompoundFile(bytes)) return null;

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const u16 = (offset) => view.getUint16(offset, true);
  const u32 = (offset) => view.getUint32(offset, true);

  const sectorSize = 1 << u16(30);
  const miniSectorSize = 1 << u16(32);
  if (sectorSize < 128 || sectorSize > 1 << 20) return null;

  const fatSectorCount = u32(44);
  const directoryStart = u32(48);
  const miniCutoff = u32(56);
  const miniFatStart = u32(60);
  const miniFatCount = u32(64);
  const difatStart = u32(68);
  const difatCount = u32(72);

  const maxSector = Math.floor(bytes.length / sectorSize);
  const sectorOffset = (sector) => (sector + 1) * sectorSize;

  /* --- locate the FAT sectors (the DIFAT) --- */
  const difat = [];
  for (let i = 0; i < 109 && difat.length < fatSectorCount; i += 1) {
    const sector = u32(76 + i * 4);
    if (sector === FREE_SECTOR || sector === END_OF_CHAIN) break;
    difat.push(sector);
  }

  /* difatCount is a raw 32-bit field from the file, and a DIFAT sector
     whose continuation points back at itself is a closed loop. Trusting
     either freezes the tab on a few kilobytes of input, so the walk is
     bounded by the sectors the file can actually hold and by a visited
     set — not by what the header claims. */
  const seenDifat = new Set();
  let next = difatStart;
  const perDifatSector = sectorSize / 4 - 1;
  const difatLimit = Math.min(difatCount, maxSector + 1);

  for (let i = 0; i < difatLimit && next !== END_OF_CHAIN && next !== FREE_SECTOR; i += 1) {
    if (seenDifat.has(next)) break;
    seenDifat.add(next);

    const base = sectorOffset(next);
    if (base + sectorSize > bytes.length) break;

    for (let j = 0; j < perDifatSector && difat.length < fatSectorCount; j += 1) {
      const sector = u32(base + j * 4);
      if (sector === FREE_SECTOR || sector === END_OF_CHAIN) break;
      difat.push(sector);
    }
    next = u32(base + perDifatSector * 4);
  }

  /* The FAT cannot be larger than the file it indexes. */
  if (difat.length > maxSector + 1) difat.length = maxSector + 1;

  /* --- the FAT itself --- */
  const perSector = sectorSize / 4;
  const fat = new Uint32Array(difat.length * perSector);
  difat.forEach((sector, i) => {
    const base = sectorOffset(sector);
    if (base + sectorSize > bytes.length) return;
    for (let j = 0; j < perSector; j += 1) fat[i * perSector + j] = u32(base + j * 4);
  });
  if (!fat.length) return null;

  const readChain = (start, size) => {
    const chain = followChain(fat, start, maxSector + 1);
    const out = new Uint8Array(chain.length * sectorSize);
    chain.forEach((sector, i) => {
      const base = sectorOffset(sector);
      if (base + sectorSize > bytes.length) return;
      out.set(bytes.subarray(base, base + sectorSize), i * sectorSize);
    });
    return size == null ? out : out.subarray(0, Math.min(size, out.length));
  };

  /* --- directory entries --- */
  const directory = readChain(directoryStart, null);
  const entries = [];
  for (let offset = 0; offset + 128 <= directory.length; offset += 128) {
    const dirView = new DataView(
      directory.buffer,
      directory.byteOffset + offset,
      128
    );
    const nameLength = dirView.getUint16(64, true);
    const type = dirView.getUint8(66);

    if (nameLength < 2 || nameLength > 64 || (type !== TYPE_STORAGE && type !== TYPE_STREAM && type !== 5)) {
      entries.push(null);
      continue;
    }

    let name = '';
    for (let i = 0; i < nameLength - 2; i += 2) name += String.fromCharCode(dirView.getUint16(i, true));

    entries.push({
      name,
      type,
      left: dirView.getUint32(68, true),
      right: dirView.getUint32(72, true),
      child: dirView.getUint32(76, true),
      start: dirView.getUint32(116, true),
      size: dirView.getUint32(120, true),
    });
  }

  const root = entries[0];
  if (!root) return null;

  /* --- the mini stream, where small streams actually live --- */
  const miniStream = readChain(root.start, root.size);
  const miniFatBytes = readChain(miniFatStart, miniFatCount * sectorSize);
  const miniFat = new Uint32Array(Math.floor(miniFatBytes.length / 4));
  const miniView = new DataView(miniFatBytes.buffer, miniFatBytes.byteOffset, miniFatBytes.byteLength);
  for (let i = 0; i < miniFat.length; i += 1) miniFat[i] = miniView.getUint32(i * 4, true);

  const readMini = (start, declaredSize) => {
    /* declaredSize comes from a directory entry, so it is whatever the file
       says it is. Nothing can be read beyond the mini stream that actually
       exists, so the allocation is clamped to that. */
    const size = Math.max(0, Math.min(declaredSize, miniStream.length));
    const out = new Uint8Array(size);
    let sector = start;
    let written = 0;
    let guard = 0;
    while (
      sector !== END_OF_CHAIN &&
      sector !== FREE_SECTOR &&
      sector < miniFat.length &&
      written < size &&
      guard <= miniFat.length
    ) {
      const at = sector * miniSectorSize;
      const take = Math.min(miniSectorSize, size - written);
      out.set(miniStream.subarray(at, at + take), written);
      written += take;
      sector = miniFat[sector];
      guard += 1;
    }
    return out;
  };

  const readStream = (entry) =>
    (entry.size < miniCutoff ? readMini(entry.start, entry.size) : readChain(entry.start, entry.size));

  /* --- flatten the directory tree into paths --- */
  /* The sibling `seen` set is per-level, which is what makes the red-black
     walk correct — but on its own it lets a storage whose child points back
     at an ancestor recurse for ever. `visited` spans the whole traversal so
     a cycle terminates, and the depth cap catches a long chain that never
     repeats an id. */
  /* Iterative, not recursive. The sibling links form a tree only if the file
     is well formed; a directory whose entries chain through `left` a few
     thousand deep overflows the stack, and a RangeError thrown from here
     escapes the caller's error handling entirely. `visited` spans the whole
     traversal so a cycle terminates. */
  const streams = [];
  const visited = new Set();
  const stack = [{ id: root.child, prefix: '' }];

  while (stack.length) {
    const { id, prefix } = stack.pop();
    if (id === FREE_SECTOR || id >= entries.length || visited.has(id)) continue;
    visited.add(id);

    const entry = entries[id];
    if (!entry) continue;

    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.type === TYPE_STREAM) streams.push({ path, name: entry.name, size: entry.size, entry });

    stack.push({ id: entry.left, prefix });
    stack.push({ id: entry.right, prefix });
    if (entry.type === TYPE_STORAGE && entry.child !== FREE_SECTOR) {
      stack.push({ id: entry.child, prefix: path });
    }
  }

  return {
    streams,
    read: (path) => {
      const found = streams.find((stream) => stream.path === path);
      return found ? readStream(found.entry) : null;
    },
  };
}
