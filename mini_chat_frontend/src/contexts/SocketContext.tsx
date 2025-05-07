// src/contexts/SocketContext.tsx
import React, { createContext, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import { tokenStorage } from "../utils/storage";

export interface MessageReceivePayload {
  senderId: string;
  fullName: string;
  content: string;
  createdAt: string;
}

// type TypedSocket =typeof Socket<ServerToClientEvents, ClientToServerEvents>;

const SocketContext = createContext<any | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocket must be used within SocketProvider");
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<any | null>(null);

  useEffect(() => {
    const socket: any = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
      Authorization : `Bearer ${tokenStorage.load()}`
    }as any);

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
