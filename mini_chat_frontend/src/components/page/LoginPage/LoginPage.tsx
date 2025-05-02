import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikHelpers } from "formik";
import EmailField from "../../molecules/FormField/EmailField/EmailField";
import PasswordField from "../../molecules/FormField/PasswordField/PasswordField";
import Button from "../../atoms/Button/Button";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

// Validation schema using Yup to validate form fields
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"), // Email validation
  password: Yup.string()
    .min(8, "Password must be at least 8 characters") // Password length validation
    .required("Password is required") // Password is mandatory
    .matches(
      /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&]).{8,}$/,
      "Use 8 or more characters with a mix of letters, numbers & symbols" // Password complexity
    ),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (
    values: { email: string; password: string },
    formikHelpers: FormikHelpers<{ email: string; password: string }>
  ) => {
    const { setSubmitting, resetForm } = formikHelpers;
    console.log("Logging in with:", values);
    setSubmitting(true);

    setTimeout(() => {
      alert("Login successful! (This is a demo)"); // Simulated successful login
      setSubmitting(false);
      resetForm(); // Reset the form after submission
    }, 1500);
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className={styles["register-page"]}>
      {/* Quiqflow logo */}
      <img
        className={styles["primary-logo"]}
        src="https://quiqflow.com/wp-content/uploads/2024/01/logo.png"
        alt="quiqflow-logo"
      />
      <div className={styles["register-container"]}>
        <header className={styles["register-header"]}>
          <h1 className={styles["register-title"]}>Log In</h1>{" "}
          {/* Page title */}
        </header>

        <Formik
          initialValues={{ email: "", password: "" }} // Initial values for the form
          validationSchema={validationSchema} // Apply validation schema
          onSubmit={handleSubmit} // Form submission handler
        >
          {({ isSubmitting }) => (
            <Form id="registerForm" noValidate className={styles["form"]}>
              {/* Email input field */}
              <EmailField name="email" />

              {/* Password input field */}
              <PasswordField name="password" />

              <div className={styles["button-container"]}>
                {/* Submit button with loading state */}
                <Button
                  type="submit"
                  className="button button-primary"
                  disabled={isSubmitting} // Disable button while submitting
                >
                  {isSubmitting ? "Logging in..." : "Log In"}{" "}
                  {/* Button text changes when submitting */}
                </Button>
              </div>

              <p className={styles["register-subtext"]}>
                Don&apos;t have an account?{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={goToSignup}
                  className={styles["register-link"]}
                >
                  Sign Up {/* Link to the sign-up page */}
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
