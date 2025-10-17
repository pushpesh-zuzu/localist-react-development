import React, { useEffect, useRef, useState } from "react";
import styles from "./ViewProfile.module.css";
import DummyImage from "../../assets/Images/Setting/ProfileWebIcon.svg";
import phoneImg from "../../assets/Images/MyResponse/PhoneIcon.svg";
import emailImg from "../../assets/Images/MyResponse/mailIcon.svg";
import profileImg from "../../assets/Images/Setting/WebIcon.svg";
import TabNav from "./TabComponent";
import About from "./About/About";
import Services from "./Services/Services";
import ReviewSection from "./Reviews/Reviews";
import Accrediations from "./Accrediations/Accrediations";
import Photos from "./Photos/Photos";
import QandAns from "./QAns/QandAns";
import SubmitReviewModal from "./SubmitReviewModal";
import { useLocation, useParams } from "react-router-dom";
import LocationIcon from "../../assets/Images/AutoBidLocationIcon.svg";
import {
  addViewProfileList,
  ReviewProfile,
  setViewProfileData,
  setReviewProfile,
} from "../../store/LeadSetting/leadSettingSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_IMAGE, DEFAULT_PROFILE_IMAGE } from "../../utils";
import starImg from "../../assets/Icons/MyResponse/StarImg.svg";
import grayStar from "../../assets/Icons/MyResponse/grayStar.svg";
import ContactSuccessModal from "../Leads/LeadLists/ContactSuccessModal";
import halfStar from "../../assets/Icons/MyResponse/halfStar.svg";
import { Spin } from "antd";
import { Helmet } from "react-helmet-async";

