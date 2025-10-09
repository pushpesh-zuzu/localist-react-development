import React, { useEffect, useState } from "react";
import styles from "./LandScapingPageLandingPage.module.css";
import BuyerRegistrationForLandscapingPPC from "../BuyerRegistrationForLandscapingPPC/BuyerRegistrationForLandscapingPPC";
import logo from "../../../assets/Images/logo.svg";
import VerfifiedIcon from "../../../assets/Icons/VerfifiedIcon.svg";
import CheckRight from "../../../assets/Icons/CheckRight.svg";
import AllUsers from "../../../assets/Icons/AllUsers.svg";
import Icon from "../../../assets/Icons/Icon.png";
import topBigArrow from "../../../assets/Icons/topBigArrow.png";

import { Helmet } from "react-helmet-async";
const LandScapingPageLandingPage = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className={styles.pageWrapper}>
        <BuyerRegistrationForLandscapingPPC />

        <div className={styles.secondColumn}>
          <div className={styles.verifiedRowCompletMobile}>
            <img
              className={styles.topBigArrow}
              // style={{position:'absolute',left:'35%',bottom:'50%'}}
              src={topBigArrow}
              alt="leftbigArrow"
            />
            <p className={styles.paragraphTextMobile}>
              Complete the form instantly to find out the right professional for
              your requirement.
            </p>
          </div>
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
              Compare prices from multiple professionals
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
              src={Icon}
              alt="leftbigArrow"
            />

            <p className={styles.paragraphTextDesktop}>
              Complete the form instantly to find out the right professional
              <br />
              <span>for your requirement.</span>
            </p>
          </div>
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
