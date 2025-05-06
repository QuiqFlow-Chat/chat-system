import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./signUp.module.css";
import SignUpForm from "../../organisms/Register/SignUpForm";
const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = async (
    values: { email: string; password: string; confirmPassword: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await axios.post("/api/register", values);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setSubmitting(false);
      navigate("/MessengerChat");
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
        <SignUpForm onSubmit={handleSubmit} />
        <p className={styles.registerSubtext}>
          Already have an account?
          <span onClick={goToLogin} className={styles.registerLink}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};
export default SignUpPage;
