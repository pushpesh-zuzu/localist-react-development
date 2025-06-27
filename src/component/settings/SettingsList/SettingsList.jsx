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
    navigate("/settings/account_details");
  };

  const handleMyProfile = () => {
    navigate("/settings/my_profile");
  };
  const handleMycredit = () => {
    navigate("/mycredits")
  }
  const handleReview = () => {

    navigate("/settings/my_profile", {
      state: { review: true }
    })
  }
  const handleInvoice = () => {
    navigate("/invoice-billing")
  }
  const handlePayment = () => {
    navigate("/payment-details")
  }
  const handleMail =()=>{
    navigate("/e-mail-notification")
  }
  const handleBrowser = () => {
    navigate("/browser-notification")
  }
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
          <div className={styles.sectionContent}>
            <div
              className={styles.card}
              style={{ backgroundColor: "#FFD5D2" }}
              onClick={handleMyProfile}
            >
              <span>My Profile</span>
            </div>

            <p>
            Make your profile stand out to win more customers. Highlight what makes your business unique and why people should choose you.
            </p>
            <div className={styles.card} style={{ backgroundColor: "#FFD5D2" }} onClick={handleReview}>
              <span>Reviews</span>
            </div>
            <p>
             Download the Localists.com badges and help boost your business Our badges increase the trustworthiness of your website and can help increase online visibility. 
            </p>
            <div
              className={styles.card}
              style={{ backgroundColor: "#FFD5D2" }}
              onClick={handleAccountSetting}
            >
              <span>Account details</span>
            </div>
            <p>
           The login details and contact number we’ll use to reach you directly when needed.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.myLeadSettingWrapper}>
              <img src={myLeadSetting} alt="My Profile" />
            </div>
            <h2>Lead Setting</h2>
          </div>
          <div className={styles.sectionContent}>
            <div
              className={styles.card}
              style={{ backgroundColor: "#AAC9D2" }}
              onClick={handleMyService}
            >
              <span>My Services</span>
            </div>
            <p>
           Tell us what you do, and we’ll send you the leads that fit your services best.
            </p>
            <div
              className={styles.card}
              style={{ backgroundColor: "#AAC9D2" }}
              onClick={handleMyService}
            >
              <span>My Locations</span>
            </div>
            <p>Add or Update the locations where you provide your services.</p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.myLeadSettingWrappers}>
              <img src={myCredits} alt="My Profile" />
            </div>
            <h2>My Credits</h2>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.card} style={{ backgroundColor: "#CBD2AA" }} 
            onClick={handleMycredit}
            >
              <span>My credits</span>
            </div>
            <p>View your credit history and top up credits to connect with more customers.</p>
            <div className={styles.card} style={{ backgroundColor: "#CBD2AA" }} 
            onClick={handleInvoice}
            >
              <span>Invoices and billing details</span>
            </div>
            <p>Access invoices & Update Billing Information.</p>
            <div className={styles.card} style={{ backgroundColor: "#CBD2AA" }} 
            onClick={handlePayment}
            >
              <span>My payment details</span>
            </div>
            <p>Access & Update payment details.</p>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.myProfileWrappers}>
              <img src={myNotification} alt="My Profile" />
            </div>
            <h2>Notifications</h2>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.card} style={{ backgroundColor: "#82FFB2" }}
            onClick={handleMail}
            >
              <span>Email</span>
            </div>
            <p>Let us know which emails you’d like to get from us.</p>
            <div className={styles.card} style={{ backgroundColor: "#82FFB2" }}
             onClick={handleBrowser}
            >
              <span>Browser</span>
            </div>
            <p>
              Select the browser notifications you want to get from us.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsList;
