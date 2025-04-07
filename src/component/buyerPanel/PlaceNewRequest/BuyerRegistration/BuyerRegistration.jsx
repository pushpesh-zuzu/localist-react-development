import React, { useEffect } from "react";
import styles from "./BuyerRegistration.module.css";
import WhatServiceYouNeed from "./WhatServiceYouNeed/WhatServiceYouNeed";
import QuestionModal from "../../../common/questionModal/QuestionModal";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerStep } from "../../../../store/Buyer/BuyerSlice";
import ViewYourMatches from "./ViewYourMatches/ViewYourMatches";
import DescribeYourRequest from "./DescribeYourRequest/DescribeYourRequest";
import EmailMatch from "./EmailMatch/EmailMatch";

const BuyerRegistration = ({ closeModal,serviceId,serviceName }) => {
  console.log(serviceId,"serviceId")
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer);

  const nextStep = () => {
    dispatch(setBuyerStep(buyerStep + 1));
  };

  const previousStep = () => {
    if (buyerStep === 3) {
      dispatch(setBuyerStep(2)); 
    } else {
      dispatch(setBuyerStep(buyerStep - 1));
    }
  };
  useEffect(()=>{
dispatch(setBuyerStep(1))
  },[])

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
        {buyerStep === 1 && (
          <WhatServiceYouNeed nextStep={nextStep} formData={buyerRequest}  serviceId={serviceId} serviceName={serviceName}/>
        )}

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
          <EmailMatch
          nextStep={nextStep}
            previousStep={previousStep}
            onClose={closeModal}
            formData={buyerRequest}
            />
        )}

        {buyerStep === 4 && (
          <ViewYourMatches
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={closeModal}
            formData={buyerRequest}
          />
        )}

        {buyerStep === 5 && (
          <DescribeYourRequest nextStep={nextStep} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default BuyerRegistration;
