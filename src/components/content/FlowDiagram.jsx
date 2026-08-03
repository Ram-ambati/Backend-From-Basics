import { useEffect, useRef, useState } from 'react';
import styles from './content.module.css';

/**
 * FlowDiagram — renders a Mermaid diagram.
 *
 * @param {string} chart - Mermaid diagram definition string
 * @param {string} caption - Optional caption below the diagram
 */
export default function FlowDiagram({ chart, caption }) {
  const containerRef = useRef(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 9)}`);
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');
  const [isVisible, setIsVisible] = useState(false);

  // Watch for theme changes on the html element
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
          setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Intersection Observer to lazy-load the diagram
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px' } // Load when it's 500px away from viewport
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!isVisible || !containerRef.current || !chart) return;
      
      // Dynamically import mermaid ONLY when visible
      const { default: mermaid } = await import('mermaid');
      
      // Update mermaid config before rendering
      mermaid.initialize({
        startOnLoad: false,
        theme: theme === 'dark' ? 'dark' : 'default',
        securityLevel: 'loose',
      });

      try {
        const { svg } = await mermaid.render(idRef.current, chart);
        if (containerRef.current) {
           containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        if (containerRef.current) {
          containerRef.current.innerHTML = `<pre style="color: var(--danger)">Diagram error: ${err.message}</pre>`;
        }
      }
    };

    renderDiagram();
  }, [chart, theme, isVisible]);

  return (
    <div className={styles.diagram}>
      <div ref={containerRef} style={{ minHeight: '150px' }} />
      {caption && <div className={styles['diagram-caption']}>{caption}</div>}
    </div>
  );
}

/**
 * ArchitectureDiagram — alias for FlowDiagram, semantically different.
 */
export function ArchitectureDiagram({ chart, caption }) {
  return <FlowDiagram chart={chart} caption={caption} />;
}
