import { useEffect, useState } from "react";
import styles from "./ServiceCreateAccount.module.css";
import ServiceLocationStep from "./ServiceLocationStep/ServiceLocationStep";
import ServiceDetailsStep from "./ServiceDetailsStep/ServiceDetailsStep";
import ServiceBusinessAddressStep from "./ServiceBusinessAddressStep/ServiceBusinessAddressStep";
import OtherServiceStep from "./OtherServiceStep/OtherServiceStep";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterStep } from "../../../../store/FindJobs/findJobSlice";

const ServiceCreateAccount = () => {

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    miles1: "1 miles",
    postcode: "",
    nation_wide:0,
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
    is_zipcode:"",
    apartment: "",
    service_id: "",
    auto_bid: 0,
    miles2: "1 miles",
  });
const {registerStep} = useSelector((state)=> state.findJobs)
  const [errors, setErrors] = useState({});

  // Validation function
  const validateStep = () => {
    let newErrors = {};

    if (registerStep === 1) {
      if (!formData.miles1.trim()) newErrors.miles1 = "Miles is required";
      if (!formData.postcode.trim())
        newErrors.postcode = "Postcode is required";
    }

    if (registerStep === 2) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      // if (!formData.company_name.trim()) newErrors.company_name = "Company Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.password.trim())
        newErrors.password = "Password is required";
      // if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    }

    if (registerStep === 3) {
      // if (!formData.address.trim()) newErrors.address = "Address is required";
      // if (!formData.state.trim()) newErrors.state = "State is required";
      // if (!formData.city.trim()) newErrors.city = "City is required";
      // if (formData.zipcode === 1 && !formData.is_zipcode.trim()) {
      //   newErrors.is_zipcode = "Zipcode is required";
      // }
    }
    if(registerStep === 4){
      if (!formData.miles2.trim()) newErrors.miles2 = "Miles is required";
      if (!formData.service_id.trim()) newErrors.service_id = "Service Id is required";

    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, type, checked } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : e.target.value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error when user types
  };
  const nextStep = () => {
    if (validateStep()) {
      dispatch(setRegisterStep(registerStep + 1));
    }
  };
  const prevStep = () =>{dispatch(setRegisterStep(registerStep - 1))};



  // const handleCloseModal = () => setShowExitModal(false);
  // const handleExit = () => {
  //   setShowExitModal(false);
  //   window.removeEventListener("beforeunload", () => {});
  //   window.close();
  // };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        {registerStep === 1 && (
          <ServiceLocationStep
            nextStep={nextStep}
            setFormData={setFormData}
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        {registerStep === 2 && (
          <ServiceDetailsStep
            nextStep={nextStep}
            setFormData={setFormData}
            formData={formData}
            prevStep={prevStep}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        {registerStep === 3 && (
          <ServiceBusinessAddressStep
            prevStep={prevStep}
            setFormData={setFormData}
            formData={formData}
            nextStep={nextStep}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        {registerStep === 4 && (
          <OtherServiceStep
            prevStep={prevStep}
            setFormData={setFormData}
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
      </div>

      {/* {showExitModal && (
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
      )} */}
    </div>
  );
};

export default ServiceCreateAccount;
