import React from "react";
import styles from "./OutgoingMessage.module.css";
import MessageText, { MessageVariantEnum } from "../../../../atoms/Message/MessageText";
import SenderData from "../SenderData/SenderData";

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
          <SenderData
            name={name}
            time={time}
            imgSrc={imgSrc}
            reverseOrder
          />
        </div>
        <MessageText
          text={message}
          variant={MessageVariantEnum.OUTGOING}
        />
      </div>
    </div>
  );
};

export default OutgoingMessage;
