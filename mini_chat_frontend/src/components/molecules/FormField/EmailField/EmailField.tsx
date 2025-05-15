import React from "react";
import { useField } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import Label from "@/components/atoms/Label/Label";
import Input, { InputVariantEnum } from "@/components/atoms/Input/Input";

import styles from "../FormFieldStyles.module.css";
import { EMAIL_REGEX } from "@/constants/regex";

interface EmailFieldProps {
  name: string;
  id?: string;
  placeholder?: string;
}

export const emailValidation = Yup.string()
  .matches(EMAIL_REGEX, "validation.email.format")
  .email("validation.email.invalid")
  .required("validation.email.required");

const EmailField: React.FC<EmailFieldProps> = ({
  name,
  id = "email",
  placeholder,
}) => {
  const { t } = useTranslation();
  const [field, meta] = useField(name);
  const isInvalid = meta.touched && !!meta.error;

  return (
    <div className={styles.formGroup} data-email-field>
      <Label htmlFor={id}>{t("form.emailLabel")}</Label>

      <Input
        id={id}
        isInvalid={isInvalid}
        name={field.name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        placeholder={placeholder ?? t("form.emailPlaceholder")}
        type="email"
        value={field.value}
        variant={InputVariantEnum.AUTH}
      />

      {isInvalid && (
        <p className={styles.invalidFeedback}>{t(meta.error as string)}</p>
      )}
    </div>
  );
};

export default EmailField;
