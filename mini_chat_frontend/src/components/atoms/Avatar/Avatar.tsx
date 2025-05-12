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

export enum AvatarVariantEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface AvatarProps {
  initial?: string;
  variant?: AvatarVariantEnum;
  theme?: ThemeEnum;
  direction?: Direction;
}

const Avatar: React.FC<AvatarProps> = ({
  initial = "",
  variant = AvatarVariantEnum.PRIMARY,
  theme = ThemeEnum.LIGHT,
  direction = Direction.LTR,
}) => {
  const { t } = useTranslation();

  const getDirectionClass = () =>
    direction === Direction.RTL ? styles.rtl : styles.ltr;

  const getThemeClass = () =>
    theme === ThemeEnum.DARK ? styles.avatarDark : styles.avatarLight;

  return (
    <div
      className={`${styles.avatar} ${
        styles[variant]
      } ${getDirectionClass()} ${getThemeClass()}`}
    >
      {(initial || t("unknown")).toUpperCase()}
    </div>
  );
};

export default Avatar;
