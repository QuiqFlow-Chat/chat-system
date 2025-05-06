import { ConversaionGetByParameter } from '../shared/dtosInterfaces/conversationDtos';
import { MessageCreateParameters } from '../shared/dtosInterfaces/messageDtos';
import { UserGetByParameter } from '../shared/dtosInterfaces/userDtos';
import { Socket } from 'socket.io';

export interface ClientToServerEvents {
  userOnline: (userId: UserGetByParameter) => void;
  userOffline: (userId: UserGetByParameter) => void;
  sendMessage: (message: MessageCreateParameters) => void;
  joinConversation: (data: { conversationId: string }) => void;
  isTyping: (data: {
    conversationId: ConversaionGetByParameter;
    userId: UserGetByParameter;
  }) => void;
}

export interface ServerToClientEvents {
  receiveMessage: (message: MessageCreateParameters) => void;
  userOnline: (userId: UserGetByParameter) => void;
  isTyping: (userId: UserGetByParameter) => void;
  userOffline: (userId: UserGetByParameter) => void;
  error: (message: string) => void;
}

export type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
