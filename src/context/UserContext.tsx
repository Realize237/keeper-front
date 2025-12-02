
import { createContext, use, useEffect, useState, type FC, type ReactNode } from "react";
import type { User } from "../interfaces/users";

interface UserContextType {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
} 

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: ()=> {}
})

export const UserProvider:FC<{children: ReactNode}> = ({children})=> {
    const [user, setUser] = useState<User | null>(null);

      useEffect(() => {
    if (typeof window === "undefined") return;

    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

    return (
        <UserContext value={{user, setUser}}>
            {children}
        </UserContext>
    )
}

export const useUser =()=> {
    const ctx = use(UserContext);
     if (!ctx) {
    throw new Error("useUser must be used inside a <UserProvider>");
  }
  return ctx;
} 