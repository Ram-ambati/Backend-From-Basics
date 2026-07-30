import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import styles from './content.module.css';

let mermaidInitialized = false;

function initMermaid(theme) {
  mermaid.initialize({
    startOnLoad: false,
    theme: theme === 'dark' ? 'dark' : 'default',
    securityLevel: 'loose',
  });
  mermaidInitialized = true;
}

/**
 * FlowDiagram — renders a Mermaid diagram.
 *
 * @param {string} chart - Mermaid diagram definition string
 * @param {string} caption - Optional caption below the diagram
 */
export default function FlowDiagram({ chart, caption }) {
  const containerRef = useRef(null);
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    if (!mermaidInitialized) {
      initMermaid(theme);
    }

    const renderDiagram = async () => {
      if (!containerRef.current || !chart) return;
      try {
        const { svg } = await mermaid.render(idRef.current, chart);
        containerRef.current.innerHTML = svg;
      } catch (err) {
        containerRef.current.innerHTML = `<pre style="color: var(--danger)">Diagram error: ${err.message}</pre>`;
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div className={styles.diagram}>
      <div ref={containerRef} />
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
