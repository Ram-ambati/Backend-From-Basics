import { useState, useEffect, useRef } from 'react';

/**
 * Uses Intersection Observer to track which heading (H2/H3) is currently in the viewport.
 * Returns the ID of the active heading for TOC highlighting.
 */
export function useActiveHeading() {
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef(null);

  useEffect(() => {
    const headings = document.querySelectorAll('h2[id], h3[id]');

    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first entry that is intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      observerRef.current.observe(heading);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Re-observe when content changes (route change)
  const observe = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const headings = document.querySelectorAll('h2[id], h3[id]');

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      observerRef.current.observe(heading);
    });
  };

  return { activeId, observe };
}
