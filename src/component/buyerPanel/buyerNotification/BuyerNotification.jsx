import React from "react";
import styles from "./BuyerNotification.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";

const notifications = [
  "Changes to my requests",
  "Reminders to reply to Professionals",
  "Updates about new features on Localists",
];

const BuyerNotification = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Notifications</h2>
      <div className={styles.infoBox}>
        <span className={styles.infoIcon}>
          <img src={iIcon} alt="" />
        </span>
        <span>Choose what you’d like to be emailed about</span>
      </div>
      <div className={styles.notificationList}>
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`${styles.notificationItem} ${
              index >= 0 ? styles.shadow : ""
            }`}
          >
            <span>{notification}</span>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerNotification;
