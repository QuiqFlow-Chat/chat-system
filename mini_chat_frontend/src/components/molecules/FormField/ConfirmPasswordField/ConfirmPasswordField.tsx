import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./ConfirmPasswordField.module.css";

// Define expected form values
interface AuthFormValues {
  password: string;
  confirmPassword: string;
}

interface Props {
  name: keyof AuthFormValues; // confirmPassword field name
  label?: string; // optional label text
  passwordFieldName: keyof AuthFormValues; // original password field name
}

const ConfirmPasswordField: React.FC<Props> = ({
  name,
  label = "Confirm Password",
  passwordFieldName,
}) => {
  const [field] = useField(name);
  const { values, touched } = useFormikContext<AuthFormValues>();

  const confirmPasswordValue = values[name];
  const passwordValue = values[passwordFieldName];
  const touchedConfirm = touched[name];
  const touchedPassword = touched[passwordFieldName];

  // Show error only if both fields were touched and don't match
  const showError =
    touchedConfirm && touchedPassword && confirmPasswordValue !== passwordValue;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev); // toggle input type

  return (
    <div className={styles.formGroup} data-confirm-password-field>
      <label htmlFor={name} className={styles.label} data-label>
        {label}
      </label>

      <div className={styles.passwordWrapper}>
        <input
          type={isPasswordVisible ? "text" : "password"} // switch between password and text
          id={name}
          {...field}
          placeholder="Re-enter your password"
          className={`${styles.input} ${showError ? styles.errorInput : ""}`}
          required
        />

        <button
          type="button"
          className={styles.eyeIcon}
          onClick={togglePasswordVisibility}
          aria-label="Toggle password visibility"
        >
          <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
        </button>

        {showError && (
          <p className={styles.invalidFeedback}>Passwords do not match</p> // show mismatch error
        )}
      </div>
    </div>
  );
};

export default ConfirmPasswordField;
