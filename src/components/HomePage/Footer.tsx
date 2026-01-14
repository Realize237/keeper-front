import { useTranslation } from 'react-i18next';
import { FaBell } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { currentYear } from '../../utils';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-16 border-t border-gray-700 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="absolute top-0 left-1/4 w-64 h-64 bg-linear-to-br from-[#990800]/20 to-[#FF6B5B]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-linear-to-br from-[#008B82]/20 to-[#006B66]/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-linear-to-br from-[#990800] to-[#C41E14] rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/30">
                <FaBell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Keepay
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-5 text-lg">
              {t('footer.product')}
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm font-medium">
              <li>
                <a
                  href="#features"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {t('footer.features')}
                </a>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {t('footer.pricing')}
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {t('footer.download')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {t('footer.roadmap')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-5 text-lg">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm font-medium">
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {t('footer.blog')}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-5 text-lg">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm font-medium">
              <li>
                <Link
                  to="/legal"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {t('footer.cookies')}
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {t('footer.gdpr')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 font-medium">
              {t('footer.copyright', {
                year: currentYear,
              })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
