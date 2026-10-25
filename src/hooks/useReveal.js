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

    // An element much taller than the viewport (the full games grid on a phone)
    // can never show `threshold` of itself at once, so it also counts as in view
    // once it fills half the visible area.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const rootH = entry.rootBounds ? entry.rootBounds.height : window.innerHeight;
          const enough = entry.intersectionRatio >= threshold
            || entry.intersectionRect.height >= rootH * 0.5;
          if (!enough) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      // fine steps so a very tall element still gets callbacks as it scrolls in
      { threshold: Array.from({ length: 21 }, (_, i) => i / 100).concat(threshold), rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
