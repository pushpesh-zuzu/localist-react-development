import { useEffect, useState } from "react";
import styles from "./MultiStepForm.module.css";
import Footer from "../common/footer/Footer";
import { useLocation } from "react-router";
import ProgressBarLandingPage from "../common/ProgressBarLandingPage/ProgressBarLandingPage";
import PostcodeSearch from "./steps/PostcodeSearch/PostcodeSearch";
import QuestionAnswerMultiStep from "./steps/QuestionAnswerMultiStep/QuestionAnswerMultiStep";
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
import QuestionAnswerMultiStep2 from "./steps/QuestionAnswerMultiStep/QuestionAnswerMultiStep2";
import OTPVerificationMultiStep from "./OTPVerificationMultiStep/OTPVerificationMultiStep";
import { Helmet } from "react-helmet-async";
import { handleScrollToBottom } from "../../utils/scroll";
import NavigationDetectorWithConfirmations from "../common/navigationDetected/NavigationDetectorWithConfirmations";
import NavigationDetectorDesktop from "../common/navigationDetected/NavigationDetectorDesktop";

const MultiStepForm = ({ isQuestionWithImage = false }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer);

  useEffect(() => {
    if (location.pathname.includes("landscaping-multi-form-ppc")) {
      document.body.style.paddingTop = "0px";
    }

    document.documentElement.style.setProperty(
      "padding-top",
      location.pathname.includes("landscaping-multi-form-ppc") && "0px"
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
  const [localRequestId, setLocalRequestId] = useState(null);
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
    dispatch(questionAnswerData({ service_id: 43 }));
  }, []);

  const firstQuestions = questionanswerData?.slice(0, -1) || [];
  const lastQuestion = questionanswerData?.slice(-1) || [];

  useEffect(() => {
    if (questionanswerData.length > 0) {
      setIsLoadingQuestions(false);
      dispatch(setbuyerRequestData({ service_id: 43 }));
    }
  }, [questionanswerData]);

  useEffect(() => {
    if (firstQuestions?.length > 0) {
      const initialProgress = (100 * 2) / (firstQuestions.length * 3);
      setProgressPercentage(initialProgress);
    }
  }, [questionanswerData]);
  const [hasMountedDetector, setHasMountedDetector] = useState(false);
  useEffect(() => {
    if (!hasMountedDetector && buyerRequest?.questions?.length > 0) {
      setHasMountedDetector(true);
    }
  }, [hasMountedDetector]);

  return (
    <>
      {localRequestId === null && (
        <div>
          {window.innerWidth > 768 && typeof window !== "undefined" ? (
            <NavigationDetectorDesktop />
          ) : (
            <NavigationDetectorWithConfirmations />
          )}
        </div>
      )}
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>Compare Free Quotes from Local Landscapers | Localists</title>

        <meta
          name="description"
          content="Compare free quotes from trusted local landscapers in seconds. Submit your details and get matched with top-rated landscapers near you – quick, easy, and hassle-free!"
        />
      </Helmet>

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
                  <QuestionAnswerMultiStep2
                    questions={firstQuestions}
                    onNext={nextStep}
                    onBack={prevStep}
                    loading={isLoadingQuestions}
                    getProgressPercentage={getProgressPercentage}
                    isComingFromStep3={isComingFromStep3}
                    setQuestionHistory={setQuestionHistory}
                    questionHistory={questionHistory}
                    setIsComingFromStep3={setIsComingFromStep3}
                    setProgressPercentage={setProgressPercentage}
                    isQuestionWithImage={isQuestionWithImage}
                  />
                </div>
              )}
              {buyerStep === 2 && (
                <div style={{ margin: "auto" }}>
                  <PostcodeSearch
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
                  <QuestionAnswerMultiStep
                    questions={lastQuestion}
                    onNext={nextStep}
                    onBack={prevStep}
                    loading={questionLoader}
                    getProgressPercentage={getProgressPercentage}
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
                  setLocalRequestId={setLocalRequestId}
                />
              )}

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

export default MultiStepForm;
