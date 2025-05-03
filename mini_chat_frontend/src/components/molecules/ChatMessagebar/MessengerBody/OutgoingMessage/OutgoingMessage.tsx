// src/components/molecules/ChatMessagebar/MessengerBody/OutgoingMessage/OutgoingMessage.tsx

import React from "react";
import styles from "./OutgoingMessage.module.css";
import Avatar from "../../../../atoms/Avatar/Avatar";
import UserName from "../../../../atoms/UserName/UserName";

interface OutgoingMessageProps {
  name?: string;
  time: string;
  color?: string;
  message: string;
  imgSrc?: string | null;
}

const OutgoingMessage: React.FC<OutgoingMessageProps> = ({
  name = "You",
  time,
  color = "#f1416c",
  message,
  imgSrc = null,
}) => {
  const avatar = imgSrc ? (
    <div className={`${styles.avatar} ${styles.small}`}>
      <img src={imgSrc} alt={name} />
    </div>
  ) : (
    <div className={styles.small}>
      <Avatar initial={name[0]} backgroundColor={color} />
    </div>
  );

  const userDetails = (
    <div className={styles.userDetails}>
      <div className={styles.messageTime}>{time}</div>
      <UserName name={name} />
    </div>
  );

  return (
    <div className={`${styles.message} ${styles.outgoing}`}>
      <div className={styles.messageWrapper}>
        <div className={styles.messageContact}>
          {userDetails}
          {avatar}
        </div>
        <div className={styles.messageText}>{message}</div>
      </div>
    </div>
  );
};

export default OutgoingMessage;
