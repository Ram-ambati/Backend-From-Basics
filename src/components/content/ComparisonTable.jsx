import styles from './content.module.css';

/**
 * ComparisonTable — side-by-side comparison with styled table.
 *
 * @param {string[]} headers - Column headers
 * @param {string[][]} rows - Array of row arrays
 */
export default function ComparisonTable({ headers, rows }) {
  return (
    <div className={styles['comparison-wrapper']}>
      <table>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
