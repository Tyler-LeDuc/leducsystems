/* =========================================================================
   VBA project decoder (MS-OVBA).

   Inside vbaProject.bin the module source is stored in a compression
   format Microsoft documented but nothing on npm implements for the
   browser. It is not DEFLATE. It is a run-length scheme with a token
   window whose bit split changes as the chunk fills, which is why every
   online "extract VBA" service uploads your workbook to a server running
   Python instead of doing it in the page.

   It is about a hundred lines. They are below.
   ========================================================================= */

/* Windows-1252 differs from Latin-1 only in 0x80-0x9F. VBA source is
   stored in the project code page, which is 1252 for every Western
   install; getting these right keeps smart quotes in comments readable. */
const CP1252_HIGH = [
  0x20ac, 0x81, 0x201a, 0x0192, 0x201e, 0x2026, 0x2020, 0x2021,
  0x02c6, 0x2030, 0x0160, 0x2039, 0x0152, 0x8d, 0x017d, 0x8f,
  0x90, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022, 0x2013, 0x2014,
  0x02dc, 0x2122, 0x0161, 0x203a, 0x0153, 0x9d, 0x017e, 0x0178,
];

export function decodeAnsi(bytes) {
  let out = '';
  for (let i = 0; i < bytes.length; i += 1) {
    const byte = bytes[i];
    out += String.fromCharCode(byte >= 0x80 && byte <= 0x9f ? CP1252_HIGH[byte - 0x80] : byte);
  }
  return out;
}

/* ---------- decompression (MS-OVBA 2.4.1) ------------------------------ */

/** Smallest n where 2^n >= value. Drives the copy-token bit split. */
export function ceilingLog2(value) {
  let bits = 0;
  while (1 << bits < value) bits += 1;
  return bits;
}

/**
 * Decompress a container starting at `start`, which must be the 0x01
 * signature byte. Returns null when the stream is not a valid container —
 * the caller uses that to fall back rather than to fail.
 *
 * The format is a series of 4096-byte chunks. Each chunk header carries a
 * 12-bit size, a 3-bit signature, and a flag saying whether the chunk is
 * compressed at all. A compressed chunk is groups of eight tokens behind a
 * flag byte: a clear bit is one literal byte, a set bit is a two-byte
 * back-reference whose length/offset split depends on how full the chunk
 * already is.
 */
/* Two bounds, because this format amplifies violently. A copy token can
   restate 4098 bytes from two bytes of input, so six bytes of chunk repeated
   inside a 6KB stream reconstructs gigabytes — measured at 2.5GB of heap
   from a 207KB workbook before either was in place.

   The spec already caps a decompressed chunk at 4096 bytes; enforcing that
   removes the per-chunk amplification, and an absolute ceiling removes the
   many-small-chunks variant. The real VBA project cited in this file's own
   notes has a 435KB module, so 32MB is far above anything genuine. */
const CHUNK_BYTES = 4096;
export const MAX_DECOMPRESSED = 32 * 1024 * 1024;
export const MAX_PROJECT_BYTES = 64 * 1024 * 1024;

export function decompress(bytes, start = 0, limit = MAX_DECOMPRESSED) {
  if (!bytes || bytes[start] !== 0x01) return null;

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  /* A growing typed array rather than an array of numbers: the latter costs
     roughly eight bytes per decompressed byte, which was most of the heap. */
  let out = new Uint8Array(Math.min(limit, Math.max(CHUNK_BYTES, (bytes.length - start) * 4)));
  let len = 0;

  const put = (byte) => {
    if (len === out.length) {
      const grown = new Uint8Array(Math.min(limit, out.length * 2));
      grown.set(out);
      out = grown;
    }
    out[len] = byte;
    len += 1;
  };

  let at = start + 1;

  while (at + 1 < bytes.length && len < limit) {
    const header = view.getUint16(at, true);
    const size = (header & 0x0fff) + 3;
    const signature = (header >> 12) & 0x07;
    const compressed = (header & 0x8000) !== 0;

    /* 0b011 is the only legal chunk signature; anything else means we have
       walked off the end of the container into unrelated bytes. */
    if (signature !== 0x03) break;

    const end = Math.min(at + size, bytes.length);
    at += 2;

    const chunkStart = len;

    if (!compressed) {
      for (; at < end && len < limit; at += 1) put(bytes[at]);
      continue;
    }

    while (at < end && len < limit) {
      const flags = bytes[at];
      at += 1;

      for (let bit = 0; bit < 8 && at < end && len < limit; bit += 1) {
        /* A chunk that claims to decompress past 4096 bytes is malformed.
           Stopping here is what keeps a six-byte chunk from restating
           itself until the tab dies. */
        if (len - chunkStart > CHUNK_BYTES) return out.subarray(0, len);

        if (((flags >> bit) & 1) === 0) {
          put(bytes[at]);
          at += 1;
          continue;
        }

        if (at + 1 >= bytes.length) return out.subarray(0, len);
        const token = view.getUint16(at, true);
        at += 2;

        const filled = len - chunkStart;
        const bits = Math.max(4, ceilingLog2(filled));
        const lengthMask = 0xffff >> bits;
        const length = (token & lengthMask) + 3;
        const offset = ((token & ~lengthMask & 0xffff) >> (16 - bits)) + 1;

        const from = len - offset;
        if (from < 0) return out.subarray(0, len);
        /* Overlapping copies are legal and common — this is how the format
           expresses a run, so it must be copied one byte at a time. */
        for (let i = 0; i < length && len < limit; i += 1) put(out[from + i]);
      }
    }
  }

  return out.subarray(0, len);
}

