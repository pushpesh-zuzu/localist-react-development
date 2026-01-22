import { useEffect, useLayoutEffect, useState } from "react";

import styles from "./HeroSectionNewPPC.module.css";
import NewPPCForm from "./NewPPCForm";
import H1 from "../UITypography/H1";
import VettedProffessionIcon from "../../../assets/ReactIcons/VettedProffessionIcon";
import FreeQuoteIcon from "../../../assets/ReactIcons/FreeQuoteIcon";
import FastResponseIcon from "../../../assets/ReactIcons/FastResponseIcon";
import { setBuyerStep } from "../../../store/Buyer/BuyerSlice";
import { useDispatch, useSelector } from "react-redux";
import QuestionModalNewPPC from "./QuestionModalNewPPC/QuestionModalNewPPC";
import OTPVerificationNewPPC from "./OTPVerificationNewPPC/OTPVerificationNewPPC";
import ReEnterMobileNumberNewPPC from "./ReEnterMobileNumberNewPPC/ReEnterMobileNumberNewPPC";
import FormWrapper from "./RegistrationForm/FormWrapper";
import DescribeYourRequestNewPPC from "./DescribeYourRequestNewPPC/DescribeYourRequestNewPPC";
import NavigationDetectorDesktop from "../../common/navigationDetected/NavigationDetectorDesktop";
import NavigationDetectorWithConfirmations from "../../common/navigationDetected/NavigationDetectorWithConfirmations";
import Logo from "../../../assets/ReactIcons/Logo";
import { handleScrollToBottom } from "../../../utils/scroll";
import PostCodeNewPPC from "./PostCodeNewPPC/PostCodeNewPPC";
import EmailNewPPC from "./EmailNewFormPPC/EmailNewPPC";
import NewPPCFormDriveways from "./NewPPCFormDriveways";
import QuestionModalDrivewaysNewPPC from "./QuestionModalNewPPC/QuestionModalDrivewaysNewPPC";

