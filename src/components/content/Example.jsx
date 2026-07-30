import { Code2 } from 'lucide-react';
import styles from './content.module.css';

/**
 * Example — styled example block with label.
 *
 * @param {string} title - Optional example title
 */
export default function Example({ title, children }) {
  return (
    <div className={styles.example}>
      <div className={styles['example-label']}>
        <Code2 size={14} />
        {title || 'Example'}
      </div>
      {children}
    </div>
  );
}
