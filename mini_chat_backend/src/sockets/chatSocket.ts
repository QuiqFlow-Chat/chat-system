import { Server } from 'socket.io';
import { AppError } from '@/middlewares/errorMiddlewares';
import { MESSAGES } from '@/constants/messages';
import { IMessageCreateParameters } from '@/types/dtosInterfaces/messageDtos';
import { ONLINE_USERS } from '@/config/socket';
import { MessageService } from '@/services/messageService';
import { TypedSocket } from '@/types/socketType';
import { UserService } from '@/services/userService';

interface RegisterChatHandlersParams {
  io: Server;
  socket: TypedSocket;
  userService: UserService;
  messageService: MessageService;

}

interface TypingData {
  id: string;
  conversationId: string;
}

interface MessagePayload {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  flag: boolean;
}

export const registerChatHandlers = ({
  io,
  socket,
  messageService
}: RegisterChatHandlersParams) => {
  const authenticatedUser = socket.data.user;

  socket.on('userOnline', () => {
    try {
      socket.broadcast.emit('userOnline', { id: authenticatedUser.id });
    } catch (error) {
      socket.emit('error', error instanceof Error ? error.message : MESSAGES.SOCKET.ERROR.ONLINE_STATUS_FAILED);
    }
  });

  socket.on('userOffline', () => {
    try {
      socket.broadcast.emit('userOffline', { id: authenticatedUser.id });
    } catch (error) {
      socket.emit('error', error instanceof Error ? error.message : MESSAGES.SOCKET.ERROR.OFFLINE_STATUS_FAILED);
    }
  });

  socket.on('joinConversation', ({ conversationId }) => {
    try {
      socket.join(conversationId);
    } catch (error) {
      socket.emit('error', error instanceof Error ? error.message : MESSAGES.SOCKET.ERROR.JOIN_CONVERSATION_FAILED);
    }
  });

  socket.on('leaveConversation', ({ conversationId }) => {
    try {
      socket.leave(conversationId);
    } catch (error) {
      socket.emit('error', error instanceof Error ? error.message : MESSAGES.SOCKET.ERROR.LEAVE_CONVERSATION_FAILED);
    }
  });

  socket.on('sendMessage', async (message: IMessageCreateParameters) => {
    try {
      const isSenderAuthorized = message.senderId === authenticatedUser.id;
      if (!isSenderAuthorized) {
        throw AppError.unauthorized(MESSAGES.MESSAGE.CREATE.UNAUTHORIZED);
      }

      const result: any = await messageService.sendMessage(message);
      const newMessage = result.message;
      const flag = result.flag;
      const conversationId = newMessage.conversationId;
      
      const isUserInRoom = socket.rooms.has(conversationId);
      if (!isUserInRoom) {
        socket.join(conversationId);
      }

      const messagePayload: MessagePayload = {
        id: newMessage.id,
        conversationId,
        senderId: newMessage.senderId,
        receiverId: newMessage.receiverId,
        content: newMessage.content,
        createdAt: newMessage.createdAt.toISOString(),
        isRead: newMessage.isRead,
        flag: flag,
      };

      io.to(conversationId).emit('receiveMessage', messagePayload);
      
      const receiverSocketId = ONLINE_USERS.get(newMessage.receiverId);
      const conversationRoom = io.sockets.adapter.rooms.get(conversationId);
      const isReceiverInRoom = receiverSocketId ? conversationRoom?.has(receiverSocketId) : false;

      const isReceiverOnlineButNotInRoom = receiverSocketId && !isReceiverInRoom;
      if (isReceiverOnlineButNotInRoom) {
        io.to(receiverSocketId).emit('receiveMessage', messagePayload);
      }
    } catch (error) {
      if (error instanceof AppError) {
        socket.emit('error', error.message);
      } else {
        socket.emit('error', error instanceof Error ? error.message : MESSAGES.SOCKET.ERROR.SEND_MESSAGE_FAILED);
      }
    }
  });

  socket.on('isTyping', ({ conversationId }) => {
    try {
      const hasConversationId = Boolean(conversationId);
      if (!hasConversationId) {
        throw new Error(MESSAGES.SOCKET.ERROR.MISSING_CONVERSATION_ID);
      }

      const isUserInRoom = socket.rooms.has(conversationId);
      if (!isUserInRoom) {
        socket.join(conversationId);
      }
      
      const typingData: TypingData = { 
        id: authenticatedUser.id,
        conversationId: conversationId 
      };
      
      socket.to(conversationId).emit('isTyping', typingData);
    } catch (error) {
      socket.emit('error', error instanceof Error ? error.message : MESSAGES.SOCKET.ERROR.TYPING_INDICATOR_FAILED);
    }
  });

  socket.on('getOnlineUsers', (_, callback) => {
    const isCallbackFunction = typeof callback === 'function';
    if (isCallbackFunction) {
      callback(Array.from(ONLINE_USERS.keys()));
    }
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('userOffline', { id: authenticatedUser.id });
  });
};
