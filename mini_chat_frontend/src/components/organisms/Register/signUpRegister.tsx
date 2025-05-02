import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikHelpers } from "formik";
import EmailField from "../../molecules/FormField/EmailField/EmailField";
import PasswordField from "../../molecules/FormField/PasswordField/PasswordField";
import Button from "../../atoms/Button/Button";
import styles from "./SignUpForm.module.css";

// Yup schema to validate the form fields
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"), // Email validation
  password: Yup.string()
    .min(8, "Password must be at least 8 characters") // Password length validation
    .required("Password is required"), // Password is mandatory
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match") // Confirm password must match password
    .required("Confirm password is required"), // Confirm password is mandatory
});

// Shape of the form values
type SignUpValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm: React.FC = () => {
  // Handle form submission
  const handleSubmit = (
    values: SignUpValues,
    formikHelpers: FormikHelpers<SignUpValues>
  ) => {
    const { setSubmitting, resetForm } = formikHelpers;
    console.log("Signing up:", values);
    setSubmitting(true);

    setTimeout(() => {
      alert("Sign up successful!"); // Simulate a successful sign-up
      setSubmitting(false);
      resetForm(); // Reset the form after submission
    }, 1500);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }} // Set initial values for the form
      validationSchema={validationSchema} // Apply validation schema
      onSubmit={handleSubmit} // Form submission handler
    >
      {({ isSubmitting }) => (
        <Form noValidate className={styles["form"]}>
          {/* Email field */}
          <EmailField name="email" />

          {/* Password field */}
          <PasswordField name="password" />

          {/* Confirm password field */}
          <PasswordField name="confirmPassword" />

          <div className={styles["button-container"]}>
            {/* Submit button with loading state */}
            <Button
              type="submit"
              className="button button-primary"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}{" "}
              {/* Button text based on submitting state */}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
