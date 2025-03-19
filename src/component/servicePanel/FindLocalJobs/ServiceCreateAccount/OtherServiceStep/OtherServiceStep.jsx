import React from "react";
import styles from "./OtherServiceStep.module.css";

const OtherServiceStep = () => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Add other services you can provide</h2>
        <p className={styles.subtitle}>Maximise your leads</p>

        <div className={styles.card}>
          <p className={styles.label}>
            You've asked for leads for:{" "}
            <span className={styles.serviceTag}>House Cleaning</span>
          </p>

          <p className={styles.secondaryLabel}>
            We will also show you leads from
          </p>

          <div className={styles.selectedServices}>
            <span className={styles.selectedTag}>
              We will also show you leads from{" "}
              <button className={styles.removeBtn}>✕</button>
            </span>
            <span className={styles.selectedTag}>
              We will also show you leads from{" "}
              <button className={styles.removeBtn}>✕</button>
            </span>
          </div>

          <input
            type="text"
            placeholder="Search for more services..."
            className={styles.searchBox}
          />

          <label className={styles.checkboxContainer}>
            <input type="checkbox" className={styles.checkbox} />
            Auto Bid
          </label>

          <div className={styles.dropdownWrapper}>
            <select className={styles.dropdown}>
              <option>5 Miles</option>
            </select>
            <button className={styles.expandBtn}>Expand Radius</button>
          </div>

          <div className={styles.leadInfo}>
            <span className={styles.leadCount}>1060</span>
            <span className={styles.leadText}>current available leads</span>
          </div>

          <button className={styles.nextBtn}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default OtherServiceStep;
