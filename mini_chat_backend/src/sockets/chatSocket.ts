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

  socket.on('joinConversation', async ({ conversationId }) => {
    try {
      socket.join(conversationId);
      console.log(`User ${authenticatedUser.id} joined conversation ${conversationId}`);
    } catch (error) {
      socket.emit('error', error instanceof Error ? error.message : 'Failed to join conversation');
    }
  });

  socket.on('leaveConversation', ({ conversationId }) => {
    try {
      socket.leave(conversationId);
      console.log(`User ${authenticatedUser.id} left conversation ${conversationId}`);
    } catch (error) {
      socket.emit('error', error instanceof Error ? error.message : 'Failed to leave conversation');
    }
  });
socket.on('sendMessage', async (message: MessageCreateParameters) => {
  try {
    console.log('Sending message:', message);

    if (message.senderId !== authenticatedUser.id) {
      throw AppError.unauthorized('Unauthorized: Cannot send messages as another user');
    }

    const result = await messageService.sendMessage(message);
    const newMessage = result.message;
    const flag = result.flag;

    const conversationId = newMessage.conversationId;

    // Ensure the sender is in the room
    if (!socket.rooms.has(conversationId)) {
      socket.join(conversationId);
    }

    const messagePayload = {
      id: newMessage.id,
      conversationId,
      senderId: newMessage.senderId,
      receiverId: newMessage.receiverId,
      content: newMessage.content,
      createdAt: newMessage.createdAt.toISOString(),
      isRead: newMessage.isRead,
      flag: flag,
    };

    // Emit to all users in the conversation room
    io.to(conversationId).emit('receiveMessage', messagePayload);

    // Also emit directly to receiver if online and not in the room
    const receiverSocketId = onlineUsers.get(newMessage.receiverId);
    const conversationRoom = io.sockets.adapter.rooms.get(conversationId);
    const receiverInRoom = conversationRoom?.has(receiverSocketId);

    if (receiverSocketId && !receiverInRoom) {
      io.to(receiverSocketId).emit('receiveMessage', messagePayload);
    }

    console.log("New message sent:", messagePayload);

  } catch (error) {
    if (error instanceof AppError) {
      socket.emit('error', error.message);
    } else {
      socket.emit('error', error instanceof Error ? error.message : 'Failed to send message');
    }
  }
});

  socket.on('isTyping', async ({ conversationId }) => {
    try {
      if (!conversationId) {
        throw new Error('Missing conversationId');
      }

      // Make sure the user is actually in the conversation room
      if (!socket.rooms.has(conversationId)) {
        socket.join(conversationId);
        console.log(`User ${authenticatedUser.id} auto-joined conversation ${conversationId} while typing`);
      }
      
      const typingData = { 
        id: authenticatedUser.id,
        conversationId: conversationId 
      };
      
      // Broadcast typing event to everyone in the conversation EXCEPT the sender
      socket.to(conversationId).emit('isTyping', typingData);
      
      console.log(`User ${authenticatedUser.id} is typing in conversation ${conversationId}`, typingData);
    } catch (error) {
      console.error('Error in isTyping event handler:', error);
      socket.emit('error', error instanceof Error ? error.message : 'Failed to send typing indicator');
    }
  });

  socket.on('getOnlineUsers', (_, callback) => {
  if (typeof callback === 'function') {
    callback(Array.from(onlineUsers.keys())); // only user IDs
  }
});

  socket.on('disconnect', () => {
    socket.broadcast.emit('userOffline', { id: authenticatedUser.id });
  });
};
