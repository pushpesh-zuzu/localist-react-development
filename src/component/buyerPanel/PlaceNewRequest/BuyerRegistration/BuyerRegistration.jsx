import React, { useEffect, useState } from "react";
import styles from "./BuyerRegistration.module.css";
import WhatServiceYouNeed from "./WhatServiceYouNeed/WhatServiceYouNeed";
import QuestionModal from "../../../common/questionModal/QuestionModal";
import { useDispatch, useSelector } from "react-redux";
import { setbuyerRequestData, setBuyerStep } from "../../../../store/Buyer/BuyerSlice";
import ViewYourMatches from "./ViewYourMatches/ViewYourMatches";
import DescribeYourRequest from "./DescribeYourRequest/DescribeYourRequest";

const BuyerRegistration = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep, questionLoader,buyerRequest } = useSelector(
    (state) => state.buyer
  );
  const nextStep = () => {
    dispatch(setBuyerStep(buyerStep + 1));
  };
  const previousStep = () => {
    dispatch(setBuyerStep(buyerStep - 1));
  };

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

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {buyerStep === 1 && <WhatServiceYouNeed nextStep={nextStep} 
                    formData={buyerRequest} />}

        {buyerStep === 2 && (
          <QuestionModal
            questions={questionanswerData}
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={closeModal}
            loading={questionLoader}
            
                    formData={buyerRequest}
          />
        )}

        {buyerStep === 3 && (
          <ViewYourMatches
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={closeModal}
            formData={buyerRequest}
          />
        )}

        {buyerStep === 4 && (
          <DescribeYourRequest nextStep={nextStep} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default BuyerRegistration;
