import { useTranslation } from 'react-i18next';
import { FaBell } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { currentYear } from '../../utils';

type FooterLink = {
  labelKey: string;
  href: string;
  isExternal?: boolean;
  Component?: typeof Link | 'a';
};

const footerSections = [
  {
    titleKey: 'footer.product',
    links: [
      { labelKey: 'footer.features', href: '#features' },
      { labelKey: 'footer.pricing', href: '/pricing', Component: Link },
      { labelKey: 'footer.download', href: '#' },
      { labelKey: 'footer.roadmap', href: '#' },
    ] as FooterLink[],
  },
  {
    titleKey: 'footer.company',
    links: [
      { labelKey: 'footer.about', href: '#' },
      { labelKey: 'footer.blog', href: '#' },
      { labelKey: 'footer.contact', href: '#contact' },
    ] as FooterLink[],
  },
  {
    titleKey: 'footer.legal',
    links: [
      {
        labelKey: 'footer.privacy',
        href: '/legal/privacy-policy',
        Component: Link,
      },
      {
        labelKey: 'footer.terms',
        href: '/legal/terms-of-service',
        Component: Link,
      },
      { labelKey: 'footer.cookies', href: '/legal/cookies', Component: Link },
      { labelKey: 'footer.gdpr', href: '/legal/gdpr', Component: Link },
    ] as FooterLink[],
  },
];

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
      />

      <div className="absolute top-0 left-1/4 w-64 h-64 bg-linear-to-br from-[#990800]/20 to-[#FF6B5B]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-linear-to-br from-[#008B82]/20 to-[#006B66]/10 rounded-full blur-3xl" />

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

          {footerSections.map((section) => (
            <div key={section.titleKey}>
              <h4 className="font-bold text-white mb-5 text-lg">
                {t(section.titleKey)}
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm font-medium">
                {section.links.map((link) => {
                  const Component = link.Component || 'a';

                  return (
                    <li key={link.labelKey}>
                      <Component
                        href={link.href}
                        to={link.href}
                        className="hover:text-white hover:translate-x-1 inline-block transition-all"
                        target={link.isExternal ? '_blank' : undefined}
                        rel={
                          link.isExternal ? 'noopener noreferrer' : undefined
                        }
                      >
                        {t(link.labelKey)}
                      </Component>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 font-medium">
              {t('footer.copyright', { year: currentYear })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
