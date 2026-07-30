import styles from './content.module.css';

/**
 * Definition — styled term + definition pair.
 */
export default function Definition({ term, children }) {
  return (
    <div className={styles.definition}>
      <div className={styles['definition-term']}>{term}</div>
      <div className={styles['definition-text']}>
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
    </div>
  );
}
