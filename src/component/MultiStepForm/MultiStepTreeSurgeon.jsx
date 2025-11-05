import React, { useEffect, useState } from "react";
import styles from "./MultiStepForm.module.css";
import Footer from "../common/footer/Footer";
import { useLocation } from "react-router";
import ProgressBarLandingPage from "../common/ProgressBarLandingPage/ProgressBarLandingPage";
import {
  questionAnswerData,
  setbuyerRequestData,
  setBuyerStep,
} from "../../store/Buyer/BuyerSlice";
import { useDispatch, useSelector } from "react-redux";
import CardLayoutWrapper from "./steps/CardLayoutWrapper/CardLayoutWrapper";
import PhoneNumberMultiStepForm from "./steps/PhoneNumberMultiStepForm/PhoneNumberMultiStepForm";
import MultiStepDescribeYourRequest from "./steps/MultiStepDescribeYourRequest/MultiStepDescribeYourRequest";
import OTPVerificationMultiStep from "./OTPVerificationMultiStep/OTPVerificationMultiStep";
import { Helmet } from "react-helmet-async";
import { handleScrollToBottom } from "../../utils/scroll";
import NavigationDetectorDesktop from "../common/navigationDetected/NavigationDetectorDesktop";
import NavigationDetectorWithConfirmations from "../common/navigationDetected/NavigationDetectorWithConfirmations";
import CalonicalTags from "../common/CalonicalTags/CalonicalTags";
import NameEmailTreeSurgeon from "./steps/NameEmailMultiStepForm/NameEmailTreeSurgeon";
import PostCodeSearchTreeSurgeon from "./steps/PostcodeSearch/PostCodeSearchTreeSurgeon";
import QuestionAsnwerMultiStepTreeSurgeon2 from "./steps/QuestionAnswerMultiStep/QuestionAsnwerMultiStepTreeSurgeon2";
import QuestionAnswerMultiStepTreeSurgeon from "./steps/QuestionAnswerMultiStep/QuestionAnswerMultiStepTreeSurgeon";

