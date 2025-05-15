import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./UserName.module.css";
import clsx from "clsx";

export enum UserNameSizeEnum {
  SM = "sm",
  MD = "md",
  LG = "lg",
}

interface UserNameProps {
  name: string;
  size?: UserNameSizeEnum; 
}

const UserName: React.FC<UserNameProps> = ({ name, size = UserNameSizeEnum.MD }) => {
  const { t } = useTranslation();

  return (
    <span className={clsx(styles.userName, styles[size])}>
      {t(name)}
    </span>
  );
};

export default UserName;
