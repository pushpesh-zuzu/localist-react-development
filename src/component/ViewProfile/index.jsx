// import React, { useEffect, useRef, useState } from "react";
// import styles from "./ViewProfile.module.css";
// import DummyImage from "../../assets/Images/DummyImage.svg";
// import phoneImg from "../../assets/Images/MyResponse/PhoneIcon.svg";
// import emailImg from "../../assets/Images/MyResponse/mailIcon.svg";
// import profileImg from "../../assets/Images/MyResponse/mailIcon.svg";
// import TabNav from "./TabComponent";
// import About from "./About/About";
// import Services from "./Services/Services";
// import ReviewSection from "./Reviews/Reviews";
// import Accrediations from "./Accrediations/Accrediations";
// import Photos from "./Photos/Photos";
// import QandAns from "./QAns/QandAns";
// import SubmitReviewModal from "./SubmitReviewModal";
// import { useParams } from "react-router-dom";
// import LocationIcon from "../../assets/Icons/LocationIcon.png";
// const ViewProfiles = () => {
//     const [activeTab, setActiveTab] = useState('About')
//     const [isopen, setIsOpen] = useState(true)
//     const profileId = useParams()

//     const aboutRef = useRef(null);
//     const servicesRef = useRef(null);
//     const reviewsRef = useRef(null);
//     const accrediationRef = useRef(null);
//     const photoRef = useRef(null);
//     const quesAnsRef = useRef(null);

//   const closeModal = () => setIsOpen(false);
//   const rightContainerRef = useRef(null);

// useEffect(() => {
//   const container = rightContainerRef.current;

//   const handleScroll = () => {
//     const scrollY = container.scrollTop;
//     const sections = [
//       { name: 'Photos', ref: photoRef },
//       { name: 'Q+A\'s', ref: quesAnsRef },
//       { name: 'Accreditations', ref: accrediationRef },
//       { name: 'Reviews', ref: reviewsRef },
//       { name: 'Services', ref: servicesRef },
//       { name: 'About', ref: aboutRef },
//     ];

//     for (let section of sections) {
//       const offsetTop = section.ref.current?.offsetTop || 0;
//       if (scrollY >= offsetTop) {
//         setActiveTab(section.name);
//         break;
//       }
//     }
//   };

//   container?.addEventListener("scroll", handleScroll);
//   return () => container?.removeEventListener("scroll", handleScroll);
// }, []);

//     return (
//         <>
//         <div className={styles.mainContainer}>
//             <div className={styles.container}>

//                         <img src={DummyImage} alt="Profile" className={styles.profileImage} />

//                     <div className={styles.viewDetails}>
//                         <h2>Starlink pvt. ltd</h2>
//                         <div className={styles.locationText}>   <img src={LocationIcon} alt="" /><span>WA4, Warrington,</span>  8.6 miles away</div>
//                         <div className={styles.sidebar}>
//                             <div className={styles.rating}>
//                                 <span className={styles.stars}>★★★★★</span>
//                                 <span className={styles.ratingCount}>125</span>
//                             </div>
//                         </div>
//                         <div className={styles.badgesBox}>
//                             <div className={styles.badges}>
//                                 <span>Electrician</span>
//                             </div>
//                             <div className={styles.badges}>
//                                 <span>Web design</span>
//                             </div>
//                             <div className={styles.badges}>
//                                 <span>New Pages</span>
//                             </div>

//                         </div>
//                     </div>

//                 <div className={styles.requestBtnBox}>
//                     <button className={styles.RequestQuoteBtn}> Request Quote</button>
//                 </div>
//                 <div className={styles.contactDetails}>
//                     <div className={styles.mailText}><img src={emailImg} alt="" /> <span>india@localist.com</span></div>
//                     <div className={styles.mailText}><img src={phoneImg} alt="" /><span> +91 0000000000</span></div>
//                     <div className={styles.mailText}><img src={profileImg} alt="" /><span> facebook.com/profile.</span></div>
//                 </div>

//             </div>

//             <div className={styles.rightContainer} >
//                 <div className={styles.tabContainerBox} ref={rightContainerRef}>
//                     <TabNav activeTab={activeTab} />
//                     <div ref={aboutRef}><About /></div>
//                     <div ref={servicesRef}><Services /></div>
//                     <div ref={reviewsRef}><ReviewSection /></div>
//                     <div ref={accrediationRef}><Accrediations /></div>
//                     <div ref={quesAnsRef}><QandAns/></div>
//                     <div ref={photoRef}><Photos/></div>

//                 </div>
//             </div>
//         {isopen && profileId?.profileId && <SubmitReviewModal setOpen={isopen} closeModal={closeModal} ProfileIDs={profileId?.profileId}/>}
//         </div>
// </>
// );
// };

// export default ViewProfiles;

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
import { useParams } from "react-router-dom";
// import LocationIcon from "../../assets/Icons/LocationIcon.png";
import LocationIcon from "../../assets/Images/AutoBidLocationIcon.svg";
import { addViewProfileList } from "../../store/LeadSetting/leadSettingSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_IMAGE, DEFAULT_PROFILE_IMAGE } from "../../utils";
import starImg from "../../assets/Icons/MyResponse/StarImg.svg";
import grayStar from "../../assets/Icons/MyResponse/grayStar.svg";
import ContactSuccessModal from "../Leads/LeadLists/ContactSuccessModal";

