import { useTranslation } from 'react-i18next';
import { IoClose, IoMenu } from 'react-icons/io5';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  Variants,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { homeAnchor } from '../../utils';
import { PATHS } from '../../routes/paths';
import ThemeSwitcher from '../common/ThemeSwitcher';
import { LOGOS } from '../../assets';

type NavItem = {
  labelKey: string;
  href: string;
  type: 'route' | 'section';
};

const navItems: NavItem[] = [
  { labelKey: 'nav.features', href: 'features', type: 'section' },
  { labelKey: 'nav.pricing', href: PATHS.PRICING, type: 'route' },
  { labelKey: 'nav.countries', href: PATHS.SUPPORTED_COUNTRIES, type: 'route' },
  { labelKey: 'nav.contact', href: 'contact', type: 'section' },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const sheetVariants: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 28 },
  },
};

const HomeNavbar = () => {
  const { t } = useTranslation();
  const { changeLanguage, isFrench, isEnglish } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.id;

          if (id === 'hero') {
            setActiveSection(null);
            history.replaceState(null, '', '/');
          }
          if (id !== 'hero') {
            const hash = `#${id}`;
            setActiveSection(hash);
            history.replaceState(null, '', hash);
          }
        });
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0.01,
      }
    );

    const sections = ['hero', 'features', 'contact'];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 80) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -120 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container bg-background mx-auto px-6 py-6">
        <nav className="bg-background/80 backdrop-blur-xl border border-border rounded-3xl shadow-lg  px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-11 h-11 bg-primary-gradient text-foreground rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/30 group cursor-pointer">
              <img
                src={LOGOS.KEEPAYWHITE}
                alt="Keepay Logo"
                className="w-5 h-5"
              />
            </div>
            <span className="text-2xl   text-primary">Keepay</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive =
                item.type === 'route'
                  ? location.pathname === item.href
                  : activeSection === `#${item.href}`;

              const isPricing = item.href === PATHS.PRICING;

              const className = `
      px-5 py-2.5 rounded-xl font-medium transition-all relative
      ${
        isActive
          ? 'text-primary bg-muted'
          : 'text-foreground hover:text-primary hover:bg-muted'
      }
      ${isPricing ? 'cursor-not-allowed opacity-60' : ''}
    `;

              return item.type === 'route' ? (
                isPricing ? (
                  <div key={item.href} className={className}>
                    {t(item.labelKey)}
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-primary-gradient text-primary-foreground text-[9px] font-bold tracking-wider uppercase shadow-md shadow-primary/20">
                      {t('supported_countries.soon')}
                    </span>
                  </div>
                ) : (
                  <NavLink key={item.href} to={item.href} className={className}>
                    {t(item.labelKey)}
                  </NavLink>
                )
              ) : (
                <Link
                  key={item.href}
                  to={homeAnchor(item.href)}
                  className={className}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
            <div className="w-px h-6 bg-border mx-2"></div>

            <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
              <motion.button
                onClick={() => changeLanguage('en')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  isEnglish
                    ? 'bg-background text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                animate={{
                  scale: isEnglish ? 1.05 : 1,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                EN
              </motion.button>

              <motion.button
                onClick={() => changeLanguage('fr')}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  isFrench
                    ? 'bg-background text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                animate={{
                  scale: isFrench ? 1.05 : 1,
                  boxShadow: isFrench ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                FR
              </motion.button>
            </div>

            <ThemeSwitcher />

            <button
              onClick={() => navigate(PATHS.APP.SUBSCRIPTIONS)}
              className="px-6 py-2.5 bg-primary-gradient text-primary-foreground rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5 font-semibold"
            >
              {t('nav.get_started')}
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <IoMenu className="w-6 h-6 text-foreground" />
          </button>
        </nav>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-surface/40 backdrop-blur-sm"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl px-6 pt-6 pb-10 shadow-2xl"
                variants={sheetVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex text-foreground items-center justify-between mb-6">
                  <span className="text-lg font-semibold">Menu</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-muted-foreground"
                  >
                    <IoClose className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {navItems.map((item) => {
                    const isActive =
                      item.type === 'route'
                        ? location.pathname === item.href
                        : activeSection === item.href;

                    const isPricing = item.href === PATHS.PRICING;

                    return (
                      <motion.div
                        key={item.href}
                        variants={itemVariants}
                        className={`relative pl-4 text-lg font-medium ${
                          isActive ? 'text-primary' : 'text-foreground'
                        } ${isPricing ? 'opacity-60 cursor-not-allowed' : ''}`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="mobile-active"
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full bg-primary"
                          />
                        )}

                        {item.type === 'route' ? (
                          isPricing ? (
                            <div className="flex items-center gap-2">
                              {t(item.labelKey)}
                              <span className="px-2 py-0.5 rounded-full bg-primary-gradient text-primary-foreground text-[10px] font-bold tracking-wider uppercase shadow-md shadow-primary/20">
                                {t('supported_countries.soon')}
                              </span>
                            </div>
                          ) : (
                            <Link
                              to={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-2"
                            >
                              {t(item.labelKey)}
                            </Link>
                          )
                        ) : (
                          <Link
                            to={homeAnchor(item.href)}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {t(item.labelKey)}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div
                  variants={itemVariants}
                  className="mt-8 flex items-center justify-center gap-3"
                >
                  <div className="flex items-center gap-1 bg-muted rounded-xl p-1 flex-1">
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`px-4 py-2 rounded-lg font-semibold flex-1 ${
                        isEnglish
                          ? 'bg-background text-primary shadow-sm'
                          : 'text-muted-foreground'
                      }`}
                    >
                      EN
                    </button>

                    <button
                      onClick={() => changeLanguage('fr')}
                      className={`px-4 py-2 rounded-lg font-semibold flex-1 ${
                        isFrench
                          ? 'bg-background text-primary shadow-sm'
                          : 'text-muted-foreground'
                      }`}
                    >
                      FR
                    </button>
                  </div>

                  <ThemeSwitcher />
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  onClick={() => navigate(PATHS.APP.SUBSCRIPTIONS)}
                  className="mt-8 w-full py-4 bg-primary-gradient text-primary-foreground  rounded-2xl font-semibold shadow-lg shadow-red-900/30"
                >
                  {t('nav.get_started')}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HomeNavbar;
