import { useTranslation } from 'react-i18next';
import { FaBell } from 'react-icons/fa';
import { IoClose, IoMenu } from 'react-icons/io5';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

type NavItem = {
  labelKey: string;
  href: string;
  type: 'route' | 'section';
};

const navItems: NavItem[] = [
  { labelKey: 'nav.features', href: '#features', type: 'section' },
  { labelKey: 'nav.pricing', href: '/pricing', type: 'route' },
  { labelKey: 'nav.contact', href: '#contact', type: 'section' },
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.id;

          if (id === 'hero') {
            setActiveSection(null);
          } else {
            setActiveSection(`#${id}`);
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

  return (
    <div className="container mx-auto px-6 py-6">
      <nav className="bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-3xl shadow-lg shadow-gray-900/5 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative w-11 h-11 bg-linear-to-br from-[#990800] via-[#C41E14] to-[#FF6B5B] rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/30 group cursor-pointer">
            <FaBell className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#008B82] rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-[#990800] to-[#C41E14] bg-clip-text text-transparent">
            Keepay
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive =
              item.type === 'route'
                ? location.pathname === item.href
                : activeSection === item.href;

            const className = `
      px-5 py-2.5 rounded-xl font-medium transition-all
      ${
        isActive
          ? 'text-[#990800] bg-red-50'
          : 'text-gray-700 hover:text-[#990800] hover:bg-red-50'
      }
    `;

            return item.type === 'route' ? (
              <NavLink key={item.href} to={item.href} className={className}>
                {t(item.labelKey)}
              </NavLink>
            ) : (
              <a key={item.href} href={item.href} className={className}>
                {t(item.labelKey)}
              </a>
            );
          })}
          <div className="w-px h-6 bg-gray-200 mx-2"></div>

          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <motion.button
              onClick={() => changeLanguage('en')}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold"
              animate={{
                backgroundColor: isEnglish ? '#ffffff' : 'transparent',
                color: isEnglish ? '#990800' : '#4b5563',
                scale: isEnglish ? 1.05 : 1,
                boxShadow: isEnglish ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              EN
            </motion.button>

            <motion.button
              onClick={() => changeLanguage('fr')}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold"
              animate={{
                backgroundColor: isFrench ? '#ffffff' : 'transparent',
                color: isFrench ? '#990800' : '#4b5563',
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

          <button
            onClick={() => navigate('/subscriptions')}
            className="px-6 py-2.5 bg-linear-to-r from-[#990800] to-[#C41E14] text-white rounded-xl hover:shadow-xl hover:shadow-red-900/30 transition-all transform hover:-translate-y-0.5 font-semibold"
          >
            {t('nav.get_started')}
          </button>
        </div>

        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <IoMenu className="w-6 h-6 text-gray-700" />
        </button>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl px-6 pt-6 pb-10 shadow-2xl"
              variants={sheetVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold">Menu</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
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

                  return (
                    <motion.div
                      key={item.href}
                      variants={itemVariants}
                      className={`relative pl-4 text-lg font-medium ${
                        isActive ? 'text-[#990800]' : 'text-gray-800'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="mobile-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full bg-[#990800]"
                        />
                      )}

                      {item.type === 'route' ? (
                        <Link
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {t(item.labelKey)}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {t(item.labelKey)}
                        </a>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex items-center justify-center gap-1 bg-gray-100 rounded-xl p-1"
              >
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    isEnglish
                      ? 'bg-white text-[#990800] shadow-sm'
                      : 'text-gray-500'
                  }`}
                >
                  EN
                </button>

                <button
                  onClick={() => changeLanguage('fr')}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    isFrench
                      ? 'bg-white text-[#990800] shadow-sm'
                      : 'text-gray-500'
                  }`}
                >
                  FR
                </button>
              </motion.div>

              <motion.button
                variants={itemVariants}
                onClick={() => navigate('/login')}
                className="mt-8 w-full py-4 bg-linear-to-r from-[#990800] to-[#C41E14] text-white rounded-2xl font-semibold shadow-lg shadow-red-900/30"
              >
                {t('nav.get_started')}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeNavbar;
