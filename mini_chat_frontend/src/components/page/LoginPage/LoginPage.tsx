import React, { useState } from "react";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";

import tokenStorage from "../utils/storage";

import styles from "./LoginPage.module.css";
import LoginForm from "../../organisms/Register/LoginForm";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    values: UserLoginParameters,
    formikHelpers: FormikHelpers<UserLoginParameters>
  ) => {
    const { setSubmitting } = formikHelpers;
    console.log("Logging in with:", values);
    setSubmitting(true);
    navigate("/messengerChat");
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.registerPage}>
      <img
        className={styles.primaryLogo}
        src="https://quiqflow.com/wp-content/uploads/2024/01/logo.png"
        alt="quiqflow-logo"
      />
      <div className={styles.registerContainer}>
        <header className={styles.registerHeader}>
          <h1 className={styles.registerTitle}>Log In</h1>
        </header>

        {error && <div className={styles.error}>{error}</div>}

        <LoginForm onSubmit={handleSubmit} loading={loading} />

        <p className={styles.registerSubtext}>
          Don&apos;t have an account?{" "}
          <span
            style={{ cursor: "pointer" }}
            onClick={goToSignup}
            className={styles.registerLink}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
