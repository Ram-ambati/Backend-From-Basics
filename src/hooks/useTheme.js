import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'backend-ffp-theme';

/**
 * Theme hook supporting light, dark, and system modes.
 * Persists user preference to localStorage.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'system';
    } catch {
      return 'system';
    }
  });

  const getResolvedTheme = useCallback((themeValue) => {
    if (themeValue === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return themeValue;
  }, []);

  const applyTheme = useCallback((themeValue) => {
    const resolved = getResolvedTheme(themeValue);
    document.documentElement.setAttribute('data-theme', resolved);
  }, [getResolvedTheme]);

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // localStorage unavailable
    }
    applyTheme(newTheme);
  }, [applyTheme]);

  const cycleTheme = useCallback(() => {
    const cycle = { light: 'dark', dark: 'system', system: 'light' };
    setTheme(cycle[theme]);
  }, [theme, setTheme]);

  // Apply theme on mount
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme, applyTheme]);

  return {
    theme,
    resolvedTheme: getResolvedTheme(theme),
    setTheme,
    cycleTheme,
  };
}
