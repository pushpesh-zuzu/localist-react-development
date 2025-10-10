import React, { useEffect, useState } from "react";
import styles from "./MultiStepForm.module.css";
import Footer from "../common/footer/Footer";
import { useLocation } from "react-router";
import ProgressBarLandingPage from "../common/ProgressBarLandingPage/ProgressBarLandingPage";
import PostcodeSearch from "./steps/PostcodeSearch/PostcodeSearch";
import QuestionAnswerMultiStep from "./steps/QuestionAnswerMultiStep/QuestionAnswerMultiStep";
import { questionAnswerData, setBuyerStep } from "../../store/Buyer/BuyerSlice";
import { useDispatch, useSelector } from "react-redux";
import NameEmailMultiStepForm from "./steps/NameEmailMultiStepForm/NameEmailMultiStepForm";
import CardLayoutWrapper from "./steps/CardLayoutWrapper/CardLayoutWrapper";
import PhoneNumberMultiStepForm from "./steps/PhoneNumberMultiStepForm/PhoneNumberMultiStepForm";
import MultiStepDescribeYourRequest from "./steps/MultiStepDescribeYourRequest/MultiStepDescribeYourRequest";
import QuestionAnswerMultiStep2 from "./steps/QuestionAnswerMultiStep/QuestionAnswerMultiStep2";
import OTPVerificationMultiStep from "./OTPVerificationMultiStep/OTPVerificationMultiStep";

const MultiStepForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer);

  useEffect(() => {
    if (location.pathname.includes("multistepper")) {
      document.body.style.paddingTop = "0px";
    } else {
      document.body.style.paddingTop = "40px";
    }

    document.documentElement.style.setProperty(
      "padding-top",
      location.pathname.includes("multistepper") ? "0px" : "40px",
      "important"
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

  const stepFlow = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    if (buyerStep === 1) {
      setActualSteps(1);
    } else if (buyerStep === 2) {
      setActualSteps(2);
    } else if (buyerStep === 4) {
      setActualSteps(3);
    }
  }, [buyerStep]);
  const getProgressPercentage = (per) => {
    setProgressPercentage((pre) => pre + per);
  };

  const nextStep = () => {
    setBackButtonTriggered(false);
    setIsComingFromStep3(false);
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
        if (stepFlow[currentIndex - 1] === 2) {
          setIsComingFromStep3(true);
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
  }, [dispatch]);

  useEffect(() => {
    dispatch(questionAnswerData({ service_id: 43 }));
  }, []);
  console.log(questionLoader,'llllll')
  // console.log(buyerRequest,'currentStep')
  // console.log(questionanswerData,'questionanswerDataquestionanswerData')
  // Split questions into first part and last question
  const firstQuestions = questionanswerData?.slice(0, -1) || []; // All except last
  const lastQuestion = questionanswerData?.slice(-1) || []; // Only last question
  // useEffect(() => {
  //   console.log("STEP CHANGE ->", currentStep);
  //   console.trace(); // shows call stack to see who triggered it
  // }, [currentStep]);
    useEffect(() => {
      if (questionanswerData.length > 0) {
        setIsLoadingQuestions(false);
      }
    }, [questionanswerData]);
  return (
    <>
      {/* <img className={styles.logoImg} src={logo} /> */}
      <div className={styles.tab}>
        <span className={styles.tabText}>
          {progressPercentage <= 100 ? `Where - ${actualSteps}/3` : ""}
        </span>{" "}
      </div>

      <ProgressBarLandingPage
        value={progressPercentage}
        actualSteps={actualSteps}
      />
      <div>
        <div className={styles.container}>
          <div className={styles.formContainer}>
            <div className={`${styles.slideContainer} ${animationDirection}`}>
              {buyerStep === 1 && (
                <QuestionAnswerMultiStep2
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
                />
              )}
              {buyerStep === 2 && (
                <PostcodeSearch
                  getProgressPercentage={getProgressPercentage}
                  prevStep={prevStep}
                  onNext={nextStep}
                  backButtonTriggered={backButtonTriggered}
                  setBackButtonTriggered={setBackButtonTriggered}
                  returPercentage={(100 * 2) / (firstQuestions?.length * 3)}
                />
              )}

              {buyerStep === 3 && (
                <QuestionAnswerMultiStep
                  questions={lastQuestion} // Sirf last question
                  onNext={nextStep} // Last question complete hone ke baad next step
                  onBack={prevStep}
                  loading={questionLoader}
                  getProgressPercentage={getProgressPercentage}
                />
              )}
              {buyerStep === 4 && (
                <NameEmailMultiStepForm
                  nextStep={nextStep} // Name/Email complete hone ke baad step 4 pe jao
                  onBack={prevStep}
                  isStartWithQuestionModal={true}
                  getProgressPercentage={getProgressPercentage}
                />
              )}
              {buyerStep === 5 && (
                <PhoneNumberMultiStepForm
                  nextStep={nextStep}
                  onBack={prevStep}
                />
              )}
              {buyerStep === 6 && (
                <CardLayoutWrapper showButton={false}>
                  <OTPVerificationMultiStep
                    open
                    nextStep={nextStep}
                    isThankuPageOnlyShow
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
