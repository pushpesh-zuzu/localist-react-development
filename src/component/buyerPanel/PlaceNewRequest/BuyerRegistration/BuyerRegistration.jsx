import React, { useState } from "react";
import styles from "./BuyerRegistration.module.css";
import WhatServiceYouNeed from "./WhatServiceYouNeed/WhatServiceYouNeed";
import QuestionModal from "../../../common/questionModal/QuestionModal";
import { useSelector } from "react-redux";


const BuyerRegistration = () => {
  const [step, setStep] = useState(1);
const {questionanswerData} = useSelector((state)=>state.buyer)
console.log(questionanswerData,"questionanswerData")
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  // const questions = [
  //   {
  //     question: "What is your web design requirement?",
  //     options: [
  //       "Create a new website",
  //       "Major changes to my website",
  //       "Minor changes to my website",
  //       "Other",
  //     ],
  //   },
  //   {
  //     question: "What type of website do you need?",
  //     options: ["E-commerce", "Portfolio", "Business", "Blog", "Other"],
  //   },
  //   { question: "Do you have existing content?", options: ["Yes", "No"] },
  // ];

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {step === 1 && <WhatServiceYouNeed nextStep={nextStep} />}
        {step === 2 && <QuestionModal questions={questionanswerData} />}
      </div>
    </div>
  );
};

export default BuyerRegistration;