/* ---------- the directory stream --------------------------------------- */

/* The dir stream is a flat sequence of (id, size, data) records — except
   that PROJECTVERSION lies about its size, which desynchronises a naive
   walk and is why so many half-finished parsers report zero modules. The
   module section that follows is well behaved, so rather than special-case
   every record in the reference section we seek straight to the anchor:
   PROJECTMODULES, PROJECTCOOKIE, then the first MODULENAME. All three
   sizes are fixed, which makes it a strong enough signature to trust. */
const RECORD = {
  MODULENAME: 0x0019,
  MODULENAMEUNICODE: 0x0047,
  MODULESTREAMNAME: 0x001a,
  /* MODULESTREAMNAME is followed by a reserved record carrying the same
     name as UTF-16. The CFB directory stores stream names as UTF-16, so
     the Unicode form is the one that actually matches. */
  MODULESTREAMNAME_UNICODE: 0x0032,
  MODULEDOCSTRING: 0x001c,
  MODULEOFFSET: 0x0031,
  MODULETYPE_PROCEDURAL: 0x0021,
  MODULETYPE_DOCUMENT: 0x0022,
  MODULEPRIVATE: 0x0028,
  PROJECTMODULES: 0x000f,
  PROJECTCOOKIE: 0x0013,
};

/* A real VBA project has tens of modules. A number far past that means the
   record walk has desynchronised or the file is hostile; either way there
   is nothing useful past this point and a lot of memory to lose. */
const MAX_MODULES = 512;

function decodeUtf16(bytes) {
  let out = '';
  for (let i = 0; i + 1 < bytes.length; i += 2) out += String.fromCharCode(bytes[i] | (bytes[i + 1] << 8));
  return out;
}

export function findModuleSection(dir) {
  const view = new DataView(dir.buffer, dir.byteOffset, dir.byteLength);
  for (let i = 0; i + 18 <= dir.length; i += 1) {
    if (view.getUint16(i, true) !== RECORD.PROJECTMODULES) continue;
    if (view.getUint32(i + 2, true) !== 2) continue;
    if (view.getUint16(i + 8, true) !== RECORD.PROJECTCOOKIE) continue;
    if (view.getUint32(i + 10, true) !== 2) continue;
    if (view.getUint16(i + 16, true) !== RECORD.MODULENAME) continue;
    return { count: view.getUint16(i + 6, true), offset: i + 16 };
  }
  return null;
}

/** Read the module table out of a decompressed dir stream. */
export function parseModuleTable(dir) {
  const anchor = findModuleSection(dir);
  if (!anchor) return { declared: 0, modules: [] };

  const view = new DataView(dir.buffer, dir.byteOffset, dir.byteLength);
  const modules = [];
  let current = null;
  let at = anchor.offset;

  let truncated = false;

  while (at + 6 <= dir.length) {
    const id = view.getUint16(at, true);
    const size = view.getUint32(at + 2, true);
    if (size > dir.length - at - 6) break;

    const data = dir.subarray(at + 6, at + 6 + size);

    if (id === RECORD.MODULENAME) {
      if (modules.length >= MAX_MODULES) {
        truncated = true;
        break;
      }
      current = {
        name: decodeAnsi(data),
        streamName: '',
        streamNameUnicode: '',
        textOffset: 0,
        kind: 'module',
        isPrivate: false,
      };
      modules.push(current);
    } else if (current) {
      if (id === RECORD.MODULESTREAMNAME) current.streamName = decodeAnsi(data);
      else if (id === RECORD.MODULESTREAMNAME_UNICODE) current.streamNameUnicode = decodeUtf16(data);
      else if (id === RECORD.MODULENAMEUNICODE) current.name = decodeUtf16(data) || current.name;
      else if (id === RECORD.MODULEOFFSET && size >= 4) current.textOffset = view.getUint32(at + 6, true);
      else if (id === RECORD.MODULETYPE_PROCEDURAL) current.kind = 'standard';
      else if (id === RECORD.MODULETYPE_DOCUMENT) current.kind = 'sheet or class';
      else if (id === RECORD.MODULEPRIVATE) current.isPrivate = true;
    }

    at += 6 + size;
  }

  return { declared: anchor.count, modules, truncated };
}

