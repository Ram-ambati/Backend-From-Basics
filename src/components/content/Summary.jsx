import { Key } from 'lucide-react';
import styles from './content.module.css';

/**
 * Summary — end-of-page summary block.
 */
export function Summary({ children }) {
  return (
    <div className={styles.summary}>
      <div className={styles['summary-title']}>Summary</div>
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  );
}

/**
 * KeyTakeaways — numbered list of key points.
 *
 * @param {string[]} items - Takeaway items
 */
export function KeyTakeaways({ items = [] }) {
  return (
    <div className={styles.takeaways}>
      <div className={styles['takeaways-title']}>
        <Key size={18} />
        Key Takeaways
      </div>
      <ol>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    </div>
  );
}
