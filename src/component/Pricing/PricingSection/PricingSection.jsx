import React from "react";
import styles from "./PricingSection.module.css";

const PricingSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Pricing</h2>
      <div className={styles.box}>
        <p className={styles.text}>
          From the moment you sign up, we’ll send you{" "}
          <span className={styles.linkText}>leads for free</span>. You only pay
          to contact customers that you think are the right fit for your
          business
        </p>
        <button className={styles.button}>Join as a Professional</button>
      </div>
    </div>
  );
};

export default PricingSection;
