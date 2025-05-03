import React from "react";
import styles from "./MessagesContainer.module.css";
import IncomingMessage from "./IncomingMessage/IncomingMessage";
import OutgoingMessage from "./OutgoingMessage/OutgoingMessage";

interface Message {
  type: "incoming" | "outgoing";
  name: string;
  time: string;
  color?: string;
  message: string;
  imgSrc?: string | null;
}

interface MessagesContainerProps {
  messages: Message[];
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages }) => {
  return (
    <div className={styles.messengerBody}>
      <div className={styles.messagesContainer}>
        {messages.map((msg, index) => {
          if (msg.type === "incoming") {
            return (
              <IncomingMessage
                key={index}
                name={msg.name}
                time={msg.time}
                color={msg.color}
                message={msg.message}
                imgSrc={msg.imgSrc}
              />
            );
          } else if (msg.type === "outgoing") {
            return (
              <OutgoingMessage
                key={index}
                name={msg.name}
                time={msg.time}
                color={msg.color}
                message={msg.message}
                imgSrc={msg.imgSrc}
              />
            );
          }
          return null;
        })}

        {/* Typing Indicator */}
        <div className={styles.typingIndicator} id="typing-indicator">
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
    </div>
  );
};

export default MessagesContainer;
