import React from "react";
import styles from "./PricingSection.module.css";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const navigate = useNavigate()
  const onSubmitPageChange = () => {
    navigate("/sellers/create/")
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pricing</h1>
      <div className={styles.box}>
        <p className={styles.text}>
          From the moment you sign up, we’ll send you{" "}
          <span className={styles.linkText}>leads for free</span>. You only pay
          to contact customers that you think are the right fit for your
          business
        </p>
        <button className={styles.button} onClick={onSubmitPageChange}>Join as a Professional</button>
      </div>
    </div>
  );
};

export default PricingSection;
