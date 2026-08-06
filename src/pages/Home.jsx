import { Link } from 'react-router-dom';
import { chapters } from '../data/chapters';
import { useDocumentHead } from '../hooks/useDocumentHead';
import styles from './Home.module.css';

export default function Home() {
  useDocumentHead(null, null);

  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1 className={styles.title}>Backend From First Principles</h1>
        <p className={styles.subtitle}>
          A comprehensive guide to backend engineering concepts — from networking
          fundamentals to distributed systems and production-ready practices.
        </p>
      </header>

      <div className={styles['chapter-grid']}>
        {chapters.map((chapter) => (
          <Link
            key={chapter.slug}
            to={`/${chapter.slug}/${chapter.sections[0].slug}`}
            className={styles['chapter-card']}
          >
            <span className={styles['chapter-number']}>Chapter {chapter.id}</span>
            <span className={styles['chapter-title']}>{chapter.title}</span>
            <span className={styles['chapter-count']}>
              {chapter.sections.length} sections · {chapter.sections.reduce((sum, s) => sum + s.concepts.length, 0)} concepts
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
