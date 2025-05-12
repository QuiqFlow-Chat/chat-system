import React from "react";
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

// Props interface
export interface InputProps {
  name?: string;
  type?: "text" | "email" | "password";
  id?: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isInvalid?: boolean;
  isValid?: boolean;
  required?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  direction?: DirectionEnum;
  theme?: ThemeEnum;
}

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  id,
  placeholder,
  value,
  onChange,
  isInvalid = false,
  isValid = false,
  required = false,
  onBlur,
  direction = DirectionEnum.LTR,
  theme = ThemeEnum.LIGHT,
}) => {
  const { t } = useTranslation();

  const directionClass =
    direction === DirectionEnum.RTL ? styles.rtl : styles.ltr;
  const themeClass = theme === ThemeEnum.DARK ? styles.dark : styles.light;

  const inputClasses = [styles.input, directionClass, themeClass];
  if (isInvalid) inputClasses.push(styles.isInvalid);
  if (isValid) inputClasses.push(styles.isValid);

  return (
    <input
      id={id}
      name={name}
      type={type}
      className={inputClasses.join(" ")}
      placeholder={placeholder ? t(placeholder) : ""}
      value={value}
      onChange={onChange}
      required={required}
      onBlur={onBlur}
    />
  );
};

export default Input;
