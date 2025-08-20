import React from "react";
import BannerWrapper from "../common/bannerWrapper/BannerWrapper";
import { aboutUsBanner } from "../../assets/Images/MainBanners";
import WhoWeAre from "./WhoWeAre";
import styles from "./aboutus.module.css";
import Stats from "./Stats";
import LeadershipCard from "./LeaderShipCard";
import OurInvestor from "./OurInvestor";
import GetInTouchButton from "./GetInTouch";
import { Helmet } from "react-helmet-async";
function AboutUs() {
  return (
    <div>
      <Helmet>
        <title>Meet Our Leadership Team & Investors - Localists</title>
        <meta
          name="description"
          content="Meet our experienced leadership team and the investors driving Localists, the world’s fastest-growing local services marketplace. Get free quotes."
        />
      </Helmet>
      <BannerWrapper headingText="About Us" image={aboutUsBanner} />
      <WhoWeAre />
      <Stats />
      <LeadershipCard />
      {/* <OurInvestor/> */}
      <GetInTouchButton />
    </div>
  );
}

export default AboutUs;
