import React from "react";
import BannerWrapper from "../common/bannerWrapper/BannerWrapper";
import SearchServicesPin from "../common/SeachServicesPin/SearchServicesPin";
import WithBlueTextBlack from "../common/headings/WithBlueTextBlack";
import styles from "./howitworkseller.module.css";
import HowItWorksDetail from "./HowItWorkDetails";
import howitworkseller from "../../assets/Images/HowItWorks/howitworkseller.jpg";
import ResigterNow from "../howItWorks/RegisterNow/RegisterNow";

function HowItWorkSeller() {
const style = {
    backgroundImage: `url(${howitworkseller})`,
  };  return (
    <>
      <div className={styles.container} style={style}>
        <div className={styles.text} >
          <WithBlueTextBlack
            firstblue={false}
            secondText=" How It Works –"
            firstblueText="localists"
            thirdText="for Professionals"
          />
        <SearchServicesPin className={styles.search} title="Localists is the go-to marketplace for connecting customers with trusted local professionals. Every day, people across the UK turn to us to find reliable experts for their projects — from home improvements to business services" />
        </div>
      </div>
      <HowItWorksDetail />
      <ResigterNow />
    </>
  );
}

export default HowItWorkSeller;
