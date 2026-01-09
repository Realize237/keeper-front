import { createContext, type FC, type ReactNode } from 'react';
import type { UserResponse } from '../interfaces/users';
import { useUserInfo } from '../hooks/useUsers';

export interface UserContextType {
  user: UserResponse | null;
  isLoading: boolean;
  isUserReady: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
  isUserReady: false,
});

const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data, isLoading, isFetching } = useUserInfo();
  const isUserReady = !isLoading && !isFetching;

  return (
    <UserContext value={{ user: data ?? null, isLoading, isUserReady }}>
      {children}
    </UserContext>
  );
};

export { UserProvider, UserContext };
