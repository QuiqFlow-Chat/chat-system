import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./signUp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Input from "../../atoms/Input/Input";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle visibility of password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle visibility of confirm password

  // Formik form initialization and validation schema
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"), // Full name validation
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"), // Email validation
      password: Yup.string()
        .min(8, "Password must be at least 8 characters") // Minimum password length
        .required("Password is required")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/,
          "Use 8 or more characters with a mix of letters, numbers & symbols" // Password complexity validation
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match") // Password and confirm password must match
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.post("/api/register", values); // Make API request to register the user
        navigate("/login"); // Redirect to login page after successful registration
      } catch (error) {
        console.error("Registration failed:", error); // Log error if registration fails
      } finally {
        setSubmitting(false); // Reset the submitting state
      }
    },
  });

  const goToLogin = () => {
    navigate("/LoginPage");
  };
  return (
    <div className={styles.registerPage}>
      {/* Display logo */}
      <img
        className={styles.primaryLogo}
        width={240}
        height={90}
        src="https://quiqflow.com/wp-content/uploads/2024/01/logo.png"
        alt="quiqflow-logo"
      />

      <div className={styles.registerContainer}>
        <header className={styles.registerHeader}>
          <h1 className={styles.registerTitle}>Sign Up</h1>{" "}
          {/* Title of the page */}
        </header>

        {/* Form for user input */}
        <form onSubmit={formik.handleSubmit} noValidate className={styles.form}>
          {/* Full name input field */}
          <div className={styles.formGroup}>
            <label htmlFor="fullName" className={styles.label}>
              Full Name
            </label>
            <Input
              type="text"
              className={`${styles.input} ${styles.authInput}`}
              placeholder="Enter your full name"
              {...formik.getFieldProps("fullName")} // Formik binding for form field
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className={styles.invalidFeedback}>{formik.errors.fullName}</p> // Error message if full name is invalid
            )}
          </div>

          {/* Email input field */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <Input
              type="email"
              className={`${styles.input} ${styles.authInput}`}
              placeholder="Enter your email"
              {...formik.getFieldProps("email")} // Formik binding for form field
            />
            {formik.touched.email && formik.errors.email && (
              <p className={styles.invalidFeedback}>{formik.errors.email}</p> // Error message if email is invalid
            )}
          </div>

          {/* Password input field */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordWrapper}>
              <Input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                className={`${styles.input} ${styles.authInput}`}
                placeholder="Enter your password"
                {...formik.getFieldProps("password")} // Formik binding for form field
              />
              <button
                type="button"
                className={styles.passwordToggle}
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className={styles.invalidFeedback}>{formik.errors.password}</p> // Error message if password is invalid
            )}
          </div>

          {/* Confirm Password input field */}
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <div className={styles.passwordWrapper}>
              <Input
                type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                className={`${styles.input} ${styles.authInput}`}
                placeholder="Re-enter your password"
                {...formik.getFieldProps("confirmPassword")} // Formik binding for form field
              />
              <button
                type="button"
                className={styles.passwordToggle}
                aria-label="Toggle confirm password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEye : faEyeSlash} // Toggle eye icon
                />
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className={styles.invalidFeedback}>
                  {formik.errors.confirmPassword} // Error message if confirm
                  password is invalid
                </p>
              )}
            <p className={styles.passwordHint}>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>{" "}
            {/* Password hint */}
          </div>

          {/* Submit button */}
          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.buttonPrimary}
              disabled={formik.isSubmitting} // Disable the button when submitting
            >
              {formik.isSubmitting ? "Signing up..." : "Sign Up"}{" "}
              {/* Dynamic button text */}
            </button>
          </div>

          {/* Link to login page */}
          <p className={styles.registerSubtext}>
            Already have an account?{" "}
            <span onClick={goToLogin} className={styles.registerLink}>
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
