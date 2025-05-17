// mini_chat_frontend/src/components/atoms/Input/Input.tsx
import React, { forwardRef } from "react";
import styles from "./Input.module.css";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { ThemeEnum } from "@/shared/enums/ui.enums";

export enum InputVariantEnum {
  AUTH = "auth",
  DEFAULT = "default",
  MESSAGE = "message",
  SEARCH = "search",
}

export interface InputProps {
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

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
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
    },
    ref
  ) => {
    const { t } = useTranslation();

    const inputClassName = clsx(styles.input, {
      [styles.dark]: theme === ThemeEnum.DARK,
      [styles.light]: theme === ThemeEnum.LIGHT,
      [styles.authInput]: variant === InputVariantEnum.AUTH,
      [styles.searchInput]: variant === InputVariantEnum.SEARCH,
      [styles.messageInput]: variant === InputVariantEnum.MESSAGE,
      [styles.defaultInput]: variant === InputVariantEnum.DEFAULT,
      [styles.isInvalid]: isInvalid,
      [styles.isValid]: isValid,
    });

    return (
      <input
        className={inputClassName}
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
  }
);

Input.displayName = "Input";

export default Input;
