import React, { useEffect, useState, useRef } from "react";
import styles from "./buyerregistrationlandingpage.module.css";
import QuestionModal from "../../common/questionModal/QuestionModal";
import { useDispatch, useSelector } from "react-redux";
import {
  questionAnswerData,
  setBuyerStep,
} from "../../../store/Buyer/BuyerSlice";
// import NameMatch from "./NameMatch/NameMatch";
import ViewYourMatches from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/ViewYourMatches/ViewYourMatches";
import DescribeYourRequest from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/DescribeYourRequest/DescribeYourRequest";
import WhatServiceYouNeed from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/WhatServiceYouNeed/WhatServiceYouNeed";
import EmailMatch from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/EmailMatch/EmailMatch";
import BidsList from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BidsList/BidsList";
import ConfirmationModal from "../../common/ConfirmationModal/ConfirmationModal";
import OtpVerification from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/OtpVerification/OtpVerification";
import NumberVerifiedModal from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/NumberVerified/NumberVerified";
import WelcomeEmailModal from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/WelcomeEmailModal/WelcomeEmailModal";

const BuyerRegistrationLandingPage = ({
  closeModal,
  serviceId = 52,
  serviceName,
  postcode,
  city,
  postalCodeValidate,
  cancelHeading,
  cancelPara,
  setSelectedService = () => {},
  setFromImageModal = () => {},
  isStartWithQuestionModal,
  welcomModalTitle=''
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
    : [0, 1, 2, 3, 4, 5, 7, 8];

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
    console.log(service, "service11");
    setGetServiceState(service);
  };

  useEffect(() => {
    const initialStep = isAdminOrRemembered ? 2 : isStartWithQuestionModal ? 0 : 1;
    dispatch(setBuyerStep(initialStep));
  }, [dispatch, isAdminOrRemembered]);

  useEffect(() => {
    if (buyerStep) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [buyerStep]);

  useEffect(() => {
    if (shouldClose) {
      dispatch(setBuyerStep(1));
      closeModal();
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
    closeModal();
  };

  useEffect(() => {
    isStartWithQuestionModal &&
      dispatch(questionAnswerData({ service_id: serviceId }));
  }, []);
  console.log(buyerStep, "buyerStepbuyerStep");
  return (
    <div className={styles.modal}>
      {!isStartWithQuestionModal ? (
        <div className={styles.modalContent}>
          {/* {buyerStep === 0 && (
            <WelcomeEmailModal
              nextStep={nextStep}
              onClose={handleClose}
              setShowConfirmModal={setShowConfirmModal}
              resetTrigger={resetEmailFormTrigger}
            />
          )} */}
          {buyerStep === 1 && (
            <EmailMatch
              nextStep={nextStep}
              previousStep={previousStep}
              onClose={handleClose}
              formData={buyerRequest}
              setEmails={setEmails}
              setShowConfirmModal={setShowConfirmModal}
              resetTrigger={resetEmailFormTrigger}
            />
          )}
          {buyerStep === 2 && (
            <WhatServiceYouNeed
              nextStep={nextStep}
              formData={buyerRequest}
              serviceId={serviceId}
              serviceName={serviceName}
              onClose={handleClose}
              pincodes={postcode}
              setShowConfirmModal={setShowConfirmModal}
              postalCodeIsValidate={postalCodeValidate}
              resetServiceTrigger={resetServiceFormTrigger}
              getService={getService}
            />
          )}

          {buyerStep === 3 && (
            <QuestionModal
              ref={questionModalRef}
              questions={questionanswerData}
              serviceName={getServiceState?.name}
              nextStep={nextStep}
              previousStep={previousStep}
              onClose={handleClose}
              loading={questionLoader}
              setShowConfirmModal={setShowConfirmModal}
              formData={buyerRequest}
              resetQaTrigger={resetQaFormTrigger}
              setResetQasFormTrigger={setResetQasFormTrigger}
            />
          )}

          {buyerStep === 4 && (
            <OtpVerification
              nextStep={nextStep}
              previousStep={previousStep}
              formData={buyerRequest}
              open={true}
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
            <DescribeYourRequest
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

          {/* {buyerStep === 1 && (
          <WhatServiceYouNeed
            nextStep={nextStep}
            formData={buyerRequest}
            serviceId={serviceId}
            serviceName={serviceName}
            onClose={handleClose}
            pincodes={postcode}
          />
        )}

        {buyerStep === 2 && (
          <QuestionModal
            questions={questionanswerData}
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
            loading={questionLoader}
            formData={buyerRequest}
          />
        )}

        {buyerStep === 3 && (
          <EmailMatch
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
            formData={buyerRequest}
            setEmails={setEmails}
          />
        )}

        {/* {buyerStep === 4 && (
          <NameMatch
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
            formData={buyerRequest}
            email={email}
            // loading={registerLoader}
          />
        )} 

        {buyerStep === 4 && (
          <ViewYourMatches
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
            formData={buyerRequest}
          />
        )}

        {buyerStep === 5 && (
          <DescribeYourRequest nextStep={nextStep} onClose={handleClose} />
        )}

        {buyerStep === 6 && (
          <BidsList
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
          />
        )}
      </div> */}

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
      ) : (
        <div className={styles.modalContent}>
          {buyerStep === 0 && (
            <WelcomeEmailModal
              nextStep={nextStep}
              onClose={handleClose}
              setShowConfirmModal={setShowConfirmModal}
              resetTrigger={resetEmailFormTrigger}
              welcomModalTitle={welcomModalTitle}
            />
          )}
          {buyerStep === 1 && (
            <QuestionModal
              ref={questionModalRef}
              questions={questionanswerData}
              serviceName={serviceName}
              nextStep={nextStep}
              previousStep={previousStep}
              onClose={handleClose}
              loading={questionLoader}
              setShowConfirmModal={setShowConfirmModal}
              formData={buyerRequest}
              resetQaTrigger={resetQaFormTrigger}
              setResetQasFormTrigger={setResetQasFormTrigger}
              isStartWithQuestionModal={isStartWithQuestionModal}
            />
          )}
          {buyerStep === 2 && (
            <WhatServiceYouNeed
              nextStep={nextStep}
              formData={buyerRequest}
              serviceId={serviceId}
              serviceName={serviceName}
              onClose={handleClose}
              pincodes={postcode}
              setShowConfirmModal={setShowConfirmModal}
              postalCodeIsValidate={postalCodeValidate}
              resetServiceTrigger={resetServiceFormTrigger}
              isStartWithQuestionModal={isStartWithQuestionModal}
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
              isStartWithQuestionModal={isStartWithQuestionModal}
              isPPCPages={true}
            />
          )}

          {buyerStep === 4 && (
            <OtpVerification
              nextStep={nextStep}
              previousStep={previousStep}
              formData={buyerRequest}
              open={true}
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
            <DescribeYourRequest
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
      )}
    </div>
  );
};

export default BuyerRegistrationLandingPage;
