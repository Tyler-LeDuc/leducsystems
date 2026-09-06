/* =========================================================================
   Small shared helpers for reading Office Open XML parts.

   Both tools that open workbooks need the same three things, and both need
   them to fail the same way: a part that will not parse yields null rather
   than an exception, so one bad file costs its own findings and nothing
   else.
   ========================================================================= */

/** Parse an XML part, returning null rather than throwing. */
export function parseXml(text) {
  if (!text) return null;
  try {
    const doc = new DOMParser().parseFromString(text, 'application/xml');
    return doc.getElementsByTagName('parsererror').length ? null : doc;
  } catch (err) {
    return null;
  }
}

/* OOXML parts are namespaced inconsistently between producers, so tags are
   matched on local name rather than by prefix. */
export function tags(doc, localName) {
  if (!doc) return [];
  return [...doc.getElementsByTagName('*')].filter((node) => node.localName === localName);
}

export const attr = (node, name) => (node && node.getAttribute ? node.getAttribute(name) : null);

/** Text content of the first element with this local name. */
export function textOf(doc, localName) {
  const node = tags(doc, localName)[0];
  return node ? (node.textContent || '').trim() : '';
}
