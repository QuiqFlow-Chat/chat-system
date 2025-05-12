import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./UserName.module.css";

interface UserNameProps {
  name: string;
}

const UserName: React.FC<UserNameProps> = ({ name }) => {
  const { t } = useTranslation();

  return <span className={styles.userName}>{t(name)}</span>;
};

export default UserName;
