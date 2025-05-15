import React from "react";
import clsx from "clsx";
import styles from "./MessageText.module.css";

export enum ThemeEnum {
  LIGHT = "light",
  DARK = "dark",
}

export enum MessageVariantEnum {
  INCOMING = "incoming",
  OUTGOING = "outgoing"
}

interface MessageTextProps {
  text: string;
  variant?: MessageVariantEnum;
  theme?: ThemeEnum;
}

const MessageText: React.FC<MessageTextProps> = ({
  text,
  variant = MessageVariantEnum.INCOMING,
  theme = ThemeEnum.LIGHT,
}) => {

  const formattedText = text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
  
  const MessageClassName = clsx(
    styles.messageText,
    {
      [styles.dark]: theme === ThemeEnum.DARK,
      [styles.light]: theme === ThemeEnum.LIGHT,
      [styles.outgoingText]: variant === MessageVariantEnum.OUTGOING,
      [styles.incomingText]: variant === MessageVariantEnum.INCOMING,
    }
  );
    
  return (
    <div className={MessageClassName}>{formattedText}</div>
  );
};

export default MessageText;
