// FullNameField.tsx
import React from "react";

import * as Yup from "yup";
import { useField } from "formik";

import Label from "../../../atoms/Label/Label";
import Input from "../../../atoms/Input/Input";

import styles from "../../FormField/FormField.module.css";

// Props for the full name input
interface FullNameFieldProps {
  name: string;
}

// Updated full name validation
export const fullNameValidation = Yup.string()
  .required("Full name is required")
  .test(
    "has-two-words",
    "Please enter at least first and last name",
    (value) => {
      if (!value) return false;
      const parts = value.trim().split(/\s+/);
      return parts.length >= 2;
    }
  )
  .test("word-lengths", "Each name must be 3–10 characters", (value) => {
    if (!value) return false;
    const parts = value.trim().split(/\s+/);
    return parts.every((word) => word.length >= 3 && word.length <= 10);
  });

const FullNameField: React.FC<FullNameFieldProps> = ({ name }) => {
  const [field, meta] = useField(name);

  const showError = meta.touched && meta.error;

  return (
    <div
      className={`${styles.formGroup} ${showError ? styles.error : ""}`}
      data-fullname-field
    >
      <Label htmlFor={name}>Full Name</Label>

      <Input
        className={styles.authInput}
        id={name}
        isInvalid={!!showError}
        name={field.name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        placeholder="Enter your full name"
        type="text"
        value={field.value}
      />

      {showError && <p className={styles.invalidFeedback}>{meta.error}</p>}
    </div>
  );
};

export default FullNameField;
