import { useEffect, useState } from "react";
import styles from "./ServiceCreateAccount.module.css";
import ServiceLocationStep from "./ServiceLocationStep/ServiceLocationStep";
import ServiceDetailsStep from "./ServiceDetailsStep/ServiceDetailsStep";
import ServiceBusinessAddressStep from "./ServiceBusinessAddressStep/ServiceBusinessAddressStep";
import OtherServiceStep from "./OtherServiceStep/OtherServiceStep";

const ServiceCreateAccount = () => {
  const [step, setStep] = useState(1);
  const [showExitModal, setShowExitModal] = useState(false);
  const [formData, setFormData] = useState({
    miles1: "",
    postcode: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    company_name: "",
    company_size: null,
    company_sales_team: null,
    company_website: null,
    websiteAddress: "",
    new_jobs: null,
    social_media: null,
    address: "",
    state: "",
    city: "",
    zipcode: "",
    apartment: "",
    service_id: "",
    auto_bid: 0,
    miles2: "",
  });

  const handleInputChange = (e) => {
    const { name, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : e.target.value,
    }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      setShowExitModal(true);
      return (e.returnValue = "Are you sure you want to leave?");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleCloseModal = () => setShowExitModal(false);
  const handleExit = () => {
    setShowExitModal(false);
    window.removeEventListener("beforeunload", () => {});
    window.close();
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        {step === 1 && (
          <ServiceLocationStep
            nextStep={nextStep}
            setFormData={setFormData}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}
        {step === 2 && (
          <ServiceDetailsStep
            nextStep={nextStep}
            setFormData={setFormData}
            formData={formData}
            prevStep={prevStep}
            handleInputChange={handleInputChange}
          />
        )}
        {step === 3 && (
          <ServiceBusinessAddressStep
            prevStep={prevStep}
            setFormData={setFormData}
            formData={formData}
            nextStep={nextStep}
            handleInputChange={handleInputChange}
          />
        )}
        {step === 4 && (
          <OtherServiceStep
            prevStep={prevStep}
            setFormData={setFormData}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}
      </div>

      {true && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.heading}>
              Are you sure that you want to leave?
            </h2>
            <p className={styles.description}>
              We're asking a few questions so we can find you the right pros,
              and send you quotes fast and free!
            </p>
            <div className={styles.buttonGroup}>
              <button className={styles.backButton} onClick={handleCloseModal}>
                Back
              </button>
              <button className={styles.continueButton} onClick={handleExit}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCreateAccount;
