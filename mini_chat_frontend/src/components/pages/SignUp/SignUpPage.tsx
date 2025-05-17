import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikHelpers } from "formik";
import styles from "./signUp.module.css";
import SignUpForm from "@/components/organisms/Register/SignUpForm";
import { signUp } from "@/services/auth/authService";
import { UserCreateParameters } from "@/shared/dtosInterfaces/userDtos";
import { useTranslation } from "react-i18next";
import { DirectionEnum, ThemeEnum } from "@/shared/enums/ui.enums";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    values: UserCreateParameters,
    formikHelpers: FormikHelpers<UserCreateParameters>
  ) => {
    const { setSubmitting } = formikHelpers;
    setLoading(true);
    setError(null);
    try {
      const user = await signUp(values);
      console.log("Registered user:", user);
      navigate("/LoginPage");
    } catch (err: any) {
      console.error("Registration failed:", err);
      setError(t("pages.signUpPage.error"));
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigate("/LoginPage");
  };

  return (
    <div
      className={styles.registerPage}
      data-theme={ThemeEnum.LIGHT}
      data-direction={DirectionEnum.LTR}
    >
      <img
        className={styles.primaryLogo}
        src="https://quiqflow.com/wp-content/uploads/2024/01/logo.png"
        alt="quiqflow-logo"
      />
      <div className={styles.registerContainer}>
        <header className={styles.registerHeader}>
          <h1 className={styles.registerTitle}>
            {t("pages.signUpPage.title")}
          </h1>
        </header>
        {error && <div className={styles.error}>{error}</div>}
        <SignUpForm onSubmit={handleSubmit} loading={loading} />
        <p className={styles.registerSubtext}>
          {t("pages.signUpPage.alreadyHaveAccount")}{" "}
          <span onClick={goToLogin} className={styles.registerLink}>
            {t("pages.signUpPage.login")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
