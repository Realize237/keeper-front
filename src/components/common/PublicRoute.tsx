import type { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import FullScreenLoader from './FullScreenLoader';
import { useUser } from '../../hooks/useUsers';

export const PublicRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isUserReady } = useUser();

  if (!isUserReady) {
    return <FullScreenLoader />;
  }

  if (user) {
    return <Navigate to="/subscriptions" replace />;
  }

  return <>{children}</>;
};
