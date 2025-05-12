import React from "react";
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

  const sizeClass =
    styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`];
  const weightClass =
    styles[`weight${weight.charAt(0).toUpperCase() + weight.slice(1)}`];
  const themeClass = theme === ThemeEnum.DARK ? styles.dark : styles.light;
  const directionClass =
    direction === DirectionEnum.RTL ? styles.rtl : styles.ltr;

  const labelClasses = [
    styles.label,
    sizeClass,
    weightClass,
    themeClass,
    directionClass,
  ].join(" ");

  return (
    <label htmlFor={htmlFor} className={labelClasses} onClick={onClick}>
      {t(children as string)}
    </label>
  );
};

export default Label;
