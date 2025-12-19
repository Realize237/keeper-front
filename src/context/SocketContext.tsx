import React, { createContext, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { env } from "../utils/env";
import { SOCKET_OPTIONS } from "../constants";
import { useUser } from "./UserContext";

type SocketContextType = {
  socket: Socket | null;
  connected: boolean;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const { user, isUserReady } = useUser();

  const socketInstance = useMemo(
    () =>
      io(
        env.SOCKET_URL,
        user && isUserReady
          ? { ...SOCKET_OPTIONS, auth: { userId: user.id } }
          : SOCKET_OPTIONS
      ),
    [user, isUserReady]
  );

  useEffect(() => {
    setSocket(socketInstance);
    socketInstance.on("connect", () => {
      setConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [socketInstance]);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
