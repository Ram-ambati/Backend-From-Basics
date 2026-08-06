import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const template = fs.readFileSync(path.resolve(__dirname, '../dist/client/index.html'), 'utf-8');

// Load the server entry point
const { render } = await import('../dist/server/entry-server.js');
// Load the chapters data (from the bundled server version to ensure it works)
// Note: We need the routes to iterate over. We can import the source chapters.js directly.
import { chapters } from '../src/data/chapters.js';

const routes = [
  { url: '/', chapterSlug: null, sectionSlug: null },
  { url: '/404', chapterSlug: null, sectionSlug: null }
];

chapters.forEach(chapter => {
  chapter.sections.forEach(section => {
    routes.push({
      url: `/${chapter.slug}/${section.slug}`,
      chapterSlug: chapter.slug,
      sectionSlug: section.slug
    });
  });
});

for (const route of routes) {
  const { html, meta, structuredData } = render(route.url, {
    chapterSlug: route.chapterSlug,
    sectionSlug: route.sectionSlug
  });

  // Inject rendered HTML
  let finalHtml = template.replace(`<!--app-html-->`, html) || template.replace(`<div id="root"></div>`, `<div id="root">${html}</div>`);

  // Inject meta tags
  const headInject = `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <link rel="canonical" href="${meta.canonical}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:url" content="${meta.canonical}" />
    <meta property="og:type" content="${meta.type}" />
    <meta property="og:image" content="${meta.ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${meta.ogImage}" />
    ${structuredData ? `<script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n</script>` : ''}
  `;

  finalHtml = finalHtml.replace('<!--meta-tags-->', headInject);

  // Determine output path
  const filePath = route.url === '/' ? 'index.html' : `${route.url.slice(1)}/index.html`;
  const absoluteFilePath = path.resolve(__dirname, '../dist/client', filePath);

  // Create directory if it doesn't exist
  fs.mkdirSync(path.dirname(absoluteFilePath), { recursive: true });

  // Write file
  fs.writeFileSync(absoluteFilePath, finalHtml);
  console.log(`[prerender] Generated ${filePath}`);
}

console.log('✅ Prerendering complete.');
