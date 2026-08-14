import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';
import styles from './SearchModal.module.css';

/**
 * Search modal — Ctrl+K overlay with fuzzy search, grouped results, keyboard navigation.
 */
export default function SearchModal({
  isOpen,
  onClose,
  query,
  setQuery,
  results,
  selectedIndex,
  onSelect,
  onKeyDown,
}) {
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Group results by chapter
  const grouped = {};
  results.forEach((result) => {
    const chapter = result.item.chapter;
    if (!grouped[chapter]) grouped[chapter] = [];
    grouped[chapter].push(result);
  });

  // Flatten for index tracking
  let flatIndex = 0;

  const highlightMatch = (text, matches) => {
    if (!matches) return text;
    const titleMatch = matches.find((m) => m.key === 'title');
    if (!titleMatch) return text;

    const indices = titleMatch.indices;
    let result = [];
    let lastEnd = 0;

    indices.forEach(([start, end]) => {
      if (start > lastEnd) {
        result.push(text.slice(lastEnd, start));
      }
      result.push(<mark key={`${start}-${end}`}>{text.slice(start, end + 1)}</mark>);
      lastEnd = end + 1;
    });

    if (lastEnd < text.length) {
      result.push(text.slice(lastEnd));
    }

    return result;
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Search documentation">
        {/* Input */}
        <div className={styles['input-wrapper']}>
          <Search size={18} />
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Search"
            role="combobox"
            aria-autocomplete="list"
            aria-controls="search-results"
            aria-expanded={query.length > 0}
          />
          <span className={styles['esc-hint']}>ESC</span>
        </div>

        {/* Results */}
        <div id="search-results" className={styles.results} role="listbox">
          {query && results.length === 0 && (
            <div className={styles.empty} role="option" aria-disabled="true" aria-selected="false">
              No results found for &quot;{query}&quot;
            </div>
          )}

          {Object.entries(grouped).map(([chapter, items]) => (
            <div key={chapter} role="group" aria-label={chapter}>
              <div className={styles['group-title']} role="presentation">{chapter}</div>
              {items.map((result) => {
                const currentFlatIndex = flatIndex++;
                return (
                  <div
                    key={`${result.item.path}-${result.item.title}`}
                    className={cn(
                      styles['result-item'],
                      currentFlatIndex === selectedIndex && styles.selected
                    )}
                    onClick={() => onSelect(result.item.path)}
                    role="option"
                    aria-selected={currentFlatIndex === selectedIndex}
                  >
                    <div className={styles['result-title']}>
                      <span className={styles['result-type']}>{result.item.type}</span>
                      {highlightMatch(result.item.title, result.matches)}
                    </div>
                    {result.item.section && (
                      <div className={styles['result-meta']}>{result.item.section}</div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer hints */}
        <div className={styles.footer}>
          <span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
