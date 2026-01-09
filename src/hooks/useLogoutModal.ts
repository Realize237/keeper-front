import { useContext } from 'react';
import { LogoutContext, LogoutContextType } from '../context/LogoutContext';

export const useLogoutModal = (): LogoutContextType => {
  const context = useContext(LogoutContext);
  if (!context) {
    throw new Error('useLogoutModal must be used within LogoutProvider');
  }
  return context;
};