const ViewProfiles = () => {
  const location = useLocation();
  const isFromManualBids =
    new URLSearchParams(location.search).get("from") === "replies";

  const queryParams = new URLSearchParams(location.search);
  const isCustomButton = queryParams.get("customBtn") === "true";
  const [activeTab, setActiveTab] = useState("About");
  const [onActiveTab, setOnActiveTab] = useState(false);
  const [isopen, setIsOpen] = useState(true);
  const [customerModal, setCustomerModal] = useState(false);
  const dispatch = useDispatch();
  const profileId = useParams();
  const requestId = useParams();
  const shouldDisableActions = requestId?.requestId;
  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);

  const { reviewProfileData } = useSelector((state) => state.leadSetting);
  const { viewProfileData } = useSelector((state) => state.leadSetting);

  let profileData = {};

  if (viewProfileData && Object.keys(viewProfileData).length > 0) {
    profileData = viewProfileData;
  } else {
    profileData = reviewProfileData;
  }

  const serviceCount = profileData?.services?.filter(
    (service) => service?.user_services?.name
  );

  console.log(viewProfileData, "viewProfileData");

  const expandRadiusLoader = useSelector(
    (state) => state?.leadSetting?.expandRadiusLoader
  );

  useEffect(() => {
    return () => {
      dispatch(setViewProfileData({}));
      dispatch(setReviewProfile({}));
    };
  }, []);

  const servicesArray = profileData?.services || [];
  console.log(profileData, "profileData");

  const serviceNames = servicesArray
    .flatMap((service) => service.user_services?.map((us) => us.name))
    .filter(Boolean);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const reviewsRef = useRef(null);
  const accrediationRef = useRef(null);
  const photoRef = useRef(null);
  const quesAnsRef = useRef(null);

  const closeModal = () => setIsOpen(false);
  const rightContainerRef = useRef(null);
  console.log(activeTab, "activeTab");

  // Tab click handler function
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    console.log(tabName, "tabNaME");
    setOnActiveTab(true);

    setInterval(() => {
      setOnActiveTab(false);
    }, 1000);
    // Get the corresponding ref based on tab name
    let targetRef;
    switch (tabName) {
      case "About":
        targetRef = aboutRef;
        break;
      case "Services":
        targetRef = servicesRef;
        break;
      case "Reviews":
        targetRef = reviewsRef;
        break;
      case "Accreditations":
        targetRef = accrediationRef;
        break;
      case "Photos":
        targetRef = photoRef;
        break;
      case "Q+A's":
        targetRef = quesAnsRef;
        break;
      default:
        targetRef = aboutRef;
    }

    // Scroll to the target section
    if (targetRef.current && rightContainerRef.current) {
      const container = rightContainerRef.current;
      const targetPosition = targetRef.current.offsetTop;

      const OFFSET = 40;

      container.scrollTo({
        top: targetPosition - OFFSET,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = rightContainerRef.current;

    const handleScroll = () => {
      const scrollY = container.scrollTop;
      const sections = [
        { name: "Photos", ref: photoRef },
        { name: "Q+A's", ref: quesAnsRef },
        { name: "Accreditations", ref: accrediationRef },
        { name: "Reviews", ref: reviewsRef },
        { name: "Services", ref: servicesRef },
        { name: "About", ref: aboutRef },
      ];

      for (let section of sections) {
        const offsetTop = section.ref.current?.offsetTop || 0;
        if (scrollY >= offsetTop - 0) {
          // Added offset for better detection
          console.log(activeTab, "name123");
          {
            // !onActiveTab && setActiveTab(section.name);
          }
          // setTimeout(() => {
          // }, 1000);

          break;
        }
      }
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const path = window.location.pathname;
    const basePath = path.split("/")[1]; // ✅ No "/" prefix now

    if (basePath === "view-profile") {
      const sellerData = {
        seller_id: requestId?.requestId ?? userToken?.id ?? registerData?.id,
        buyer_id: userToken?.id ?? registerData?.id,
        lead_id: requestId?.requestId,
      };

      let token = localStorage.getItem("barkToken");
      token = token ? JSON.parse(token) : null;

      if (token) {
        dispatch(addViewProfileList(sellerData));
      }
    } else if (basePath === "review") {
      dispatch(ReviewProfile({ profile_uuid: profileId }));
    }

    // Optional: debug log
    console.log("Detected basePath:", basePath);
  }, [dispatch, profileId, requestId, userToken, registerData]);

  const handleRequestOpen = () => {
    setCustomerModal(true);
  };
  const maskPhone = (phone = "") => {
    if (!phone || phone.length < 5) return "";
    const visible = phone.slice(0, 5);
    return `${visible}*******`;
  };

  const maskEmail = (email = "") => {
    if (!email.includes("@")) return "";
    const [name, domain] = email.split("@");
    const visible = name.charAt(0);
    return `${visible}***@${domain}`;
  };
  // if (expandRadiusLoader === true) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         height: "100vh",
  //         alignItems: "center",
  //         width: "100%",
  //       }}
  //     >
  //       <Spin />
  //     </div>
  //   );
  // }
  return (
    <>
      <Helmet>
        <title>{`${
          viewProfileData?.name ? viewProfileData?.name : ""
        } | Localists`}</title>
      </Helmet>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.backBtnWrapper}>
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={
                  profileData?.company_logo
                    ? `${BASE_IMAGE}/users/${profileData?.company_logo}`
                    : profileData?.profile_image
                    ? `${BASE_IMAGE}/users/${profileData?.profile_image}`
                    : DEFAULT_PROFILE_IMAGE
                }
                alt="Profile"
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                }}
              />
            </div>
          </div>
          <div className={styles.viewDetails}>
            <h2>{profileData?.company_name || profileData?.name}</h2>
            <div className={styles.locationText}>
              <img src={LocationIcon} alt="" />
              <span>{profileData?.city} </span> | {profileData?.zipcode}
            </div>

            <div className={styles.sidebar}>
              <div className={styles.rating}>
                {profileData?.avg_rating === 0 ? (
                  <span className={styles.noReviews}>No Reviews</span>
                ) : (
                  <>
                    <span className={styles.stars}>
                      {Array.from({ length: 5 }).map((_, index) => {
                        const rating = profileData?.avg_rating ?? 0;

                        if (index < Math.floor(rating)) {
                          return (
                            <img
                              key={index}
                              src={starImg}
                              alt="star"
                              width={19}
                              height={19}
                            />
                          );
                        } else if (index < rating) {
                          return (
                            <img
                              key={index}
                              src={halfStar}
                              alt="half-star"
                              width={21}
                              height={21}
                            />
                          );
                        } else {
                          return (
                            <img
                              key={index}
                              src={grayStar}
                              alt="empty-star"
                              width={19}
                              height={19}
                            />
                          );
                        }
                      })}
                    </span>

                    {profileData?.avg_rating > 0 ? (
                      <span className={styles.ratingCount}>
                        {profileData?.avg_rating}
                      </span>
                    ) : null}
                  </>
                )}
              </div>
            </div>

            <div className={styles.badgesBox}>
              {serviceNames?.map((item) => {
                return (
                  <>
                    <div className={styles.badges}>
                      <span>{item}</span>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className={styles.requestBtnBox}>
            {/* <button
              className={styles.RequestQuoteBtn}
              onClick={handleRequestOpen}
              disabled={shouldDisableActions}
            >
              {" "}
              {isFromManualBids ? "Contact Professional" : "Request Quote"}
            </button> */}
            {isFromManualBids ? (
              <button
                className={styles.RequestQuoteBtn}
                onClick={() => {
                  handleRequestOpen();
                }}
                // disabled={shouldDisableActions}
              >
                Contact Professionals
              </button>
            ) : (
              <button
                className={styles.RequestBtn}
                style={{ cursor: "default" }}
                disabled={shouldDisableActions}
              >
                Request Quote
              </button>
            )}
          </div>

          <div className={styles.contactDetails}>
            <>
              <div className={styles.mailText}>
                <img src={emailImg} alt="Email" />
                <span>
                  {profileData?.lead_purchased === 1 || isFromManualBids
                    ? profileData?.company_email || profileData?.email
                    : maskEmail(
                        profileData?.company_email || profileData?.email
                      )}
                </span>
              </div>
              <div className={styles.mailText}>
                <img src={phoneImg} alt="Phone" />
                <span>
                  {/* {profileData?.lead_purchased === 1 || isFromManualBids
                    ? profileData?.company_phone ||
                      profileData?.phone ||
                      "0000000000"
                    : maskPhone(
                        profileData?.company_phone ||
                          profileData?.phone ||
                          "0000000000"
                      )} */}
                  {profileData?.lead_purchased === 1 || isFromManualBids
                    ? profileData?.company_phone || profileData?.phone || ""
                    : profileData?.company_phone || profileData?.phone
                    ? maskPhone(
                        profileData?.company_phone || profileData?.phone
                      )
                    : null}
                </span>
              </div>
            </>

            {profileData?.company_website && (
              <div className={styles.mailText}>
                <img src={profileImg} alt="" />
                <span>{profileData?.company_website}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.tabContainerBox} ref={rightContainerRef}>
            <TabNav activeTab={activeTab} onTabClick={handleTabClick} />
            <div ref={aboutRef}>
              <About details={profileData} />
            </div>
            <div ref={servicesRef}>
              <Services details={profileData} />
            </div>
            <div ref={reviewsRef}>
              <ReviewSection
                details={profileData}
                disableReviewButton={shouldDisableActions}
                isFromManualBids={isFromManualBids}
              />
            </div>
            <div ref={accrediationRef}>
              <Accrediations details={profileData} />
            </div>
            <div ref={quesAnsRef}>
              <QandAns details={profileData} />
            </div>
            <div ref={photoRef}>
              <Photos details={profileData} />
            </div>
          </div>
        </div>

        {isopen && profileId?.profileId && profileData?.name && (
          <SubmitReviewModal
            setOpen={isopen}
            closeModal={closeModal}
            ProfileIDs={profileId?.profileId}
            reviewProfileData={profileData}
          />
        )}
        {customerModal && (
          <>
            <ContactSuccessModal
              onClose={() => setCustomerModal(false)}
              isOpen={customerModal}
              detail={profileData}
              repliesBtn
            />
          </>
        )}
      </div>
    </>
  );
};

export default ViewProfiles;
