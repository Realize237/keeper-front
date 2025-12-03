import type { FC, ReactNode } from "react";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";

export const ProtectedRoute:FC<{children: ReactNode}> = ({children})=> {
    const {user, isLoading} = useUser()

  if (isLoading) return <FullScreenLoader/>

  if (!user) return <Navigate to="/login" replace />;
    return children
}