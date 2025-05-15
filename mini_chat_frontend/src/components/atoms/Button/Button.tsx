import React from "react";
import styles from "./Button.module.css";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

export enum ButtonVariantEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export enum ButtonSizeEnum {
  SM = "sm",
  MD = "md",
  LG = "lg",
}

export enum ThemeEnum {
  LIGHT = "light",
  DARK = "dark",
}


export interface ButtonProps {
  children: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  size?: ButtonSizeEnum;
  theme?: ThemeEnum;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariantEnum;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = ButtonVariantEnum.PRIMARY,
  size = ButtonSizeEnum.MD,
  isDisabled = false,
  isLoading = false,
  type = "button",
  onClick,
  theme = ThemeEnum.LIGHT,
}) => {
  const { t } = useTranslation();

  const buttonClassName = clsx(
    styles.button,
    styles[variant],
    styles[size], 
    {
      [styles.buttonDark]: theme === ThemeEnum.DARK,
      [styles.buttonLight]: theme === ThemeEnum.LIGHT,
    }
  );

  return (
    <button
      className={buttonClassName}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {isLoading ? t("loading") : children}
    </button>
  );
};

export default Button;
