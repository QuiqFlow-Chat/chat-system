import { useEffect, useRef, useState } from "react";
import styles from "./MessagesContainer.module.css";
import IncomingMessage from "./IncomingMessage/IncomingMessage";
import OutgoingMessage from "./OutgoingMessage/OutgoingMessage";
import { useTranslation } from "react-i18next";
import { User } from "@/types/chatTypes";
import { getConversationMessages, RawMessage } from "@/services/chat/messageService";

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
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      try {
        const response = await getConversationMessages(conversationId);
        const mappedMessages: Message[] = response.data.data.map((msg: RawMessage) => ({
          type: msg.senderId === currentUser.id ? "outgoing" : "incoming",
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          message: msg.content,
        }));
        setMessages(mappedMessages);
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [conversationId, currentUser.id]);

  useEffect(() => {
    if (isTyping) {
      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isTyping]);

  console.log("messages",messages)


  return (
    <>
      <div className={styles.messengerBody}>
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
