import React from "react";
import styles from "./LandScapingPageLandingPage.module.css";
import BuyerRegistrationForLandscapingPPC from "../BuyerRegistrationForLandscapingPPC/BuyerRegistrationForLandscapingPPC";
import logo from "../../../assets/Images/logo.svg";
import LeftbigArrow from "../../../assets/Icons/leftbigArrow.svg";
import VerfifiedIcon from "../../../assets/Icons/VerfifiedIcon.svg";
import CheckRight from "../../../assets/Icons/CheckRight.svg";
import AllUsers from "../../../assets/Icons/AllUsers.svg";

const LandScapingPageLandingPage = () => {
  return (
    <>
      <div style={{ height: "100vh", overflow: "auto" }}>
        <div style={{ height: "20px", background: "#00afe3" }} />
        <div className={styles.logoCss}>
          <img style={{height:'48px'}}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
            src={logo}
            alt="Localist Logo"
          />
        </div>
        <div className={styles.pageWrapper}>
          <div className={styles.modaWrapperlContent}>
            <BuyerRegistrationForLandscapingPPC />
          </div>
          <div className={styles.secondColumn}>
            <h3 className={styles.heading}>
              Looking for LandScaping in your area?
            </h3>
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
            <div className={styles.verifiedRow}>
              <img
                className={styles.leftbigArrow}
                src={LeftbigArrow}
                style={{ background: "transparent", height: "88px" }}
                alt="leftbigArrow"
              />

              <p className={styles.paragraphDetail}>
                Complete the form to instantly find the right professional for
                your requirement
              </p>
            </div>
          </div>
        </div>
        <div className={styles.statsWrapper}>
          <div className={styles.statBox}>
            <img
              style={{ height: "32px" }}
              src={VerfifiedIcon}
              alt="VerfifiedIcon"
            />
            <div style={{ marginLeft: "auto" }}>
              <p style={{ textAlign: "right" }}>250,000 projects</p>
              <p>completed and counting</p>
            </div>
          </div>

          <div className={styles.statBox}>
            <img style={{ height: "32px" }} src={AllUsers} alt="AllUsers" />
            <div style={{ marginLeft: "auto" }}>
              <p style={{ textAlign: "right" }}>10,000 customers </p>
              <p>connected to pros everyday</p>
            </div>
          </div>
        </div>
        <div style={{ height: "20px", background: "#00afe3" }} />
      </div>
    </>
  );
};

export default LandScapingPageLandingPage;