/* ---------- the project as a whole -------------------------------------- */

/* The PROJECT stream is plain text key=value, and three of those values —
   CMG (protection state), DPB (password) and GC (visibility) — are
   obfuscated hex blobs.

   Excel writes all three into every project it saves, so their PRESENCE
   proves nothing: an unprotected workbook carries a DPB too. The lock
   state is inside the value, which has to be decrypted to be read. Getting
   this wrong means telling a stranger their unprotected file is
   password-locked, so it is worth the twenty lines. */

/**
 * MS-OVBA 2.4.3.2. Each byte is XORed with the sum of the byte encrypted
 * two places back and the byte decrypted one place back, which makes the
 * stream self-keying from a three-byte header.
 */
export function decryptProjectRecord(hex) {
  const clean = String(hex || '').trim().replace(/^"|"$/g, '');
  if (!/^[0-9a-f]+$/i.test(clean) || clean.length < 8 || clean.length % 2) return null;

  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i += 1) bytes[i] = parseInt(clean.substr(i * 2, 2), 16);

  const seed = bytes[0];
  const versionEnc = bytes[1];
  const projKeyEnc = bytes[2];
  const version = versionEnc ^ seed;
  const projKey = projKeyEnc ^ seed;
  if (version !== 2) return null;

  let encryptedByte1 = projKeyEnc;
  let encryptedByte2 = versionEnc;
  let unencryptedByte1 = projKey;

  const out = [];
  for (let i = 3; i < bytes.length; i += 1) {
    const byteEnc = bytes[i];
    const byte = (byteEnc ^ ((encryptedByte2 + unencryptedByte1) & 0xff)) & 0xff;
    out.push(byte);
    encryptedByte2 = encryptedByte1;
    encryptedByte1 = byteEnc;
    unencryptedByte1 = byte;
  }

  /* A seed-derived number of leading bytes is padding, then a 32-bit
     little-endian length, then the payload itself. */
  const ignored = (seed & 6) >> 1;
  const body = out.slice(ignored);
  if (body.length < 4) return null;

  const length = body[0] | (body[1] << 8) | (body[2] << 16) | (body[3] << 24);
  return { version, data: body.slice(4, 4 + Math.max(0, length)), declaredLength: length };
}

/**
 * Read the real protection state off the PROJECT stream.
 * An unprotected project decrypts DPB to a single zero byte and CMG to
 * four zero bytes; anything else means a password or an editor lock.
 */
export function readProjectFlags(text) {
  if (!text) return { locked: false };

  const value = (key) => {
    const match = new RegExp(`^\\s*${key}\\s*=\\s*"?([0-9a-f]+)"?\\s*$`, 'im').exec(text);
    return match ? decryptProjectRecord(match[1]) : null;
  };

  const dpb = value('DPB');
  const cmg = value('CMG');

  const hasPassword = Boolean(dpb && dpb.declaredLength > 1 && dpb.data.some((byte) => byte !== 0));
  const isProtected = Boolean(cmg && cmg.data.some((byte) => byte !== 0));

  return { locked: hasPassword || isProtected };
}

/**
 * Pull every module's source out of a parsed compound file.
 * `container` is the object returned by readCompoundFile.
 */
