import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./Messagebar.module.css";

import MessengerHeader from "@/components/molecules/ChatMessagebar/MessengerHeader/MessengerHeader";
import MessagesContainer from "@/components/molecules/ChatMessagebar/MessengerBody/MessagesContainer";
import MessengerFooter from "@/components/molecules/ChatMessagebar/MessengerFooter/MessengerFooter";
import { useSocket } from "@/contexts/SocketContext";
import { MessageCreateParameters, User } from "@/types/chatTypes";
import {setupMessageSocket,createEmitTypingEvent,emitSendMessage,} from "@/services/socket/messageSocketHandlers";

interface MessagebarProps {
  currentUser: User;
  otherUser: User;
  conversationId?: string | null;
  onBack?: () => void;
}

const Messagebar: React.FC<MessagebarProps> = ({
  conversationId,
  currentUser,
  otherUser,
}) => {
  const socket = useSocket();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
        console.log(user)
        if (
          user.id === otherUser.id &&
          user.conversationId === conversationId
        ) {
          setIsTyping(true);
          handleResetTypingIndicator();
        }
      }
    );
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      cleanup?.();
    };
  }, [socket, currentUser.id, otherUser.id, conversationId]);

  const handleSend = (newMessage: string) => {
    if (!newMessage.trim() || !otherUser.id) return;

    const messageData: MessageCreateParameters = {
      senderId: currentUser.id,
      receiverId: otherUser.id,
      conversationId: conversationId!,
      content: newMessage,
    };

    emitSendMessage(socket, messageData);
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
          />
        )}
        <MessengerFooter onSend={handleSend} onTyping={handleTyping} />
      </div>
    </div>
  );
};

export default Messagebar;
