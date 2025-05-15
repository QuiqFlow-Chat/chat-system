import React from "react";
import { useField, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import Label from "@/components/atoms/Label/Label";
import Input, { InputVariantEnum } from "@/components/atoms/Input/Input";

import styles from "../FormFieldStyles.module.css";

interface AuthFormValues {
  password: string;
  confirmPassword: string;
}

export const confirmPasswordValidation = (refField: string) =>
  Yup.string()
    .oneOf([Yup.ref(refField)], "validation.confirmPassword.mismatch")
    .required("validation.confirmPassword.required");

interface Props {
  name: keyof AuthFormValues;
  passwordFieldName: keyof AuthFormValues;
}

const ConfirmPasswordField: React.FC<Props> = ({ name, passwordFieldName }) => {
  const { t } = useTranslation();
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
      <Label htmlFor={name}>{t("form.confirmPasswordLabel")}</Label>

      <div className={styles.passwordWrapper}>
        <Input
          id={name}
          isInvalid={showError}
          name={field.name}
          onBlur={field.onBlur}
          onChange={field.onChange}
          placeholder={t("form.confirmPasswordPlaceholder")}
          required
          type="password"
          value={field.value}
          variant={InputVariantEnum.AUTH}
        />

        {showError && (
          <p className={styles.invalidFeedback}>
            {t("form.confirmPasswordMismatch")}
          </p>
        )}
      </div>

      <p className={styles.passwordHint}>{t("form.passwordHint")}</p>
    </div>
  );
};

export default ConfirmPasswordField;
