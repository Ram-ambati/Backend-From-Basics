import styles from './content.module.css';

/**
 * Checklist — interactive checkbox list (visual only, not persisted).
 *
 * @param {string[]} items - Checklist items
 */
export default function Checklist({ items = [] }) {
  return (
    <ul className={styles.checklist}>
      {items.map((item, i) => (
        <li key={i}>
          <input type="checkbox" id={`check-${i}`} />
          <label htmlFor={`check-${i}`}>{item}</label>
        </li>
      ))}
    </ul>
  );
}