function HeroSectionNewPPC({
  heading0 = "Find Expert",
  heading1 = "Driveway Installation",
  heading2 = "Near You",
  trustedText = "Trusted Driveway Specialists",
  text1 = "Local Vetted Experts",
  text2 = "Free Quotes",
  text3 = "Fast Response",
  quoteText = "Get Free Quotes Now",
  questionDescription = "",
  serviceId = 51,
}) {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const { authToken } = useSelector((state) => state.findJobs);
  const [localRequestId, setLocalRequestId] = useState(null);
  const [backButtonTriggered, setBackButtonTriggered] = useState(false);
  const { questionanswerData, questionLoader, buyerRequest, buyerStep } =
    useSelector((state) => state.buyer);
  const nextStep = () => {
    const currentIndex = stepFlow.indexOf(buyerStep);
    if (currentIndex < stepFlow.length - 1) {
      setBackButtonTriggered(false);
      dispatch(setBuyerStep(stepFlow[currentIndex + 1]));
    }
  };
  const prevStep = () => {
    setBackButtonTriggered(true);
    const currentIndex = stepFlow.indexOf(buyerStep);
    if (currentIndex > 0) {
      dispatch(setBuyerStep(stepFlow[currentIndex - 1]));
    }
  };
  const [reEnterMobile, setReEnterMobile] = useState(2);
  const isAdminOrRemembered = authToken || userToken?.remember_tokens;
  const stepFlow = [1, 2, 3, 4, 5, 6];
  // ? [2, 3, 6, 7, 8]
  // : [1, 2, 3, 4];
  // useEffect(() => {
  //   const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
  //   if (pendingModal?.shouldOpen) {
  //     localStorage.removeItem("pendingBuyerModal");
  //   } else {
  //     const initialStep = isAdminOrRemembered ? 2 : 1;
  //     dispatch(setBuyerStep(initialStep));
  //   }
  // }, [dispatch, isAdminOrRemembered]);

  useEffect(() => {
    const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));

    if (pendingModal?.shouldOpen) {
      dispatch(setBuyerStep(6));
    } else {
      const initialStep = isAdminOrRemembered ? 2 : 1;
      dispatch(setBuyerStep(1));
    }
  }, [dispatch, isAdminOrRemembered]);
  useEffect(() => {
    handleScrollToBottom();
  }, [buyerStep]);

  return (
    <section className={styles.heroWrapper}>
      {localRequestId === null && (
        <div>
          {typeof window !== "undefined" && window.innerWidth > 768 ? (
            <NavigationDetectorDesktop />
          ) : typeof window !== "undefined" ? (
            <NavigationDetectorWithConfirmations />
          ) : (
            ""
          )}
        </div>
      )}
      <div className={styles.container}>
        {/* LEFT CONTENT */}
        <div className={styles.left}>
          {/* <div className={styles.badge}>
            <TrustedIcon /> {trustedText}
          </div> */}
          <Logo className={styles.logo} />

          <H1 className={`Inter ${styles.heading}`}>
            {heading0} <span>{heading1}</span> {""}
            {heading2}
          </H1>

          <div>
            <div className={styles.features}>
              <div className={styles.feature}>
                <VettedProffessionIcon className={styles.icon} />
                <p>{text1}</p>
              </div>
              <div className={styles.feature}>
                <FreeQuoteIcon className={styles.icon} />
                <p>{text2}</p>
              </div>
              <div className={styles.feature}>
                <FastResponseIcon className={styles.icon} />
                <p>{text3}</p>
              </div>
            </div>

            <div className={`${styles.ctaRow} ${styles.desktopfirstSection}`}>
              <button className={`${styles.primaryBtn}`}>{quoteText}</button>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}

        {buyerStep === 1 && (
          <NewPPCFormDriveways nextStep={nextStep} serviceId={serviceId} />
        )}
        {buyerStep === 2 && (
          <QuestionModalDrivewaysNewPPC
            questions={questionanswerData}
            loading={questionLoader}
            serviceName={buyerRequest.service_name}
            nextStep={nextStep}
            setLocalRequestId={setLocalRequestId}
            description={questionDescription}
            backButtonTriggered={backButtonTriggered}
          />
        )}
        {buyerStep == 3 && (
          <PostCodeNewPPC prevStep={prevStep} onNext={nextStep} />
        )}
        {buyerStep === 4 && (
          <EmailNewPPC onBack={prevStep} nextStep={nextStep} />
        )}
        {buyerStep === 5 && reEnterMobile === 2 && (
          <OTPVerificationNewPPC
            setReEnterMobile={setReEnterMobile}
            isThankuPageOnlyShow
          />
        )}
        {reEnterMobile === 1 && buyerStep === 5 && (
          <ReEnterMobileNumberNewPPC
            setReEnterMobile={setReEnterMobile}
            onClose={() => setReEnterMobile(2)}
          />
        )}
        {buyerStep === 6 && (
          <FormWrapper>
            <DescribeYourRequestNewPPC />
          </FormWrapper>
        )}

        <div className={styles.mobilefirstSection}>
          {/* <div className={`${styles.features} ${styles.fetureDesktop} `} >
            <div className={`${styles.feature}`}>
              <VettedProffessionIcon className={styles.icon} />
              <p>{text1}</p>
            </div>
            <div className={styles.feature}>
              <FreeQuoteIcon className={styles.icon} />
              <p>{text2}</p>
            </div>
            <div className={styles.feature}>
              <FastResponseIcon className={styles.icon} />
              <p>{text3}</p>
            </div>
          </div> */}

          {/* <div className={styles.ctaRow}>
            <button
              onClick={() => {
                handleScrollToBottom();
              }}
              className={`${styles.primaryBtn} ${styles.clickable}`}
            >
              {quoteText}{" "}
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default HeroSectionNewPPC;
