import React from "react";
import styles from "./MessageText.module.css";

interface MessageTextProps {
  text: string;
  backgroundColor?: string;
}

const MessageText: React.FC<MessageTextProps> = ({ text , backgroundColor = "#fff" }) => {
  const formattedText = text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <div className={styles.messageText} style={{ backgroundColor }}>
      {formattedText}
    </div>
  );
};
export default MessageText;
