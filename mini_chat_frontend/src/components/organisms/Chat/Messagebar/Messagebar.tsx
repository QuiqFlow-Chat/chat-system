import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./Messagebar.module.css";

import MessengerHeader from "@/components/molecules/ChatMessagebar/MessengerHeader/MessengerHeader";
import MessagesContainer from "@/components/molecules/ChatMessagebar/MessengerBody/MessagesContainer";
import MessengerFooter from "@/components/molecules/ChatMessagebar/MessengerFooter/MessengerFooter";
import { useSocket } from "@/contexts/SocketContext";
import { MessageCreateParameters, User } from "@/types/chatTypes";
import {
  setupMessageSocket,
  createEmitTypingEvent,
  emitSendMessage,
} from "@/services/socket/messageSocketHandlers";
import { useMessagePagination } from "@/hooks/useMessagePagination";


interface MessagebarProps {
  currentUser: User;
  otherUser: User;
  conversationId?: string | null;
  onBack?: () => void;
  onMessageSent?: () => void;
}

const Messagebar: React.FC<MessagebarProps> = ({
  conversationId,
  currentUser,
  otherUser,
  onMessageSent,
}) => {
  const socket = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    messages,
    fetchMessages: loadMoreMessages,
    hasMore,
    loading,
    addMessage,
  } = useMessagePagination(conversationId || "", currentUser.id);

  const handleResetTypingIndicator = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  };

  
  useEffect(() => {
    if (!socket) return;

    const cleanup = setupMessageSocket(
      socket,
      currentUser.id,
      otherUser.id,
      conversationId,
      (user) => {
        if (
          user.id === otherUser.id &&
          user.conversationId === conversationId
        ) {
          setIsTyping(true);
          handleResetTypingIndicator();
        }
      },
      (msg) => {
        const newMessage = {
          type: msg.senderId === currentUser.id ? "outgoing" : "incoming",
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          message: msg.content,
        } as const;

        console.log("newMessage👋",newMessage)
        addMessage(newMessage);
      }
    );

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      cleanup?.();
    };
  }, [socket, currentUser.id, otherUser.id, conversationId]);

  const handleSend = (newMessage: string) => {
    if (!newMessage.trim() || !conversationId || !otherUser.id) {
      console.warn("🚫 Missing message data:", {
        content: newMessage,
        conversationId,
        otherUserId: otherUser.id,
      });
      return;
    }
  
    const messageData: MessageCreateParameters = {
      senderId: currentUser.id,
      receiverId: otherUser.id,
      conversationId,
      content: newMessage,
    };
  
    console.log("📤 Sending message:", messageData);
    emitSendMessage(socket, messageData);

    if (onMessageSent) onMessageSent();

  };

  const emitTypingEvent = useMemo(
    () => createEmitTypingEvent(socket, conversationId),
    [socket, conversationId]
  );

  const handleTyping = () => {
    if (!conversationId || !socket?.connected) return;
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
            messages={messages}
            addMessage={addMessage}
            loadMoreMessages={loadMoreMessages}
            hasMore={hasMore}
            loading={loading}
          />
        )}
        <MessengerFooter onSend={handleSend} onTyping={handleTyping} />
      </div>
    </div>
  );
};

export default Messagebar;
