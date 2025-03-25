import React, { useState } from "react";
import styles from "./BuyerRegistration.module.css";
import WhatServiceYouNeed from "./WhatServiceYouNeed/WhatServiceYouNeed";
import QuestionModal from "../../../common/questionModal/QuestionModal";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerStep } from "../../../../store/Buyer/BuyerSlice";


const BuyerRegistration = ({closeModal}) => {
  const dispatch = useDispatch()
const {questionanswerData,buyerStep} = useSelector((state)=>state.buyer)
   const nextStep = () => {
        dispatch(setBuyerStep(buyerStep + 1));
    };
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {buyerStep === 1 && <WhatServiceYouNeed nextStep={nextStep} />}
        {buyerStep === 2 && <QuestionModal questions={questionanswerData} onClose={closeModal} />}
      </div>
    </div>
  );
};

export default BuyerRegistration;
