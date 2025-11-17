import { useEffect, useState } from "react";
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
import NameEmailMultiStepForm from "./steps/NameEmailMultiStepForm/NameEmailMultiStepForm";
import CardLayoutWrapper from "./steps/CardLayoutWrapper/CardLayoutWrapper";
import PhoneNumberMultiStepForm from "./steps/PhoneNumberMultiStepForm/PhoneNumberMultiStepForm";
import MultiStepDescribeYourRequest from "./steps/MultiStepDescribeYourRequest/MultiStepDescribeYourRequest";
import OTPVerificationMultiStep from "./OTPVerificationMultiStep/OTPVerificationMultiStep";
import { Helmet } from "react-helmet-async";
import { handleScrollToBottom } from "../../utils/scroll";
import NavigationDetectorDesktop from "../common/navigationDetected/NavigationDetectorDesktop";
import NavigationDetectorWithConfirmations from "../common/navigationDetected/NavigationDetectorWithConfirmations";
import CalonicalTags from "../common/CalonicalTags/CalonicalTags";
import { useProgress } from "../../utils/useProgress";
import PostcodeSearchRoofing from "./steps/PostcodeSearch/PostcodeSearchRoofing";
import QuestionAnserMultiStepRoofingNew2 from "./steps/QuestionAnswerMultiStep/QuestionAnserMultiStepRoofingNew2";
import QuestionAnswerMultiStepRoofingNew from "./steps/QuestionAnswerMultiStep/QuestionAnswerMultiStepRoofingNew";

const MultiStepRoofingNew = ({
  isQuestionWithImage = false,
  serviceId = 51,
  serviceName = "Driveway Installers",
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep } = useSelector((state) => state.buyer);
  const { progressPercentage, removeQuestionByNumber, setProgressPercentage } =
    useProgress(serviceId);
  useEffect(() => {
    if (location.pathname.includes("roofing-multi-form-ppc")) {
      document.body.style.paddingTop = "0px";
    }

    document.documentElement.style.setProperty(
      "padding-top",
      location.pathname.includes("roofing-multi-form-ppc") && "0px"
    );
  }, [location.pathname]);

  const [animationDirection, setAnimationDirection] = useState("");
  const [actualSteps, setActualSteps] = useState(1);
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
  const [percetangForPost, setPercetangForPost] = useState(0);
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
        if (stepFlow[currentIndex - 1] === 1) {
          setIsComingFromStep3(true);
          removeQuestionByNumber(7);
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
    }
  }, [buyerStep]);

  useEffect(() => {
    const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
    if (pendingModal?.shouldOpen) {
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
  if (Array.isArray(questionanswerData)) {
    questionanswerData.forEach((q) => {
      try {
        const answers = JSON.parse(q.answer);
        const hasLast = answers.some((a) => a.next_question === "last");
        if (hasLast) {
          lastQuestion.push(q);
        } else {
          firstQuestions.push(q);
        }
      } catch (err) {
        firstQuestions.push(q);
      }
    });
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
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <>
      <CalonicalTags isRequiredjsonLd={false} />

      {localRequestId === null && (
        <div>
          {typeof window !== "undefined" && isDesktop ? (
            <NavigationDetectorDesktop />
          ) : typeof window !== "undefined" ? (
            <NavigationDetectorWithConfirmations />
          ) : (
            ""
          )}
        </div>
      )}
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>
          Compare Free Quotes from Local Roofing Companies | Localists
        </title>

        <meta
          name="description"
          content="Get free quotes from top roofing companies. Compare local professionals, read reviews, and hire trusted experts – quick and hassle-free."
        />
      </Helmet>

      <div className={styles.tab}>
        <span className={styles.tabText}>
          {buyerStep <= 3 ? `${setstepText} - ${actualSteps}/3` : ""}
        </span>{" "}
      </div>

      <ProgressBarLandingPage
        value={progressPercentage + 5 + percetangForPost}
        buyerStep={buyerStep}
      />
      <div>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <div className={`${styles.slideContainer} ${animationDirection}`}>
              {buyerStep === 1 && (
                <div style={{ maxWidth: "592px", margin: "auto" }}>
                  <QuestionAnserMultiStepRoofingNew2
                    questions={firstQuestions}
                    onNext={nextStep}
                    onBack={prevStep}
                    loading={isLoadingQuestions}
                    isComingFromStep3={isComingFromStep3}
                    setQuestionHistory={setQuestionHistory}
                    questionHistory={questionHistory}
                    setIsComingFromStep3={setIsComingFromStep3}
                    // setProgressPercentage={setProgressPercentage}
                    isQuestionWithImage={isQuestionWithImage}
                    serviceName={serviceName}
                    serviceId={serviceId}
                    removeQuestionByNumber={removeQuestionByNumber}
                  />
                </div>
              )}
              {buyerStep === 2 && (
                <div className={styles.postcode} style={{ margin: "auto" }}>
                  <PostcodeSearchRoofing
                    prevStep={prevStep}
                    onNext={nextStep}
                    titleHeading="roofing companies"
                    setPercetangForPost={setPercetangForPost}
                  />
                </div>
              )}

              {buyerStep === 3 && (
                <div style={{ maxWidth: "592px", margin: "auto" }}>
                  <QuestionAnswerMultiStepRoofingNew
                    questions={lastQuestion}
                    onNext={nextStep}
                    onBack={prevStep}
                    setIsComingFromStep4={setIsComingFromStep4}
                    isComingFromStep4={isComingFromStep4}
                    setPercetangForPost={setPercetangForPost}
                  />
                </div>
              )}
              {buyerStep === 4 && (
                <NameEmailMultiStepForm
                  nextStep={nextStep}
                  onBack={prevStep}
                  isStartWithQuestionModal={true}
                  // setProgressPercentage={setProgressPercentage}
                />
              )}
              {buyerStep === 5 && (
                <div style={{ maxWidth: "592px", margin: "auto" }}>
                  <PhoneNumberMultiStepForm
                    nextStep={nextStep}
                    onBack={prevStep}
                    serviceId={serviceId}
                    setProgressPercentage={setProgressPercentage}
                    setUpdateNumberStep={setUpdateNumberStep}
                    updateNumberStep={updateNumberStep}
                    setLocalRequestId={setLocalRequestId}
                  />
                </div>
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

export default MultiStepRoofingNew;
