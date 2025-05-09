import React, { useState } from "react";

import * as Yup from "yup";
import { useField } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import Label from "../../../atoms/Label/Label";
import Input from "../../../atoms/Input/Input";

import styles from "../../FormField/FormField.module.css";

interface PasswordFieldProps {
  name: string; 
}

export const passwordValidation = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .required("Password is required")
  .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&*~]).{8,}$/,
  "Use 8 or more characters with a mix of letters, numbers & symbols"
  );

const PasswordField: React.FC<PasswordFieldProps> = ({ name }) => {
  const [showPassword, setShowPassword] = useState(true); 
  const [field, meta] = useField(name);
  const isInvalid = meta.touched && !!meta.error;

  return (
      <div className={styles.formGroup} data-password-field>
        <Label htmlFor="password">Password</Label>

        <div className={styles.passwordWrapper}>
          <Input
            className={styles.authInput}
            id="password"
            isInvalid={isInvalid} 
            name={name}
            onBlur={field.onBlur} 
            onChange={field.onChange} 
            placeholder="Enter your password"
            type={showPassword ? "password" : "text"} 
            value={field.value} 
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} 
            className={styles.passwordToggle}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />          
          
          </button>
        </div>
        {isInvalid && (
          <p className={styles.invalidFeedback}>{meta.error}</p> 
        )}
      </div>
  );
};

export default PasswordField;