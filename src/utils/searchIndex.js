import Fuse from 'fuse.js';
import { getAllSections } from '../data/chapters';

/**
 * Builds a flat searchable index from all chapters/sections/concepts.
 */
function buildEntries() {
  const allSections = getAllSections();
  const entries = [];

  allSections.forEach((section) => {
    // Add section itself
    entries.push({
      type: 'section',
      title: section.title,
      chapter: section.chapterTitle,
      path: section.path,
    });

    // Add each concept within the section
    section.concepts.forEach((concept) => {
      entries.push({
        type: 'concept',
        title: concept,
        section: section.title,
        chapter: section.chapterTitle,
        path: section.path,
      });
    });
  });

  return entries;
}

let fuseInstance = null;

/**
 * Returns the singleton Fuse.js instance for search.
 */
export function getSearchIndex() {
  if (!fuseInstance) {
    const entries = buildEntries();
    fuseInstance = new Fuse(entries, {
      keys: [
        { name: 'title', weight: 0.7 },
        { name: 'chapter', weight: 0.15 },
        { name: 'section', weight: 0.15 },
      ],
      threshold: 0.3,
      includeMatches: true,
      minMatchCharLength: 2,
    });
  }
  return fuseInstance;
}

/**
 * Search the index with a query string.
 * Returns results grouped by chapter.
 */
export function searchContent(query) {
  if (!query || query.trim().length < 2) return [];
  const fuse = getSearchIndex();
  const results = fuse.search(query, { limit: 20 });
  return results;
}
