import React from "react";
import styles from "./WhatServiceYouNeed.module.css";

const WhatServiceYouNeed = ({ nextStep }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>What service do you need?</h2>
      <div className={styles.formGroup}>
        <label className={styles.label}>What service do you need?</label>
        <input
          type="text"
          placeholder="e.g. Personal Trainers, House Cleaning"
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Where do you need it?</label>
        <input
          type="text"
          placeholder="Enter your ZIP code or town"
          className={styles.input}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={nextStep}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default WhatServiceYouNeed;
