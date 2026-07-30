import styles from './content.module.css';

/**
 * ProsConsList — two-column pros and cons.
 *
 * @param {string[]} pros - List of advantages
 * @param {string[]} cons - List of disadvantages
 */
export default function ProsConsList({ pros = [], cons = [] }) {
  return (
    <div className={styles['pros-cons']}>
      <div className={styles['pros-col']}>
        <div className={styles['pros-title']}>✅ Pros</div>
        <ul>
          {pros.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles['cons-col']}>
        <div className={styles['cons-title']}>❌ Cons</div>
        <ul>
          {cons.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
