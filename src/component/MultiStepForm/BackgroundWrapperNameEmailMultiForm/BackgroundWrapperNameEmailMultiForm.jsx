import React from "react";
import styles from "./BackgroundWrapperNameEmailMultiForm.module.css";

const BackgroundWrapperNameEmailMultiForm = ({ children, backgroundImage }) => {
  const wrapperStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div style={wrapperStyle} className={styles.backgroundContainer}>
      {children}
    </div>
  );
};

export default BackgroundWrapperNameEmailMultiForm;
