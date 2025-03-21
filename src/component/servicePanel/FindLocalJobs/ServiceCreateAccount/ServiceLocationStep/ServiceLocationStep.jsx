import React, { useEffect, useState } from "react";
import styles from "./ServiceLocationStep.module.css";
import iIcon from "../../../../../assets/Images/iIcon.png";
import LocationIcon from "../../../../../assets/Icons/LocationIcon.png";

const ServiceLocationStep = ({
  nextStep,
  handleInputChange,
  formData,
  setFormData,
  errors,
}) => {
  const [isNational, setIsNational] = useState(false);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Where would you like to see leads from?
        </h2>
        <p className={styles.subheading}>
          Tell us the area you cover so we can show you leads for your location
        </p>

        <div className={styles.card}>
          <p className={styles.formHeading}>I serve customers within</p>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <span className={styles.fromText}>Miles</span>
              <select
                className={`${styles.dropdown} ${
                  errors.miles1 ? styles.errorBorder : ""
                }`}
                name="miles1"
                value={formData.miles1}
                onChange={handleInputChange}
              >
                <option>1 miles</option>
                <option>2 miles</option>
                <option>5 miles</option>
                <option>10 miles</option>
                <option>30 miles</option>
                <option>50 miles</option>
                <option>100 miles</option>
              </select>
              {errors.miles1 && (
                <p className={styles.errorText}>{errors.miles1}</p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <span className={styles.fromText}>From</span>
              <img src={LocationIcon} alt="" />
              <input
                type="text"
                placeholder="Enter your postcode"
                className={`${styles.input} ${
                  errors.postcode ? styles.errorBorder : ""
                }`}
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
              />

              {errors.postcode && (
                <p className={styles.errorText}>{errors.postcode}</p>
              )}
            </div>
          </div>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="nation_wide"
              checked={formData?.nation_wide === 1}
              onChange={(e) => handleInputChange(e)}
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxCustom}></span>Nationwide
          </label>

          <div className={styles.footer}>
            <p className={styles.infoText}>
              <img src={iIcon} alt="" /> You can change your location at any
              time
            </p>
            <button className={styles.nextButton} onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceLocationStep;
