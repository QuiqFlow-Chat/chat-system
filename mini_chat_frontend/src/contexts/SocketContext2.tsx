import { createContext, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import Socket from "socket.io-client";
// import { io, Socket } from "socket.io-client";
import { ConversaionGetByParameter } from "../shared/dtosInterfaces/conversationDtos";
import { MessageCreateParameters } from "../shared/dtosInterfaces/messageDtos";
import { UserGetByParameter } from "../shared/dtosInterfaces/userDtos";

interface ClientToServerEvents {
  userOnline: (userId: UserGetByParameter) => void;
  userOffline: (userId: UserGetByParameter) => void;
  sendMessage: (message: MessageCreateParameters) => void;
  isTyping: (data: {
    conversationId: ConversaionGetByParameter;
    userId: UserGetByParameter;
  }) => void;
}

// الأحداث التي يرسلها السيرفر للعميل
export interface ServerToClientEvents {
  receiveMessage: (message: MessageCreateParameters) => void;
  userOnline: (userId: UserGetByParameter) => void;
  isTyping: (userId: UserGetByParameter) => void;
  userOffline: (userId: UserGetByParameter) => void;
}

const SocketContext = createContext<Socket<
  ClientToServerEvents,
  ServerToClientEvents
> | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef(io("http://localhost:3000"));

  useEffect(() => {
    const socket = socketRef.current;
    socket.connect();
    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) throw new Error("Socket not found");
  return socket;
};
