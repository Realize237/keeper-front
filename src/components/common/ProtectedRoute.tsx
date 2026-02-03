import type { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import FullScreenLoader from './FullScreenLoader';
import { useUser } from '../../hooks/useUsers';
import { PATHS } from '../../routes/paths';

export const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isUserReady } = useUser();
  const location = useLocation();

  if (!user && !isUserReady) return <FullScreenLoader />;

  if (!user && location.pathname !== PATHS.AUTH.LOGIN) {
    return <Navigate to={PATHS.AUTH.LOGIN} replace />;
  }

  if (!user) return <Navigate to={PATHS.AUTH.LOGIN} replace />;
  return children;
};
