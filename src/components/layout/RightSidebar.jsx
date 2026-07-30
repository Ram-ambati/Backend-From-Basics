import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useActiveHeading } from '../../hooks/useActiveHeading';
import { cn } from '../../utils/cn';
import styles from './RightSidebar.module.css';

/**
 * Right sidebar — auto-generated Table of Contents from page headings.
 * Highlights the section currently being viewed.
 */
export default function RightSidebar() {
  const [headings, setHeadings] = useState([]);
  const { activeId, observe } = useActiveHeading();
  const location = useLocation();

  // Extract headings from the page content after route change
  useEffect(() => {
    // Small delay to ensure content has rendered
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('#main-content h2[id], #main-content h3[id]');
      const items = Array.from(elements).map((el) => ({
        id: el.id,
        text: el.textContent,
        level: el.tagName === 'H3' ? 3 : 2,
      }));
      setHeadings(items);
      observe();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  if (headings.length === 0) return null;

  return (
    <aside className={styles.sidebar} aria-label="Table of Contents">
      <div className={styles.title}>On This Page</div>
      <nav className={styles['toc-list']}>
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              styles['toc-link'],
              heading.level === 3 && styles['level-3'],
              activeId === heading.id && styles.active
            )}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(heading.id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                // Update URL hash without scrolling
                window.history.pushState(null, '', `#${heading.id}`);
              }
            }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
