import { useMemo } from 'react';

/**
 * Estimates reading time from a content container ref.
 * Returns a string like "5 min read".
 * 
 * @param {string} text - Text content to estimate
 * @param {number} wordsPerMinute - Reading speed (default: 200)
 */
export function useReadingTime(text, wordsPerMinute = 200) {
  return useMemo(() => {
    if (!text) return '1 min read';
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    return `${minutes} min read`;
  }, [text, wordsPerMinute]);
}

/**
 * Calculate reading time from word count directly.
 */
export function getReadingTime(wordCount, wordsPerMinute = 200) {
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}
