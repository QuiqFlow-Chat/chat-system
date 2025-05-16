import React, { useState } from "react";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import LoginForm from "@/components/organisms/Register/LoginForm";
import { useTranslation } from "react-i18next";
import { login } from "@/services/auth/authService";
import { UserLoginParameters } from "@/types/chatTypes";

export enum ThemeEnum {
  DARK = "dark",
  LIGHT = "light",
}

export enum DirectionEnum {
  LTR = "ltr",
  RTL = "rtl",
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    values: UserLoginParameters,
    formikHelpers: FormikHelpers<UserLoginParameters>
  ) => {
    const { setSubmitting } = formikHelpers;
    setLoading(true);
    setError(null);

    try {
      const user = await login(values);
      console.log("Logged in user:", user);
      navigate("/messengerChat");
    } catch (error: any) {
      const errorMessage = error?.message || t("pages.loginPage.error");
      setError(errorMessage);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const goToSignup = () => {
    navigate("/signup");
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
          <h1 className={styles.registerTitle}>{t("pages.loginPage.title")}</h1>
        </header>

        <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />

        <p className={styles.registerSubtext}>
          {t("pages.loginPage.noAccount")}{" "}
          <span onClick={goToSignup} className={styles.registerLink}>
            {t("pages.loginPage.signUp")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
