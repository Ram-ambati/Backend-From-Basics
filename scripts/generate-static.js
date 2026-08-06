import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import chapters data dynamically since we are in a module environment
import { chapters } from '../src/data/chapters.js';

const siteUrl = 'https://backend-from-first-principles.netlify.app';
const currentDate = new Date().toISOString().split('T')[0];

const publicDir = path.join(__dirname, '../public');

// Generate sitemap.xml
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

chapters.forEach(chapter => {
  chapter.sections.forEach(section => {
    sitemap += `  <url>
    <loc>${siteUrl}/${chapter.slug}/${section.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  });
});
sitemap += `</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('✅ Generated public/sitemap.xml');

// Generate llms.txt
let llms = `# Backend From First Principles

> A comprehensive, modern guide to backend engineering concepts — from networking fundamentals to distributed systems.

## Purpose
This documentation site serves as a structured learning resource for backend engineering. It explains core concepts clearly, relying on first principles rather than focusing on specific frameworks or languages.

## Table of Contents

`;

chapters.forEach(chapter => {
  llms += `### ${chapter.title}\n`;
  chapter.sections.forEach(section => {
    llms += `- [${section.title}](${siteUrl}/${chapter.slug}/${section.slug}): ${section.concepts.join(', ')}\n`;
  });
  llms += `\n`;
});

fs.writeFileSync(path.join(publicDir, 'llms.txt'), llms);
console.log('✅ Generated public/llms.txt');

// Generate robots.txt
const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
console.log('✅ Generated public/robots.txt');
