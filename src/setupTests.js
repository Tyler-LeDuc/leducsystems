// jest-dom adds custom jest matchers for asserting on DOM nodes, e.g.
// expect(element).toHaveTextContent(/react/i)
import '@testing-library/jest-dom';

// jsdom does not implement scrolling. ScrollToTop calls window.scrollTo on every
// route change, which would otherwise print a "Not implemented" error per render.
window.scrollTo = () => {};
