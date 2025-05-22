import React, { useEffect, useRef, useState } from "react";
import styles from "./ViewProfile.module.css";
import DummyImage from "../../assets/Images/DummyImage.svg";
import phoneImg from "../../assets/Images/MyResponse/PhoneIcon.svg";
import emailImg from "../../assets/Images/MyResponse/mailIcon.svg";
import profileImg from "../../assets/Images/MyResponse/mailIcon.svg";
import TabNav from "./TabComponent";
import About from "./About/About";
import Services from "./Services/Services";
import ReviewSection from "./Reviews/Reviews";
import Accrediations from "./Accrediations/Accrediations";
import Photos from "./Photos/Photos";
import QandAns from "./QAns/QandAns";
import SubmitReviewModal from "./SubmitReviewModal";
import { useParams } from "react-router-dom";
import LocationIcon from "../../assets/Icons/LocationIcon.png";
const ViewProfiles = () => {
    const [activeTab, setActiveTab] = useState('About')
    const [isopen, setIsOpen] = useState(true)
    const profileId = useParams()
    

    const aboutRef = useRef(null);
    const servicesRef = useRef(null);
    const reviewsRef = useRef(null);
    const accrediationRef = useRef(null);
    const photoRef = useRef(null);
    const quesAnsRef = useRef(null);
 
  const closeModal = () => setIsOpen(false);
    useEffect(() => {
        const handleScroll = () => {
            const aboutTop = aboutRef.current?.offsetTop || 0;
            const servicesTop = servicesRef.current?.offsetTop || 0;
            const reviewsTop = reviewsRef.current?.offsetTop || 0;
            const scrollY = window.scrollY + 200; // buffer

            if (scrollY >= reviewsTop) {
                setActiveTab('Reviews');
            } else if (scrollY >= servicesTop) {
                setActiveTab('Services');
            } else {
                setActiveTab('About');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <>
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                {/* <div> */}
                   
                        <img src={DummyImage} alt="Profile" className={styles.profileImage} />
                   
                    <div className={styles.viewDetails}>
                        <h2>Starlink pvt. ltd</h2>
                        <div className={styles.locationText}>   <img src={LocationIcon} alt="" /><span>WA4, Warrington,</span>  8.6 miles away</div>
                        <div className={styles.sidebar}>
                            <div className={styles.rating}>
                                <span className={styles.stars}>★★★★★</span>
                                <span className={styles.ratingCount}>125</span>
                            </div>
                        </div>
                        <div className={styles.badgesBox}>
                            <div className={styles.badges}>
                                <span>Electrician</span>
                            </div>
                            <div className={styles.badges}>
                                <span>Web design</span>
                            </div>
                            <div className={styles.badges}>
                                <span>New Pages</span>
                            </div>

                        </div>
                    </div>
                {/* </div> */}
                <div className={styles.requestBtnBox}>
                    <button className={styles.RequestQuoteBtn}> Request Quote</button>
                </div>
                <div className={styles.contactDetails}>
                    <div className={styles.mailText}><img src={emailImg} alt="" /> <span>india@localist.com</span></div>
                    <div className={styles.mailText}><img src={phoneImg} alt="" /><span> +91 0000000000</span></div>
                    <div className={styles.mailText}><img src={profileImg} alt="" /><span> facebook.com/profile.</span></div>
                </div>


            </div>

            <div className={styles.rightContainer}>
                <div className={styles.tabContainerBox}>
                    <TabNav activeTab={activeTab} />
                    <div ref={aboutRef}><About /></div>
                    <div ref={servicesRef}><Services /></div>
                    <div ref={reviewsRef}><ReviewSection /></div>
                    <div ref={accrediationRef}><Accrediations /></div>
                    <div ref={quesAnsRef}><QandAns/></div>
                    <div ref={photoRef}><Photos/></div>
   

                </div>
            </div>
        {isopen && profileId?.profileId && <SubmitReviewModal setOpen={isopen} closeModal={closeModal} ProfileIDs={profileId?.profileId}/>}
        </div>
</>
);
};

export default ViewProfiles;
