import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import styles from "./Avatar.module.css";
import { ThemeEnum } from "@/shared/enums/ui.enums";

export enum AvatarVariant {
  SMALL = "small",
  LARGE = "large",
}

export interface AvatarProps {
  initial?: string;
  variant?: AvatarVariant;
  theme?: ThemeEnum;
}

const Avatar: React.FC<AvatarProps> = ({
  initial = "",
  theme = ThemeEnum.LIGHT,
  variant = AvatarVariant.LARGE,
}) => {
  const { t } = useTranslation();

  const avatarClassName = clsx(styles.avatar, styles[variant], {
    [styles.avatarDark]: theme === ThemeEnum.DARK,
    [styles.avatarLight]: theme === ThemeEnum.LIGHT,
  });

  return (
    <div className={avatarClassName}>
      {(initial || t("chat.noUserName")).toUpperCase()}
    </div>
  );
};

export default Avatar;
