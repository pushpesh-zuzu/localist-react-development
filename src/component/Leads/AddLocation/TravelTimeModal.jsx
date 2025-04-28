import React from "react";
import styles from "./TravelTimeModal.module.css";

const TravelTimeModal = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2 className={styles.title}>Travel time</h2>

        <p className={styles.description}>
          <span className={styles.infoIcon}>ℹ️</span>
          Enter a Postcode or town, the maximum time you'd spend travelling, and
          the mode of transport you'd use.
        </p>

        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Postcode / City</label>
            <input type="text" placeholder="Enter postcode or city" />
          </div>

          <div className={styles.inputGroup}>
            <label>Travel time</label>
            <select>
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>1.5 hours</option>
              <option>2 hours</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Travelling by</label>
            <select>
              <option>Driving</option>
              <option>Walking</option>
              <option>Biking</option>
              <option>Public Transport</option>
            </select>
          </div>
        </div>

        {/* Map ko skip kar rahe hain */}

        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.nextButton}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default TravelTimeModal;
