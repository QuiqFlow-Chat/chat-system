import { Server } from "socket.io";
import { TypedSocket } from "../types/socketType";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userAuthService";
import { MessageService } from "../services/messageService";

export const registerChatHandlers = (io: Server, socket: TypedSocket ,
    userService:UserService,
    messageService:MessageService
) =>{
    // لما المستخدم يصير أونلاين
  socket.on("userOnline", (user) => {
    console.log(`🟢 User online: ${user.id}`);
    socket.broadcast.emit("userOnline", user);
  });

  socket.on("userOffline",async (user) => {
   await userService.LogoutAsync(user);
    console.log(`🔴 User offline: ${user.id}`);
    socket.broadcast.emit("userOffline", user);
  });

  socket.on("sendMessage", async (message) => {
    console.log(`✉️ New message from ${message.senderId} in conversation ${message.conversationId}`);

    await messageService.addMessageAsync(message);
    const createdAt = new Date().toISOString();

    // إرسال الرسالة لبقية المستخدمين بالغرفة
    io.to(message.conversationId).emit("receiveMessage", {
      conversationId: message.conversationId,
      senderId: message.senderId,
      content: message.content,
      createdAt,
    });
  });

  socket.on("isTyping", (data) => {
    socket.to(data.conversationId.id).emit("isTyping", data.userId);
  });

}