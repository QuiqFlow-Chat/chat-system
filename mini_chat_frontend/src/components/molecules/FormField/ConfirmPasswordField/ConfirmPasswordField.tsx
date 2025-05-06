import React from "react";
import { useField, useFormikContext } from "formik";

import * as Yup from "yup";

import Label from "../../../atoms/Label/Label";
import Input from "../../../atoms/Input/Input";

import styles from "../../FormField/FormField.module.css";

interface AuthFormValues {
  password: string;
  confirmPassword: string;
}

export const confirmPasswordValidation = (refField: string) =>
  Yup.string()
    .oneOf([Yup.ref(refField)], "Passwords do not match")
    .required("Please confirm your password");

interface Props {
  name: keyof AuthFormValues;
  label?: string;
  passwordFieldName: keyof AuthFormValues;
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

  const showError =
    touchedConfirm && touchedPassword && confirmPasswordValue !== passwordValue;

  return (
    <div className={styles.formGroup} data-confirm-password-field>
      <Label htmlFor={name}>{label}</Label>

      <div className={styles.passwordWrapper}>
        <Input
          className={styles.authInput}
          id={name}
          isInvalid={showError}
          name={field.name}
          onBlur={field.onBlur}
          onChange={field.onChange}
          placeholder="Re-enter your password"
          required
          type="password"
          value={field.value}
        />

        {showError && (
          <p className={styles.invalidFeedback}>Passwords do not match</p>
        )}
      </div>

      <p className={styles.passwordHint}>
        Use 8 or more characters with a mix of letters, numbers & symbols
      </p>
    </div>
  );
};

export default ConfirmPasswordField;
