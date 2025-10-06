import React, { useEffect, useState } from "react";
import styles from "./LandScapingPageLandingPage.module.css";
import BuyerRegistrationForLandscapingPPC from "../BuyerRegistrationForLandscapingPPC/BuyerRegistrationForLandscapingPPC";
import logo from "../../../assets/Images/logo.svg";
import VerfifiedIcon from "../../../assets/Icons/VerfifiedIcon.svg";
import CheckRight from "../../../assets/Icons/CheckRight.svg";
import AllUsers from "../../../assets/Icons/AllUsers.svg";
import Direction from "../../../assets/Icons/Direction.svg";
const LandScapingPageLandingPage = () => {
  return (
    <>
      <div className={styles.pageWrapper}>
          <BuyerRegistrationForLandscapingPPC />
        </div>
        <div className={styles.secondColumn}>
          <h1 className={styles.heading}>
            Looking for Landscaping in your area?
          </h1>
          <p className={styles.paragraph}>
            Find a local landscaping pro on Localists in seconds
          </p>
          <div className={styles.verifiedRow}>
            <img
              src={CheckRight}
              className={styles.verifiedIcon}
              alt="CheckRight"
            />
            <p className={styles.paragraphDetail}>
              We only use verified and vetted professionals
            </p>
          </div>
          <div className={styles.verifiedRow}>
            <img
              src={CheckRight}
              className={styles.verifiedIcon}
              alt="CheckRight"
            />
            <p className={styles.paragraphDetail}>
              Compare price from multiple professionals
            </p>
          </div>
          <div className={styles.verifiedRow}>
            <img
              src={CheckRight}
              className={styles.verifiedIcon}
              alt="CheckRight"
            />
            <p className={styles.paragraphDetail}>
              Hire the one thats right for you
            </p>
          </div>
          <div className={styles.verifiedRowComplet}>
            <img
              className={styles.leftbigArrow}
              src={Direction}
              alt="leftbigArrow"
            />

            <p
              className={styles.paragraphTextDesktop}
              style={{ fontWeight: 600 }}
            >
              Complete the form instantly to find out the right professional
              <br />
              <span>for your requirement.</span>
            </p>
            <p
              className={styles.paragraphTextMobile}
              style={{ fontWeight: 600 }}
            >
              Complete the form instantly to find out the right professional for
              your requirement.
            </p>
          </div>
        </div>
      <div className={styles.statsWrapper}>
        <div className={styles.statBox}>
          <img
            style={{ height: "20px", width: "20px" }}
            src={VerfifiedIcon}
            alt="VerfifiedIcon"
          />
          <div>
            <p style={{ textAlign: "left" }}>250,000 projects</p>
            <p>completed and counting</p>
          </div>
        </div>

        <div className={styles.statBox}>
          <img
            style={{ height: "20px", width: "20px" }}
            src={AllUsers}
            alt="AllUsers"
          />
          <div>
            <p style={{ textAlign: "left" }}>10,000 customers </p>
            <p>connected to pros everyday</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandScapingPageLandingPage;
