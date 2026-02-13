import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { activeNavItems } from '../../../utils';
import { useTranslation } from 'react-i18next';

const BottomNav = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const length = activeNavItems.length;
  const activeIndex = activeNavItems.findIndex((item) => {
    if (item.path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(item.path);
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-16 bg-background  shadow-md z-50 sm:max-w-md sm:mx-auto sm:rounded-t-xl sm:bottom-5 sm:shadow-lg sm:hidden">
      <div
        className="relative grid h-full"
        style={{ gridTemplateColumns: `repeat(${length}, 1fr)` }}
      >
        {activeNavItems.map((menu, index) => {
          const Icon = menu.icon;
          const isActive = index === activeIndex;

          return (
            <NavLink
              key={t(menu.labelKey)}
              to={menu.path}
              end
              className="flex flex-col items-center justify-center gap-1 relative w-full"
            >
              <motion.div
                className="flex flex-col items-center justify-center gap-1"
                initial={false}
                animate={{
                  color: isActive
                    ? 'var(--color-primary)'
                    : '(--color-muted-foreground)',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: isActive ? 1.2 : 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <Icon />
                </motion.div>

                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key={t(menu.labelKey)}
                      className="text-xs"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {t(menu.labelKey)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </NavLink>
          );
        })}

        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0 h-1 bg-primary rounded-full"
          style={{
            width: `${100 / length}%`,
            left: `${(100 / length) * activeIndex}%`,
          }}
        />
      </div>
    </div>
  );
};

export default BottomNav;
