import { Link as LinkIcon } from 'lucide-react';
import styles from './content.module.css';

/**
 * ConceptBlock — wraps each concept with an anchor-linked heading.
 */
export default function ConceptBlock({ id, title, children }) {
  const handleCopyLink = (e) => {
    e.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    window.history.pushState(null, '', `#${id}`);
  };

  return (
    <section id={id} className={styles['concept-block']}>
      <h2
        id={id}
        className={styles['concept-heading']}
        onClick={handleCopyLink}
        style={{ cursor: 'pointer' }}
      >
        {title}
        <LinkIcon className={styles['anchor-icon']} size={16} />
      </h2>
      {children}
    </section>
  );
}
