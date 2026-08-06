import { useState, useEffect } from 'react';

/**
 * SSR-safe environment hook.
 * Returns false on the server (prerendering).
 * Returns true after the component has mounted on the client.
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
