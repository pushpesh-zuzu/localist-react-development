import React, { useState } from "react";
import styles from "./ServiceBusinessAddressStep.module.css";

const ServiceBusinessAddressStep = ({ nextStep, prevStep }) => {
  const [website, setWebsite] = useState(null);
  const [jobCount, setJobCount] = useState(null);
  const [companySize, setCompanySize] = useState(null);
  const [salesTeam, setSalesTeam] = useState(null);
  const [socialMedia, setSocialMedia] = useState(null);
  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h2 className={styles.heading}>Your business address</h2>
          <p className={styles.subheading}>
            This will be used for tax & billing
          </p>
        </div>

        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Street address</label>
              <input type="text" className={styles.input} />
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Suite or apt. # (optional)</label>
              <input type="text" className={styles.input} />
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>City</label>
              <input type="text" className={styles.input} />
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>State</label>
              <input type="text" className={styles.input} />
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>ZIP code</label>
              <div className={styles.toggleGroup}>
                <button
                  type="button"
                  className={
                    website === "Yes"
                      ? styles.activeButton
                      : styles.toggleButton
                  }
                  onClick={() => setWebsite("Yes")}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={
                    website === "No" ? styles.activeButton : styles.toggleButton
                  }
                  onClick={() => setWebsite("No")}
                >
                  No
                </button>
              </div>
            </div>

            {website === "Yes" && (
              <>
                <div className={styles.labelInputWrapper}>
                  <input
                    type="text"
                    placeholder=" Website address (optional)"
                    className={styles.input}
                  />
                </div>
              </>
            )}

            <div className={styles.buttonContainer}>
              <button
                type="button"
                className={styles.backButton}
                onClick={prevStep}
              >
                Back
              </button>
              <button
                type="button"
                className={styles.nextButton}
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceBusinessAddressStep;
