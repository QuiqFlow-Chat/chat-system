import { MessageCreateParameters } from '../shared/dtosInterfaces/messageDtos';
import { Socket } from 'socket.io';

// Data attached to each socket after authentication
export interface SocketData {
  user: {
    id: string;
    email: string;
  };
}

// Events sent from client to server
export interface ClientToServerEvents {
  userOnline: () => void;
  userOffline: () => void;
  sendMessage: (message: MessageCreateParameters) => void;
  joinConversation: (data: { conversationId: string }) => void;
  leaveConversation: (data: { conversationId: string }) => void;
  isTyping: (data: { conversationId: string }) => void;
  getOnlineUsers: (data: {}, callback: (onlineUsers: string[]) => void) => void; // <-- Added type
}

// Events sent from server to client
export interface ServerToClientEvents {
  receiveMessage: (message: {
    id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
    isRead: boolean;
  }) => void;
  userOnline: (user: { id: string }) => void;
  userOffline: (user: { id: string }) => void;
  isTyping: (user: { id: string }) => void;
  error: (message: string) => void;
}

// Typed socket with attached user data
export type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>;
