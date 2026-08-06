import { findSection } from '../data/chapters.js';

const SITE_URL = import.meta.env?.VITE_SITE_URL || 'https://backend-from-first-principles.netlify.app';
const SITE_NAME = 'Backend From First Principles';

/**
 * Get SEO metadata for a specific route.
 * If chapterSlug and sectionSlug are provided, returns section-specific meta.
 * Otherwise, returns default homepage meta.
 */
export function getPageMeta(chapterSlug, sectionSlug) {
  const defaultMeta = {
    title: SITE_NAME,
    description: 'A comprehensive guide to backend engineering concepts — from networking fundamentals to distributed systems.',
    canonical: `${SITE_URL}/`,
    ogImage: `${SITE_URL}/og-image.png`,
    type: 'website'
  };

  if (!chapterSlug || !sectionSlug) {
    return defaultMeta;
  }

  const section = findSection(chapterSlug, sectionSlug);
  if (!section) {
    return {
      ...defaultMeta,
      title: `Page Not Found | ${SITE_NAME}`,
    };
  }

  return {
    title: `${section.title} | ${section.chapterTitle} | ${SITE_NAME}`,
    description: `Learn about ${section.title}, including: ${section.concepts.slice(0, 5).join(', ')}...`,
    canonical: `${SITE_URL}/${chapterSlug}/${sectionSlug}`,
    ogImage: `${SITE_URL}/og-image.png`,
    type: 'article'
  };
}

/**
 * Generate JSON-LD structured data for a specific route.
 */
export function getStructuredData(chapterSlug, sectionSlug) {
  if (!chapterSlug || !sectionSlug) {
    // WebSite schema for homepage
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: 'A comprehensive guide to backend engineering concepts.',
    };
  }

  const section = findSection(chapterSlug, sectionSlug);
  if (!section) return null;

  // TechArticle schema for section pages
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${chapterSlug}/${sectionSlug}`
    },
    headline: section.title,
    description: `Learn about ${section.title}, including: ${section.concepts.join(', ')}`,
    author: {
      '@type': 'Person',
      name: 'Backend From First Principles'
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.png`
      }
    },
    articleSection: section.chapterTitle,
    keywords: section.concepts.join(', '),
  };
}
