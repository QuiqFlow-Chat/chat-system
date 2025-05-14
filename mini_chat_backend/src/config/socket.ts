import { Server } from 'socket.io';
import { AuthUtils } from '@/utils/authUtils';
import { MESSAGES } from '@/constants/messages';
import { MessageRepository } from '@/repositories/messageRepository';
import { MessageService } from '@/services/messageService';
import { registerChatHandlers } from '@/sockets/chatSocket';
import { UserRepository } from '@/repositories/userRepository';
import { UserService } from '@/services/userService';
import { ClientToServerEvents, ServerToClientEvents, SocketData } from '@/types/socketType';

const USER_REPOSITORY = new UserRepository();
const USER_SERVICE = UserService.getInstance(USER_REPOSITORY);

const MESSAGE_REPOSITORY = new MessageRepository();
const MESSAGE_SERVICE = MessageService.getInstance(MESSAGE_REPOSITORY);

export const ONLINE_USERS = new Map<string, string>();


interface InitializeSocketParams {
  io: Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
}

export const initializeSocket = async ({ io }: InitializeSocketParams) => {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error(MESSAGES.SOCKET.AUTH.TOKEN_MISSING));
      }
      
      const user = AuthUtils.verifyToken(token);
      socket.data.user = user;

      console.log(`${MESSAGES.SOCKET.AUTH.USER_AUTHENTICATED} ${user.id} (${user.email})`);
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      if (error instanceof Error) {
        return next(new Error(error.message));
      }
      next(new Error(MESSAGES.SOCKET.AUTH.AUTH_FAILED));
    }
  });
  io.on('connection', (socket) => {
    try {
      const user = socket.data.user;
      ONLINE_USERS.set(user.id, socket.id);
      console.log(`${MESSAGES.SOCKET.USER.CONNECTED} ${user.id}`);
      console.log(`${MESSAGES.SOCKET.ONLINE_USERS}`, Array.from(ONLINE_USERS));
      socket.broadcast.emit('userOnline', { id: user.id });

      registerChatHandlers({
        io,
        socket,
        userService: USER_SERVICE,
        messageService: MESSAGE_SERVICE
      });

      socket.on('disconnect', () => {
        ONLINE_USERS.delete(user.id);
        console.log(`${MESSAGES.SOCKET.USER.DISCONNECTED} ${user.id}`);
        console.log(`${MESSAGES.SOCKET.ONLINE_USERS}`, Array.from(ONLINE_USERS));
        socket.broadcast.emit('userOffline', { id: user.id });
      });
    } catch (error) {
      console.error('Error in socket connection:', error);
      socket.emit('error', MESSAGES.SOCKET.ERROR.CONNECTION);
      socket.disconnect(true);
    }
  });
};
