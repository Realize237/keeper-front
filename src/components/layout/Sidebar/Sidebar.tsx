import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { activeNavItems } from '../../../utils';

const Sidebar = () => {
  const location = useLocation();
  const activeIndex = activeNavItems.findIndex(
    (item) => item.path === location.pathname
  );

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: -220 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-screen rounded-2xl w-64 bg-[#2f2f2f] text-gray-400 p-6 flex flex-col z-40"
      >
        <h1
          className={`text-white text-2xl font-bold mb-8 ${
            isOpen ? '' : 'hidden'
          }`}
        >
          Menu
        </h1>

        <nav className="flex flex-col gap-2 relative">
          {activeNavItems.map((menu, index) => {
            const Icon = menu.icon;
            const isActive = index === activeIndex;

            return (
              <NavLink
                key={menu.label}
                to={menu.path}
                end
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative"
              >
                <motion.div
                  className="flex items-center gap-3"
                  initial={false}
                  animate={{ color: isActive ? '#CDFF00' : '#9CA3AF' }}
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
                    {isOpen && (
                      <motion.span
                        key={menu.label}
                        className="font-medium"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {menu.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                {isActive && isOpen && (
                  <motion.div
                    layoutId="active-bar"
                    className="absolute left-0 top-0 h-full w-1 bg-[#CDFF00] rounded-r-full"
                  />
                )}
              </NavLink>
            );
          })}
        </nav>
      </motion.div>

      {/* Toggle Arrow */}
      <button
        onClick={toggleSidebar}
        className="fixed top-1/2 left-0 z-50 p-2 cursor-pointer bg-purple-500 text-white rounded-r-md flex items-center justify-center"
      >
        {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
      </button>
    </>
  );
};

export default Sidebar;
