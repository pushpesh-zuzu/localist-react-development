import React from "react";
import styles from "./PaddingWrapper.module.css";

function PaddingWrapper({ children, background = "#fff", className = "" }) {
  return (
    <section
      className={`${styles.wrapper} ${className}`}
      style={{ background }}
    >
      {children}
    </section>
  );
}

export default PaddingWrapper;
