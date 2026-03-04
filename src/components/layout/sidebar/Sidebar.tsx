import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { activeNavItems } from '../../../utils';
import { useTranslation } from 'react-i18next';
import { FaCrown } from 'react-icons/fa6';
import { LOGOS } from '../../../assets';
import { PATHS } from '../../../routes/paths';
import { useThemeIcon } from '../../../hooks/useThemeIcon';

interface SidebarProps {
  onToggle?: (isOpen: boolean) => void;
}

const Sidebar = ({ onToggle }: SidebarProps) => {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const activeIndex = activeNavItems.findIndex((item) => {
    if (item.path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(item.path);
  });

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  useEffect(() => {
    onToggle?.(isOpen);
  }, [onToggle, isOpen]);

  return (
    <motion.aside
      animate={{ width: isOpen ? 240 : 60 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 h-[calc(100vh-0.1rem)] border-r border-r-border text-foreground p-2 flex flex-col"
    >
      <div className="flex  h-25   justify-between mb-8 relative">
        <div className="flex justify-between gap-2 overflow-hidden">
          <img
            onClick={() => navigate(PATHS.HOME)}
            src={LOGOS.KEEPAYRED}
            alt="Logo"
            className="h-8 w-8 shrink-0 cursor-pointer"
          />

          <AnimatePresence>
            {isOpen && (
              <motion.h1
                onClick={() => navigate(PATHS.HOME)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-foreground text-2xl cursor-pointer whitespace-nowrap"
              >
                Keepay
              </motion.h1>
            )}
          </AnimatePresence>
          <button
            onClick={toggleSidebar}
            className={`text-foreground p-2 rounded-md hover:bg-muted absolute  ${!isOpen ? 'left-10 bg-muted' : 'right-2 '}`}
          >
            {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-2 relative flex-1 border-t border-t-border pt-4 overflow-auto">
        {activeNavItems.map((menu, index) => {
          const isActive = index === activeIndex;

          return (
            <SidebarNavItem
              key={t(menu.labelKey)}
              menu={menu}
              isActive={isActive}
              isOpen={isOpen}
              t={t}
            />
          );
        })}
      </nav>

      {isOpen ? (
        <div className="mt-auto rounded-2xl border border-border bg-surface p-5 shadow-sm space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-foreground font-medium">
              {t('trial.ends_in', { days: 14 })}
            </p>
            <p className="text-xs text-muted-foreground">
              {t('trial.upgrade_message')}
            </p>
          </div>

          <button
            disabled
            className="w-full flex text-sm items-center justify-center gap-2 px-3 py-2 rounded-xl
               bg-primary-gradient text-primary-foreground font-medium
               disabled:opacity-60 disabled:cursor-not-allowed!
               shadow-md shadow-primary/20"
          >
            <FaCrown className="text-sm" />
            {t('sidebar.upgrade_plan')}
          </button>
        </div>
      ) : (
        <div className="mt-auto flex justify-center">
          <button
            disabled
            className="w-10 h-10 flex items-center justify-center rounded-xl
               bg-primary-gradient text-primary-foreground font-medium
               disabled:opacity-60 disabled:cursor-not-allowed!
               
               shadow-md shadow-primary/20"
          >
            <FaCrown className="text-sm" />
          </button>
        </div>
      )}
    </motion.aside>
  );
};

interface SidebarNavItemProps {
  menu: {
    themeIcon: 'profile' | 'subscriptions';
    path: string;
    labelKey: string;
  };
  isActive: boolean;
  isOpen: boolean;
  t: (key: string) => string;
}

const SidebarNavItem = ({ menu, isActive, isOpen, t }: SidebarNavItemProps) => {
  const themeIcon = useThemeIcon(
    menu.themeIcon,
    isActive ? 'active' : 'default'
  );

  return (
    <NavLink
      to={menu.path}
      end
      className="relative flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-muted"
    >
      {isActive && (
        <motion.div
          layoutId="active-bar"
          className="absolute left-0 top-0 h-full w-0.5 bg-primary rounded-r-full"
        />
      )}

      <motion.div
        animate={{
          scale: isActive ? 1.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="text-sm"
        title={t(menu.labelKey)}
      >
        <img src={themeIcon} alt={t(menu.labelKey)} className="w-5 h-5" />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: 1,
              x: 0,
              color: isActive
                ? 'var(--color-primary)'
                : 'var(--muted-foreground)',
            }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="font-medium text-sm whitespace-nowrap"
          >
            {t(menu.labelKey)}
          </motion.span>
        )}
      </AnimatePresence>
    </NavLink>
  );
};

export default Sidebar;
