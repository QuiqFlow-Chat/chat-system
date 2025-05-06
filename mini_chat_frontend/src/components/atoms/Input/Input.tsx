import React from "react";
import styles from "./Input.module.css";

// Props for the Input component
type InputProps = {
  type?: "text" | "email" | "password"; // Input type
  id?: string; // Element ID
  placeholder?: string; // Placeholder text
  value: string; // Input value
  onChange: React.ChangeEventHandler<HTMLInputElement>; // Change handler
  isInvalid?: boolean; // Show error style
  isValid?: boolean; // Show valid style
  className?: string; // Extra class if needed
  required?: boolean; // Set required
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // Blur handler
  name?: string; // Input name
};
// Input component
const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  id,
  placeholder = "",
  value,
  onChange,
  isInvalid = false,
  isValid = false,
  className = "",
  required = false,
  onBlur = () => {}, // Default empty blur handler
}) => {
  // Set input classes based on validation state
  let inputClass = `${styles.input} ${className}`;
  if (isInvalid) inputClass += ` ${styles.isInvalid}`;
  if (isValid) inputClass += ` ${styles.isValid}`;
  return (
    <input
      type={type}
      id={id}
      name={name}
      onBlur={onBlur}
      className={inputClass}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};
export default Input;