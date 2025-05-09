// src/contexts/SocketContext.tsx
import React, { createContext, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";

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
    // Get token and remove any surrounding quotes
    let token = localStorage.getItem("token");
    if (token) {
      token = token.replace(/^"|"$/g, '');  // Remove quotes at start/end
    }
    
    // console.log("SocketProvider token (cleaned):", token);
    
    const socket: any = io('http://localhost:3777', {
      transports: ["websocket"],
      auth: {
        token: token,  // Use the cleaned token
      },
    } as any);

    // Add connection event handlers
    socket.on('connect', () => {
      console.log('Socket connected successfully');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
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
