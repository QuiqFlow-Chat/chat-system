// EmailField.tsx
import React from "react";
import { useField } from "formik";
import Label from "../../../atoms/Label/Label";
import Input from "../../../atoms/Input/Input";
import styles from "./EmailField.module.css";

// Props for the email field component
interface EmailFieldProps {
  name: string; // Formik field name
  id?: string; // Optional input ID
  placeholder?: string; // Optional placeholder
  className?: string;
}

const EmailField: React.FC<EmailFieldProps> = ({
  name,
  id = "email",
  placeholder = "Enter your email",
  className = "auth-input",
}) => {
  // Connect field to Formik state
  const [field, meta] = useField(name);

  // Check if there's a validation error
  const isInvalid = meta.touched && !!meta.error;

  return (
    <div className={styles["form-group"]} data-email-field>
      <Label htmlFor={id}>Email</Label>

      <Input
        type="email"
        id={id}
        placeholder={placeholder}
        value={field.value}
        onChange={field.onChange}
        isInvalid={isInvalid}
        className={className}
      />

      {isInvalid && <p className={styles["invalid-feedback"]}>{meta.error}</p>}
    </div>
  );
};

export default EmailField;
