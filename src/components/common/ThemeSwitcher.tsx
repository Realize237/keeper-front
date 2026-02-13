import { CiLight } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';
import { useTheme } from '../../hooks/useTheme';
import { useTranslation } from 'react-i18next';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const label =
    theme === 'dark'
      ? t('theme_switcher.switch_to_light', 'Switch to light mode')
      : t('theme_switcher.switch_to_dark', 'Switch to dark mode');

  return (
    <button
      onClick={toggleTheme}
      className="p-3 hover:bg-muted rounded-full transition-colors"
      title={label}
      aria-label={label}
    >
      {theme === 'dark' ? (
        <CiLight className="inline-block text-foreground text-2xl" />
      ) : (
        <MdDarkMode className="inline-block text-foreground text-2xl" />
      )}
    </button>
  );
}
