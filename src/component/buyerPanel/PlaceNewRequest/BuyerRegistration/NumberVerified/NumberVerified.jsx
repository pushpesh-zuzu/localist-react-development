import React from "react";
import styles from "./NumberVerified.module.css";
import { CheckOutlined } from "@ant-design/icons";

const NumberVerifiedModal = ({ open, onClose ,nextStep, previousStep}) => {
  if (!open) return null;
  const handleSubmit = () => {
    nextStep()
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.icon}>
              <CheckOutlined />
            </div>
            <h2 className={styles.title}>
              Thank You! Your number has been verified.
            </h2>
          </div>
          <div className={styles.buttons}>
            <button className={styles.backButton} onClick={onClose}>
              Back
            </button>
            <button className={styles.viewMatchesButton} onClick={handleSubmit}>
             Next
              
            </button>
          </div>
          <p className={styles.note}>
            Localists will provide your information to up to 5 professionals who
            may contact you about your project in accordance with our privacy
            policy. By submitting this form, you consent that such professionals
            may call or text you on the phone number you provided to offer their
            services (these calls may be made using automated phone technology).
            Consent is not a condition of purchasing or receiving any of the
            services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NumberVerifiedModal;
