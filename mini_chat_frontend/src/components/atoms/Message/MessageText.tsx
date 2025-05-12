import React from "react";
import styles from "./MessageText.module.css";
import { useTranslation } from "react-i18next";

export enum ThemeEnum {
  LIGHT = "light",
  DARK = "dark",
}

export enum DirectionEnum {
  LTR = "ltr",
  RTL = "rtl",
}

interface MessageTextProps {
  text: string;
  variant?: "default" | "highlight";
  theme?: ThemeEnum;
  direction?: DirectionEnum;
}

const MessageText: React.FC<MessageTextProps> = ({
  text,
  variant = "default",
  theme = ThemeEnum.LIGHT,
  direction = DirectionEnum.LTR,
}) => {
  const { t } = useTranslation();

  const formattedText = text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {t(line)}
      <br />
    </React.Fragment>
  ));

  const themeClass = theme === ThemeEnum.DARK ? styles.dark : styles.light;
  const directionClass =
    direction === DirectionEnum.RTL ? styles.rtl : styles.ltr;
  const variantClass = styles[variant];

  return (
    <div
      className={`${styles.messageText} ${themeClass} ${directionClass} ${variantClass}`}
    >
      {formattedText}
    </div>
  );
};

export default MessageText;
