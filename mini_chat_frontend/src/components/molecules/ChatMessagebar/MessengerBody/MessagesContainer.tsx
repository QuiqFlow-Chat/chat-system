import { useEffect, useRef } from "react";
import styles from "./MessagesContainer.module.css";
import IncomingMessage from "./IncomingMessage/IncomingMessage";
import OutgoingMessage from "./OutgoingMessage/OutgoingMessage";
import { useTranslation } from "react-i18next";
import { User } from "@/types/chatTypes";
import { useSocket } from "@/contexts/SocketContext";
import { setupReceiveMessageListener } from "@/services/socket/messageSocketHandlers";
import { useMessagePagination } from "@/hooks/useMessagePagination";

interface Message {
  type: "incoming" | "outgoing";
  time: string;
  message: string;
}

interface MessagesContainerProps {
  conversationId: string;
  currentUser: User;
  isTyping: boolean;
  otherUser: User;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({
  conversationId,
  currentUser,
  isTyping,
  otherUser,
}) => {
  const { t } = useTranslation();
  const socket = useSocket();
  const listRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const {
    messages,
    fetchMessages: loadMoreMessages,
    hasMore,
    loading,
    addMessage,
  } = useMessagePagination(conversationId, currentUser.id);

  useEffect(() => {
    if (isTyping) {
      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isTyping]);


  useEffect(() => {
    const unsubscribe = setupReceiveMessageListener(socket, (msg) => {
      const newMessage: Message = {
        type: msg.senderId === currentUser.id ? "outgoing" : "incoming",
        time: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        message: msg.content,
      };
  
      console.log("newMessage",newMessage)
      addMessage(newMessage);
    });
  
    return () => {
      unsubscribe?.();
    };
  }, [socket, currentUser.id ,conversationId]);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
  
    const handleScroll = () => {
      if (container.scrollTop === 0 && hasMore && !loading) {
        loadMoreMessages();
      }
    };
  
    container.addEventListener("scroll", handleScroll);
  
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [listRef, loadMoreMessages, hasMore, loading]);
  

  console.log("messages",messages)

  return (
    <>
      <div className={styles.messengerBody}ref={listRef}>
        <div className={styles.messagesContainer} >
          {loading && (
            <div className={styles.loadingIndicator}>
              {t("chat.loadingOlderMessages")}
            </div>
          )}

          {messages.map((msg, index) =>
            msg.type === "incoming" ? (
              <IncomingMessage
                key={`msg-${index}`}
                name={otherUser.fullName}
                time={msg.time}
                message={msg.message}
              />
            ) : (
              <OutgoingMessage
                key={`msg-${index}`}
                name={currentUser.fullName}
                time={msg.time}
                message={msg.message}
              />
            )
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {isTyping && (
        <div className={styles.typingIndicator}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      )}
    </>
  );
};

export default MessagesContainer;
