import { Server } from 'socket.io';
import { UserRepository } from '../repositories/userRepository';
import { UserService } from '../services/userService';
import { MessageService } from '../services/messageService';
import { MessageRepository } from '../repositories/messageRepository';
import { registerChatHandlers } from '../sockets/chatSocket';

const userRepository = new UserRepository();
const userService = UserService.getInstance(userRepository);

const messageRepository = new MessageRepository();
const messageService = MessageService.getInstance(messageRepository);

export const initializeSocket = async (io: Server) => {
  io.on('connection', (socket) => {
    try {
      console.log('⚡ New client connected');

      registerChatHandlers(io, socket, userService, messageService);
    } catch (error) {
      console.error('Error in socket connection:', error);
      socket.emit('error', 'An error occurred during connection.');
    }
  });
};
