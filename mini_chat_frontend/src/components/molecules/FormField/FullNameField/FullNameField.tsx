import React from "react";
import { useField } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import Label from "@/components/atoms/Label/Label";
import Input, { InputVariantEnum } from "@/components/atoms/Input/Input";

import styles from "../FormFieldStyles.module.css";

interface FullNameFieldProps {
  name: string;
}

export const fullNameValidation = Yup.string()
  .required("validation.fullName.required")
  .test("has-two-words", "validation.fullName.twoWords", (value) => {
    if (!value) return false;
    const parts = value.trim().split(/\s+/);
    return parts.length >= 2;
  })
  .test("word-lengths", "validation.fullName.wordLengths", (value) => {
    if (!value) return false;
    const parts = value.trim().split(/\s+/);
    return parts.every((word) => word.length >= 3 && word.length <= 15);
  });

const FullNameField: React.FC<FullNameFieldProps> = ({ name }) => {
  const { t } = useTranslation();
  const [field, meta] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <div
      className={`${styles.formGroup} ${showError ? styles.error : ""}`}
      data-fullname-field
    >
      <Label htmlFor={name}>{t("form.fullNameLabel")}</Label>

      <Input
        id={name}
        isInvalid={!!showError}
        name={field.name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        placeholder={t("form.fullNamePlaceholder")}
        type="text"
        value={field.value}
        variant={InputVariantEnum.AUTH}
      />

      {showError && (
        <p className={styles.invalidFeedback}>{t(meta.error as string)}</p>
      )}
    </div>
  );
};

export default FullNameField;