const ViewProfiles = () => {
  const [activeTab, setActiveTab] = useState("About");
  const [isopen, setIsOpen] = useState(true);
  const [customerModal, setCustomerModal] = useState(false);
  const dispatch = useDispatch();
  const profileId = useParams();
  const SellerId = useParams();
  const requestId = useParams();
  const shouldDisableActions = requestId?.requestId;
  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const { viewProfileData } = useSelector((state) => state.leadSetting);
  const serviceCount = viewProfileData?.services?.filter(
    (service) => service?.user_services?.name
  );
  const servicesArray = viewProfileData?.services || [];
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

  // Tab click handler function
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);

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

      container.scrollTo({
        top: targetPosition,
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
        if (scrollY >= offsetTop - 50) {
          // Added offset for better detection
          setActiveTab(section.name);
          break;
        }
      }
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sellerData = {
      seller_id: profileId?.sellerId,
      buyer_id: userToken?.id ? userToken?.id : registerData?.id,
      lead_id: requestId?.requestId,
    };
    dispatch(addViewProfileList(sellerData));
  }, []);
  const handleRequestOpen = () => {
    setCustomerModal(true);
  };
  const maskPhone = (phone = "") => {
    if (!phone || phone.length < 3) return "*******";
    const visible = phone.slice(0, 3);
    return `${visible}*******`;
  };

  const maskEmail = (email = "") => {
    if (!email.includes("@")) return "********";
    const [name, domain] = email.split("@");
    const visible = name.charAt(0);
    return `${visible}***@${domain}`;
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.backBtnWrapper}>
            <img
              src={
                viewProfileData?.profile_image
                  ? `${BASE_IMAGE}/users/${viewProfileData?.profile_image}`
                  : DEFAULT_PROFILE_IMAGE
              }
              alt="Profile"
              className={styles.profileImage}
            />
          </div>
          <div className={styles.viewDetails}>
            <h2>{viewProfileData?.name}</h2>
            <div className={styles.locationText}>
              <img src={LocationIcon} alt="" />
              <span>{viewProfileData?.city} </span> | {viewProfileData?.zipcode}
            </div>
            {/* <div className={styles.sidebar}>
                        <div className={styles.rating}>
                            <span className={styles.stars}>★★★★★</span>
                            <span className={styles.ratingCount}>{viewProfileData?.avg_rating}</span>
                        </div>
                    </div> */}
            <div className={styles.sidebar}>
              <div className={styles.rating}>
                <span className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i}>
                      {i <= viewProfileData?.avg_rating ? (
                        <img src={starImg} alt="..." width={29} height={27} />
                      ) : (
                        <img src={grayStar} alt="..." />
                      )}
                    </span>
                  ))}
                </span>
                <span className={styles.ratingCount}>
                  {viewProfileData?.avg_rating}
                </span>
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
              {/* <div className={styles.badges}>
                                <span>LandSpacing</span>
                            </div>
                            <div className={styles.badges}>
                                <span>Web development</span>
                            </div>
                            <div className={styles.badges}>
                                <span>New Pages</span>
                            </div> */}
            </div>
          </div>

          <div className={styles.requestBtnBox}>
            <button
              className={styles.RequestQuoteBtn}
              onClick={handleRequestOpen}
              disabled={shouldDisableActions}
            >
              {" "}
              Request Quote
            </button>
          </div>

          <div className={styles.contactDetails}>
            <>
              <div className={styles.mailText}>
                <img src={emailImg} alt="Email" />
                <span>
                  {viewProfileData?.lead_purchased === 1
                    ? viewProfileData?.email
                    : maskEmail(viewProfileData?.email)}
                </span>
              </div>
              <div className={styles.mailText}>
                <img src={phoneImg} alt="Phone" />
                <span>
                  {viewProfileData?.lead_purchased === 1
                    ? viewProfileData?.phone || "0000000000"
                    : maskPhone(viewProfileData?.phone)}
                </span>
              </div>
            </>

            {viewProfileData?.company_website && (
              <div className={styles.mailText}>
                <img src={profileImg} alt="" />
                <span>{viewProfileData?.company_website}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.tabContainerBox} ref={rightContainerRef}>
            <TabNav activeTab={activeTab} onTabClick={handleTabClick} />
            <div ref={aboutRef}>
              <About details={viewProfileData} />
            </div>
            <div ref={servicesRef}>
              <Services details={viewProfileData} />
            </div>
            <div ref={reviewsRef}>
              <ReviewSection
                details={viewProfileData}
                disableReviewButton={shouldDisableActions}
              />
            </div>
            <div ref={accrediationRef}>
              <Accrediations details={viewProfileData} />
            </div>
            <div ref={quesAnsRef}>
              <QandAns details={viewProfileData} />
            </div>
            <div ref={photoRef}>
              <Photos details={viewProfileData} />
            </div>
          </div>
        </div>

        {isopen && profileId?.profileId && (
          <SubmitReviewModal
            setOpen={isopen}
            closeModal={closeModal}
            ProfileIDs={profileId?.profileId}
          />
        )}
        {customerModal && (
          <>
            <ContactSuccessModal
              onClose={() => setCustomerModal(false)}
              isOpen={customerModal}
              detail={viewProfileData}
              repliesBtn
            />
          </>
        )}
      </div>
    </>
  );
};

export default ViewProfiles;
