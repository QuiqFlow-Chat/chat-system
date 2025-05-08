import { Server } from 'socket.io';
import { TypedSocket } from '../types/socketType';
import { UserService } from '../services/userService';
import { MessageService } from '../services/messageService';
import { MessageCreateParameters } from '../shared/dtosInterfaces/messageDtos';

export const registerChatHandlers = (
  io: Server,
  socket: TypedSocket,
  userService: UserService,
  messageService: MessageService
) => {
  // Get authenticated user from the socket
  const authenticatedUser = socket.data.user;
  
  // User is already authenticated, so use the ID from the token
  socket.on('userOnline', async () => {
    try {
      const userId = authenticatedUser.id;
      console.log(`🟢 User online: ${userId}`);
      
      // Update user's last activity in database
      //await userService.updateLastActivity(userId);
      
      // Notify others
      socket.broadcast.emit('userOnline', { id: userId });
    } catch (error) {
      console.error('Error in userOnline:', error);
      socket.emit('error', 'Failed to set user online status');
    }
  });

  socket.on('userOffline', async () => {
    try {
      const userId = authenticatedUser.id;
      //await userService.updateLastActivity(userId);
      console.log(`🔴 User offline: ${userId}`);
      socket.broadcast.emit('userOffline', { id: userId });
    } catch (error) {
      console.error('Error in userOffline:', error);
      socket.emit('error', 'Failed to set user offline status');
    }
  });

  socket.on('joinConversation', (data) => {
    try {
      // Validate that the user has access to this conversation first
      
      const { conversationId } = data;
      socket.join(conversationId);
      console.log(`User ${authenticatedUser.id} joined conversation: ${conversationId}`);
    } catch (error) {
      console.error('Error in joinConversation:', error);
      socket.emit('error', 'Failed to join conversation');
    }
  });

  socket.on('sendMessage', async (message: MessageCreateParameters) => {
    try {
      // Ensure the sender ID matches the authenticated user
      if (message.senderId !== authenticatedUser.id) {
        throw new Error('Unauthorized: Cannot send messages as another user');
      }
      
      console.log(`✉️ New message from ${message.senderId} to ${message.receiverId}`);

      const newMessage = await messageService.sendMessage(message);
      const createdAt = new Date().toISOString();

      io.to(newMessage.conversationId).emit('receiveMessage', {
        id: newMessage.id,
        conversationId: newMessage.conversationId,
        senderId: newMessage.senderId,
        content: newMessage.content,
        createdAt,
      });
    } catch (error) {
      console.error('Error in sendMessage:', error);
      socket.emit('error', 'Failed to send message');
    }
  });

  socket.on('isTyping', (data) => {
    try {
      // Verify the user ID matches authenticated user instead of overwriting
      if (data.userId !== authenticatedUser.id) {
        throw new Error('Unauthorized: Cannot send typing indicator as another user');
      }
      
      // Simplify by just using the conversationId as a string directly
      // This matches what the frontend is sending
      const conversationId = data.conversationId;
        
      socket.to(conversationId).emit('isTyping', { id: authenticatedUser.id });
    } catch (error) {
      console.error('Error in isTyping:', error);
      socket.emit('error', 'Failed to send typing indicator');
    }
  });
};
