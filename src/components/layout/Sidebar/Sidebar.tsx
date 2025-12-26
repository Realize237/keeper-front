import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { activeNavItems } from '../../../utils';
import { env } from '../../../utils/env';

interface SidebarProps {
  onToggle?: (isOpen: boolean) => void;
}

const Sidebar = ({ onToggle }: SidebarProps) => {
  const location = useLocation();
  const activeIndex = activeNavItems.findIndex(
    (item) => item.path === location.pathname
  );

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
      className="fixed top-0 left-0  border-r border-r-white/10 text-gray-400 p-4 flex flex-col "
    >
      <div className="flex  h-25   justify-between mb-8 relative">
        <div className="flex justify-between gap-2 overflow-hidden">
          <img src={env.APP_LOGO_URL} alt="Logo" className="h-8 w-8 shrink-0" />

          <AnimatePresence>
            {isOpen && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-white text-2xl font-bold whitespace-nowrap"
              >
                <span className="text-[#CDFF00]">K</span>eepay
              </motion.h1>
            )}
          </AnimatePresence>
          <button
            onClick={toggleSidebar}
            className={`text-white p-2 rounded-md hover:bg-white/10 absolute  ${!isOpen ? 'left-7 bg-white/10' : 'right-2 '}`}
          >
            {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-2 relative h-[calc(100vh-150px)] border-t border-t-white/15 pt-4 overflow-auto">
        {activeNavItems.map((menu, index) => {
          const Icon = menu.icon;
          const isActive = index === activeIndex;

          return (
            <NavLink
              key={menu.label}
              to={menu.path}
              end
              className="relative flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-white/5"
            >
              {isActive && (
                <motion.div
                  layoutId="active-bar"
                  className="absolute left-0 top-0 h-full w-0.5 bg-[#CDFF00] rounded-r-full"
                />
              )}

              <motion.div
                animate={{
                  color: isActive ? '#CDFF00' : '#9CA3AF',
                  scale: isActive ? 1.2 : 1,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="text-sm"
              >
                <Icon />
              </motion.div>

              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      color: isActive ? '#CDFF00' : '#9CA3AF',
                    }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium text-sm whitespace-nowrap"
                  >
                    {menu.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
