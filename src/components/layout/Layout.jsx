import { useState, useCallback } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import TopBar from './TopBar';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import ScrollToTop from '../ui/ScrollToTop';
import { useScrollRestoration } from '../../hooks/useScrollRestoration';
import { cn } from '../../utils/cn';
import styles from './Layout.module.css';

export default function Layout({ onOpenSearch }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useScrollRestoration();

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <TopBar onToggleSidebar={toggleSidebar} onOpenSearch={onOpenSearch} />

      <div className={styles.layout}>
        <LeftSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        <main id="main-content" className={styles['main-content']}>
          <div className={styles['content-wrapper']}>
            <Outlet />
          </div>
        </main>

        <RightSidebar />
      </div>

      {/* Mobile backdrop */}
      <div
        className={cn(styles.backdrop, sidebarOpen && styles.visible)}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <ScrollToTop />
    </>
  );
}
