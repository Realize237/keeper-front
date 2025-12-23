import { createContext, useContext, useState, ReactNode } from 'react';
import { useLogoutUser } from '../hooks/useUsers';
import { getFirebaseToken } from '../config/firebase';
import Modal from '../components/ui/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import { useDeviceType } from '../hooks/useDeviceType';
import BottomSheet from '../components/ui/BottomSheet';

interface LogoutContextType {
  requestLogout: () => void;
  isLoggingOut: boolean;
}

const LogoutContext = createContext<LogoutContextType | undefined>(undefined);

export const LogoutProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { mutate: logout, isPending } = useLogoutUser();
  const { isMobile } = useDeviceType();

  const requestLogout = async () => {
    setOpen(true);
  };

  const handleConfirm = async () => {
    const fcmToken = await getFirebaseToken();
    logout(fcmToken || '');
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  return (
    <LogoutContext.Provider value={{ requestLogout, isLoggingOut: isPending }}>
      {children}

      <AnimatePresence>
        <Modal isOpen={open && !isMobile} onClose={handleCancel}>
          <motion.div>
            <div className="flex font-medium justify-center items-center border-b border-white pb-4 pt-8">
              Logout
            </div>
            <div className="flex flex-col space-y-8">
              <p className="text-center mt-8">
                Are you sure you want to log out?
              </p>

              <div className="flex justify-center gap-10">
                <motion.button
                  onClick={handleCancel}
                  className="rounded-full cursor-pointer border w-32 p-4 border-white"
                  whileHover={{ scale: 1.05, backgroundColor: '#ffffff10' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  Cancel
                </motion.button>

                <motion.button
                  onClick={handleConfirm}
                  className="rounded-full  cursor-pointer w-32 p-4 text-white bg-red-500"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 8px 20px rgba(255, 0, 0, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  Yes Logout
                </motion.button>
              </div>
            </div>
          </motion.div>
        </Modal>
      </AnimatePresence>

      <BottomSheet isOpen={open && isMobile} onClose={handleCancel}>
        <motion.div>
          <div className="flex font-medium justify-center items-center border-b border-white pb-4 pt-8">
            Logout
          </div>
          <div className="flex flex-col space-y-8">
            <p className="text-center mt-8">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-center gap-10">
              <motion.button
                onClick={handleCancel}
                className="rounded-full cursor-pointer border w-32 p-4 border-white"
                whileHover={{ scale: 1.05, backgroundColor: '#ffffff10' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                Cancel
              </motion.button>

              <motion.button
                onClick={handleConfirm}
                className="rounded-full  cursor-pointer w-32 p-4 text-white bg-red-500"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 8px 20px rgba(255, 0, 0, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                Yes Logout
              </motion.button>
            </div>
          </div>
        </motion.div>
      </BottomSheet>
    </LogoutContext.Provider>
  );
};

export const useLogoutModal = () => {
  const context = useContext(LogoutContext);
  if (!context)
    throw new Error('useLogoutModal must be used within LogoutProvider');
  return context;
};
