import type { FC, ReactNode } from 'react';
import { useUser } from '../../context/UserContext';
import { Navigate, useLocation } from 'react-router-dom';
import FullScreenLoader from './FullScreenLoader';

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
