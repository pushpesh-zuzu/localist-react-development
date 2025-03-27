import React from "react";
import styles from "./BuyerAccountSettings.module.css";
import iIcon from "../../assets/Images/iIcon.svg";
import DefaultProfileImage from "../../assets/Images/DefaultProfileImage.svg";

const BuyerAccountSettings = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Account settings</h2>

      <div className={styles.infoBox}>
        <p>
          <span>
            <img src={iIcon} alt="" />
          </span>
          Keep your details updated so that professionals can get in touch. If
          you no longer require the service, please close the request.
        </p>
        <button className={styles.requestButton}>Go to My Requests</button>
      </div>

      <div className={styles.detailsBox}>
        <h3 className={styles.subHeading}>My details</h3>

        <div className={styles.profileSection}>
          <div className={styles.profileImage}>
            <img src={DefaultProfileImage} alt="" />
          </div>
          <div className={styles.uploadButtons}>
            <button className={styles.uploadButton}>Upload</button>
            <button className={styles.uploadButton}>Take Photo</button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Name</label>
          <input type="text" className={styles.inputField} />
        </div>

        <div className={styles.formGroup}>
          <label>Phone number</label>
          <input type="text" className={styles.inputField} />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" className={styles.inputField} />
        </div>

        <div className={styles.formGroupPassword}>
          <label>Password</label>
          <button className={styles.changePasswordButton}>
            Change Password
          </button>
        </div>
      </div>
      <div className={styles.saveButtonWrapper}>
        <button className={styles.saveButton}>Save Changes</button>
      </div>
    </div>
  );
};

export default BuyerAccountSettings;
