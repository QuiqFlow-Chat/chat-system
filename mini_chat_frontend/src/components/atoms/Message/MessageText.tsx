import React from "react";
import styles from "./MessageText.module.css";

export enum ThemeEnum {
  LIGHT = "light",
  DARK = "dark",
}

export enum DirectionEnum {
  LTR = "ltr",
  RTL = "rtl",
}

export enum MessageVariantEnum {
  INCOMING = "incoming",
  OUTGOING = "outgoing"
}

interface MessageTextProps {
  text: string;
  variant?: MessageVariantEnum;
  theme?: ThemeEnum;
  direction?: DirectionEnum;
}

const MessageText: React.FC<MessageTextProps> = ({
  text,
  variant = "default",
  theme = ThemeEnum.LIGHT,
  direction = DirectionEnum.LTR,
}) => {

  const formattedText = text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
  
  const classes = [
    styles.messageText,
    theme === ThemeEnum.DARK ? styles.dark : styles.light,
    direction === DirectionEnum.RTL ? styles.rtl : styles.ltr,
    variant === MessageVariantEnum.OUTGOING ? styles.outgoingText : styles.incomingText,
  ].join(" ");
    
  
  return (
    <div className={classes}>{formattedText}</div>
  );
};

export default MessageText;
