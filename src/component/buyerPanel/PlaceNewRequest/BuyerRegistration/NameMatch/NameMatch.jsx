import React, { useState } from "react";
import styles from "./NameMatch.module.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const NameMatch = ({ nextStep, previousStep }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError(false);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nextStep();
    }, 1000);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>View your matches now!</h2>
        </div>

        <div className={styles.infoWrapper}>
          <label htmlFor="name" className={styles.label}>
            Please enter your name
          </label>
          <input
            type="text"
            placeholder="Name"
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            value={name}
            onChange={handleNameChange}
          />
          {error && (
            <span className={styles.errorMessage}>Name is required.</span>
          )}

          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <label htmlFor="consent">
              I'm happy to receive marketing promotional message.
            </label>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.backButton} onClick={previousStep}>
              Back
            </button>
            <button
              className={styles.nextButton}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined spin style={{ color: "white" }} />
                  }
                />
              ) : (
                "View Matches"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameMatch;