export function extractModules(container) {
  if (!container) return null;

  const dirStream = container.streams.find((stream) => /(^|\/)dir$/i.test(stream.path));
  if (!dirStream) return null;

  const dir = decompress(container.read(dirStream.path), 0);
  if (!dir || !dir.length) return null;

  const { declared, modules, truncated } = parseModuleTable(dir);

  /* Stream paths are prefixed by the VBA storage, which is conventionally
     named "VBA" but is matched rather than assumed. */
  const prefix = dirStream.path.includes('/')
    ? dirStream.path.slice(0, dirStream.path.lastIndexOf('/') + 1)
    : '';

  /* Names are tried Unicode-first because that is how the CFB directory
     stores them, then the code-page form, then case-insensitively — a
     module whose name is not Latin-1 should degrade to a near miss rather
     than silently vanish from the report. */
  const findStream = (module) => {
    const candidates = [module.streamNameUnicode, module.streamName, module.name].filter(Boolean);
    for (let i = 0; i < candidates.length; i += 1) {
      const raw = container.read(`${prefix}${candidates[i]}`);
      if (raw) return raw;
    }
    const lowered = candidates.map((name) => name.toLowerCase());
    const near = container.streams.find(
      (stream) => stream.path.startsWith(prefix) && lowered.includes(stream.name.toLowerCase())
    );
    return near ? container.read(near.path) : null;
  };

  /* The per-module cap does not bound the project: five hundred modules at
     32MB each is still a dead tab. Modules share one budget, and once it is
     gone the rest are reported by name with their source unread. */
  let budget = MAX_PROJECT_BYTES;

  const read = modules.map((module) => {
    const raw = findStream(module);
    const room = Math.min(MAX_DECOMPRESSED, budget);
    const source = raw && room > 0 ? decompress(raw, module.textOffset, room) : null;
    if (source) budget -= source.length;
    const text = source && source.length ? decodeAnsi(source) : '';
    return {
      name: module.name,
      kind: module.kind,
      isPrivate: module.isPrivate,
      streamBytes: raw ? raw.length : 0,
      recovered: Boolean(text),
      lines: text ? text.split(/\r\n|\r|\n/).length : 0,
      codeLines: text ? countCodeLines(text) : 0,
      source: text,
    };
  });

  const projectStream = container.streams.find((stream) => /^PROJECT$/i.test(stream.path));
  const project = readProjectFlags(projectStream ? decodeAnsi(container.read(projectStream.path)) : '');

  return { declared, modules: read, locked: project.locked, truncated };
}

/* Blank lines, comments and the VB_ attribute preamble are not code. This
   is the number quoted back to the user, so it is counted once, per
   module, and reused rather than recomputed differently in two places. */
export function countCodeLines(text) {
  return text.split(/\r\n|\r|\n/).filter((line) => {
    const trimmed = line.trim();
    return trimmed && !trimmed.startsWith("'") && !/^Attribute\s/i.test(trimmed);
  }).length;
}

/* ---------- what the code actually does --------------------------------- */

/* Each pattern names a capability the workbook has that a spreadsheet is
   not supposed to have. The point is not to judge the code — it is to put
   a name to what has to be rebuilt if the file is ever replaced. */
