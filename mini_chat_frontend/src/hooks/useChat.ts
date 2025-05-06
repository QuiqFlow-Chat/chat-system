// import { useEffect, useState } from "react";
// import { useSocket } from "../contexts/SocketContext";
// import { MessageCreateParameters, UserGetByParameter } from "../types";

// export const useChat = (conversationId: string, userId: string) => {
//   const socket = useSocket();
//   const [messages, setMessages] = useState<MessageCreateParameters[]>([]);
//   const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
//   const [typingUsers, setTypingUsers] = useState<string[]>([]);

//   useEffect(() => {
//     if (!socket) return;

//     socket.emit("userOnline", { id: userId });

//     socket.on("receiveMessage", (msg) => {
//       if (msg.conversationId === conversationId) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     socket.on("userOnline", (user) =>
//       setOnlineUsers((prev) => [...new Set([...prev, user.id])])
//     );
//     socket.on("userOffline", (user) =>
//       setOnlineUsers((prev) => prev.filter((id) => id !== user.id))
//     );
//     socket.on("isTyping", (user) => {
//       if (user.id !== userId) {
//         setTypingUsers((prev) => [...new Set([...prev, user.id])]);
//         setTimeout(
//           () => setTypingUsers((prev) => prev.filter((id) => id !== user.id)),
//           3000
//         );
//       }
//     });

//     return () => {
//       socket.emit("userOffline", { id: userId });
//       socket.off();
//     };
//   }, [socket, conversationId]);

//   const sendMessage = (content: string) => {
//     const message = {
//       conversationId,
//       senderId: userId,
//       content,
//     };
//     socket.emit("sendMessage", message);
//   };

//   const sendTyping = () => {
//     socket.emit("isTyping", {
//       conversationId: { id: conversationId },
//       userId: { id: userId },
//     });
//   };

//   return {
//     messages,
//     onlineUsers,
//     typingUsers,
//     sendMessage,
//     sendTyping,
//   };
// };
