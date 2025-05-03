import React from "react";
import styles from "./MessageText.module.css";

interface MessageTextProps {
  text: string;
}

const MessageText: React.FC<MessageTextProps> = ({ text }) => {
  const formattedText = text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return <div className={styles.messageText}>{formattedText}</div>;
};

export default MessageText;
