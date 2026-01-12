import { createContext, useState, ReactNode } from 'react';
import { useLogoutUser } from '../hooks/useUsers';
import { getFirebaseToken } from '../config/firebase';
import { useTranslation } from 'react-i18next';
import ConfirmationDialog from '../components/dialog/ConfirmationDialog';

export interface LogoutContextType {
  requestLogout: () => void;
  isLoggingOut: boolean;
}

const LogoutContext = createContext<LogoutContextType | undefined>(undefined);

const LogoutProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { mutate: logout, isPending } = useLogoutUser();

  const requestLogout = async () => {
    setOpen(true);
  };

  const handleConfirm = async () => {
    const fcmToken = await getFirebaseToken();
    logout(fcmToken ?? '');
    setOpen(false);
  };

  return (
    <LogoutContext.Provider value={{ requestLogout, isLoggingOut: isPending }}>
      {children}

      <ConfirmationDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title={t('logout.title')}
        message={t('logout.confirmation')}
        confirmText={t('logout.confirm')}
        cancelText={t('common.cancel')}
        isDestructive={true}
      />
    </LogoutContext.Provider>
  );
};

export { LogoutProvider, LogoutContext };
