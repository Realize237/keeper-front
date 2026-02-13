import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export default function AuthHeader() {
  const { t } = useTranslation();
  return (
    <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
      <Link
        to="/"
        aria-label={t('common.home')}
        className="
    flex items-center gap-2 text-sm text-foreground
    hover:text-muted-foreground transition-colors
  "
      >
        <FaHome size={16} />
        <span className="hidden sm:inline capitalize">{t('common.home')}</span>
      </Link>
      <LanguageSwitcher />
    </div>
  );
}
