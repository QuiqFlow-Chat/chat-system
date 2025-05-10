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

// Simple in-memory set to track online users by user ID
// OLD: export const onlineUsers = new Set<string>();

// ✅ NEW:
export const onlineUsers = new Map<string, string>(); // userId -> socketId

export const initializeSocket = async (io: Server) => {
  // Auth middleware
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication token is missing'));
      }
      console.log('socket Token: before', token);
      // Verify token using existing AuthUtils
      const user = AuthUtils.verifyToken(token);
      
      // Attach user data to socket for later use
      socket.data.user = user;

      console.log(`[AUTH] User authenticated: ${user.id} (${user.email})`);
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      // Send more specific error message based on error type
      if (error instanceof Error) {
        return next(new Error(error.message));
      }
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    try {
      const user = socket.data.user;
      // OLD: onlineUsers.add(user.id);
      // ✅ NEW:
      onlineUsers.set(user.id, socket.id);
      console.log(`⚡ New client connected: ${user.id}`);
      console.log(`[ONLINE USERS] Now online:`, Array.from(onlineUsers));
      // Broadcast to others that this user is online
      socket.broadcast.emit('userOnline', { id: user.id });

      // Pass authenticated user to chat handlers
      registerChatHandlers(io, socket, userService, messageService);

      socket.on('disconnect', () => {
        onlineUsers.delete(user.id); // Remove user from online set
        console.log(`🔌 Client disconnected: ${user.id}`);
        console.log(`[ONLINE USERS] Now online:`, Array.from(onlineUsers));
        socket.broadcast.emit('userOffline', { id: user.id });
      });
    } catch (error) {
      console.error('Error in socket connection:', error);
      socket.emit('error', 'An error occurred during connection.');
      socket.disconnect(true);
    }
  });
};
