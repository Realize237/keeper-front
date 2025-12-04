import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NavItems } from "../../../constants/NavItems";

const BottomNav = () => {
  const location = useLocation();
  const activeIndex = NavItems.findIndex(
    (item) => item.path === location.pathname
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-16 bg-[#2f2f2f] border-t shadow-md z-50 sm:max-w-md sm:mx-auto sm:rounded-t-xl sm:bottom-5 sm:shadow-lg sm:hidden">
      <div className="relative grid grid-cols-4 h-full">
        {NavItems.map((menu, index) => {
          const Icon = menu.icon;
          const isActive = index === activeIndex;

          return (
            <NavLink
              key={menu.label}
              to={menu.path}
              end
              className="flex flex-col items-center justify-center gap-1 relative w-full"
            >
              <motion.div
                className="flex flex-col items-center justify-center gap-1"
                initial={false}
                animate={{ color: isActive ? "#CDFF00" : "#9CA3AF" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: isActive ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Icon />
                </motion.div>

                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key={menu.label}
                      className="text-xs"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {menu.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </NavLink>
          );
        })}

        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0 h-1 bg-[#CDFF00] rounded-full"
          style={{
            width: "3rem",
            left: `calc(${activeIndex * 25}% + 12.5% - 1.5rem)`,
          }}
        />
      </div>
    </div>
  );
};

export default BottomNav;
