import styles from "./MessagesContainer.module.css";
import IncomingMessage from "./IncomingMessage/IncomingMessage";
import OutgoingMessage from "./OutgoingMessage/OutgoingMessage";
import { usePaginatedMessages } from "../../../../hooks/usePaginatedMessages";
import { User } from "../../../organisms/Chat/Messagebar/Messagebar";
import { useEffect } from "react";

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
    containerRef, // Make sure to use this ref
    loading,
  } = usePaginatedMessages({
    conversationId,
    currentUserId: currentUser.id,
    receiverId: otherUser.id,
    otherUserName: otherUser.fullName,
  });
  
  useEffect(() => {
    if (isTyping) {
      console.log(`Showing typing indicator for ${otherUser.fullName}`);
      // Ensure the view scrolls to the typing indicator
      bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isTyping, otherUser.fullName, bottomRef]);

  return (
    <div className={styles.messengerBody}
      ref={containerRef} // Attach the ref here
      >
      <div 
        className={styles.messagesContainer}>
        {loading && <div className={styles.loadingIndicator}>Loading older messages...</div>}

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
          <div className={styles.typingIndicator}
          
          >
            
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