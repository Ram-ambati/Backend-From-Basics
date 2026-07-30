import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SearchModal from './components/ui/SearchModal';
import { useSearch } from './hooks/useSearch';
import { getSectionComponent } from './content/registry';
import { chapters } from './data/chapters';

/**
 * Dynamic section page — resolves the correct content component
 * based on the URL parameters.
 */
function SectionRoute() {
  const { chapterSlug, sectionSlug } = useParams();
  const SectionComponent = getSectionComponent(chapterSlug, sectionSlug);

  return (
    <Suspense
      fallback={
        <div style={{
          padding: 'var(--space-10) 0',
          textAlign: 'center',
          color: 'var(--text-muted)',
        }}>
          Loading...
        </div>
      }
    >
      <SectionComponent />
    </Suspense>
  );
}

/**
 * Chapter redirect — when a user navigates to just a chapter slug,
 * redirect to its first section.
 */
function ChapterRedirect() {
  const { chapterSlug } = useParams();
  const chapter = chapters.find((c) => c.slug === chapterSlug);

  if (chapter && chapter.sections.length > 0) {
    return <Navigate to={`/${chapter.slug}/${chapter.sections[0].slug}`} replace />;
  }

  return <NotFound />;
}

/**
 * Inner app — must be inside BrowserRouter so hooks like useNavigate work.
 */
function AppRoutes() {
  const search = useSearch();

  return (
    <>
      <Routes>
        <Route element={<Layout onOpenSearch={search.open} />}>
          <Route index element={<Home />} />
          <Route path=":chapterSlug" element={<ChapterRedirect />} />
          <Route path=":chapterSlug/:sectionSlug" element={<SectionRoute />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <SearchModal
        isOpen={search.isOpen}
        onClose={search.close}
        query={search.query}
        setQuery={search.setQuery}
        results={search.results}
        selectedIndex={search.selectedIndex}
        onSelect={search.selectResult}
        onKeyDown={search.handleKeyNavigation}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

