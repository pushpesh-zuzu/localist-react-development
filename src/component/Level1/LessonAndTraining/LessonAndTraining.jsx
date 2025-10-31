import React from "react";
import BannerWithBreadCrum from "../../category/ServicesHeroSection/BannerWithBreadCrum";
import { Helmet } from "react-helmet-async";
import HowItWorks from "../../category/howItWorks/CloneHowitWorks";
import {
  LessionAndTrainingHowItWork,
  LessionAndTrainingPopularCategory,
} from "./lessonAndTrainingData";
import GetQuotes from "../../common/getQuotes/GetQuotes";
import PopularCategories from "../../category/popularCategories/ClonePopularCategories";

import AllServiceLevel1 from "../../category/allServices/AllServiceLevel1";
import { LessonsAndTraining } from "../images";
import CalonicalTags from "../../common/CalonicalTags/CalonicalTags";

function LessonAndTraining() {
  return (
    <>
      <Helmet>
        <title>Lessons & Training From Local Experts | Localists</title>
        <meta
          name="description"
          content="Develop a skill, and get lessons in anything from driving to academics with trusted local tutors and trainers. Get your free quote now!"
        />
      </Helmet>
      <CalonicalTags
        breadcrumb={[
          { title: "Lessons & Training", path: "/lessons-training" }, // no path for last item
        ]}
      />
      <BannerWithBreadCrum
        accountHeader=" Lessons & Training Services"
        level={2}
        isNeedS={false}
        panelImage={LessonsAndTraining}
        doYouNeetTitle={[
          "Looking to develop",
          "yourself or learn",
          "a new skill",
        ]}
        title="Lessons & Training Services"
        para1="At Localists, we connect you with the right instructors and trainers to help you achieve your goals. Whether you’re looking to improve your skills, learn something new, or prepare for a big exam, we’ve got you covered. From academic tutoring and music lessons to fitness training, driving lessons, or professional development courses – there’s a local expert ready to guide you."
        para2="Not sure where to start? Simply tell us what type of training you need and your location.
 We’ll match you with trusted local professionals. Compare services, read verified reviews, and get free, no-obligation quotes tailored to your needs."
        para3="It’s quick, easy, and completely stress-free!"
        placeholderText="Tutoring, Piano Lessons, Driving Lessons etc..."
        inputLable1="Which type of lessons or training are you looking for?"
      />
      <HowItWorks
        howItWorksData={LessionAndTrainingHowItWork}
        ctaText={"Lessons & Training Services"}
      />
      <PopularCategories data={LessionAndTrainingPopularCategory} />

      <AllServiceLevel1
        data={[
          {
            name: "Tutors",
            path: "/tutors-near-me",
          },
          {
            name: "Physics And Maths Tutors",
            path: "/physics-maths-tutors-near-me",
          },
        ]}
      />
      <GetQuotes ctaText={" Lessons & Training"} needSString={false} />
    </>
  );
}

export default LessonAndTraining;
