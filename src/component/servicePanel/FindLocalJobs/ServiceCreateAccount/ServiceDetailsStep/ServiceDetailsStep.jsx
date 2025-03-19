import React, { useState } from "react";
import styles from "./ServiceDetailsStep.module.css";

const ServiceDetailsStep = ({ nextStep, prevStep }) => {
  const [website, setWebsite] = useState(null);
  const [jobCount, setJobCount] = useState(null);
  const [companySize, setCompanySize] = useState(null);
  const [salesTeam, setSalesTeam] = useState(null);
  const [socialMedia, setSocialMedia] = useState(null);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h2 className={styles.heading}>Some details about you</h2>
          <p className={styles.subheading}>
            You're just a few steps away from viewing our House Cleaning leads
          </p>
        </div>

        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Your name</label>
              <input type="text" className={styles.input} />
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Company name</label>
              <input type="text" className={styles.input} />
              <label className={styles.helperText}>
                If you aren't a business or don’t have this information, you can
                leave this blank
              </label>
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Email address</label>
              <input type="email" className={styles.input} />
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>Phone number (Optional)</label>
              <input type="text" className={styles.input} />
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>
                Does your company have a website?
              </label>
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
                  {/* <label className={styles.label}>
                    Website address (optional)
                  </label> */}
                  <input
                    type="text"
                    placeholder=" Website address (optional)"
                    className={styles.input}
                  />
                </div>
              </>
            )}

            {/* <div className={styles.labelInputWrapper}> */}
            <label className={styles.label}>
              Estimated number of new jobs per month
            </label>
            <div className={styles.optionGroup}>
              {["1-5", "6-10", "10-20", "20-30", "30+"].map((count) => (
                <button
                  key={count}
                  type="button"
                  className={
                    jobCount === count
                      ? styles.activeOption
                      : styles.optionButton
                  }
                  onClick={() => setJobCount(count)}
                >
                  {count}
                </button>
              ))}
            </div>
            {/* </div> */}

            {/* <div className={styles.labelInputWrapper}> */}
            <label className={styles.label}>Company size, employees</label>
            <div className={styles.optionGroup}>
              {[
                "Self-employed, Sole trader",
                "2-10",
                "11-50",
                "51-200",
                "200+",
              ].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={
                    companySize === size
                      ? styles.activeOption
                      : styles.optionButton
                  }
                  onClick={() => setCompanySize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {/* </div> */}

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>
                Does your company have a sales team?
              </label>
              <div className={styles.toggleGroup}>
                <button
                  type="button"
                  className={
                    salesTeam === "Yes"
                      ? styles.activeButton
                      : styles.toggleButton
                  }
                  onClick={() => setSalesTeam("Yes")}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={
                    salesTeam === "No"
                      ? styles.activeButton
                      : styles.toggleButton
                  }
                  onClick={() => setSalesTeam("No")}
                >
                  No
                </button>
              </div>
            </div>

            <div className={styles.labelInputWrapper}>
              <label className={styles.label}>
                Does your company use social media?
              </label>
              <div className={styles.toggleGroup}>
                <button
                  type="button"
                  className={
                    socialMedia === "Yes"
                      ? styles.activeButton
                      : styles.toggleButton
                  }
                  onClick={() => setSocialMedia("Yes")}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={
                    socialMedia === "No"
                      ? styles.activeButton
                      : styles.toggleButton
                  }
                  onClick={() => setSocialMedia("No")}
                >
                  No
                </button>
              </div>
            </div>

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

export default ServiceDetailsStep;
