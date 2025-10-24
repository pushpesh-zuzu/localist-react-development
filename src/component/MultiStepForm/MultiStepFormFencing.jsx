import React, { useEffect, useState } from "react";
import styles from "./MultiStepForm.module.css";
import Footer from "../common/footer/Footer";
import { useLocation } from "react-router";
import ProgressBarLandingPage from "../common/ProgressBarLandingPage/ProgressBarLandingPage";
import { questionAnswerData, setBuyerStep } from "../../store/Buyer/BuyerSlice";
import { useDispatch, useSelector } from "react-redux";
import NameEmailMultiStepForm from "./steps/NameEmailMultiStepForm/NameEmailMultiStepForm";
import CardLayoutWrapper from "./steps/CardLayoutWrapper/CardLayoutWrapper";
import PhoneNumberMultiStepForm from "./steps/PhoneNumberMultiStepForm/PhoneNumberMultiStepForm";
import MultiStepDescribeYourRequest from "./steps/MultiStepDescribeYourRequest/MultiStepDescribeYourRequest";
import OTPVerificationMultiStep from "./OTPVerificationMultiStep/OTPVerificationMultiStep";
import { Helmet } from "react-helmet-async";
import { handleScrollToBottom } from "../../utils/scroll";
import QuestionAnswerMultiStepFence from "./steps/QuestionAnswerMultiStep/QuestionAnswerMultiStepFence";
import PostSearchMultiStepFence from "./steps/PostcodeSearch/PostSearchMultiStepFence";
import QuestionAnswerMultiStepFence2 from "./steps/QuestionAnswerMultiStep/QuestionAnswerMultiStepFence2";

