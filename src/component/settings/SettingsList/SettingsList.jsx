import React from "react";
import styles from "./SettingsList.module.css";
import myProfile from "../../../assets/Images/Setting/profileImg.svg";
import myLeadSetting from "../../../assets/Images/Setting/settingImg.svg";
import myCredits from "../../../assets/Images/Setting/creditcard.svg";
import myNotification from "../../../assets/Images/Setting/notificationImg.svg";
import { useNavigate } from "react-router-dom";

const SettingsList = () => {
  const navigate = useNavigate();
  const handleMyService = () => {
    navigate("/leads/settings");
  };
  const handleAccountSetting = () => {
    navigate("/account/setting");
  };
  return (
    <>
      <div className="container">
        <div className={styles.SettingWrapper}>
          <h1>Settings</h1>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.myProfileWrapper}>
              <img src={myProfile} alt="My Profile" />
            </div>
            <h2>My Profile</h2>
          </div>
          <div className={styles.card} style={{ backgroundColor: "#FCE5E3" }}>
            <h3>My Profile</h3>
          </div>
          <p>
            Your profile is key to attracting customers on Bark. Use it to
            explain what makes you different from your competition & why people
            should work with you
          </p>
          <div className={styles.card} style={{ backgroundColor: "#FCE5E3" }}>
            <h3>Reviews</h3>
          </div>
          <p>
            Reviews help you stand out. Learn how to use them to boost your
            business
          </p>
          <div
            className={styles.card}
            style={{ backgroundColor: "#FCE5E3" }}
            onClick={handleAccountSetting}
          >
            <h3>Account details</h3>
          </div>
          <p>
            The email address and password you use to log in, and the phone
            numbers we use to contact you privately
          </p>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.myLeadSettingWrapper}>
              <img src={myLeadSetting} alt="My Profile" />
            </div>
            <h2>Lead Setting</h2>
          </div>
          <div
            className={styles.card}
            style={{ backgroundColor: "#AAC9D2" }}
            onClick={handleMyService}
          >
            <h3>My Services</h3>
          </div>
          <p>
            Tell us what services you provide so we can send relevant leads.
          </p>
          <div
            className={styles.card}
            style={{ backgroundColor: "#AAC9D2" }}
            onClick={handleMyService}
          >
            <h3>My Locations</h3>
          </div>
          <p>Tell us what locations you provide your services in.</p>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.myLeadSettingWrapper}>
              <img src={myCredits} alt="My Profile" />
            </div>
            <h2>My Credits</h2>
          </div>
          <div className={styles.card} style={{ backgroundColor: "#CBD2AA" }}>
            <h3>My credits</h3>
          </div>
          <p>View credit history & buy credits to contact more customers</p>
          <div className={styles.card} style={{ backgroundColor: "#CBD2AA" }}>
            <h3>Invoices and billing details</h3>
          </div>
          <p>View your invoices and manage your billing details</p>
          <div className={styles.card} style={{ backgroundColor: "#CBD2AA" }}>
            <h3>My payment details</h3>
          </div>
          <p>Your payment settings</p>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.myProfileWrapper}>
              <img src={myNotification} alt="My Profile" />
            </div>
            <h2>Notifications</h2>
          </div>
          <div className={styles.card} style={{ backgroundColor: "#82FFB2" }}>
            <h3>Email</h3>
          </div>
          <p>Set what type of emails you'd like to receive from us</p>
          <div className={styles.card} style={{ backgroundColor: "#82FFB2" }}>
            <h3>Browser</h3>
          </div>
          <p>
            Set what type of notifications from us you'd like to receive in your
            web browser
          </p>
        </div>
      </div>
    </>
  );
};

export default SettingsList;
