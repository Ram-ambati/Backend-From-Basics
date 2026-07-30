import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Saves and restores scroll position per route.
 * Uses sessionStorage so it persists across back/forward but not across sessions.
 */
export function useScrollRestoration() {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Save scroll position of previous route
    const prevPath = prevPathRef.current;
    if (prevPath !== location.pathname) {
      try {
        sessionStorage.setItem(
          `scroll-${prevPath}`,
          String(window.scrollY)
        );
      } catch {
        // sessionStorage unavailable
      }
    }

    // Restore scroll position for current route, or scroll to top
    const savedPosition = sessionStorage.getItem(`scroll-${location.pathname}`);
    if (savedPosition && window.history.state?.idx !== undefined) {
      // Only restore on back/forward nav, not on fresh navigation
      window.scrollTo(0, parseInt(savedPosition, 10));
    } else {
      window.scrollTo(0, 0);
    }

    prevPathRef.current = location.pathname;
  }, [location.pathname]);
}
