import { useParams } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';
import Breadcrumbs from '../layout/Breadcrumbs';
import PageFooter from '../layout/PageFooter';
import { findSection, getPrevNextSections } from '../../data/chapters';
import { useDocumentHead } from '../../hooks/useDocumentHead';
import styles from './SectionPage.module.css';

/**
 * SectionPage — template wrapper for all section content pages.
 * Provides: breadcrumbs, title, reading time, last updated, prev/next navigation.
 *
 * @param {ReactNode} children - The section content
 * @param {string} readingTime - Estimated reading time (e.g., "5 min read")
 * @param {string} lastUpdated - Last updated date string
 * @param {{ path: string, title: string }[]} relatedTopics - Related topic links
 */
export default function SectionPage({ children, readingTime, lastUpdated, relatedTopics }) {
  const { chapterSlug, sectionSlug } = useParams();
  const section = findSection(chapterSlug, sectionSlug);
  const { prev, next } = getPrevNextSections(chapterSlug, sectionSlug);

  useDocumentHead(chapterSlug, sectionSlug);

  if (!section) {
    return (
      <div>
        <h1>Section Not Found</h1>
        <p>The requested section could not be found.</p>
      </div>
    );
  }

  return (
    <article className={styles['section-page']}>
      <Breadcrumbs
        chapterTitle={section.chapterTitle}
        chapterSlug={section.chapterSlug}
        sectionTitle={section.title}
      />

      <h1 className={styles['section-title']}>{section.title}</h1>

      <div className={styles.meta}>
        {readingTime && (
          <span className={styles['meta-item']}>
            <Clock size={14} />
            {readingTime}
          </span>
        )}
        {lastUpdated && (
          <span className={styles['meta-item']}>
            <Calendar size={14} />
            Updated {lastUpdated}
          </span>
        )}
      </div>

      {children}

      <PageFooter
        prev={prev}
        next={next}
        relatedTopics={relatedTopics}
      />
    </article>
  );
}
