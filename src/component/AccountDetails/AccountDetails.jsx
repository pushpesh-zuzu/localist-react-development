import React from "react";
import styles from "./AccountDetails.module.css";
import iIcon from "../../assets/Images/iIcon.svg";

const AccountDetails = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backText}>← Setting</div>
      <h1 className={styles.heading}>Account Details</h1>
      <div className={styles.manageWrapper}>
        <span className={styles.infoIcon}>
          <img src={iIcon} alt="iIcon" />
        </span>
        <p className={styles.description}>
          Manage your account email, phone number, password and login details.
          We’ll use these details to contact you but won’t share it with
          customers. You can control the email address and phone number that
          customers see for your business in{" "}
          <a href="#" className={styles.link}>
            My Profile
          </a>
          .
        </p>
      </div>

      <div className={styles.card}>
        <h3 className={styles.subHeading}>Contact details</h3>
        <p className={styles.note}>
          These details are used for lead notifications, and to contact you
          about important account issues. Please ensure they’re kept up-to-date.
        </p>

        <label className={styles.label}>Account email</label>
        <input
          type="email"
          className={styles.input}
          value="chander.gaur@gmail.com"
          readOnly
        />

        <label className={styles.label}>Preferred contact number</label>
        <input type="text" className={styles.input} />

        <label className={styles.label}>SMS notification number</label>
        <input type="text" className={styles.input} />
      </div>

      <div className={styles.passwordSection}>
        <h4 className={styles.subHeading}>Change password</h4>
        <p className={styles.note}>
          It’s important to keep your password up-to-date.
        </p>
        <button className={styles.button}>change password</button>
      </div>
    </div>
  );
};

export default AccountDetails;
