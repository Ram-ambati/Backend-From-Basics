import { useState } from 'react';
import { Target, Globe, AlertTriangle } from 'lucide-react';
import styles from './content.module.css';

/**
 * InterviewQuestion — styled interview question with expandable model answer.
 */
export function InterviewQuestion({ question, children }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className={styles['interview-question']}>
      <div className={styles['interview-label']}>
        <Target size={16} />
        Interview Question
      </div>
      <p><strong>{question}</strong></p>
      <button
        className={styles['exercise-toggle']}
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer ? 'Hide Answer' : 'Show Model Answer'}
      </button>
      {showAnswer && (
        <div className={styles['exercise-solution']}>
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * RealWorld — real-world usage example callout.
 */
export function RealWorld({ title, children }) {
  return (
    <div className={styles['real-world']}>
      <div className={styles['real-world-label']}>
        <Globe size={16} />
        {title || 'Real World'}
      </div>
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  );
}

/**
 * CommonPitfall — common pitfall warning block.
 */
export function CommonPitfall({ children }) {
  return (
    <div className={styles['common-pitfall']}>
      <div className={styles['common-pitfall-label']}>
        <AlertTriangle size={16} />
        Common Pitfall
      </div>
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  );
}
