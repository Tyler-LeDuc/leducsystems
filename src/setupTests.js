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

// The folder scanner reads workbooks through Blob.slice().arrayBuffer() so
// it never loads a whole file. Blob.arrayBuffer has been in browsers since
// 2019; this jsdom predates it, so it is filled in from the FileReader it
// does implement.
if (typeof Blob !== 'undefined' && typeof Blob.prototype.arrayBuffer === 'undefined') {
  Blob.prototype.arrayBuffer = function arrayBuffer() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(this);
    });
  };
}
