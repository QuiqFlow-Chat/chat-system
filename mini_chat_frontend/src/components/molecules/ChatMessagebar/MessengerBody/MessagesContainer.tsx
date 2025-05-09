import styles from "./MessagesContainer.module.css";
import IncomingMessage from "./IncomingMessage/IncomingMessage";
import OutgoingMessage from "./OutgoingMessage/OutgoingMessage";
import { usePaginatedMessages } from "../../../../hooks/usePaginatedMessages";
import { User } from "../../../organisms/Chat/Messagebar/Messagebar";

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
  const {
    messages,
    bottomRef,
    loading,
  } = usePaginatedMessages({
    conversationId,
    currentUserId: currentUser.id,
    receiverId: otherUser.id,
    otherUserName: otherUser.fullName,
  });
  
  return (
    <div className={styles.messengerBody} >
      <div className={styles.messagesContainer}>
        {loading && <div className={styles.loading}>Loading messages...</div>}

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