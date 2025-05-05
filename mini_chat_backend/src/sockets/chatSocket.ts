import { Server } from 'socket.io';
import { TypedSocket } from '../types/socketType';
import { UserService } from '../services/userService';
import { MessageService } from '../services/messageService';

export const registerChatHandlers = (
  io: Server,
  socket: TypedSocket,
  userService: UserService,
  messageService: MessageService
) => {
  socket.on('userOnline', (user) => {
    try {
      console.log(`🟢 User online: ${user.id}`);
      socket.broadcast.emit('userOnline', user);
    } catch (error) {
      console.error('Error in userOnline:', error);
    }
  });

  socket.on('userOffline', async (user) => {
    try {
      await userService.getUserLastActivity(user.id);
      console.log(`🔴 User offline: ${user.id}`);
      socket.broadcast.emit('userOffline', user);
    } catch (error) {
      console.error('Error in userOffline:', error);
    }
  });

  socket.on('sendMessage', async (message) => {
    try {
      console.log(
        `✉️ New message from ${message.senderId} in conversation ${message.conversationId}`
      );

      await messageService.addMessageAsync(message);
      const createdAt = new Date().toISOString();

      io.to(message.conversationId).emit('receiveMessage', {
        conversationId: message.conversationId,
        senderId: message.senderId,
        content: message.content,
        createdAt,
      });
    } catch (error) {
      console.error('Error in sendMessage:', error);
    }
  });

  socket.on('isTyping', (data) => {
    try {
      socket.to(data.conversationId.id).emit('isTyping', data.userId);
    } catch (error) {
      console.error('Error in isTyping:', error);
    }
  });
};
