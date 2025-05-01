import { Server } from "socket.io";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userAuthService";
import { MessageService } from "../services/messageService";
import { MessageRepository } from "../repositories/messageRepossitory";
import { registerChatHandlers } from "../sockets/chatSocket";

export const configureSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("⚡ New client connected");

    // إنشاء الـ Repositories والخدمات المرتبطة فيها
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);

    const messageRepository = new MessageRepository();
    const messageService = new MessageService(messageRepository);

    // تسجيل الـ handlers وربطهم مع السوكيت الحالي
    registerChatHandlers(io, socket, userService, messageService);
  });
};