const BEHAVIOURS = [
  {
    id: 'database',
    label: 'Talks to a database',
    detail: 'Opens database connections from inside the workbook.',
    level: 'error',
    /* The SQL clause has to look like SQL, not like English that happens to
       contain "select" and "from". An earlier attempt anchored on a quote,
       which failed twice over: it had no closing quote, so it really only
       required a quote somewhere earlier on the line, and it still matched
       MsgBox "Select a customer from the list".

       So: FROM must be followed by an identifier rather than a word like
       "the", and a third SQL keyword must appear. Case-sensitive, because
       embedded SQL is conventionally uppercase and prose is not. A false
       accusation at error level costs more than a missed finding. */
    pattern: /ADODB\.(Connection|Recordset)|Provider\s*=|DSN\s*=|SQLOLEDB|ODBCDirect|OpenDatabase/i,
    /* Kept separate so it can be case-sensitive while the API names above
       stay case-insensitive, VBA being a case-insensitive language. */
    strict:
      /SELECT\b[\s\S]{0,300}?\bFROM\s+[[\w"`][\s\S]{0,300}?\b(WHERE|INNER\s+JOIN|LEFT\s+JOIN|GROUP\s+BY|ORDER\s+BY)\b/,
  },
  {
    id: 'files',
    label: 'Reads or writes files',
    detail: 'Writes to disk outside the workbook, so its output is a dependency of something else.',
    level: 'warn',
    pattern: /Scripting\.FileSystemObject|\bOpen\b[^\n]{0,80}\bFor\s+(Output|Append|Binary|Random)\b|\.SaveAs\b|\bKill\b\s+|\bMkDir\b|\bFileCopy\b/i,
  },
  {
    id: 'email',
    label: 'Sends email',
    detail: 'Sends mail on your behalf. Anything it sends stops when the workbook stops.',
    level: 'warn',
    pattern: /Outlook\.Application|CDO\.Message|\.SendMail\b|MailEnvelope/i,
  },
  {
    id: 'network',
    label: 'Calls a network service',
    detail: 'Fetches from a URL or web service at runtime.',
    level: 'warn',
    pattern: /MSXML2\.(XMLHTTP|ServerXMLHTTP)|WinHttp\.WinHttpRequest|InternetExplorer\.Application|URLDownloadToFile/i,
  },
  {
    id: 'shell',
    label: 'Runs programs on the machine',
    detail: 'Shells out or calls Windows directly, which ties it to a specific desktop build.',
    level: 'error',
    pattern: /WScript\.Shell|\bShell\s*\(|Declare\s+(PtrSafe\s+)?(Function|Sub)\b/i,
  },
  {
    id: 'autorun',
    label: 'Runs on its own',
    detail: 'Fires without anyone pressing anything — on open, on edit, or on a timer.',
    level: 'info',
    pattern: /\bAuto_Open\b|Workbook_Open\b|Worksheet_Change\b|Workbook_BeforeClose\b|Application\.OnTime\b/i,
  },
];

const PATH_PATTERN = /"((?:[A-Za-z]:\\|\\\\)[^"\n]{2,120})"/g;
/* Either a quoted literal, or a bare value inside a connection string
   terminated by a semicolon. Parentheses are excluded from the bare form so
   that `token = GetToken()` — a call, not a secret — does not match. */
const CREDENTIAL_PATTERN =
  /\b(pwd|password|apikey|api_key|secret|token)\s*[:=]\s*(?:"[^"\n]{1,80}"|'[^'\n]{1,80}'|[^\s;"'()\n]{1,80}\s*;)/gi;

/**
 * Scan recovered source for the things that make a workbook an
 * application. Counting is done over source with comments and string
 * literals left in place: a commented-out database connection is still
 * evidence that one exists.
 */
/* One project in the wild had a single 435KB module. Scanning is linear,
   but there is no reason to run a dozen passes over an arbitrarily large
   string handed over by a stranger, so the joined source is capped. */
const MAX_SCAN_CHARS = 4 * 1024 * 1024;

export function scanSource(modules) {
  const joined = modules.map((module) => module.source).join('\n');
  const truncated = joined.length > MAX_SCAN_CHARS;
  const all = truncated ? joined.slice(0, MAX_SCAN_CHARS) : joined;

  const behaviours = BEHAVIOURS.filter(
    (behaviour) => behaviour.pattern.test(all) || (behaviour.strict && behaviour.strict.test(all))
  ).map(({ pattern, strict, ...rest }) => rest);

  const paths = new Set();
  let match = PATH_PATTERN.exec(all);
  while (match) {
    paths.add(match[1]);
    match = PATH_PATTERN.exec(all);
  }
  PATH_PATTERN.lastIndex = 0;

  const credentials = [];
  match = CREDENTIAL_PATTERN.exec(all);
  while (match) {
    credentials.push(match[1].toLowerCase());
    match = CREDENTIAL_PATTERN.exec(all);
  }
  CREDENTIAL_PATTERN.lastIndex = 0;

  const count = (pattern) => (all.match(pattern) || []).length;

  /* `^[ \t]*` rather than `^\s*`: with the m flag, \s matches newlines, so
     a failed match at one line start can backtrack across every preceding
     blank line. On a large module that is quadratic and freezes the tab. */
  return {
    /* Reported, not hidden: past the cap the behaviour, credential and
       path counts describe only the first slice of the source, while the
       line counts describe all of it. Saying nothing would make a partial
       scan look like a clean one. */
    sourceTruncated: truncated,
    scannedChars: all.length,
    behaviours,
    paths: [...paths],
    credentialCount: credentials.length,
    procedures: count(
      /^[ \t]*(?:Public[ \t]+|Private[ \t]+|Friend[ \t]+)?(?:Static[ \t]+)?(?:Sub|Function|Property[ \t]+(?:Get|Let|Set))[ \t]+\w+/gim
    ),
    errorSuppressions: count(/On[ \t]+Error[ \t]+Resume[ \t]+Next/gi),
    totalLines: modules.reduce((sum, module) => sum + (module.lines || 0), 0),
    codeLines: modules.reduce((sum, module) => sum + moduleCodeLines(module), 0),
    modulesWithCode: modules.filter((module) => moduleCodeLines(module) > 0).length,
  };
}

const moduleCodeLines = (module) =>
  (module.codeLines == null ? countCodeLines(module.source || '') : module.codeLines);
