import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import styles from "./Register.module.css";
import PasswordField, {
  passwordValidation,
} from "@/components/molecules/FormField/PasswordField/PasswordField";
import EmailField, {
  emailValidation,
} from "@/components/molecules/FormField/EmailField/EmailField";
import Button, { ButtonVariantEnum } from "@/components/atoms/Button/Button";
import { UserLoginParameters } from "@/types/chatTypes";


// Component props
interface LoginFormProps {
  onSubmit: (
    values: UserLoginParameters,
    formikHelpers: FormikHelpers<UserLoginParameters>
  ) => void;
  loading?: boolean;
  error?: string | null;
}

// Initial values
const initialValues: UserLoginParameters = {
  email: "",
  password: "",
};

// Build validation schema using extracted rules
const validationSchema = Yup.object({
  email: emailValidation,
  password: passwordValidation,
});

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
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
        <Form className={styles.form}>
          <EmailField name="email" />
          <PasswordField name="password" />
          {error && <div className={styles.error}>{t(error)}</div>}
          <div className={styles.buttonContainer}>
            <Button
              type="submit"
              variant={ButtonVariantEnum.PRIMARY}
              isDisabled={isSubmitting || loading}
            >
              {loading
                ? t("register.loginForm.loggingIn")
                : t("register.loginForm.logIn")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
