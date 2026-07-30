import { Link } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import styles from './TopBar.module.css';

export default function TopBar({ onToggleSidebar, onOpenSearch }) {
  const progress = useScrollProgress();

  return (
    <header className={styles.topbar} role="banner">
      <div className={styles.left}>
        <button
          className={styles.hamburger}
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <Menu size={20} />
        </button>
        <Link to="/" className={styles.logo}>
          Backend FFP
        </Link>
      </div>

      <div className={styles.right}>
        <button
          className={styles['search-button']}
          onClick={onOpenSearch}
          aria-label="Search documentation"
        >
          <Search size={16} />
          <span className={styles['search-text']}>Search...</span>
          <kbd className={styles['search-kbd']}>Ctrl K</kbd>
        </button>

        <ThemeToggle />
      </div>

      {/* Scroll progress bar */}
      <div
        className={styles['progress-bar']}
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
    </header>
  );
}
