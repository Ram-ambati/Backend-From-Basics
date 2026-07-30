import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import styles from './content.module.css';

/**
 * Quiz — multiple choice question with reveal answer.
 *
 * @param {string} question - The question text
 * @param {string[]} options - Answer options
 * @param {number} correct - Index of the correct answer (0-based)
 * @param {string} explanation - Explanation shown after answer reveal
 */
export default function Quiz({ question, options = [], correct = 0, explanation }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index) => {
    if (revealed) return;
    setSelected(index);
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  return (
    <div className={styles.quiz}>
      <div className={styles['quiz-label']}>
        <HelpCircle size={16} />
        Quiz
      </div>
      <p>{question}</p>
      <div className={styles['quiz-options']}>
        {options.map((option, i) => (
          <div
            key={i}
            className={cn(
              styles['quiz-option'],
              selected === i && !revealed && styles.selected,
              revealed && i === correct && styles.correct,
              revealed && selected === i && i !== correct && styles.incorrect
            )}
            onClick={() => handleSelect(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSelect(i)}
          >
            <span>{String.fromCharCode(65 + i)}.</span>
            <span>{option}</span>
          </div>
        ))}
      </div>
      {selected !== null && !revealed && (
        <button className={styles['quiz-reveal']} onClick={handleReveal}>
          Check Answer
        </button>
      )}
      {revealed && explanation && (
        <div className={styles['quiz-explanation']}>
          <strong>Explanation:</strong> {explanation}
        </div>
      )}
    </div>
  );
}
