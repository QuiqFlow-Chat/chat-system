// FullNameField.tsx
import React from "react";
import { useField } from "formik";
import styles from "./FullNameField.module.css";

// Props for the full name input
interface FullNameFieldProps {
  name: string;
}

const FullNameField: React.FC<FullNameFieldProps> = ({ name }) => {
  const [field, meta] = useField(name); // Connect to Formik state

  return (
    <div
      className={`${styles.formGroup} ${
        meta.touched && meta.error ? styles.error : ""
      }`}
      data-fullname-field
    >
      <label htmlFor={name} className={styles.label}>
        Full Name
      </label>

      <input
        {...field}
        type="text"
        id={name}
        placeholder="Enter your full name"
        className={`${styles.input} auth-input`}
        data-input
      />

      {meta.touched && meta.error && (
        <p className={styles.invalidFeedback}>{meta.error}</p> // Show error if field is touched and has error
      )}
    </div>
  );
};

export default FullNameField;
