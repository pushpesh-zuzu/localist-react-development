import React, { useState } from "react";
import styles from "./ServiceCreateAccount.module.css";
import iIcon from "../../../../assets/Images/iIcon.png";

const ServiceCreateAccount = () => {
  const [isNational, setIsNational] = useState(false);

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
            <select className={styles.dropdown}>
              <option>1 miles</option>
              <option>2 miles</option>
              <option>5 miles</option>
              <option>10 miles</option>
              <option>30 miles</option>
              <option>50 miles</option>
              <option>100 miles</option>
            </select>
            <span className={styles.fromText}>From</span>
            <input
              type="text"
              placeholder="Enter your postcode"
              className={styles.input}
            />
          </div>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isNational}
              onChange={() => setIsNational(!isNational)}
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxCustom}></span>Nationwide
          </label>

          <div className={styles.footer}>
            <p className={styles.infoText}>
              <img src={iIcon} alt="" /> You can change your location at any
              time
            </p>
            <button className={styles.nextButton}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCreateAccount;
