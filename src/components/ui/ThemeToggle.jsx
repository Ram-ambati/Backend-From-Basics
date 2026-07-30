import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.css';

const icons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const labels = {
  light: 'Switch to dark mode',
  dark: 'Switch to system theme',
  system: 'Switch to light mode',
};

export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();
  const Icon = icons[theme];

  return (
    <button
      className={styles.toggle}
      onClick={cycleTheme}
      aria-label={labels[theme]}
      title={labels[theme]}
    >
      <Icon size={18} />
    </button>
  );
}
