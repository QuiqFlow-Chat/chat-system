import React from "react";
import clsx from "clsx";  // تأكد من تثبيت مكتبة clsx: npm install clsx
import styles from "./Label.module.css";
import { useTranslation } from "react-i18next";

export enum ThemeEnum {
  LIGHT = "light",
  DARK = "dark",
}

export enum DirectionEnum {
  LTR = "ltr",
  RTL = "rtl",
}

export enum LabelSizeEnum {
  SM = "sm",
  MD = "md",
  LG = "lg",
}

export enum LabelWeightEnum {
  NORMAL = "normal",
  BOLD = "bold",
}

export interface LabelProps {
  htmlFor: string;
  size?: LabelSizeEnum;
  weight?: LabelWeightEnum;
  theme?: ThemeEnum;
  direction?: DirectionEnum;
  onClick?: () => void;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({
  htmlFor,
  size = LabelSizeEnum.MD,
  weight = LabelWeightEnum.NORMAL,
  theme = ThemeEnum.LIGHT,
  direction = DirectionEnum.LTR,
  onClick,
  children,
}) => {
  const { t } = useTranslation();

  const labelClassName = clsx(
    styles.label,
    styles[size],
    styles[weight],
    {
      [styles.dark]: theme === ThemeEnum.DARK,
      [styles.light]: theme === ThemeEnum.LIGHT,
      [styles.rtl]: direction === DirectionEnum.RTL,
      [styles.ltr]: direction === DirectionEnum.LTR,
    }
  );

  return (
    <label htmlFor={htmlFor} className={labelClassName} onClick={onClick}>
      {t(children as string)}
    </label>
  );
};

export default Label;
