import React, { useState } from "react";
import styles from "./BuyerRegistration.module.css";
import BuyerRegistrationStep1 from "./BuyerRegistrationStep1/BuyerRegistrationStep1";
// import BuyerRegistrationStep2 from "./BuyerRegistrationStep2/BuyerRegistrationStep2";
// import BuyerRegistrationStep3 from "./BuyerRegistrationStep3/BuyerRegistrationStep3";

const BuyerRegistration = ({ closeModal }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {step === 1 && <BuyerRegistrationStep1 nextStep={nextStep} />}
        {/* {step === 2 && <BuyerRegistrationStep2 nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <BuyerRegistrationStep3 prevStep={prevStep} />} */}
      </div>
    </div>
  );
};

export default BuyerRegistration;
