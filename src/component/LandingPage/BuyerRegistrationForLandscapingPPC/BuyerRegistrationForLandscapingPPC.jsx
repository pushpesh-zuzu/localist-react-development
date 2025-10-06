import React, { useEffect, useState, useRef } from "react";
import styles from "./BuyerRegistrationForLandscapingPPC.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  questionAnswerData,
  setBuyerStep,
} from "../../../store/Buyer/BuyerSlice";
import ViewYourMatches from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/ViewYourMatches/ViewYourMatches";
import EmailMatch from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/EmailMatch/EmailMatch";
import BidsList from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BidsList/BidsList";
import ConfirmationModal from "../../common/ConfirmationModal/ConfirmationModal";
import NumberVerifiedModal from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/NumberVerified/NumberVerified";
import WhatServiceDoYouNeedPage from "../../BuyerRegistrationPages/WhatServiceDoYouNeedPage/WhatServiceDoYouNeedPage";
import OTPVerificationPage from "../../BuyerRegistrationPages/OTPVerificationPage/OTPVerificationPage";
import DescribeYourRequestPage from "../../BuyerRegistrationPages/DescribeYourRequestPage/DescribeYourRequestPage";
import QuestionAnswerPage from "../../BuyerRegistrationPages/QuestionAnswerPage/QuestionAnswerPage";

