import React from "react";
import styles from "./MyProfile.module.css";
import AccordionItem from "./AccordionItem";
import AboutAccordion from "./AboutAccordion/AboutAccordion";
import ReviewsAccordion from "./ReviewsAccordion/ReviewsAccordion";
import PhotosAccordion from "./PhotosAccordion/PhotosAccordion";
import SocialMediaAccordion from "./SocialMediaAccordion/SocialMediaAccordion";
import AccreditationsAccordion from "./AccreditationsAccordion/AccreditationsAccordion";

const MyProfile = () => {
  return (
    <div className={styles.container}>
      <a className={styles.backLink} href="/settings">
        ← Setting
      </a>
      <h2 className={styles.title}>
        Your profile is <span className={styles.percent}>27% complete</span>
      </h2>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
      </div>
      <h4 className={styles.subHeading}>
        Take two minutes to improve your profile
      </h4>
      <p className={styles.description}>
        Make the best first impression with a great profile — this is what
        customers will look at first when choosing which professional to hire.
      </p>
      <a className={styles.profileLink} href="/public-profile">
        View public profile
      </a>

      <div style={{ marginTop: "30px" }}>
        <AccordionItem title="About">
          <AboutAccordion />
        </AccordionItem>

        <AccordionItem title="Reviews">
          <ReviewsAccordion />
        </AccordionItem>

        <AccordionItem title="Photos">
          <PhotosAccordion />
        </AccordionItem>

        <AccordionItem title="Social media & links">
          <SocialMediaAccordion />
        </AccordionItem>

        <AccordionItem title="Accreditations">
          <AccreditationsAccordion />
        </AccordionItem>

        <AccordionItem title="Q&As">
          <AboutAccordion />
        </AccordionItem>
      </div>
    </div>
  );
};

export default MyProfile;
