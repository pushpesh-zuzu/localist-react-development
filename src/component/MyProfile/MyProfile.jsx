import React, { useEffect, useState } from "react";
import styles from "./MyProfile.module.css";
import AccordionItem from "./AccordionItem";
import AboutAccordion from "./AboutAccordion/AboutAccordion";
import ReviewsAccordion from "./ReviewsAccordion/ReviewsAccordion";
import PhotosAccordion from "./PhotosAccordion/PhotosAccordion";
import SocialMediaAccordion from "./SocialMediaAccordion/SocialMediaAccordion";
import AccreditationsAccordion from "./AccreditationsAccordion/AccreditationsAccordion";
import QandAAccordion from "./QandAAccordion/QandAAccordion";
import { useLocation } from "react-router-dom";
import { addViewProfileList } from "../../store/LeadSetting/leadSettingSlice";
import { useDispatch, useSelector } from "react-redux";

const MyProfile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [openAccordion, setOpenAccordion] = useState(null);
  const { userToken } = useSelector((state) => state.auth); 
   const { registerData } = useSelector(
      (state) => state.findJobs
    );
      const { viewProfileData } = useSelector((state)=> state.leadSetting)
      const user_id = userToken?.id ? userToken?.id : registerData?.id;

const openAccordionHandler = (accordion) => { 
if(accordion === openAccordion) {
  setOpenAccordion(null);
}
else{
  setOpenAccordion(accordion);
}
}
 useEffect(()=>{
const isReview= location?.state?.review;
if(isReview){
setOpenAccordion("Reviews");
}

 },[])
  useEffect(()=>{
         const sellerData ={
             seller_id:user_id
         }
         dispatch (addViewProfileList(sellerData))
     },[])

  return (
    <div className={styles.container}>
      <a className={styles.backLink} href="/settings">
        ← Setting
      </a>
      <h2 className={styles.title}>
        Your profile is <span className={styles.percent}>27% complete</span>
      </h2>
      {/* <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
      </div> */}
      <div className={styles.progressBarContainer}>
  <div className={styles.progressBar}>
    <div className={styles.progressFill}>
      <div className={styles.progressCircle}></div>
    </div>
  </div>
</div>
      <h4 className={styles.subHeading}>
        Take two minutes to improve your profile
      </h4>
      <p className={styles.description}>
        Make the best first impression with a great profile — this is what
        customers will look at first when choosing which professional to hire.
      </p>
      <a className={styles.profileLink}  href={`/view-profile/${user_id}`}>
        View public profile
      </a>

      <div style={{ marginTop: "30px" }}>
        <AccordionItem title="About" isOpen={openAccordion ==="About"} onClick={() => openAccordionHandler("About")}>
          <AboutAccordion details={viewProfileData} />
        </AccordionItem>

        <AccordionItem title="Reviews" isOpen={openAccordion ==="Reviews"} onClick={() => openAccordionHandler("Reviews")}>
          <ReviewsAccordion  
          />
        </AccordionItem>

        <AccordionItem title="Photos" isOpen={openAccordion ==="Photos"} onClick={() => openAccordionHandler("Photos")}>
          <PhotosAccordion details={viewProfileData?.user_details} />
        </AccordionItem>

        <AccordionItem title="Social media & links"  isOpen={openAccordion ==="Social Media"} onClick={() => openAccordionHandler("Social Media")}>
          <SocialMediaAccordion details={viewProfileData?.user_details}/>
        </AccordionItem>

        <AccordionItem title="Accreditations" isOpen={openAccordion ==="Accreditations"} onClick={() => openAccordionHandler("Accreditations")} >
          <AccreditationsAccordion details={viewProfileData?.accreditations} />
        </AccordionItem>

        <AccordionItem title="Q&As" isOpen={openAccordion ==="Q&As"} onClick={() =>openAccordionHandler("Q&As")}>
          <QandAAccordion details={viewProfileData?.qa}/>
        </AccordionItem>
      </div>
    </div>
  );
};

export default MyProfile;
