import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './Breadcrumbs.module.css';

/**
 * Breadcrumb navigation — Home > Chapter > Section
 */
export default function Breadcrumbs({ chapterTitle, chapterSlug, sectionTitle }) {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link to="/" className={styles['breadcrumb-link']}>
        Home
      </Link>
      <ChevronRight size={12} className={styles.separator} />
      <Link
        to={`/${chapterSlug}`}
        className={styles['breadcrumb-link']}
        onClick={(e) => {
          // Chapters don't have their own page, navigate to first section
          // This is handled by the chapter slug route in the router
        }}
      >
        {chapterTitle}
      </Link>
      <ChevronRight size={12} className={styles.separator} />
      <span className={styles.current}>{sectionTitle}</span>
    </nav>
  );
}
