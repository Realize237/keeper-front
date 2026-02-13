import { NavLink, Outlet } from 'react-router-dom';
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
    <div className="min-h-screen bg-background">
      <div className=" border-b border-border">
        <div className="container text-center mx-auto px-6 py-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
            {t('legal.title')}
          </h1>

          <p className="text-muted-foreground mt-2">
            {t('legal.last_updated', { date: 'January 9, 2026' })}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="rounded-3xl border-2 border-border p-6 sticky top-6">
              <h2 className="text-lg font-bold text-foreground mb-4">
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
                          ? 'bg-primary-gradient text-primary-foreground shadow-lg'
                          : 'text-foreground hover:bg-muted'
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
            <div className="rounded-3xl border-2 border-border text-foreground p-8 md:p-12">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