const BuyerRegistrationForLandscapingPPC = ({
  closeModal,
  serviceId = 43,
  serviceName = "Landscaping",
  postcode,
  city,
  postalCodeValidate,
  cancelHeading = "Don’t forget to check prices!",
  cancelPara = `Simply answer a few questions about your requirement, and we will match you with local professionals in seconds! `,
  setSelectedService = () => {},
  setFromImageModal = () => {},
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const questionModalRef = useRef();

  const [getServiceState, setGetServiceState] = useState(null);

  const [resetEmailFormTrigger, setResetEmailFormTrigger] = useState(false);
  const [resetServiceFormTrigger, setResetServiceFormTrigger] = useState(false);
  const [resetQaFormTrigger, setResetQasFormTrigger] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);
  const [email, setEmails] = useState("");
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer);
  // console.log(buyerStep, "buyerStep");

  const { userToken, adminToken } = useSelector((state) => state.auth);
  const { registerData, registerLoader, authToken } = useSelector(
    (state) => state.findJobs
  );
  // console.log(registerData, "registerData");
  const isAdminOrRemembered = authToken || userToken?.remember_tokens;

  const stepFlow = isAdminOrRemembered
    ? [2, 3, 6, 7, 8]
    : [1, 2, 3, 4, 5, 7, 8];

  const nextStep = () => {
    const currentIndex = stepFlow.indexOf(buyerStep);
    if (currentIndex < stepFlow.length - 1) {
      dispatch(setBuyerStep(stepFlow[currentIndex + 1]));
    }
  };

  const previousStep = () => {
    const currentIndex = stepFlow.indexOf(buyerStep);
    if (currentIndex > 0) {
      dispatch(setBuyerStep(stepFlow[currentIndex - 1]));
    }
  };

  const getService = (service) => {
    setGetServiceState(service);
  };

  // useEffect(() => {
  //   const initialStep = isAdminOrRemembered ? 2 : isStartWithQuestionModal ? 0 : 1;
  //   dispatch(setBuyerStep(initialStep));
  // }, [dispatch, isAdminOrRemembered]);
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
      const initialStep = isAdminOrRemembered ? 2 : 1;
      dispatch(setBuyerStep(initialStep));
    }
  }, [dispatch, isAdminOrRemembered]);

  // useEffect(() => {
  //   if (buyerStep) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [buyerStep]);

  useEffect(() => {
    if (shouldClose) {
      dispatch(setBuyerStep(1));
      //   closeModal();
    }
  }, [shouldClose]);

  const handleClose = () => {
    if (typeof setSelectedService === "function") setSelectedService(null);
    if (typeof setFromImageModal === "function") setFromImageModal(false);
    if (typeof closeModal === "function") closeModal();
  };

  useEffect(() => {
    if (buyerStep === 2) {
      // Reset QuestionModal when it opens
      questionModalRef.current?.resetQuestions?.();
    }
  }, [buyerStep]);
  const confirmClose = () => {
    setShowConfirmModal(false);
    setShouldClose(true);
    setResetEmailFormTrigger(true);
    setResetServiceFormTrigger(true);
    setResetQasFormTrigger(true);
    // closeModal();
  };

  useEffect(() => {
    dispatch(questionAnswerData({ service_id: serviceId }));
  }, []);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  useEffect(() => {
    if (questionanswerData.length > 0) {
      setIsLoadingQuestions(false);
    }
  }, [questionanswerData]);
  console.log(buyerStep, "buyerStepbuyerStep");
  return (
    <div className={styles.modalContent}>
      {buyerStep === 1 && (
        <QuestionAnswerPage
          // ref={questionModalRef}
          questions={questionanswerData}
          serviceName={serviceName}
          nextStep={nextStep}
          previousStep={previousStep}
          onClose={handleClose}
          setShowConfirmModal={setShowConfirmModal}
          formData={buyerRequest}
          resetQaTrigger={resetQaFormTrigger}
          setResetQasFormTrigger={setResetQasFormTrigger}
          isStartWithQuestionModal
          loading={questionLoader || isLoadingQuestions}
        />
      )}
      {buyerStep === 2 && (
        <WhatServiceDoYouNeedPage
          nextStep={nextStep}
          formData={buyerRequest}
          serviceId={serviceId}
          serviceName={serviceName}
          onClose={handleClose}
          pincodes={postcode}
          setShowConfirmModal={setShowConfirmModal}
          postalCodeIsValidate={postalCodeValidate}
          resetServiceTrigger={resetServiceFormTrigger}
          isStartWithQuestionModal
        />
      )}

      {buyerStep === 3 && (
        <EmailMatch
          nextStep={nextStep}
          previousStep={previousStep}
          onClose={handleClose}
          formData={buyerRequest}
          setEmails={setEmails}
          setShowConfirmModal={setShowConfirmModal}
          resetTrigger={resetEmailFormTrigger}
          isPPCPages={false}
          hideCloseButton
          isStartWithQuestionModal
        />
      )}

      {buyerStep === 4 && (
        <OTPVerificationPage
          nextStep={nextStep}
          previousStep={previousStep}
          formData={buyerRequest}
          open={true}
          isThankuPageOnlyShow={true}
          // setShowConfirmModal={setShowConfirmModal}
          // onClose={handleClose}
        />
      )}
      {buyerStep === 5 && (
        <NumberVerifiedModal
          nextStep={nextStep}
          previousStep={previousStep}
          open={true}
          setShowConfirmModal={setShowConfirmModal}
        />
      )}
      {buyerStep === 6 && (
        <ViewYourMatches
          nextStep={nextStep}
          previousStep={previousStep}
          onClose={handleClose}
          formData={buyerRequest}
          // setShowConfirmModal={setShowConfirmModal}
        />
      )}
      {buyerStep === 7 && (
        <DescribeYourRequestPage
          nextStep={nextStep}
          onClose={handleClose}
          setShowConfirmModal={setShowConfirmModal}
        />
      )}

      {buyerStep === 8 && (
        <BidsList
          nextStep={nextStep}
          previousStep={previousStep}
          onClose={handleClose}
        />
      )}

      {showConfirmModal && (
        <ConfirmationModal
          cancelHeading={cancelHeading}
          cancelPara={cancelPara}
          onConfirm={confirmClose}
          onCancel={() => setShowConfirmModal(false)}
          setShowConfirmModal={setShowConfirmModal}
        />
      )}
    </div>
  );
};

export default BuyerRegistrationForLandscapingPPC;
