/* =========================================================================
   Minimal ZIP reader for Office Open XML packages.

   An .xlsx / .xlsm is a ZIP archive of XML parts. Reading one needs the
   central directory and raw DEFLATE — both of which the browser can do
   natively, so this file adds no dependency: DecompressionStream handles
   the inflate and everything else is twenty lines of struct parsing.

   Only what a workbook actually uses is supported: stored and deflated
   entries, no encryption, no ZIP64. A workbook large enough to need ZIP64
   is past the point where a browser tab should be reading it anyway.
   ========================================================================= */

const EOCD_SIGNATURE = 0x06054b50;
const CENTRAL_SIGNATURE = 0x02014b50;

const STORED = 0;
const DEFLATED = 8;

/* The end-of-central-directory record sits at the tail, behind a comment of
   up to 64KB. Scanning backwards finds it without reading the whole file. */
function findEndOfCentralDirectory(view, length) {
  const floor = Math.max(0, length - 0xffff - 22);
  for (let i = length - 22; i >= floor; i -= 1) {
    if (view.getUint32(i, true) === EOCD_SIGNATURE) return i;
  }
  return -1;
}

/**
 * List every entry in the archive without decompressing anything.
 * Returns [] when the bytes are not a ZIP at all, which is how the caller
 * distinguishes "this is an old .xls" from "this file is corrupt".
 */
export function listEntries(bytes) {
  if (!bytes || bytes.length < 22) return [];
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  const eocd = findEndOfCentralDirectory(view, bytes.length);
  if (eocd < 0) return [];

  const count = view.getUint16(eocd + 10, true);
  let offset = view.getUint32(eocd + 16, true);

  const entries = [];
  for (let i = 0; i < count; i += 1) {
    if (offset + 46 > bytes.length) break;
    if (view.getUint32(offset, true) !== CENTRAL_SIGNATURE) break;

    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);

    entries.push({
      name: decodeUtf8(bytes.subarray(offset + 46, offset + 46 + nameLength)),
      method: view.getUint16(offset + 10, true),
      compressedSize: view.getUint32(offset + 20, true),
      uncompressedSize: view.getUint32(offset + 24, true),
      localHeaderOffset: view.getUint32(offset + 42, true),
    });

    offset += 46 + nameLength + extraLength + commentLength;
  }

  return entries;
}

/* The local header repeats the name and carries its own extra field, whose
   length routinely differs from the central directory's. The data offset
   has to be computed from the local header or every read is misaligned. */
function dataOffset(bytes, view, entry) {
  const base = entry.localHeaderOffset;
  if (base + 30 > bytes.length) return -1;
  const nameLength = view.getUint16(base + 26, true);
  const extraLength = view.getUint16(base + 28, true);
  return base + 30 + nameLength + extraLength;
}

/**
 * Inflate raw DEFLATE using the platform, with no library.
 *
 * The output is bounded. A ZIP entry can declare a small uncompressed size
 * and then expand to gigabytes — a 1MB file that becomes 1GiB in the tab is
 * trivial to build — so inflation stops and gives up the moment it passes
 * the limit rather than after the damage is done.
 */
async function inflateRaw(bytes, limit) {
  const stream = new DecompressionStream('deflate-raw');
  const writer = stream.writable.getWriter();

  /* The writable side rejects on malformed input. Nothing awaits these, so
     without handlers the rejection is unhandled and escapes this module. */
  writer.write(bytes).catch(() => {});
  writer.close().catch(() => {});

  const chunks = [];
  const reader = stream.readable.getReader();
  let total = 0;

  for (;;) {
    /* eslint-disable-next-line no-await-in-loop */
    const { done, value } = await reader.read();
    if (done) break;

    total += value.length;
    if (total > limit) {
      reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }

  const out = new Uint8Array(total);
  let at = 0;
  chunks.forEach((chunk) => {
    out.set(chunk, at);
    at += chunk.length;
  });
  return out;
}

/* What a real workbook part can plausibly contain. The VBA container is
   allowed more room than an XML part because a large macro project is a
   normal thing to find; both are far below what a browser tab can survive. */
const PART_LIMIT = 32 * 1024 * 1024;
const VBA_LIMIT = 64 * 1024 * 1024;

export const limitForPart = (name) => (/vbaProject\.bin$/i.test(name) ? VBA_LIMIT : PART_LIMIT);

/**
 * Read one entry's bytes. Resolves to null rather than throwing when the
 * entry is unreadable — a single corrupt part should cost that part's
 * findings, not the whole report.
 */
export async function readEntry(bytes, entry) {
  if (!entry) return null;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const start = dataOffset(bytes, view, entry);
  if (start < 0 || start + entry.compressedSize > bytes.length) return null;

  const raw = bytes.subarray(start, start + entry.compressedSize);
  if (entry.method === STORED) return raw;
  if (entry.method !== DEFLATED) return null;

  /* Bound by what the entry says it holds, but never above the ceiling for
     that kind of part — a declared size is only as trustworthy as the file
     it came from. */
  const ceiling = limitForPart(entry.name);
  const limit = Math.min(ceiling, Math.max(entry.uncompressedSize || 0, 1024) * 2);

  try {
    return await inflateRaw(raw, limit);
  } catch (err) {
    return null;
  }
}

/* ---------- text decoding ---------------------------------------------- */

export function decodeUtf8(bytes) {
  return new TextDecoder('utf-8').decode(bytes);
}

/**
 * Open an archive into a small API over its entries. Parts are inflated on
 * demand — a workbook holds hundreds of them and this tool reads about six.
 */
export function openZip(bytes) {
  const entries = listEntries(bytes);

  /* Central-directory names are deduplicated. Nothing stops an archive
     listing the same part a thousand times — the headers cost 85 bytes
     each — and the callers that scan by name would then inflate the same
     megabytes once per duplicate. First entry wins, as a reader would. */
  const byName = new Map();
  entries.forEach((entry) => {
    if (!byName.has(entry.name)) byName.set(entry.name, entry);
  });
  const names = [...byName.keys()];

  return {
    entries,
    names: () => names,
    has: (name) => byName.has(name),
    entry: (name) => byName.get(name) || null,
    bytes: (name) => readEntry(bytes, byName.get(name)),
    text: async (name) => {
      const part = await readEntry(bytes, byName.get(name));
      return part ? decodeUtf8(part) : null;
    },
  };
}
