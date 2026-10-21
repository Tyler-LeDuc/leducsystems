/* Sends a named Google Analytics event through the gtag snippet in
   public/index.html. A no-op when gtag is missing (tests, ad blockers), so
   callers never need to guard. Page views, scrolls and outbound clicks are
   already collected by GA's enhanced measurement; this is only for the
   actions worth counting on their own, like a pilot inquiry. */
export function track(name, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}
