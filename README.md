# Backend From First Principles

[![Netlify Status](https://api.netlify.com/api/v1/badges/5077ea2e-1915-4ea7-8629-66ae70f65571/deploy-status)](https://app.netlify.com/projects/backend-from-first-principles/deploys)
**Live Site:** [https://backend-from-first-principles.netlify.app](https://backend-from-first-principles.netlify.app)

A professional, long-form documentation website dedicated to teaching backend engineering concepts from the ground up. Designed to feel like modern documentation sites (Stripe, MDN, Microsoft Learn), this platform prioritizes readability, fast navigation, and clear conceptual explanations.

## 🚀 Tech Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router DOM v6
- **Styling**: Vanilla CSS (CSS Modules) + Custom Design System
- **Icons**: Lucide React
- **Syntax Highlighting**: PrismJS
- **Search**: Fuse.js (Fuzzy search)
- **Diagrams**: Mermaid.js

## 📦 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

3. Build for production:
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```text
src/
├── components/
│   ├── content/     # Content building blocks (Definitions, Callouts, Quizzes, etc.)
│   ├── layout/      # Core layout (Sidebars, TopBar, Breadcrumbs)
│   └── ui/          # Generic UI components (ThemeToggle, CodeBlock, SearchModal)
├── content/         # The actual documentation content (pages)
│   ├── chapter1-foundation/
│   └── registry.js  # Lazy-loading map for all content sections
├── data/
│   └── chapters.js  # The single source of truth for the site's table of contents
├── hooks/           # Custom React hooks (Search, Theme, Scroll tracking)
├── pages/           # Top-level route pages (Home, NotFound)
└── styles/          # Global CSS design system (Tokens, Themes, Utilities)
```

## 📝 Adding Content

The site uses a component-based approach to writing documentation rather than Markdown. This allows for rich, interactive, and highly styled content blocks.

### The Golden Rule: Keep it Language-Agnostic
This documentation teaches fundamental concepts, not language-specific syntax. 
- **Avoid** using arbitrary language code (Python, Java, Go) to explain general concepts like sockets, database connections, or API routing.
- **Instead**, use conceptual explanations, numbered lists, and Mermaid flow diagrams.
- **Exceptions**: Code blocks are permitted only when a concept is intrinsically tied to a specific language (e.g., explaining the JavaScript event loop).

### Creating a New Page
1. Create a new `.jsx` file in the appropriate `src/content/chapterX/` folder.
2. Use the standard content components (see `networking-fundamentals.jsx` for a full reference example).
3. Import and map the new file in `src/content/registry.js`.
4. Ensure the section slug matches exactly what is defined in `src/data/chapters.js`.

### Content Components Available
- **Structure**: `<SectionPage>`, `<ConceptBlock>`
- **Explanations**: `<Definition>`, `<CodeBlock>`, `<Callout>` (note, tip, warning, etc.)
- **Visuals**: `<FlowDiagram>`, `<ComparisonTable>`, `<ProsConsList>`
- **Interactive**: `<Quiz>`, `<Exercise>`, `<Checklist>`
- **Admonitions**: `<InterviewQuestion>`, `<RealWorld>`, `<CommonPitfall>`
- **Summaries**: `<Summary>`, `<KeyTakeaways>`, `<FurtherReading>`
