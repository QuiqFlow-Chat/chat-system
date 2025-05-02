// src/components/atoms/Button/Button.tsx
import React from "react";
import styles from "./Button.module.css";

// Button component props
type ButtonProps = {
  children: React.ReactNode; // Button content
  variant?: "primary" | "secondary"; // Visual style
  size?: "sm" | "md" | "lg"; // Button size
  disabled?: boolean; // Disable the button
  loading?: boolean; // Show loading state
  type?: "button" | "submit" | "reset"; // HTML button type
  onClick?: () => void; // Click handler
  className?: string; // Additional custom class
};

// Functional Button component
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
  // Combine CSS classes based on props
  const classNames = [
    styles.button,
    styles[`button-${variant}`],
    loading ? styles["button-loading"] : "",
    className,
  ].join(" ");

  // Set padding based on size
  const style: React.CSSProperties = {
    padding:
      size === "sm"
        ? "0.5rem 1rem"
        : size === "lg"
        ? "1rem 2rem"
        : "0.75rem 1.5rem",
  };

  // Render the button element
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
