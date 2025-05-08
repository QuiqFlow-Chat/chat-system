import { Server } from 'socket.io';
import { UserRepository } from '../repositories/userRepository';
import { UserService } from '../services/userService';
import { MessageService } from '../services/messageService';
import { MessageRepository } from '../repositories/messageRepository';
import { registerChatHandlers } from '../sockets/chatSocket';
import { AuthUtils } from '../utils/authUtils';

const userRepository = new UserRepository();
const userService = UserService.getInstance(userRepository);

const messageRepository = new MessageRepository();
const messageService = MessageService.getInstance(messageRepository);

export const initializeSocket = async (io: Server) => {
  // Auth middleware
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication token is missing'));
      }
      
      // Verify token using existing AuthUtils
      const user = AuthUtils.verifyToken(token);
      
      // Attach user data to socket for later use
      socket.data.user = user;
      
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    try {
      const user = socket.data.user;
      console.log(`⚡ New client connected: ${user.id}`);

      // Pass authenticated user to chat handlers
      registerChatHandlers(io, socket, userService, messageService);
    } catch (error) {
      console.error('Error in socket connection:', error);
      socket.emit('error', 'An error occurred during connection.');
      socket.disconnect(true);
    }
  });
};
