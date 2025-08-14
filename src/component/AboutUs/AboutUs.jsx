import React from "react";
import BannerWrapper from "../common/bannerWrapper/BannerWrapper";
import { aboutUsBanner } from "../../assets/Images/MainBanners";
import WhoWeAre from "./WhoWeAre";
import styles from "./aboutus.module.css";
import Stats from "./Stats";
import LeadershipCard from "./LeaderShipCard";
import OurInvestor from "./OurInvestor";
import GetInTouchButton from "./GetInTouch";
function AboutUs() {
  return (
    <div>
      <BannerWrapper image={aboutUsBanner} />
      <WhoWeAre />
      <Stats />
      <LeadershipCard/>
      <OurInvestor/>
      <GetInTouchButton/>
    </div>
  );
}

export default AboutUs;
