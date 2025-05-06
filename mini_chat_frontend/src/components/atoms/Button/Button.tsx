// src/components/atoms/Button/Button.tsx
import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  type = "button",
  onClick,
  className = "",
}) => {
  const classNames = [
    styles.button,
    styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`], // camelCase class
    loading ? styles.buttonLoading : "",
    className,
  ].join(" ");

  const style: React.CSSProperties = {
    padding:
      size === "sm"
        ? "0.5rem 1rem"
        : size === "lg"
        ? "1rem 2rem"
        : "0.75rem 1.5rem",
  };

  return (
    <button
      type={type}
      className={classNames}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
