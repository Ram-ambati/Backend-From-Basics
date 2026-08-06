import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppRoutes } from './App';
import { getPageMeta, getStructuredData } from './utils/seo';

/**
 * Server-side render function for a given URL.
 * Also returns the SEO metadata and structured data for injection.
 */
export function render(url, { chapterSlug, sectionSlug } = {}) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>
  );

  const meta = getPageMeta(chapterSlug, sectionSlug);
  const structuredData = getStructuredData(chapterSlug, sectionSlug);

  return { html, meta, structuredData };
}
