import {
  Info,
  Lightbulb,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Search,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import styles from './Callout.module.css';

const variants = {
  note: { icon: Info, label: 'Note' },
  tip: { icon: Lightbulb, label: 'Tip' },
  warning: { icon: AlertTriangle, label: 'Warning' },
  important: { icon: AlertCircle, label: 'Important' },
  danger: { icon: AlertCircle, label: 'Danger' },
  'best-practice': { icon: CheckCircle2, label: 'Best Practice' },
  'common-mistake': { icon: XCircle, label: 'Common Mistake' },
  'deep-dive': { icon: Search, label: 'Deep Dive' },
};

/**
 * Callout box with icon and colored left border.
 *
 * @param {'note'|'tip'|'warning'|'important'|'danger'|'best-practice'|'common-mistake'|'deep-dive'} variant
 * @param {string} label - Optional custom label (overrides default)
 * @param {ReactNode} children - Callout content
 */
export default function Callout({ variant = 'note', label, children }) {
  const config = variants[variant] || variants.note;
  const Icon = config.icon;
  const displayLabel = label || config.label;

  return (
    <div className={cn(styles.callout, styles[variant])} role="note">
      <Icon className={styles.icon} size={20} />
      <div className={styles.content}>
        <div className={styles.label}>{displayLabel}</div>
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
    </div>
  );
}
