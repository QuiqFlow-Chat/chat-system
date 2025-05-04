import { Server } from 'socket.io';
import { UserRepository } from '../repositories/userRepository';
import { UserService } from '../services/userService';
import { MessageService } from '../services/messageService';
import { MessageRepository } from '../repositories/messageRepossitory';
import { registerChatHandlers } from '../sockets/chatSocket';


const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const messageRepository = new MessageRepository();
const messageService = new MessageService(messageRepository);

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
