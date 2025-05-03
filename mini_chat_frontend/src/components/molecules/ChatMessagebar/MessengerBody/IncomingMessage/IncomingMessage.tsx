import React from "react";
import styles from "./IncomingMessage.module.css";
import MessageText from "../../../../atoms/Message/MessageText";
import MessageContact from "../SenderData/SenderData";

interface IncomingMessageProps {
  name: string;
  time: string;
  color?: string;
  message: string;
  imgSrc?: string | null;
}

const IncomingMessage: React.FC<IncomingMessageProps> = ({
  name,
  time,
  color = "#f1416c",
  message,
  imgSrc = null,
}) => {
  return (
    <div className={`${styles.message} ${styles.incoming}`}>
      <div className={styles.wrapper}>
        <MessageContact
          name={name}
          time={time}
          color={color}
          imgSrc={imgSrc}
          reverseOrder={false}
        />
        <MessageText text={message} />
      </div>
    </div>
  );
};

export default IncomingMessage;
