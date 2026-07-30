import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const buttonStyle = {
  position: 'fixed',
  bottom: '24px',
  right: '24px',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--bg-secondary)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  zIndex: 50,
  transition: 'opacity 200ms ease, color 120ms ease',
  boxShadow: 'var(--shadow-sm)',
};

/**
 * Floating scroll-to-top button — appears after scrolling 300px down.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      style={buttonStyle}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
