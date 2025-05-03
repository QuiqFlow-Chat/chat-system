// src/components/atoms/Avatar/Avatar.tsx

import React from "react";
import styles from "./Avatar.module.css";

interface AvatarProps {
  initial?: string;
  backgroundColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  initial = "M",
  backgroundColor = "#f1416c",
}) => {
  return (
    <div className={styles.avatar} style={{ backgroundColor }}>
      {initial.toUpperCase()}
    </div>
  );
};

export default Avatar;
