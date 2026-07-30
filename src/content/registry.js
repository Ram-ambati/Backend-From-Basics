import { lazy } from 'react';

/**
 * Content registry — maps chapter/section slugs to lazy-loaded components.
 * 
 * To add a new section:
 * 1. Create the .jsx file in the appropriate content/chapter* folder
 * 2. Add the import mapping here
 * 3. Navigation updates automatically from chapters.js
 */

const EmptySection = lazy(() => import('./EmptySection'));

const contentMap = {
  // Chapter 1: Foundation
  'foundation/networking-fundamentals': lazy(() =>
    import('./chapter1-foundation/networking-fundamentals')
  ),
  'foundation/high-level-understanding': lazy(() => 
    import('./chapter1-foundation/high-level-understanding')
  ),

  // All other sections use the empty placeholder for now
  // As you write content, replace these with actual imports:
  // 'foundation/http-protocol': lazy(() => import('./chapter1-foundation/http-protocol')),
  // etc.
};

/**
 * Get the component for a given chapter/section slug pair.
 * Returns the EmptySection placeholder if no content exists yet.
 */
export function getSectionComponent(chapterSlug, sectionSlug) {
  const key = `${chapterSlug}/${sectionSlug}`;
  return contentMap[key] || EmptySection;
}
