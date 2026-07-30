import { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-go';
import { cn } from '../../utils/cn';
import styles from './CodeBlock.module.css';

/**
 * Syntax-highlighted code block with copy button and language label.
 *
 * @param {string} children - The code string
 * @param {string} language - Language for syntax highlighting (default: 'javascript')
 * @param {boolean} showLineNumbers - Whether to show line numbers
 */
export default function CodeBlock({ children, language = 'javascript', showLineNumbers = false }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = children;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles['code-block']}>
      <div className={styles['code-header']}>
        <span className={styles['language-label']}>{language}</span>
        <button
          className={cn(styles['copy-button'], copied && styles.copied)}
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className={styles['code-content']}>
        <pre className={showLineNumbers ? styles['line-numbers'] : ''}>
          <code ref={codeRef} className={`language-${language}`}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}
