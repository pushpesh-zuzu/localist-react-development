import React, { useState } from "react";
import styles from "./ServiceCreateAccount.module.css";
import ServiceLocationStep from "./ServiceLocationStep/ServiceLocationStep";
import ServiceDetailsStep from "./ServiceDetailsStep/ServiceDetailsStep";

const ServiceCreateAccount = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        {step === 1 && <ServiceLocationStep nextStep={nextStep} />}
        {step === 2 && (
          <ServiceDetailsStep nextStep={nextStep} prevStep={prevStep} />
        )}
        {/* {step === 3 && <ReviewStep prevStep={prevStep} />} */}
      </div>
    </div>
  );
};

export default ServiceCreateAccount;
