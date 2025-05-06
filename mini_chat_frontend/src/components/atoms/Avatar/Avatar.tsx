// src/components/atoms/Avatar/Avatar.tsx

import React from "react";
import styles from "./Avatar.module.css";

interface AvatarProps {
  initial?: string;
  backgroundColor?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  initial = "M",
  backgroundColor = "#f1416c",
  className ,
}) => {
  return (
    <div className={`${styles.avatar} ${className}`} style={{ backgroundColor }}>
      {initial.toUpperCase()}
    </div>
  );
};

export default Avatar;
