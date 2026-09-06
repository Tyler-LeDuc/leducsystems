// jest-dom adds custom jest matchers for asserting on DOM nodes, e.g.
// expect(element).toHaveTextContent(/react/i)
import '@testing-library/jest-dom';

// jsdom does not implement scrolling. ScrollToTop calls window.scrollTo on every
// route change, which would otherwise print a "Not implemented" error per render.
window.scrollTo = () => {};

// The workbook tool inflates ZIP parts with the platform's own compression
// streams rather than a library. Browsers have had these since 2023; jsdom
// has not implemented them, so they are borrowed from Node for tests.
const streams = require('node:stream/web');
if (typeof global.DecompressionStream === 'undefined') {
  global.DecompressionStream = streams.DecompressionStream;
}
if (typeof global.CompressionStream === 'undefined') {
  global.CompressionStream = streams.CompressionStream;
}

// Same story for the text codecs: standard in every browser, absent from
// this version of jsdom.
const { TextEncoder, TextDecoder } = require('node:util');
if (typeof global.TextEncoder === 'undefined') global.TextEncoder = TextEncoder;
if (typeof global.TextDecoder === 'undefined') global.TextDecoder = TextDecoder;
