import { Socket } from "socket.io-client";
import { debounce } from "lodash";
import { MessageCreateParameters } from "@/types/chatTypes";

interface TypingUser {
  id: string;
  conversationId: string;
}

interface ReceiveMessage {
  id: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  content: string;
  createdAt: string;
  isRead: boolean
}

interface OnReceiveMessageParams {
  (msg: ReceiveMessage): void;
}

export const setupMessageSocket = (
  socket: Socket,
  currentUserId: string,
  otherUserId: string,
  conversationId: string | null | undefined,
  onTyping: (user: TypingUser) => void,
  onReceiveMessage: OnReceiveMessageParams
) => {
  if (!socket) {
    console.error("Socket not connected");
    return;
  }

  if (!currentUserId || !otherUserId) {
    console.error("Missing user IDs");
    return;
  }

  if (!conversationId) {
    console.error("Missing conversationId");
  }

  socket.emit("userOnline");
  socket.emit("joinConversation", { conversationId });
  console.log("joinConversation😭😭", conversationId);

  // ----------------- Event Listeners -----------------
  socket.on("isTyping", onTyping);

  const handleReceiveMessage = (msg: ReceiveMessage) => {
    console.log("msg😀", msg);
    try {
      onReceiveMessage(msg);
    } catch (error) {
      console.error("Error handling received message:", error);
    }
  };

  // socket.off("receiveMessage"); 
  socket.on("receiveMessage", handleReceiveMessage);

  // ----------------- Cleanup -----------------
  return () => {
    socket.emit("userOffline");

    if (conversationId) {
      socket.emit("leaveConversation", { conversationId });
    }

    socket.off("isTyping", onTyping);
    socket.off("receiveMessage", handleReceiveMessage);
  };
};



export const createEmitTypingEvent = (
  socket: Socket | null,
  conversationId: string | null | undefined
) => {
  return debounce(() => {
    if (!conversationId || !socket?.connected) {
      console.error("Cannot emit typing event: missing conversationId or socket not connected");
      return;
    }

    try {
      socket.emit("isTyping", { conversationId });
    } catch (error) {
      console.error("Error emitting typing event", error);
    }
  }, 1000, {
    leading: true,
    trailing: false,
    maxWait: 2000,
  });
};



export const emitSendMessage = (
  socket: Socket | null,
  data: MessageCreateParameters
) => {
  if (!socket || !socket.connected) {
    console.error("Cannot send message: socket not connected");
    return;
  }

  console.log("data",data)
  socket.emit("sendMessage", data);

};



