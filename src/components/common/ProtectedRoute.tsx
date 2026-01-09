import type { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import FullScreenLoader from './FullScreenLoader';
import { useUser } from '../../hooks/useUsers';

export const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isUserReady } = useUser();
  const location = useLocation();

  if (!user && !isUserReady) return <FullScreenLoader />;

  if (!user && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
};
