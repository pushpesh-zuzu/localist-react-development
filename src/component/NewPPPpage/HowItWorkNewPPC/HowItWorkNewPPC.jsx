import React from "react";
import styles from "./HowItWorkNewPPC.module.css";
import BlueBlackH2Heading from "../UITypography/BlueBlackH2Heading";
import Paragraph from "../UITypography/Paragrah";
import Button1 from "../UITypography/Button1";
import H3 from "../UITypography/H3";
import H5 from "../UITypography/H5";
import SettingIcon from "../../../assets/ReactIcons/SettingIcon";
import VettedProffessionIcon from "../../../assets/ReactIcons/VettedProffessionIcon";
import FastTimeIcon from "../../../assets/ReactIcons/FastTimeIcon";
import GetQuotesIcon from "../../../assets/ReactIcons/GetQuotesIcon";
import PlayIcon from "../../../assets/ReactIcons/PlayIcon";
import ThreeBusinessPerson from './three-business-people-meeting.webp'
function HowItWorkNewPPC() {
  return (
    <section className={styles.container}>
      {/* Heading */}
      <div className={styles.headingWrap}>
        <BlueBlackH2Heading
          blueText="How it"
          blackText="works"
          className={styles.heading}
        />
        <H3 className={styles.topLabel} style={{ color: "#253238", marginBottom: "12px" }}>What to Expect From a Professional Driveway Installation</H3>

        <Paragraph variant="secondary" className={styles.subText}>
          Watch expert installers transform driveways from start to finish with
          precision and quality
        </Paragraph>
      </div>

      {/* Video */}
      <div className={styles.videoWrapper}>
        <img
          src={ThreeBusinessPerson}
          className={styles.videoImg}
        />
        <PlayIcon className={styles.playBtn}/>
      </div>

      {/* Features */}
      <div className={styles.features}>
        <div className={styles.featureCard}>
          <SettingIcon className={styles.icon}/>
          <H5>Expert Installation</H5>
        </div>

        <div className={styles.featureCard}>
          <VettedProffessionIcon className={styles.icon}/>
          <H5>Up to 15-Year Guarantee</H5>
        </div>

        <div className={styles.featureCard}>
          <FastTimeIcon className={styles.icon}/>
          <H5>Fast Completion</H5>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <Button1 variant="green" className={styles.button}>Get Quotes Now <GetQuotesIcon color="white"/> </Button1>
      </div>
    </section>
  );
}

export default HowItWorkNewPPC;
