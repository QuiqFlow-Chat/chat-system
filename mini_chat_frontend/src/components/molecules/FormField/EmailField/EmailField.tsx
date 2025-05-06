// EmailField.tsx
import React from "react";

import * as Yup from "yup";
import { useField } from "formik";

import Label from "../../../atoms/Label/Label";
import Input from "../../../atoms/Input/Input";

import styles from "../../FormField/FormField.module.css";

// Props for the email field component
interface EmailFieldProps {
  name: string; // Formik field name
  id?: string; // Optional input ID
  placeholder?: string; // Optional placeholder
  className?: string;
}

export const emailValidation = Yup.string()
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
  .email("Invalid email")
  .required("Email is required");

const EmailField: React.FC<EmailFieldProps> = ({
  name,
  id = "email",
  placeholder = "Enter your email",
}) => {
  const [field, meta] = useField(name);

  const isInvalid = meta.touched && !!meta.error;

  return (
    <div className={styles.formGroup} data-email-field>
      <Label htmlFor={id}>Email</Label>

      <Input
        type="email"
        id={id}
        placeholder={placeholder}
        value={field.value}
        onChange={field.onChange}
        isInvalid={isInvalid}
        className={styles.authInput}
      />
      {isInvalid && <p className={styles.invalidFeedback}>{meta.error}</p>}
    </div>
  );
};

export default EmailField;
