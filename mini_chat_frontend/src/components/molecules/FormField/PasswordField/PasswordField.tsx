import React, { useState } from "react";
import { useField } from "formik";
import Input from "../../../atoms/Input/Input";
import Button from "../../../atoms/Button/Button";
import Label from "../../../atoms/Label/Label";
import styles from "./PasswordField.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface PasswordFieldProps {
  name: string; // Field name used in Formik
}

const PasswordField: React.FC<PasswordFieldProps> = ({ name }) => {
  const [showPassword, setShowPassword] = useState(true); // State to toggle password visibility
  const [field, meta] = useField(name); // Use Formik's useField hook to manage state
  const isInvalid = meta.touched && !!meta.error; // Check if field is invalid based on touch and error

  return (
    <div className={styles["password-field"]}>
      <div className="form-group" data-password-field>
        <Label htmlFor="password">Password</Label>

        <div className={styles["password-wrapper"]}>
          <Input
            type={showPassword ? "password" : "text"} // Toggle input type based on state
            id="password"
            placeholder="Enter your password"
            value={field.value} // Bind value to Formik state
            onChange={field.onChange} // Handle value change with Formik
            onBlur={field.onBlur} // Handle blur event with Formik
            isInvalid={isInvalid} // Pass validation state
            name={name}
          />

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            className={styles["password-toggle"]}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />{" "}
            {/* Toggle icon based on visibility */}
          </Button>
        </div>

        <p className={styles["password-hint"]}>Use 8 or more characters</p>

        {isInvalid && (
          <p className={styles["invalid-feedback"]}>{meta.error}</p> // Show error message if invalid
        )}
      </div>
    </div>
  );
};

export default PasswordField;
