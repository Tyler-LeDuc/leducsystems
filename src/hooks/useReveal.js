import { useEffect, useRef } from 'react';

/**
 * Adds `is-visible` to the returned element the first time it scrolls into
 * view, then stops observing it. Pairs with the `.reveal` class in
 * components.css. No-ops safely where IntersectionObserver is unavailable —
 * the element is simply revealed immediately.
 *
 * @param {{ threshold?: number, rootMargin?: string }} [options]
 * @returns {import('react').RefObject<HTMLElement>}
 */
export default function useReveal(options) {
  const threshold = options && options.threshold != null ? options.threshold : 0.12;
  const rootMargin = (options && options.rootMargin) || '0px 0px -8% 0px';
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
