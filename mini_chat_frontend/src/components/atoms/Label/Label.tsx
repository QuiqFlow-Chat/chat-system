import React from "react";
import styles from "./Label.module.css";

// Define the props for the Label component
interface LabelProps {
  htmlFor: string; // HTML 'for' attribute to associate with form elements
  fontSize?: string; // Optional font size for the label
  color?: string; // Optional color for the label text
  fontWeight?: string; // Optional font weight for the label
  margin?: string; // Optional margin (default is 0.5rem)
  onClick?: () => void; // Optional click event handler
  children: React.ReactNode; // Content to display inside the label
}

// Label component definition
const Label: React.FC<LabelProps> = ({
  htmlFor,
  fontSize = "var(--quiqflow-font-size-md)", // Default font size
  color = "var(--quiqflow-color-primary-font)", // Default font color
  fontWeight = "var(--quiqflow-font-weight-bold)", // Default font weight
  margin = "0.5rem", // Default margin
  onClick,
  children, // Rendered content inside the label
}) => {
  return (
    <label
      htmlFor={htmlFor} // Link to the form element
      className={styles.label}
      style={{
        fontSize, // Set the font size
        color, // Set the font color
        fontWeight, // Set the font weight
        marginBottom: margin, // Set margin for bottom
      }}
      onClick={onClick} // Click handler for the label
    >
      {children} {/* Display the children (label text) */}
    </label>
  );
};

export default Label;
