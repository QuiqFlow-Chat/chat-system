import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import Button from "../../atoms/Button/Button";
import styles from "./Register.module.css";

import PasswordField, { passwordValidation } from "../../molecules/FormField/PasswordField/PasswordField";
import EmailField, { emailValidation } from "../../molecules/FormField/EmailField/EmailField";

// Shape of the form's values
interface LoginFormValues {
  email: string;
  password: string;
}

// Component props
interface LoginFormProps {
  onSubmit: (
    values: LoginFormValues,
    formikHelpers: FormikHelpers<LoginFormValues>
  ) => void;
}

// Initial values for the form
const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

// Build validation schema using extracted rules
const validationSchema = Yup.object({
  email: emailValidation,
  password: passwordValidation,
});

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
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
          <div className={styles.buttonContainer}>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;