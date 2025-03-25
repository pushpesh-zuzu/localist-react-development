import React, { useState } from "react";
import styles from "./BuyerRegistration.module.css";
import WhatServiceYouNeed from "./WhatServiceYouNeed/WhatServiceYouNeed";
import QuestionModal from "../../../common/questionModal/QuestionModal";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerStep } from "../../../../store/Buyer/BuyerSlice";
import ViewYourMatches from "./ViewYourMatches/ViewYourMatches";
import DescribeYourRequest from "./DescribeYourRequest/DescribeYourRequest";

const BuyerRegistration = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep, questionLoader } = useSelector(
    (state) => state.buyer
  );
  const nextStep = () => {
    dispatch(setBuyerStep(buyerStep + 1));
  };
  const previousStep = () => {
    dispatch(setBuyerStep(buyerStep - 1));
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {buyerStep === 1 && <WhatServiceYouNeed nextStep={nextStep} />}
        {/* {buyerStep === 2 && <QuestionModal questions={questionanswerData} onClose={closeModal} loading={questionLoader} />} */}
        {buyerStep === 2 && (
          <QuestionModal
            questions={questionanswerData}
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={closeModal}
            loading={questionLoader}
          />
        )}
        {buyerStep === 3 && (
          <ViewYourMatches
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={closeModal}
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
