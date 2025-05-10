import React, { useState, useEffect, useRef, useCallback } from "react";
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
    if (!socket) {
      console.error("Socket not connected");
      return;
    }

    if (!currentUser.id || !otherUser.id) {
      console.error("Missing user IDs", { currentUser, otherUser });
      return;
    }
    
    if (!conversationId) {
      console.error("Missing conversationId");
      return;
    }
      
    // Ensure user is online and joined to conversation
    socket.emit("userOnline");
    socket.emit("joinConversation", { conversationId });
    
    console.log(`Joined conversation: ${conversationId}`);
    
    // Listen for typing events
    socket.on("isTyping", (user) => {
      console.log("Received isTyping event:", user);
      
      // Only show typing indicator if it's from the correct user and conversation
      if (user.id === otherUser.id && user.conversationId === conversationId) {
        console.log(`${otherUser.fullName} is typing in conversation ${conversationId}`);
        setIsTyping(true);
        resetTypingIndicator();
      }
    });
    
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (conversationId) {
        socket.emit("leaveConversation", { conversationId });
      }
      socket.emit("userOffline");
      socket.off("isTyping");
      console.log("Cleaned up typing event listeners");
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

  // Create a debounced version of the typing emitter
  const emitTypingEvent = useCallback(
    debounce(() => {
      if (!conversationId || !socket?.connected) {
        console.error("Cannot emit typing: no conversationId or socket not connected");
        return;
      }
      
      try {
        socket.emit("isTyping", { conversationId });
        console.log("Emitted typing event for conversation:", conversationId);
      } catch (error) {
        console.error("Error emitting typing event:", error);
      }
    }, 1000, { leading: true, trailing: false, maxWait: 2000 }),
    [socket, conversationId]
  );

  const handleTyping = () => {
    if (!conversationId || !socket?.connected) {
      return;
    }
    
    // Simply call the debounced function
    emitTypingEvent();
  };

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