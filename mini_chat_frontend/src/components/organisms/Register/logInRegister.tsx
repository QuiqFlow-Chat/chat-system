// RegisterForm.tsx
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import EmailField from "../../molecules/FormField/EmailField/EmailField";
import PasswordField from "../../molecules/FormField/PasswordField/PasswordField";
import Button from "../../atoms/Button/Button";
import styles from "./RegisterForm.module.css";

// Shape of the form's values
interface RegisterFormValues {
  email: string; // Email field
  password: string; // Password field
}

// Initial form values
const initialValues: RegisterFormValues = {
  email: "",
  password: "",
};

// Yup validation schema for the form
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address") // Validates email format
    .required("Email is required"), // Email is required
  password: Yup.string()
    .min(8, "Password must be at least 8 characters") // Minimum password length
    .required("Password is required"), // Password is required
});

const RegisterForm: React.FC = () => {
  // Handle form submission
  const handleSubmit = (values: RegisterFormValues) => {
    console.log("Form Submitted", values);
    // You can make an API call here for registration
  };

  return (
    <div className={styles.registerForm}>
      <h2>Register</h2>
      <Formik
        initialValues={initialValues} // Set initial values for form
        validationSchema={validationSchema} // Apply validation schema
        onSubmit={handleSubmit} // Submit handler
      >
        {({ isSubmitting }) => (
          <Form id="registerForm" className={styles.form}>
            {/* Email input field */}
            <EmailField name="email" />

            {/* Password input field */}
            <PasswordField name="password" />

            {/* Submit button, shows loading state during submission */}
            <Button type="submit" loading={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
