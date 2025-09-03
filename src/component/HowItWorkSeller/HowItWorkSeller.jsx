import React from "react";
import BannerWrapper from "../common/bannerWrapper/BannerWrapper";
import SearchServicesPin from "../common/SeachServicesPin/SearchServicesPin";
import styles from "./howitworkseller.module.css";
import HowItWorksDetail from "./HowItWorkDetails";
import howitworkseller from "../../assets/Images/HowItWorks/howitworkseller.jpg";
import ResigterNow from "../howItWorks/RegisterNow/RegisterNow";
import BlueBlackTextForH1 from "../common/headings/BlueBlackTextForH1";
import { Helmet } from "react-helmet-async";

function HowItWorkSeller() {
  const style = {
    backgroundImage: `url(${howitworkseller})`,
  };
  return (
    <>
      <Helmet>
        <title>How It Works for Professionals & Businesses - Localists</title>
        <meta
          name="description"
          content="Learn how Localists connect you with ready-to-hire customers in your area. Get quality leads, grow your business, and boost your visibility online today."
        />
      </Helmet>
      <div className={styles.container} style={style}>
        <div className={styles.text}>
          <BlueBlackTextForH1
            firstblue={false}
            secondText=" How It Works –"
            firstblueText="Localists"
            thirdText="for Professionals"
          />
          <SearchServicesPin
            className={styles.search}
            title="More than 5,000 professionals across the UK already use Localists to grow their businesses, and we’re adding new opportunities daily. Instead of wasting time chasing cold leads or paying for ads that don’t work, Localists brings the right clients straight to you."
          />
        </div>
      </div>
      <HowItWorksDetail />
      <ResigterNow />
    </>
  );
}

export default HowItWorkSeller;
