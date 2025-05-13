import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";  
import styles from "./Avatar.module.css";

export enum ThemeEnum {
  LIGHT = "light",
  DARK = "dark",
}

export enum Direction {
  LTR = "ltr",
  RTL = "rtl",
}

export enum AvatarVariant {
  SMALL = "small",
  LARGE = "large",
}

export interface AvatarProps {
  initial?: string;
  variant?: AvatarVariant;
  theme?: ThemeEnum;
  direction?: Direction;
}

const Avatar: React.FC<AvatarProps> = ({
  direction = Direction.LTR,
  initial = "",
  theme = ThemeEnum.LIGHT,
  variant = AvatarVariant.LARGE,
}) => {
  const { t } = useTranslation();

  const avatarClassName = clsx(
    styles.avatar,
    styles[variant], 
    {
      [styles.rtl]: direction === Direction.RTL,
      [styles.ltr]: direction === Direction.LTR,
      [styles.avatarDark]: theme === ThemeEnum.DARK,
      [styles.avatarLight]: theme === ThemeEnum.LIGHT,
    }
  );

  return (
    <div className={avatarClassName}>
      {(initial || t("chatSidebar.noUserName")).toUpperCase()}
    </div>
  );
};

export default Avatar;
