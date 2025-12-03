
import { createContext, use,  type FC, type ReactNode } from "react";
import type { UserResponse } from "../interfaces/users";
import { useUserInfo } from "../hooks/useUsers";

interface UserContextType {
  user: UserResponse | null,
  isLoading: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
})

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const { data, isLoading } = useUserInfo();

  return (
    <UserContext value={{ user: data ?? null, isLoading }}>
      {children}
    </UserContext>
  )
}

export const useUser = () => {
  const ctx = use(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside a <UserProvider>");
  }
  return ctx;
} 