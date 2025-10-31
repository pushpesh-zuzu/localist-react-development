import React from "react";
import BannerWithBreadCrum from "../../category/ServicesHeroSection/BannerWithBreadCrum";
import { Helmet } from "react-helmet-async";
import HowItWorks from "../../category/howItWorks/CloneHowitWorks";
import { TransportHowItWork, TransportPopularCategory } from "./transportData";
import GetQuotes from "../../common/getQuotes/GetQuotes";
import PopularCategories from "../../category/popularCategories/ClonePopularCategories";

import AllServiceLevel1 from "../../category/allServices/AllServiceLevel1";
import { TransportBanner } from "../images";
import CalonicalTags from "../../common/CalonicalTags/CalonicalTags";

function Transport() {
  return (
    <>
      <Helmet>
        <script>
          {`
              gtag('event', 'conversion', {
                'send_to': 'AW-17528251553/iVB9CJjZsZMbEKHJj6ZB',
                'value': 1.0,
                'currency': 'GBP'
              });
          `}
        </script>
      </Helmet>
      <CalonicalTags
        breadcrumb={[
          {
            title: "Transportation Services",
            path: "/transportation-services",
          },
        ]}
        bannerImage={TransportBanner}
      />
      <BannerWithBreadCrum
        accountHeader="Transportation Services"
        level={2}
        isNeedS={false}
        panelImage={TransportBanner}
        doYouNeetTitle={[
          "Do you need trusted",
          "local transport",
          "professionals",
        ]}
        title="transportation services"
        para1="At Localists, we connect you with the right transport providers for your needs."
        para2="From squeaky-clean sedans to stretch limos, speedy airport shuttles to big group coaches—getting from A to B has never looked so good. We’ll connect you with local transport pros who know how to move you in style (and on time)."
        para3="Not sure how to find a reliable transportation service? Simply tell us what you need—whether it’s a transfer, courier delivery, removals, or local taxi hire—and where you need it. We’ll then recommend the best professionals near you. Compare services, read verified reviews, and get free, tailored quotations for your journey."
        para4={`It’s quick, easy, and stress-free!`}
        placeholderText="Airport Transfers, Bus & Coach Hire, etc..."
      />
      <HowItWorks
        howItWorksData={TransportHowItWork}
        ctaText={"Transport Services"}
      />
      <PopularCategories data={TransportPopularCategory} />

      <AllServiceLevel1
        data={[
          {
            name: "Airport Transfers",
            path: "/airport-transfers-near-me",
          },
          //   {
          //     name: "Holiday transfers",
          //     // path: ""
          //   },
          //   {
          //     name: "Group minibus",
          //     // path: ""
          //   },
          //   {
          //     name: "Shared shuttle",
          //     //  path: ""
          //   },
          //   {
          //     name: "Special transfers",
          //     // path: ""
          //   },
        ]}
      />
      <GetQuotes ctaText={"Transport"} needSString={false} />
    </>
  );
}

export default Transport;
