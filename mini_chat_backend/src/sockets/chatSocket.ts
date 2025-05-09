import { Server } from 'socket.io';
import { TypedSocket } from '../types/socketType';
import { UserService } from '../services/userService';
import { MessageService } from '../services/messageService';
import { MessageCreateParameters } from '../shared/dtosInterfaces/messageDtos';
import { AppError } from '../middlewares/errorMiddlewares';
import { onlineUsers } from '../config/socket';

export const registerChatHandlers = (
  io: Server,
  socket: TypedSocket,
  userService: UserService,
  messageService: MessageService
) => {
  const authenticatedUser = socket.data.user;

  socket.on('userOnline', async () => {
    try {
      console.log('🟢User online:', authenticatedUser.id);
      socket.broadcast.emit('userOnline', { id: authenticatedUser.id });
    } catch (error) {
      socket.emit('error', error instanceof Error ? error.message : 'Failed to set user online status');
    }
  });

  socket.on('userOffline', async () => {
    try {
      console.log('🔴User offline:', authenticatedUser.id);
      socket.broadcast.emit('userOffline', { id: authenticatedUser.id });
    } catch (error) {
      socket.emit('error', error instanceof Error ? error.message : 'Failed to set user offline status');
    }
  });

  socket.on('joinConversation', async (data) => {
    try {
      const { conversationId } = data;
      socket.join(conversationId);
      console.log('User joined conversation:', conversationId);
    } catch (error) {
      socket.emit('error', error instanceof Error ? error.message : 'Failed to join conversation');
    }
  });

  socket.on('sendMessage', async (message: MessageCreateParameters) => {
    try {
      console.log('Sending message:', message);
      // Only allow sending as self
      if (message.senderId !== authenticatedUser.id) {
       // console.error('Unauthorized attempt to send message as another user:', message.senderId);
        //console.error('Authenticated user:', authenticatedUser.id);
        throw AppError.unauthorized('Unauthorized: Cannot send messages as another user');
      }

      // Use service logic (handles conversation creation if needed)
      console.log('Sending message:', message);
      const newMessage = await messageService.sendMessage(message);

      // Join the conversation room if not already joined
      if (!socket.rooms.has(newMessage.conversationId)) {
        socket.join(newMessage.conversationId);
      }

      // Broadcast to both users in the conversation
      io.to(newMessage.conversationId).emit('receiveMessage', {
        id: newMessage.id,
        conversationId: newMessage.conversationId,
        senderId: newMessage.senderId,
        receiverId: newMessage.receiverId,
        content: newMessage.content,
        createdAt: newMessage.createdAt.toISOString(),
        isRead: newMessage.isRead,
      });
    } catch (error) {
      if (error instanceof AppError) {
        socket.emit('error', error.message);
      } else {
        socket.emit('error', error instanceof Error ? error.message : 'Failed to send message');
      }
    }
  });

  socket.on('isTyping', async (data) => {
    try {
      const { conversationId } = data;
      // Notify all in the conversation except sender
      socket.to(conversationId).emit('isTyping', { id: authenticatedUser.id });
      console.log('User is typing in conversation:', conversationId);
    } catch (error) {
      socket.emit('error', error instanceof Error ? error.message : 'Failed to send typing indicator');
    }
  });

  // Handler for online users query
  socket.on('getOnlineUsers', (data, callback) => {
    if (typeof callback === "function") {
      callback(Array.from(onlineUsers));
    }
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('userOffline', { id: authenticatedUser.id });
  });
};