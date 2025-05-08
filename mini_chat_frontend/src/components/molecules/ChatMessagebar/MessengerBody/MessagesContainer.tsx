import React, { useEffect, useState, useRef } from "react";
import styles from "./MessagesContainer.module.css";
import IncomingMessage from "./IncomingMessage/IncomingMessage";
import OutgoingMessage from "./OutgoingMessage/OutgoingMessage";
import { usePaginatedMessages } from "../../../../hooks/usePaginatedMessages";
import { useSocket } from "../../../../contexts/SocketContext";
import { MessageReceivePayload } from "../../../../contexts/SocketContext";
import { User, Message } from "../../../organisms/Chat/Messagebar/Messagebar";

interface MessagesContainerProps {
  conversationId: string;
  currentUser: User;
  otherUser: User;
  isTyping: boolean;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({
  conversationId,
  currentUser,
  otherUser,
  isTyping,
}) => {
  const socket = useSocket();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  
  const {
    messages: paginatedMessages,
    containerRef,
    loading,
    error,
  } = usePaginatedMessages({
    conversationId,
    currentUserId: currentUser.id,
    receiverId: otherUser.id,
  });

  const [messages, setMessages] = useState<Message[]>(paginatedMessages);

  // Update messages when pagination loads new ones
  useEffect(() => {
    setMessages(paginatedMessages);
  }, [paginatedMessages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  // Handle real-time message reception
  useEffect(() => {
    if (!socket || !currentUser.id || !otherUser.id) return;

    const handleReceiveMessage = (data: MessageReceivePayload) => {
      const isCurrentUserSender = data.senderId === currentUser.id;
      const senderName = isCurrentUserSender ? currentUser.fullName : otherUser.fullName;
      
      const newMessage: Message = {
        type: isCurrentUserSender ? "outgoing" : "incoming",
        name: senderName,
        time: new Date(data.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        message: data.content,
      };

      setMessages((prev) => [...prev, newMessage]);
      
      // Auto-scroll to new message
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };

    // Join conversation and notify server
    socket.emit("userOnline", {
      id: currentUser.id,
      receiverId: otherUser.id,
      conversationId,
    });

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.emit("userOffline", {
        id: currentUser.id,
        receiverId: otherUser.id,
        conversationId,
      });
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, currentUser, otherUser, conversationId]);

  return (
    <div className={styles.messengerBody} ref={containerRef}>
      <div className={styles.messagesContainer}>
        {loading && <div className={styles.loading}>Loading messages...</div>}
        {error && <div className={styles.error}>{error}</div>}
        
        {messages.map((msg, index) =>
          msg.type === "incoming" ? (
            <IncomingMessage
              key={`msg-${index}`}
              name={msg.name}
              time={msg.time}
              message={msg.message}
            />
          ) : (
            <OutgoingMessage
              key={`msg-${index}`}
              name={msg.name}
              time={msg.time}
              message={msg.message}
            />
          )
        )}

        {isTyping && (
          <div className={styles.typingIndicator}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        )}
        
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default MessagesContainer;