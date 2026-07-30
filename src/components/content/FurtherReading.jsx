import { ExternalLink, BookOpen } from 'lucide-react';
import styles from './content.module.css';

/**
 * FurtherReading — links to external resources.
 *
 * @param {{ title: string, url: string }[]} links - External links
 */
export function FurtherReading({ links = [] }) {
  return (
    <div className={styles['further-reading']}>
      <div className={styles['further-reading-title']}>
        <BookOpen size={14} style={{ display: 'inline', marginRight: '6px' }} />
        Further Reading
      </div>
      <ul>
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title} <ExternalLink size={12} style={{ display: 'inline' }} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * References — citation references list.
 *
 * @param {{ title: string, url?: string }[]} items - Reference items
 */
export function References({ items = [] }) {
  return (
    <div className={styles['further-reading']}>
      <div className={styles['further-reading-title']}>References</div>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            ) : (
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                {item.title}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
