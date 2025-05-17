import { useEffect, useRef } from "react";
import styles from "./MessagesContainer.module.css";
import IncomingMessage from "./IncomingMessage/IncomingMessage";
import OutgoingMessage from "./OutgoingMessage/OutgoingMessage";
import { useTranslation } from "react-i18next";
import { User } from "@/types/chatTypes";

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
  messages: Message[];
  addMessage: (msg: Message) => void;
  loadMoreMessages: () => void;
  hasMore: boolean;
  loading: boolean;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({
  currentUser,
  isTyping,
  otherUser,
  messages,
  loadMoreMessages,
  hasMore,
  loading,
}) => {
  const { t } = useTranslation();
  const listRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isTyping) {
      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isTyping]);

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

  return (
    <>
      <div className={styles.messengerBody} ref={listRef}>
        <div className={styles.messagesContainer}>
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
