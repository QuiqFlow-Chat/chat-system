import React from "react";
import styles from "./IncomingMessage.module.css";
import MessageText, { MessageVariantEnum } from "@/components/atoms/Message/MessageText";
import SenderData from "../SenderData/SenderData";

interface IncomingMessageProps {
  name: string;
  time: string;
  message: string;
  imgSrc?: string | null;
}

const IncomingMessage: React.FC<IncomingMessageProps> = ({
  name,
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
          reverseOrder={false}
        />
        <MessageText 
          text={message} 
          variant={MessageVariantEnum.INCOMING}
        />
      </div>
    </div>
  );
};

export default IncomingMessage;
