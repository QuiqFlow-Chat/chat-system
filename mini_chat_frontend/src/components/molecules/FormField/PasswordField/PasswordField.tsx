import React, { useState } from "react";
import { useField } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import Label from "@/components/atoms/Label/Label";
import Input, { InputVariantEnum } from "@/components/atoms/Input/Input";

import styles from "../FormFieldStyles.module.css";

interface PasswordFieldProps {
  name: string;
}

export const passwordValidation = Yup.string()
  .min(8, "validation.password.min")
  .required("validation.password.required")
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&*~]).{8,}$/,
    "validation.password.pattern"
  );

const PasswordField: React.FC<PasswordFieldProps> = ({ name }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(true);
  const [field, meta] = useField(name);
  const isInvalid = meta.touched && !!meta.error;

  return (
    <div className={styles.formGroup} data-password-field>
      <Label htmlFor={name}>{t("form.passwordLabel")}</Label>

      <div className={styles.passwordWrapper}>
        <Input
          id={name}
          isInvalid={isInvalid}
          name={field.name}
          onBlur={field.onBlur}
          onChange={field.onChange}
          placeholder={t("form.passwordPlaceholder")}
          type={showPassword ? "password" : "text"}
          value={field.value}
          variant={InputVariantEnum.AUTH}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={styles.passwordToggle}
          aria-label={
            showPassword ? t("form.hidePassword") : t("form.showPassword")
          }
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      </div>

      {isInvalid && (
        <p className={styles.invalidFeedback}>{t(meta.error as string)}</p>
      )}
    </div>
  );
};

export default PasswordField;
