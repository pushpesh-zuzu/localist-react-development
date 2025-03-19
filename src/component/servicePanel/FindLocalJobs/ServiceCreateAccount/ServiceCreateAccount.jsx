import React, { useState } from "react";
import styles from "./ServiceCreateAccount.module.css";
import ServiceLocationStep from "./ServiceLocationStep/ServiceLocationStep";
import ServiceDetailsStep from "./ServiceDetailsStep/ServiceDetailsStep";
import ServiceBusinessAddressStep from "./ServiceBusinessAddressStep/ServiceBusinessAddressStep";

const ServiceCreateAccount = () => {
  const [step, setStep] = useState(1);
   const [formData, setFormData] = useState({
    miles:"",
    postcode:"",
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
      state:"",
      city:"",
      zipcode:"",
      apartment:"",
      service_id:"",
      auto_bid:"",
      

    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        {step === 1 && <ServiceLocationStep nextStep={nextStep} setFormData={setFormData} formData={formData}  handleInputChange={handleInputChange} />}
        {step === 2 && (
          <ServiceDetailsStep nextStep={nextStep}   setFormData={setFormData} formData={formData} prevStep={prevStep} handleInputChange={handleInputChange}/>
        )}
        {step === 3 && <ServiceBusinessAddressStep prevStep={prevStep} setFormData={setFormData} formData={formData}  handleInputChange={handleInputChange}/>}
      </div>
    </div>
  );
};

export default ServiceCreateAccount;
