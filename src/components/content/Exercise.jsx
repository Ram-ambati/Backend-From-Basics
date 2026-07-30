import { useState } from 'react';
import { PenTool } from 'lucide-react';
import styles from './content.module.css';

/**
 * Exercise — practice exercise with expandable solution.
 */
export default function Exercise({ title, children, solution }) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className={styles.exercise}>
      <div className={styles['exercise-label']}>
        <PenTool size={14} />
        {title || 'Exercise'}
      </div>
      {children}
      {solution && (
        <>
          <button
            className={styles['exercise-toggle']}
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
          {showSolution && (
            <div className={styles['exercise-solution']}>
              {solution}
            </div>
          )}
        </>
      )}
    </div>
  );
}
