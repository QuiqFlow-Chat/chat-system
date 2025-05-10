import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikHelpers } from "formik";
import styles from "./signUp.module.css";
import SignUpForm from "../../organisms/Register/SignUpForm";
import { signUp } from "../../../services/authService";
import { UserCreateParameters } from "../../../shared/dtosInterfaces/userDtos";
const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (
    values: UserCreateParameters,
    { setSubmitting }: FormikHelpers<UserCreateParameters>
  ) => {
    setLoading(true);
    setError(null);
    try {
      const user = await signUp(values);
      console.log("Registered user:", user);
      navigate("/LoginPage");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };
  const goToLogin = () => {
    navigate("/LoginPage");
  };
  return (
    <div className={styles.registerPage}>
      <img
        className={styles.primaryLogo}
        width={240}
        height={90}
        src="https://quiqflow.com/wp-content/uploads/2024/01/logo.png"
        alt="quiqflow-logo"
      />
      <div className={styles.registerContainer}>
        <header className={styles.registerHeader}>
          <h1 className={styles.registerTitle}>Sign Up</h1>
        </header>
        {error && <div className={styles.error}>{error}</div>}
        <SignUpForm onSubmit={handleSubmit} loading={loading} />
        <p className={styles.registerSubtext}>
          Already have an account?{" "}
          <span onClick={goToLogin} className={styles.registerLink}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};
export default SignUpPage;
