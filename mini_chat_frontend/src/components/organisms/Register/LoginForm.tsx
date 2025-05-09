import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { UserLoginParameters } from "../../../shared/dtosInterfaces/userDtos";

import Button from "../../atoms/Button/Button";
import styles from "./Register.module.css";

import PasswordField, {
  passwordValidation,
} from "../../molecules/FormField/PasswordField/PasswordField";
import EmailField, {
  emailValidation,
} from "../../molecules/FormField/EmailField/EmailField";

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
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.buttonContainer}>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
