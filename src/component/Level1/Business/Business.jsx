import React from "react";
import BannerWithBreadCrum from "../../category/ServicesHeroSection/BannerWithBreadCrum";
import { Helmet } from "react-helmet-async";
import HowItWorks from "../../category/howItWorks/CloneHowitWorks";
import GetQuotes from "../../common/getQuotes/GetQuotes";
import PopularCategories from "../../category/popularCategories/ClonePopularCategories";

import AllServiceLevel1 from "../../category/allServices/AllServiceLevel1";
import { BusinessBanner } from "../images";
import { BusinessHowItWork, BusinessPopularCategory } from "./businessData";

function Business() {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Find Trusted Business Professionals Near Me | Localists</title>
        <meta
          name="description"
          content="Need help finding business professionals, consultants, or expert local businesses near you? Get free quotes now at Localists. It's quick, easy & free. "
        />
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
      <BannerWithBreadCrum
        accountHeader="Business"
        heading2="Professionals"
        level={2}
        isNeedS={false}
        panelImage={BusinessBanner}
        doYouNeetTitle={["Do you need trusted", "business ", "professionals"]}
        title="Business"
        findAccountTitle2="professionals"
        para1="At Localists, we connect you with the right Business Professionals for your needs."
        para2="Not sure how to find the right Business Professionals? Simply tell us what you need help with and where you need it, and we’ll recommend the best Business Professionals near you. See what they offer, check out their reviews, and get free quotations for the work you require."
        para3="It's super fast and easy!"
        placeholderText="Business Consulting,Social Media Marketing etc..."
      />
      <HowItWorks
        howItWorksData={BusinessHowItWork}
        ctaText={"Business Professionals  "}
      />
      <PopularCategories data={BusinessPopularCategory} />

      <AllServiceLevel1
        data={[
          {
            name: "Bookkeeping Services",
            // path: "/tutors-near-me",
          },
          {
            name: "Accounting",
            // path: "/physics-maths-tutors-near-me",
          },
        ]}
      />
      <GetQuotes ctaText={"Business"} needSString={false} />
    </>
  );
}

export default Business;
