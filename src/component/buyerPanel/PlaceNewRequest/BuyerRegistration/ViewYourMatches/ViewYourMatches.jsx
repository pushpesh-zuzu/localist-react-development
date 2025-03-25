import React from "react";
import styles from "./ViewYourMatches.module.css";

const ViewYourMatches = ({ onClose, nextStep, previousStep }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>View your matches now!</h2>
        </div>

        <div className={styles.infoWrapper}>
          <label htmlFor="phoneNumber" className={styles.label}>
            Please enter your phone number
          </label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Phone Number"
            className={styles.input}
            maxLength={10}
            pattern="[0-9]*"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
          />

          <div className={styles.checkboxContainer}>
            <input type="checkbox" id="consent" />
            <label htmlFor="consent">
              I'm happy to receive this online or remotely.
            </label>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.backButton} onClick={previousStep}>
              Back
            </button>
            <button className={styles.nextButton} onClick={nextStep}>
              View Matches
            </button>
          </div>
        </div>

        <p className={styles.disclaimer}>
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
  );
};

export default ViewYourMatches;
