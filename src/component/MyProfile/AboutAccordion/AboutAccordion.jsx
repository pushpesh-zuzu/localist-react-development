import React from "react";
import styles from "./AboutAccordion.module.css";
import defaultImage from "../../../assets/Images/DefaultProfileImage.svg";
import iIcon from "../../../assets/Images/iIcon.svg";

const AboutAccordion = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h3>Company name & logo</h3>
        <p>
          This is the first thing customers will see when searching for a
          professional. <br />
          As a sole-trader, you can just enter your name.
        </p>
        <div className={styles.imageSection}>
          <img src={defaultImage} alt="Default Logo" />
          <button className={styles.uploadBtn}>Upload new picture</button>
        </div>
        <label className={styles.label}>Company name</label>
        <input
          className={styles.input}
          type="text"
          placeholder="ABC Pvt. Ltd."
        />
      </div>

      <div className={styles.card}>
        <h3>Name and profile picture</h3>
        <p>
          This is the person who will be communicating with customers on Bark.
          The photo will appear alongside your messages with customers.
        </p>
        <div className={styles.imageSection}>
          <img src={defaultImage} alt="Default Profile" />
          <div className={styles.buttonGroup}>
            <button className={styles.uploadBtn}>Upload new picture</button>
            <button className={styles.webcamBtn}>Upload using Webcam</button>
          </div>
        </div>
        <label className={styles.label}>Name</label>
        <input className={styles.input} type="text" placeholder="Chander" />
      </div>

      <div className={styles.card}>
        <h3>Company contact details</h3>
        <p>
          This information will be seen by customers on Bark. Change the details
          Bark uses to contact you privately in{" "}
          <a href="#!" className={styles.link}>
            Account Details
          </a>
          .
        </p>
        <div className={styles.imageSection}>
          <img src={defaultImage} alt="Default Contact" />
          <div className={styles.buttonGroup}>
            <button className={styles.uploadBtn}>Upload new picture</button>
            <button className={styles.webcamBtn}>Upload using Webcam</button>
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.halfInput}>
            <label className={styles.label}>Company email address</label>
            <input className={styles.input} type="text" placeholder="Chander" />
          </div>
          <div className={styles.halfInput}>
            <label className={styles.label}>Company phone number</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Company phone number"
            />
          </div>
        </div>
        <label className={styles.label}>Website</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Company Website"
        />
      </div>

      <div className={styles.infoCard}>
        <h3 className={styles.companyLocation}>Company location</h3>
        <div className={styles.infoSubtext}>
          This will not affect the areas where you offer or provide services.
        </div>
        <p className={styles.secondaryText}>
          Use a specific address to help customers searching for a local
          business.
        </p>
        <label className={styles.label}>What’s the business location?</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter the company’s address"
        />
        <div className={styles.checkboxRow}>
          <input type="checkbox" id="dontShow" />
          <label className={styles.DontLabel} htmlFor="dontShow">
            Don’t show this on my profile{" "}
            <span className={styles.infoIcon}>
              <img src={iIcon} alt="" />
            </span>
          </label>
        </div>
        <label className={styles.label}>
          Can’t give us a particular location?
        </label>
        <select className={`${styles.input} ${styles.customSelect}`}>
          <option>Select a reason</option>
        </select>
      </div>

      <div className={styles.infoCard}>
        <h3 className={styles.aboutCompany}>About the company</h3>
        <p className={styles.secondaryTextCustomers}>
          Introduce the company to your customers.
        </p>
        <div className={styles.flexRow}>
          <div className={styles.flexItem}>
            <label className={styles.label}>Company size</label>
            <select className={`${styles.input} ${styles.customSelect}`}>
              <option>2–10 employees</option>
            </select>
          </div>
          <div className={styles.flexItem}>
            <label className={styles.label}>Years in business</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Number of years"
            />
          </div>
        </div>
        <label className={styles.label}>Describe your company</label>
        <textarea
          className={styles.textarea}
          rows={5}
          placeholder="What sets you apart from other businesses?"
        />
        <p className={styles.charLimit}>Minimum 30 characters</p>
        <a href="#!" className={styles.link}>
          Use our free online tool to write the perfect description of your
          business
        </a>
      </div>

      <div className={styles.buttonRow}>
        <button className={styles.cancelBtn}>Cancel</button>
        <button className={styles.saveBtn}>Save</button>
      </div>
    </div>
  );
};

export default AboutAccordion;
