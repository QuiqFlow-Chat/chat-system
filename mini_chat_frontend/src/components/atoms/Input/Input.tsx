// mini_chat_frontend/src/components/atoms/Input/Input.tsx
import React, { forwardRef } from "react";
import styles from "./Input.module.css";
import { useTranslation } from "react-i18next";

export enum ThemeEnum {
  LIGHT = "light",
  DARK = "dark",
}

export enum DirectionEnum {
  LTR = "ltr",
  RTL = "rtl",
}

export enum InputVariantEnum {
  AUTH = "auth",
  DEFAULT = "default",
  MESSAGE = "message",
  SEARCH = "search",
}

export interface InputProps {
  direction?: DirectionEnum;
  id?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>; 
  placeholder?: string;
  required?: boolean;
  theme?: ThemeEnum;
  type?: "text" | "email" | "password";
  value: string;
  variant?: InputVariantEnum;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  direction = DirectionEnum.LTR,
  id,
  isInvalid = false,
  isValid = false,
  name,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  placeholder,
  required = false,
  theme = ThemeEnum.LIGHT,
  type = "text",
  value,
  variant = InputVariantEnum.DEFAULT,
}, ref) => {
  const { t } = useTranslation();

  const classNames = [
    styles.input,
    direction === DirectionEnum.RTL ? styles.rtl : styles.ltr,
    theme === ThemeEnum.DARK ? styles.dark : styles.light,
    variant === InputVariantEnum.AUTH
      ? styles.authInput
      : variant === InputVariantEnum.SEARCH
      ? styles.searchInput
      : variant === InputVariantEnum.MESSAGE
      ? styles.messageInput
      : styles.defaultInput,
  ];

  if (isInvalid) classNames.push(styles.isInvalid);
  if (isValid) classNames.push(styles.isValid);

  return (
    <input
      className={classNames.join(" ")}
      id={id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      placeholder={placeholder ? t(placeholder) : ""}
      ref={ref}
      required={required}
      type={type}
      value={value}
    />
  );
});

Input.displayName = "Input";

export default Input;
