import { useEffect } from "react";
import styles from "./MessagesContainer.module.css";
import IncomingMessage from "./IncomingMessage/IncomingMessage";
import OutgoingMessage from "./OutgoingMessage/OutgoingMessage";
import { usePaginatedMessages } from "../../../../hooks/usePaginatedMessages";
import { User } from "../../../organisms/Chat/Messagebar/Messagebar";
import { useTranslation } from "react-i18next";

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

  const {
    bottomRef,
    containerRef,
    loading,
    messages,
  } = usePaginatedMessages({
    conversationId,
    currentUserId: currentUser.id,
    otherUserName: otherUser.fullName,
    receiverId: otherUser.id,
  });

  useEffect(() => {
    if (isTyping) {
      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isTyping, otherUser.fullName, bottomRef]);

  return (
    <div className={styles.messengerBody} ref={containerRef}>
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
