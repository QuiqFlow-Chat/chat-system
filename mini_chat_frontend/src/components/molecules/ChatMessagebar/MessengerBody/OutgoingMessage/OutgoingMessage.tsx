import React from "react";
import styles from "./OutgoingMessage.module.css";
import SenderData from "../SenderData/SenderData";
import MessageText, { MessageVariantEnum } from "@/components/atoms/Message/MessageText";

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
    <div className={styles.message}>
      <div className={styles.messageWrapper}>
          <SenderData
            name={name}
            time={time}
            imgSrc={imgSrc}
            reverseOrder
          />
        <MessageText
          text={message}
          variant={MessageVariantEnum.OUTGOING}
        />
      </div>
    </div>
  );
};

export default OutgoingMessage;