const MultiStepFormFencing = ({ isQuestionWithImage = false }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer);

  useEffect(() => {
    if (location.pathname.includes("fence-multi-form-ppc")) {
      document.body.style.paddingTop = "0px";
    }

    document.documentElement.style.setProperty(
      "padding-top",
      location.pathname.includes("fence-multi-form-ppc") && "0px"
    );
  }, [location.pathname]);

  const [animationDirection, setAnimationDirection] = useState("");
  const [actualSteps, setActualSteps] = useState(1);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const { userToken } = useSelector((state) => state.auth);
  const { authToken } = useSelector((state) => state.findJobs);
  const [backButtonTriggered, setBackButtonTriggered] = useState(false);
  const [isComingFromStep3, setIsComingFromStep3] = useState(false); // ⭐ YE ADD KARO
  const isAdminOrRemembered = authToken || userToken?.remember_tokens;
  const [questionHistory, setQuestionHistory] = useState([0]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [setstepText, setStepText] = useState("What");
  const [updateNumberStep, setUpdateNumberStep] = useState(2);
  const [isComingFromStep4, setIsComingFromStep4] = useState(false);

  const stepFlow = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    if (buyerStep === 1) {
      setActualSteps(1);
      setStepText("What");
    } else if (buyerStep === 2) {
      setActualSteps(2);
      setStepText("Where");
    } else if (buyerStep === 3) {
      setActualSteps(3);
      setStepText("When");
    }
    handleScrollToBottom();
  }, [buyerStep]);
  const getProgressPercentage = (per) => {
    setProgressPercentage((pre) => pre + per);
  };

  const nextStep = () => {
    setBackButtonTriggered(false);
    setIsComingFromStep3(false);
    setIsComingFromStep4(false);

    // setAnimationDirection(styles.slideOutLeft);

    setTimeout(() => {
      const currentIndex = stepFlow.indexOf(buyerStep);
      if (currentIndex < stepFlow.length - 1) {
        dispatch(setBuyerStep(stepFlow[currentIndex + 1]));
      }

      // setAnimationDirection(styles.slideInRight);
    }, 300);
  };
  const prevStep = () => {
    setBackButtonTriggered(true);
    // setAnimationDirection(styles.slideOutRight);
    setTimeout(() => {
      const currentIndex = stepFlow.indexOf(buyerStep);
      if (currentIndex > 0) {
        if (stepFlow[currentIndex - 1] === 1) {
          setIsComingFromStep3(true);
        }
        if (stepFlow[currentIndex - 1] === 3) {
          setIsComingFromStep4(true);
        }
        dispatch(setBuyerStep(stepFlow[currentIndex - 1]));
        setBackButtonTriggered(false);
      }
      // setAnimationDirection(styles.slideInLeft);
    }, 300);
  };

  useEffect(() => {
    const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));

    // Jab buyerStep 7 ho jaye aur pendingModal tha, tab clear karo
    if (buyerStep === 7 && pendingModal?.shouldOpen) {
      localStorage.removeItem("pendingBuyerModal");
      console.log("Cleared pendingBuyerModal after reaching step 7");
    }
  }, [buyerStep]);

  // Main initialization useEffect
  useEffect(() => {
    const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));

    if (pendingModal?.shouldOpen) {
      console.log("Coming from OTP redirect");
      dispatch(setBuyerStep(7));
    } else {
      // const initialStep = isAdminOrRemembered ? 2 : 1;
      dispatch(setBuyerStep(1));
    }
  }, [dispatch, isAdminOrRemembered]);

  useEffect(() => {
    dispatch(questionAnswerData({ service_id: 49 }));
  }, []);

  const firstQuestions = questionanswerData?.slice(0, -2) || []; // All except last
  const lastQuestion = questionanswerData?.slice(-2) || []; // Only last question

  useEffect(() => {
    if (questionanswerData.length > 0) {
      setIsLoadingQuestions(false);
    }
  }, [questionanswerData]);

  useEffect(() => {
    if (firstQuestions?.length > 0) {
      const initialProgress = (100 * 2) / (firstQuestions.length * 3);
      setProgressPercentage(initialProgress);
    }
  }, [questionanswerData]);
  const [hasMountedDetector, setHasMountedDetector] = useState(false);
  console.log(buyerRequest, "br");
  useEffect(() => {
    if (!hasMountedDetector && buyerRequest?.questions?.length > 0) {
      setHasMountedDetector(true);
    }
    // ❌ Don't depend on buyerRequest.questions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMountedDetector]);
  return (
    <>
      {/* {window.innerWidth > 768  && typeof window !== "undefined"? (
              <NavigationDetectorDesktop />
            ) : (
              <NavigationDetectorWithConfirmations />
            )} */}
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>
          Compare Free Quotes from Local Fencing Companies | Localists
        </title>

        <meta
          name="description"
          content="Get free quotes from top fencing companies. Compare local professionals, read reviews, and hire trusted experts – quick and hassle-free."
        />
      </Helmet>

      {/* <img className={styles.logoImg} src={logo} /> */}
      <div className={styles.tab}>
        <span className={styles.tabText}>
          {buyerStep <= 3 ? `${setstepText} - ${actualSteps}/3` : ""}
        </span>{" "}
      </div>

      <ProgressBarLandingPage
        value={progressPercentage}
        buyerStep={buyerStep}
      />
      <div>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <div className={`${styles.slideContainer} ${animationDirection}`}>
              {buyerStep === 1 && (
                <div style={{ maxWidth: "592px", margin: "auto" }}>
                  <QuestionAnswerMultiStepFence2
                    questions={firstQuestions}
                    onNext={nextStep}
                    onBack={prevStep}
                    loading={isLoadingQuestions}
                    getProgressPercentage={getProgressPercentage}
                    isComingFromStep3={isComingFromStep3} // ⭐ YE PROP ADD KARO
                    setQuestionHistory={setQuestionHistory}
                    questionHistory={questionHistory}
                    setIsComingFromStep3={setIsComingFromStep3}
                    setProgressPercentage={setProgressPercentage}
                    isQuestionWithImage={isQuestionWithImage}
                    serviceName="Fence & Gate Installation"
                  />
                </div>
              )}
              {buyerStep === 2 && (
                <div style={{ margin: "auto" }}>
                  <PostSearchMultiStepFence
                    getProgressPercentage={getProgressPercentage}
                    prevStep={prevStep}
                    onNext={nextStep}
                    backButtonTriggered={backButtonTriggered}
                    setBackButtonTriggered={setBackButtonTriggered}
                    returPercentage={(100 * 2) / (firstQuestions?.length * 3)}
                  />
                </div>
              )}

              {buyerStep === 3 && (
                <div style={{ margin: "auto" }}>
                  <QuestionAnswerMultiStepFence
                    questions={lastQuestion} // Sirf last question
                    onNext={nextStep} // Last question complete hone ke baad next step
                    onBack={prevStep}
                    loading={questionLoader}
                    setIsComingFromStep4={setIsComingFromStep4}
                    getProgressPercentage={getProgressPercentage}
                    isComingFromStep4={isComingFromStep4}
                  />
                </div>
              )}
              {buyerStep === 4 && (
                <NameEmailMultiStepForm
                  nextStep={nextStep}
                  onBack={prevStep}
                  isStartWithQuestionModal={true}
                />
              )}
              {buyerStep === 5 && (
                <PhoneNumberMultiStepForm
                  nextStep={nextStep}
                  onBack={prevStep}
                  updateNumberStep={updateNumberStep}
                  setUpdateNumberStep={setUpdateNumberStep}
                />
              )}
              {/* {updateNumberStep === 1 && buyerStep === 5 && (
                <PhoneNumberUpdateMultiStepForm
                  setUpdateNumberStep={setUpdateNumberStep}
                  onBack={prevStep}
                />
              )} */}
              {buyerStep === 6 && updateNumberStep === 2 && (
                <CardLayoutWrapper showButton={false}>
                  <OTPVerificationMultiStep
                    open
                    nextStep={nextStep}
                    onBack={prevStep}
                    isThankuPageOnlyShow
                    setUpdateNumberStep={setUpdateNumberStep}
                  />
                </CardLayoutWrapper>
              )}
              {buyerStep === 7 && (
                <CardLayoutWrapper showBackButton={false} showButton={false}>
                  <MultiStepDescribeYourRequest />
                </CardLayoutWrapper>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MultiStepFormFencing;
