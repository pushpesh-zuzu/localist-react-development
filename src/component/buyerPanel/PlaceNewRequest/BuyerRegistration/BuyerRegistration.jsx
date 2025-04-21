import React, { useEffect, useState } from "react";
import styles from "./BuyerRegistration.module.css";
import WhatServiceYouNeed from "./WhatServiceYouNeed/WhatServiceYouNeed";
import QuestionModal from "../../../common/questionModal/QuestionModal";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerStep } from "../../../../store/Buyer/BuyerSlice";
import ViewYourMatches from "./ViewYourMatches/ViewYourMatches";
import DescribeYourRequest from "./DescribeYourRequest/DescribeYourRequest";
import EmailMatch from "./EmailMatch/EmailMatch";
import NameMatch from "./NameMatch/NameMatch";
import BidsList from "./BidsList/BidsList";
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";

const BuyerRegistration = ({ closeModal, serviceId, serviceName,postcode}) => {
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);
  const [email, setEmails] = useState("");
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer);
  const { adminToken } = useSelector((state) => state.auth);
  const { registerData,registerLoader } = useSelector((state) => state.findJobs);

  const isAdminOrRemembered = adminToken || registerData?.remember_tokens;

  const stepFlow = isAdminOrRemembered
    ? [1, 2,3, 4, 5, 6,7,8]
    : [2, 3, 4, 5, 7,8];

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

  useEffect(() => {
    dispatch(setBuyerStep(1));
  }, []);

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
    closeModal();
  };

  // const confirmClose = () => {
  //   setShowConfirmModal(false);
  //   setShouldClose(true); // <-- triggers close in effect
  // };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>

      {buyerStep === 1 && (
         
          <EmailMatch
          nextStep={nextStep}
          previousStep={previousStep}
          onClose={handleClose}
          formData={buyerRequest}
          setEmails={setEmails}
        />
        )}
        {
          buyerStep === 2 && (
            <WhatServiceYouNeed
            nextStep={nextStep}
            formData={buyerRequest}
            serviceId={serviceId}
            serviceName={serviceName}
            onClose={handleClose}
            pincodes={postcode}
          />
          )
        }

{buyerStep === 3 && (
          <QuestionModal
            questions={questionanswerData}
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
            loading={questionLoader}
            formData={buyerRequest}
          />
        )}

        {
          buyerStep === 4 && (
<>Prem</>
          )
        }
          {
          buyerStep === 5 && (
            <>saini</>
          )
        }
          {
          buyerStep === 6 && (
            <ViewYourMatches
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
            formData={buyerRequest}
          />
          )
        }
  {
          buyerStep === 7 && (
            <DescribeYourRequest nextStep={nextStep} onClose={handleClose} />
          )
        }

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

      {/* {showConfirmModal && (
        <ConfirmationModal
          onConfirm={confirmClose}
          onCancel={() => setShowConfirmModal(false)}
        />
      )} */}
      </div>
    </div>
  );
};

export default BuyerRegistration;
