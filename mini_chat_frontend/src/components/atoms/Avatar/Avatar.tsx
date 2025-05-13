import React from "react";
import { useTranslation } from "react-i18next";
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
  initial = "",
  variant = AvatarVariant.LARGE,
  theme = ThemeEnum.LIGHT,
  direction = Direction.LTR,
}) => {
  const { t } = useTranslation();

  const classes = [
    styles.avatar,
    styles[variant],
    direction === Direction.RTL ? styles.rtl : styles.ltr,
    theme === ThemeEnum.DARK ? styles.avatarDark : styles.avatarLight,
  ];

  return (
    <div className={classes.join(" ")}>
      {(initial || t("unknown")).toUpperCase()}
    </div>
  );
};

export default Avatar;
