// src/contexts/SocketContext.tsx
import React, { createContext, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Socket } from "socket.io-client";
import { UserConversationCreateParameters } from "../shared/dtosInterfaces/userConversationDtos";
import { MessageCreateParameters } from "../shared/dtosInterfaces/messageDtos";
import tokenStorage from "../utils/storage";

export interface MessageReceivePayload {
  senderId: string;
  fullName: string;
  content: string;
  createdAt: string;
}

interface ServerToClientEvents {
  receiveMessage: (data: MessageReceivePayload) => void;
  userOnline: (user: UserConversationCreateParameters) => void;
  userOffline: (user: UserConversationCreateParameters) => void;
  isTyping: (userId: string) => void;
}

interface ClientToServerEvents {
  sendMessage: (data: MessageCreateParameters) => void;
  userOnline: (user: UserConversationCreateParameters) => void;
  userOffline: (user: UserConversationCreateParameters) => void;
  isTyping: (data: UserConversationCreateParameters) => void;
}

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const SocketContext = createContext<TypedSocket | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocket must be used within SocketProvider");
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<TypedSocket | null>(null);

  useEffect(() => {
    const socket: TypedSocket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
      Authorization : `Bearer ${tokenStorage.load()}`
    });

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
