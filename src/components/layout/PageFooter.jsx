import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import styles from './PageFooter.module.css';

/**
 * Page footer — Previous/Next section navigation + related topics.
 */
export default function PageFooter({ prev, next, relatedTopics }) {
  return (
    <footer className={styles.footer}>
      {/* Previous / Next Navigation */}
      <nav className={styles['page-nav']} aria-label="Page navigation">
        {prev && (
          <Link
            to={prev.path}
            className={cn(styles['nav-card'], styles.prev)}
          >
            <span className={styles['nav-label']}>← Previous</span>
            <span className={styles['nav-title']}>{prev.title}</span>
          </Link>
        )}
        {next && (
          <Link
            to={next.path}
            className={cn(styles['nav-card'], styles.next)}
          >
            <span className={styles['nav-label']}>Next →</span>
            <span className={styles['nav-title']}>{next.title}</span>
          </Link>
        )}
      </nav>

      {/* Related Topics */}
      {relatedTopics && relatedTopics.length > 0 && (
        <div className={styles.related}>
          <div className={styles['related-title']}>Related Topics</div>
          <div className={styles['related-links']}>
            {relatedTopics.map((topic) => (
              <Link
                key={topic.path}
                to={topic.path}
                className={styles['related-tag']}
              >
                {topic.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </footer>
  );
}
