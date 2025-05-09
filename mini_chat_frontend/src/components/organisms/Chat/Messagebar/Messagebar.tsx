import React, { useState, useEffect, useRef } from "react";
import styles from "./Messagebar.module.css";
import MessengerHeader from "../../../molecules/ChatMessagebar/MessengerHeader/MessengerHeader";
import MessengerFooter from "../../../molecules/ChatMessagebar/MessengerFooter/MessengerFooter";
import MessagesContainer from "../../../molecules/ChatMessagebar/MessengerBody/MessagesContainer";
import { useSocket } from "../../../../contexts/SocketContext";
import { MessageCreateParameters } from "../../../../shared/dtosInterfaces/messageDtos";
import { debounce } from "lodash";

// Shared interfaces for consistency
export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface Message {
  type: "incoming" | "outgoing";
  name: string;
  time: string;
  message: string;
}

interface MessagebarProps {
  currentUser: User;
  otherUser: User;
  conversationId?: string | null;
}

const Messagebar: React.FC<MessagebarProps> = ({
  currentUser,
  otherUser,
  conversationId ,
}) => {
  const socket = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Reset typing indicator after delay
  const resetTypingIndicator = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  };

  useEffect(() => {
    if (!socket || !currentUser.id || !otherUser.id || !conversationId) return;
    // المستخدم الحالي أونلاين
    socket.emit("userOnline");
    // انضم للمحادثة
    
    socket.emit("joinConversation", { conversationId });
    // استقبل حدث الكتابة من الطرف الآخر
    socket.on("isTyping", (user: { id: string }) => {
      if (user.id === otherUser.id) {
        setIsTyping(true);
        resetTypingIndicator();
      }
    });
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      // المستخدم صار أوفلاين
      socket.emit("userOffline");
      // غادر المحادثة
      socket.emit("leaveConversation", { conversationId });
      socket.off("isTyping");
    };
  }, [socket, currentUser.id, otherUser.id, conversationId]);

  const handleSend = (newMessage: string) => {
    console.log(conversationId)
    if (!newMessage.trim() || !otherUser.id) return;
    
    const messageData: MessageCreateParameters = {
      senderId: currentUser.id,
      content: newMessage,
      receiverId: otherUser.id,
    };

    socket.emit("sendMessage", messageData);
  };

  const handleTyping = debounce(() => {
    // Only emit typing if we have a conversation
    if (!conversationId) {
      console.log("Cannot emit typing: no conversationId yet");
      return;
    }
    
    const typingData = { conversationId };
    console.log("Emitting typing event:", typingData);
    socket.emit("isTyping", typingData);
  }, 300); // Debounce to avoid excessive socket emissions

  return (
    <div className={styles.chatMain}>
      <div className={styles.messengerCard}>
        <MessengerHeader user={otherUser} />
        {conversationId && (
        <MessagesContainer
          conversationId={conversationId}
          currentUser={currentUser}
          otherUser={otherUser}
          isTyping={isTyping}
        />
      )}
        <MessengerFooter onSend={handleSend} onTyping={handleTyping} />
      </div>
    </div>
  );
};

export default Messagebar;