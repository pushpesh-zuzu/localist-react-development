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
            firstblueText="localists"
            thirdText="for Professionals"
          />
          <SearchServicesPin
            className={styles.search}
            title="Localists is the go-to marketplace for connecting customers with trusted local professionals. Every day, people across the UK turn to us to find reliable experts for their projects — from home improvements to business services"
          />
        </div>
      </div>
      <HowItWorksDetail />
      <ResigterNow />
    </>
  );
}

export default HowItWorkSeller;
