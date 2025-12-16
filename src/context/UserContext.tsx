import { createContext, use, type FC, type ReactNode } from 'react';
import type { UserResponse } from '../interfaces/users';
import { useUserInfo } from '../hooks/useUsers';

interface UserContextType {
  user: UserResponse | null;
  isLoading: boolean;
  isUserReady: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
  isUserReady: false,
});

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data, isLoading, isFetching } = useUserInfo();

  const isUserReady = !isLoading && !isFetching;

  return (
    <UserContext value={{ user: data ?? null, isLoading, isUserReady }}>
      {children}
    </UserContext>
  );
};

export const useUser = () => {
  const ctx = use(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used inside a <UserProvider>');
  }
  return ctx;
};
