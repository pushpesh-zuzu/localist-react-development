import React from "react";
import BannerWithBreadCrum from "../../category/ServicesHeroSection/BannerWithBreadCrum";
import { Helmet } from "react-helmet-async";
import HowItWorks from "../../category/howItWorks/CloneHowitWorks";
import GetQuotes from "../../common/getQuotes/GetQuotes";
import PopularCategories from "../../category/popularCategories/ClonePopularCategories";

import AllServiceLevel1 from "../../category/allServices/AllServiceLevel1";
import { HealthandWellness } from "../images";
import {
  HealthAndWellnessHowItWork,
  HealthAndWellnessPopularCategory,
} from "./healthAndWellnessData";
import CalonicalTags from "../../common/CalonicalTags/CalonicalTags";

function HealthAndWellness() {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Health & Wellness Professionals Near Me | Localists</title>
        <meta
          name="description"
          content=" Find trusted health and wellness professionals near you. Get free quotes for fitness, therapy, massage, and counselling services."
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
      <CalonicalTags breadcrumb={[{ title: "Health", path: "/health" }]} />
      <BannerWithBreadCrum
        accountHeader="Health & Wellness"
        heading2="Professionals"
        level={2}
        isNeedS={false}
        panelImage={HealthandWellness}
        doYouNeetTitle={[
          "Do you need trusted local ",
          "health and wellness",
          "professionals",
        ]}
        title="health & wellness"
        findAccountTitle2="professionals"
        para1="At Localists, we connect you with trusted health and wellness professionals who can support every aspect of your well-being."
        para2="Whether you want to get fit, relieve stress, improve your mental health, or enhance your lifestyle, we have the right experts for you. From personal trainers and massage therapists to therapists, counsellors, and nutrition professionals—our vetted specialists are here to help you achieve your goals."
        para3="Not sure how to find the right health and wellness professional? Simply share the services you need and your location, and we’ll recommend the best professionals near you. Compare services, read verified reviews, and get free, tailored quotations to start your wellness journey today."
        para4="It’s quick, easy, and stress-free!"
        placeholderText="Massage Therapy, Personal Trainers etc..."
      />
      <HowItWorks
        howItWorksData={HealthAndWellnessHowItWork}
        ctaText={"Health & Wellness Professionals"}
      />
      <PopularCategories data={HealthAndWellnessPopularCategory} />

      <AllServiceLevel1
        data={[
          {
            name: "Personal Trainers",
            // path: "/tutors-near-me",
          },
          {
            name: "Massage Therapy",
            // path: "/physics-maths-tutors-near-me",
          },
        ]}
      />
      <GetQuotes ctaText={"Health & Wellness "} needSString={false} />
    </>
  );
}

export default HealthAndWellness;
