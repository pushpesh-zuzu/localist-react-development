import React from "react";
import styles from "./DrawOnMapModal.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";

const DrawOnMapModal = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2 className={styles.title}>Draw on a map</h2>

        <p className={styles.description}>
          <span className={styles.infoIcon}>
            <img src={iIcon} alt="" />
          </span>
          You can add multiple drawn areas to define the specific places you
          provide services.
        </p>

        <div className={styles.areaButtonGroup}>
          <button className={`${styles.areaButton} `}>+ Add new area</button>
          <button className={styles.areaButton}>🖉 Edit an area</button>
          <button className={styles.areaButton}>⬤ Remove an area</button>
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

export default DrawOnMapModal;
