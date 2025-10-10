import React from "react";
import styles from "./ProgressBarLandingPage.module.css";

const ProgressBarLandingPage = ({ value = 10, actualSteps }) => {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={styles.progressContainer} style={{ position: "relative" }}>
      <div className={styles.progressFill} style={{ width: `${safeValue}%`,background:value<=100 ?'rgba(22, 227, 42, 1)':'' }}/>
    </div>
  );
};

export default ProgressBarLandingPage;