const MultiStepTreeSurgeon = ({ isQuestionWithImage = false, serviceId }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer);

  useEffect(() => {
    if (location.pathname.includes("tree-surgeon-multi-form-ppc")) {
      document.body.style.paddingTop = "0px";
    }

    document.documentElement.style.setProperty(
      "padding-top",
      location.pathname.includes("tree-surgeon-multi-form-ppc") && "0px"
    );
  }, [location.pathname]);

  const [animationDirection, setAnimationDirection] = useState("");
  const [actualSteps, setActualSteps] = useState(1);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const { userToken } = useSelector((state) => state.auth);
  const { authToken } = useSelector((state) => state.findJobs);
  const [backButtonTriggered, setBackButtonTriggered] = useState(false);
  const [isComingFromStep3, setIsComingFromStep3] = useState(false);
  const [isComingFromStep4, setIsComingFromStep4] = useState(false);
  const isAdminOrRemembered = authToken || userToken?.remember_tokens;
  const [questionHistory, setQuestionHistory] = useState([0]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [setstepText, setStepText] = useState("What");
  const [updateNumberStep, setUpdateNumberStep] = useState(2);
  const [localRequestId, setLocalRequestId] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [question2History, setQuestion2History] = useState([0]);
  const [questionAnswereForApi, setQuestionAnswereForApi] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [isStepFrom4, setIsStepFrom4] = useState(false);

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

    setTimeout(() => {
      const currentIndex = stepFlow.indexOf(buyerStep);
      if (currentIndex < stepFlow.length - 1) {
        dispatch(setBuyerStep(stepFlow[currentIndex + 1]));
      }
    }, 300);
  };

  const prevStep = () => {
    setBackButtonTriggered(true);
    setTimeout(() => {
      const currentIndex = stepFlow.indexOf(buyerStep);
      if (currentIndex > 0) {
        if (buyerStep === 2) {
        } else if (buyerStep === 3) {
        } else if (buyerStep === 4) {
        } else if (buyerStep === 5) {
        }

        if (stepFlow[currentIndex - 1] === 1) {
          setIsComingFromStep3(true);
        }
        if (stepFlow[currentIndex - 1] === 3) {
          setIsComingFromStep4(true);
        }
        dispatch(setBuyerStep(stepFlow[currentIndex - 1]));
        setBackButtonTriggered(false);
      }
    }, 300);
  };
  useEffect(() => {
    const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
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
      dispatch(setBuyerStep(1));
    }
  }, [dispatch, isAdminOrRemembered]);

  useEffect(() => {
    dispatch(questionAnswerData({ service_id: serviceId }));
  }, []);

  let firstQuestions = [];
  let lastQuestion = [];

  if (questionanswerData?.length) {
    const lastIndex = questionanswerData.findIndex((q) => {
      try {
        const answers = JSON.parse(q.answer);
        return answers.some((a) => a.next_question === "last");
      } catch {
        return false;
      }
    });

    if (lastIndex !== -1) {
      lastQuestion = questionanswerData.slice(lastIndex - 1, lastIndex + 1);
      firstQuestions = questionanswerData.filter(
        (_, i) => i < lastIndex - 1 || i > lastIndex
      );
    } else {
      firstQuestions = questionanswerData;
    }
  }

  useEffect(() => {
    if (questionanswerData.length > 0) {
      setIsLoadingQuestions(false);
      dispatch(setbuyerRequestData({ service_id: serviceId }));
    }
  }, [questionanswerData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setIsDesktop(window.innerWidth > 768);
      handleResize(); // initial check
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return (
    <>
      <CalonicalTags />

      {localRequestId === null && (
        <div>
          {isDesktop ? (
            <NavigationDetectorDesktop />
          ) : (
            <NavigationDetectorWithConfirmations />
          )}
        </div>
      )}
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>
          Compare Free Quotes from Local Driveway Companies | Localists
        </title>
        <meta
          name="description"
          content="Get free quotes from trusted local driveway companies. Compare prices, read reviews, and hire top-rated professionals near you – quick and simple."
        />
      </Helmet>

      <div className={styles.tab}>
        <span className={styles.tabText}>
          {buyerStep <= 3 ? `${setstepText} - ${actualSteps}/3` : ""}
        </span>{" "}
      </div>

      <ProgressBarLandingPage
        value={5 + progressPercentage}
        buyerStep={buyerStep}
      />
      <div>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <div className={`${styles.slideContainer} ${animationDirection}`}>
              {buyerStep === 1 && (
                <div style={{ maxWidth: "592px", margin: "auto" }}>
                  <QuestionAsnwerMultiStepTreeSurgeon2
                    questions={firstQuestions}
                    onNext={nextStep}
                    onBack={prevStep}
                    loading={isLoadingQuestions}
                    isComingFromStep3={isComingFromStep3}
                    setQuestionHistory={setQuestionHistory}
                    questionHistory={questionHistory}
                    setIsComingFromStep3={setIsComingFromStep3}
                    setProgressPercentage={setProgressPercentage}
                    isQuestionWithImage={isQuestionWithImage}
                    serviceName="Tree Surgeon"
                    setQuestion2History={setQuestion2History}
                    question2History={question2History}
                    setSelectedOption={setSelectedOption}
                    selectedOption={selectedOption}
                  />
                </div>
              )}
              {buyerStep === 2 && (
                <div style={{ margin: "auto" }}>
                  <PostCodeSearchTreeSurgeon
                    prevStep={prevStep}
                    onNext={nextStep}
                    setProgressPercentage={setProgressPercentage}
                    setBackButtonTriggered={setBackButtonTriggered}
                    titleHeading="tree surgeon specialists"
                    setSelectedOption={setSelectedOption}
                  />
                </div>
              )}

              {buyerStep === 3 && (
                <div style={{ margin: "auto" }}>
                  <QuestionAnswerMultiStepTreeSurgeon
                    questions={lastQuestion}
                    onNext={nextStep}
                    onBack={prevStep}
                    loading={questionLoader}
                    setIsComingFromStep4={setIsComingFromStep4}
                    isComingFromStep4={isComingFromStep4}
                    setProgressPercentage={setProgressPercentage}
                    setSelectedOption={setSelectedOption}
                    selectedOption={selectedOption}
                    isStepFrom4={isStepFrom4}
                    setIsStepFrom4={setIsStepFrom4}
                  />
                </div>
              )}
              {buyerStep === 4 && (
                <NameEmailTreeSurgeon
                  nextStep={nextStep}
                  onBack={prevStep}
                  setIsStepFrom4={setIsStepFrom4}
                />
              )}
              {buyerStep === 5 && (
                <PhoneNumberMultiStepForm
                  nextStep={nextStep}
                  onBack={prevStep}
                  serviceId={51}
                  setProgressPercentage={setProgressPercentage}
                  setUpdateNumberStep={setUpdateNumberStep}
                  updateNumberStep={updateNumberStep}
                  setLocalRequestId={setLocalRequestId}
                />
              )}
              {buyerStep === 6 && (
                <CardLayoutWrapper showButton={false}>
                  <OTPVerificationMultiStep
                    open
                    nextStep={nextStep}
                    onBack={prevStep}
                    isThankuPageOnlyShow
                    setProgressPercentage={setProgressPercentage}
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

export default MultiStepTreeSurgeon;
