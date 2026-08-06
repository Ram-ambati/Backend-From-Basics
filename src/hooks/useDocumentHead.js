import { useEffect } from 'react';
import { getPageMeta, getStructuredData } from '../utils/seo';

/**
 * Client-side hook for SPA navigation.
 * Updates document.title and meta tags when routing between pages.
 */
export function useDocumentHead(chapterSlug, sectionSlug) {
  useEffect(() => {
    // Only run on the client (browser)
    if (typeof document === 'undefined') return;

    const meta = getPageMeta(chapterSlug, sectionSlug);
    const structuredData = getStructuredData(chapterSlug, sectionSlug);

    // Update Title
    document.title = meta.title;

    // Update Meta Description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.name = 'description';
      document.head.appendChild(descTag);
    }
    descTag.content = meta.description;

    // Update Canonical Link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = meta.canonical;

    // Update Open Graph tags
    const updateOgTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    updateOgTag('og:title', meta.title);
    updateOgTag('og:description', meta.description);
    updateOgTag('og:url', meta.canonical);
    updateOgTag('og:type', meta.type);
    updateOgTag('og:image', meta.ogImage);

    // Update JSON-LD Structured Data
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

  }, [chapterSlug, sectionSlug]);
}
