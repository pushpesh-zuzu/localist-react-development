import React, { useState } from "react";
import styles from "./BuyerRegistration.module.css";
import WhatServiceYouNeed from "./WhatServiceYouNeed/WhatServiceYouNeed";
import QuestionModal from "../../../common/questionModal/QuestionModal";
// import BuyerRegistrationStep2 from "./BuyerRegistrationStep2/BuyerRegistrationStep2";
// import BuyerRegistrationStep3 from "./BuyerRegistrationStep3/BuyerRegistrationStep3";

const BuyerRegistration = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const questions = [
    {
      question: "What is your web design requirement?",
      options: [
        "Create a new website",
        "Major changes to my website",
        "Minor changes to my website",
        "Other",
      ],
    },
    {
      question: "What type of website do you need?",
      options: ["E-commerce", "Portfolio", "Business", "Blog", "Other"],
    },
    { question: "Do you have existing content?", options: ["Yes", "No"] },
  ];

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {step === 1 && <WhatServiceYouNeed nextStep={nextStep} />}
        {step === 2 && <QuestionModal questions={questions} />}
      </div>
    </div>
  );
};

export default BuyerRegistration;
