import { IMessageCreateParameters } from '@/types/dtosInterfaces/messageDtos';
import { Socket } from 'socket.io';

export interface SocketUser {
  id: string;
  email: string;
}

export interface SocketData {
  user: SocketUser;
}

export interface ConversationData {
  conversationId: string;
}

export interface TypingData {
  id: string;
  conversationId: string;
}

export interface UserData {
  id: string;
}

export interface MessageData {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  flag: boolean;
}

export interface ClientToServerEvents {
  userOnline: () => void;
  userOffline: () => void;
  sendMessage: (message: IMessageCreateParameters) => void;
  joinConversation: (data: ConversationData) => void;
  leaveConversation: (data: ConversationData) => void;
  isTyping: (data: ConversationData) => void;
  getOnlineUsers: (data: Record<string, never>, callback: (onlineUsers: string[]) => void) => void;
}

export interface ServerToClientEvents {
  receiveMessage: (message: MessageData) => void;
  userOnline: (user: UserData) => void;
  userOffline: (user: UserData) => void;
  isTyping: (user: TypingData) => void;
  error: (message: string) => void;
}

export type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
