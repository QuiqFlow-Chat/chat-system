import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import styles from "./Register.module.css";
import Button, { ButtonVariantEnum } from "@/components/atoms/Button/Button";
import ConfirmPasswordField, {
  confirmPasswordValidation,
} from "@/components/molecules/FormField/ConfirmPasswordField/ConfirmPasswordField";
import EmailField, {
  emailValidation,
} from "@/components/molecules/FormField/EmailField/EmailField";

import PasswordField, {
  passwordValidation,
} from "@/components/molecules/FormField/PasswordField/PasswordField";
import FullNameField, {
  fullNameValidation,
} from "@/components/molecules/FormField/FullNameField/FullNameField";
import { UserCreateParameters } from "@/types/chatTypes";

interface SignUpFormProps {
  onSubmit: (
    values: UserCreateParameters,
    formikHelpers: FormikHelpers<UserCreateParameters>
  ) => void;
  loading?: boolean;
}

const initialValues: UserCreateParameters = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  fullName: fullNameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation("password"),
});

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, loading }) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={true}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form} noValidate>
          <FullNameField name="fullName" />
          <EmailField name="email" />
          <PasswordField name="password" />
          <ConfirmPasswordField
            name="confirmPassword"
            passwordFieldName="password"
          />

          <div className={styles.buttonContainer}>
            <Button
              type="submit"
              variant={ButtonVariantEnum.PRIMARY}
              isDisabled={isSubmitting || loading}
            >
              {loading
                ? t("register.signUpForm.signingUp")
                : t("register.signUpForm.signUp")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
