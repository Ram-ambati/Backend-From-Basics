import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
import { chapters } from '../../data/chapters';
import { cn } from '../../utils/cn';
import styles from './LeftSidebar.module.css';

export default function LeftSidebar({ isOpen, onClose }) {
  const location = useLocation();

  // Determine which chapter is currently active
  const activeChapterSlug = location.pathname.split('/')[1] || '';

  // Track which chapters are expanded
  const [expandedChapters, setExpandedChapters] = useState(() => {
    // Initially expand the active chapter
    const initial = {};
    chapters.forEach((ch) => {
      initial[ch.slug] = ch.slug === activeChapterSlug;
    });
    return initial;
  });

  // Auto-expand active chapter when route changes
  useEffect(() => {
    if (activeChapterSlug) {
      setExpandedChapters((prev) => ({
        ...prev,
        [activeChapterSlug]: true,
      }));
    }
    // Close mobile sidebar on navigation
    onClose?.();
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleChapter = (slug) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <aside
      className={cn(styles.sidebar, isOpen && styles.open)}
      role="navigation"
      aria-label="Course navigation"
    >
      <div className={styles['close-btn']}>
        <button onClick={onClose} aria-label="Close sidebar">
          <X size={20} />
        </button>
      </div>
      <nav className={styles.nav}>
        {chapters.map((chapter) => {
          const isExpanded = expandedChapters[chapter.slug] || false;

          return (
            <div key={chapter.slug} className={styles.chapter}>
              <button
                className={styles['chapter-header']}
                onClick={() => toggleChapter(chapter.slug)}
                aria-expanded={isExpanded}
                aria-controls={`chapter-${chapter.slug}`}
              >
                <span>{chapter.title}</span>
                <ChevronRight
                  className={cn(styles.chevron, isExpanded && styles.expanded)}
                  size={16}
                />
              </button>

              <div
                id={`chapter-${chapter.slug}`}
                className={cn(
                  styles['section-list'],
                  isExpanded ? styles.expanded : styles.collapsed
                )}
                role="group"
                aria-label={`${chapter.title} sections`}
              >
                {chapter.sections.map((section) => (
                  <NavLink
                    key={section.slug}
                    to={`/${chapter.slug}/${section.slug}`}
                    className={({ isActive }) =>
                      cn(styles['section-link'], isActive && styles.active)
                    }
                  >
                    {section.title}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
