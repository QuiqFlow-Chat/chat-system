// src/components/molecules/ChatMessagebar/MessengerBody/OutgoingMessage/OutgoingMessage.tsx

import React from "react";
import styles from "./OutgoingMessage.module.css";
import MessageText from "../../../../atoms/Message/MessageText";
import MessageContact from "../SenderData/SenderData";

interface OutgoingMessageProps {
  name?: string;
  time: string;
  message: string;
  imgSrc?: string | null;
}

const OutgoingMessage: React.FC<OutgoingMessageProps> = ({
  name = "You",
  time,
  message,
  imgSrc = null,
}) => {
  return (
    <div className={`${styles.message} ${styles.outgoing}`}>
      <div className={styles.messageWrapper}>
        <div className={styles.messageContact}>
          <MessageContact
            name={name}
            time={time}
            imgSrc={imgSrc}
            reverseOrder={true}
          />
        </div>
        <MessageText
          text={message}
          backgroundColor="var(--quiqflow-color-black-lightest)"
        />
      </div>
    </div>
  );
};

export default OutgoingMessage;