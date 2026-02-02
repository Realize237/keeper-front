import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { LuShield, LuCookie } from 'react-icons/lu';
import { FiFileText } from 'react-icons/fi';
import { FaGlobe } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { PATHS } from '../routes/paths';

export const LegalLayout = () => {
  const { t } = useTranslation();

  const legalSections = [
    {
      id: 'privacy-policy',
      path: PATHS.LEGAL.PRIVACY.full,
      label: t('legal.sections.privacy'),
      icon: LuShield,
    },
    {
      id: 'terms-of-service',
      path: PATHS.LEGAL.TERMS.full,
      label: t('legal.sections.terms'),
      icon: FiFileText,
    },
    {
      id: 'cookies',
      path: PATHS.LEGAL.COOKIES.full,
      label: t('legal.sections.cookies'),
      icon: LuCookie,
    },
    {
      id: 'gdpr',
      path: PATHS.LEGAL.GDPR.full,
      label: t('legal.sections.gdpr'),
      icon: FaGlobe,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#990800] transition-colors font-medium mb-4"
          >
            <FaArrowLeft className="w-5 h-5" />
            {t('legal.back')}
          </Link>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {t('legal.title')}
          </h1>

          <p className="text-gray-600 mt-2">
            {t('legal.last_updated', { date: 'January 9, 2026' })}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {t('legal.sections_title')}
              </h2>

              <nav className="space-y-2">
                {legalSections.map((section) => (
                  <NavLink
                    key={section.id}
                    to={section.path}
                    className={({ isActive }) =>
                      `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                        isActive
                          ? 'bg-linear-to-r from-[#990800] to-[#C41E14] text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <section.icon className="w-5 h-5 shrink-0" />
                    <span className="font-semibold text-sm">
                      {section.label}
                    </span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
