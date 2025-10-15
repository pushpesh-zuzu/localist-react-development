import React, { useEffect, useRef, useState } from "react";
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
import blackArrow from "../../assets/Images/Leads/blackArrowRight.svg";
import { setIsDirtyRedux } from "../../store/MyProfile/myProfileSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { OAuth_Client_ID } from "../../Api/axiosInstance";
// import { Collapse } from "antd";
// import ProfileArrowUp from "../../assets/Icons/ProfileArrow.svg"

const MyProfile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [openAccordion, setOpenAccordion] = useState(null);

  const { isDirtyRedux } = useSelector((state) => state.myProfile);

  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const { viewProfileData } = useSelector((state) => state.leadSetting);
  // const { Panel } = Collapse;
  const user_id = userToken?.id ? userToken?.id : registerData?.id;
  // Refs for each accordion section
  const sectionRefs = {
    About: useRef(null),
    Reviews: useRef(null),
    Photos: useRef(null),
    "Social Media": useRef(null),
    Accreditations: useRef(null),
    "Q&As": useRef(null),
  };

  const confirmNavigation = (callback) => {
    if (isDirtyRedux) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (!confirmLeave) return false;
      dispatch(setIsDirtyRedux(false));
    }
    callback();
    return true;
  };

  const openAccordionHandler = (accordion) => {
    const handleOpen = () => {
      if (accordion === openAccordion) {
        setOpenAccordion(null);
      } else {
        setOpenAccordion(accordion);

        // Scroll with offset to ensure title is visible
        setTimeout(() => {
          const el = sectionRefs[accordion]?.current;
          if (el) {
            const yOffset = -100; // Adjust this offset based on your header height
            const y =
              el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 200);
      }
    };

    // Wrap with confirmNavigation check
    if (isDirtyRedux) {
      confirmNavigation(handleOpen);
    } else {
      handleOpen();
    }
  };

  const companySlug = viewProfileData?.company_name
    ? viewProfileData.company_name.replace(/\s+/g, "-")
    : viewProfileData?.name
    ? viewProfileData.name.replace(/\s+/g, "-")
    : "";

  const randomKey = user_id; //Math.random().toString(36).substring(2, 8);

  useEffect(() => {
    const isReview = location?.state?.review;
    if (isReview) {
      setOpenAccordion("Reviews");
    }
  }, [location]);

  useEffect(() => {
    const sellerData = {
      seller_id: user_id,
    };
    dispatch(addViewProfileList(sellerData));
  }, [dispatch, user_id]);

  //   const items = [
  //   {
  //     key: "1",
  //     title: "About",
  //     content: (<>  <AboutAccordion details={viewProfileData} /></>)
  //   },
  //   {
  //     key: "2",
  //     title: "Reviews",
  //     content: (<> <ReviewsAccordion /></>),
  //   },
  //   {
  //     key: "3",
  //     title: "Photos",
  //     content: (<>     <PhotosAccordion details={viewProfileData?.user_details} /></>),
  //   },
  //   {
  //     key: "4",
  //     title: "Social media & links",
  //     content: (<>  <SocialMediaAccordion details={viewProfileData?.user_details} /></>),
  //   },
  //   {
  //     key: "5",
  //     title: "Accreditations",
  //     content: (<> <AccreditationsAccordion details={viewProfileData?.accreditations} /></>)
  //   },
  //   {
  //     key: "6",
  //     title: "Q&As",
  //     content: (
  //      (<>  <QandAAccordion details={viewProfileData?.qa} /></>)
  //     ),
  //   },

  // ];

  return (
    <div className={styles.container}>
      <a className={styles.backLink} href="/settings">
        <img src={blackArrow} alt="..." /> Settings
      </a>

      <h2 className={styles.title}>
        Your profile is{" "}
        <span className={styles.percent}>
          {viewProfileData?.percentage_completed}% complete
        </span>
      </h2>

      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${viewProfileData?.percentage_completed || 0}%`,
            }}
          >
            <div className={styles.progressCircle}></div>
          </div>
        </div>
      </div>

      <h4 className={styles.subHeading}>
        Take a moment to enhance your profile
      </h4>
      <p className={styles.description}>
        Your profile is your first chance to impress customers on Localists.com
        — a complete profile helps you stand out and win more work.
      </p>

      {companySlug && (
        <a
          className={styles.profileLink}
          href={`/view-profile/${companySlug.toLowerCase()}/${randomKey}`}
          // href={`/review/${companySlug.toLowerCase()}/${userToken.uuid}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View public profile
        </a>
      )}

      <div style={{ marginTop: "30px" }}>
        <div ref={sectionRefs["About"]}>
          <AccordionItem
            title="About"
            isOpen={openAccordion === "About"}
            onClick={() => openAccordionHandler("About")}
          >
            <AboutAccordion
              details={viewProfileData}
              setIsDirty={() => dispatch(setIsDirtyRedux(true))}
            />
          </AccordionItem>
        </div>

        <div ref={sectionRefs["Reviews"]}>
          <AccordionItem
            title="Reviews"
            isOpen={openAccordion === "Reviews"}
            onClick={() => openAccordionHandler("Reviews")}
          >
            <GoogleOAuthProvider clientId="1090455090567-4tao1nnrogtke2fgf4ad00p17en31pfc.apps.googleusercontent.com">
              <ReviewsAccordion
                details={viewProfileData?.reviews}
                setIsDirty={() => dispatch(setIsDirtyRedux(true))}
              />
            </GoogleOAuthProvider>
          </AccordionItem>
        </div>

        <div ref={sectionRefs["Photos"]}>
          <AccordionItem
            title="Photos"
            isOpen={openAccordion === "Photos"}
            onClick={() => openAccordionHandler("Photos")}
          >
            <PhotosAccordion
              details={viewProfileData?.user_details}
              setIsDirty={() => dispatch(setIsDirtyRedux(true))}
            />
          </AccordionItem>
        </div>

        <div ref={sectionRefs["Social Media"]}>
          <AccordionItem
            title="Social media & links"
            isOpen={openAccordion === "Social Media"}
            onClick={() => openAccordionHandler("Social Media")}
          >
            <SocialMediaAccordion
              details={viewProfileData?.user_details}
              setIsDirty={() => dispatch(setIsDirtyRedux(true))}
            />
          </AccordionItem>
        </div>

        <div ref={sectionRefs["Accreditations"]}>
          <AccordionItem
            title="Accreditations"
            isOpen={openAccordion === "Accreditations"}
            onClick={() => openAccordionHandler("Accreditations")}
          >
            <AccreditationsAccordion
              details={viewProfileData?.accreditations}
              setIsDirty={() => dispatch(setIsDirtyRedux(true))}
            />
          </AccordionItem>
        </div>

        <div ref={sectionRefs["Q&As"]}>
          <AccordionItem
            title="Q&As"
            isOpen={openAccordion === "Q&As"}
            onClick={() => openAccordionHandler("Q&As")}
          >
            <QandAAccordion
              details={viewProfileData?.qa}
              setIsDirty={() => dispatch(setIsDirtyRedux(true))}
            />
          </AccordionItem>
        </div>

        {/* <Collapse
      accordion
      expandIconPosition="right"
      className={styles.custom_collapse}
      expandIcon={({ isActive }) => (
        <span>
          
           <img src={ProfileArrowUp} alt="arrow"  />
        </span>
      )}
    >
      {items.map(({ key, title, content }) => (
        <Panel
          key={key}
          header={
            <div className="custom-header">
              <span>{title}</span>
            </div>
          }
        >
          <div className="panel-content">{content}</div>
        </Panel>
      ))}
    </Collapse> */}
      </div>
    </div>
  );
};

export default MyProfile;
