import { useEffect, useState } from "react";
import styles from "./ServiceCreateAccount.module.css";
import ServiceLocationStep from "./ServiceLocationStep/ServiceLocationStep";
import ServiceDetailsStep from "./ServiceDetailsStep/ServiceDetailsStep";
import ServiceBusinessAddressStep from "./ServiceBusinessAddressStep/ServiceBusinessAddressStep";
import OtherServiceStep from "./OtherServiceStep/OtherServiceStep";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterStep, setSelectedServiceFormData } from "../../../../store/FindJobs/findJobSlice";

const ServiceCreateAccount = () => {
  const dispatch = useDispatch();
  const { selectedServiceId, selectedServiceFormData } = useSelector((state) => state.findJobs);
  
  // const [formData, setFormData] = useState({
  //   miles1: "1",
  //   postcode: null,
  //   nation_wide: 0,
  //   name: "",
  //   email: "",
  //   password: "",
  //   phone: "",
  //   company_name: "",
  //   company_size: null,
  //   company_sales_team: null,
  //   company_website: 1,
  //   is_company_website: "",
  //   new_jobs: null,
  //   social_media: null,
  //   address: "",
  //   state: "",
  //   city: "",
  //   zipcode: "",
  //   is_zipcode: 1,
  //   suite: "",
  //   service_id: [selectedServiceId],
  //   auto_bid: 0,
  //   miles2: "1",
  // });

  const { registerStep } = useSelector((state) => state.findJobs);
  const [errors, setErrors] = useState({});

  // Validation function
  const validateStep = () => {
    let newErrors = {};

    if (registerStep === 1) {
      if (!selectedServiceFormData.miles1 || !selectedServiceFormData.miles1.trim()) newErrors.miles1 = "Miles is required";
      if (!selectedServiceFormData.postcode || !selectedServiceFormData.postcode.trim()) 
        newErrors.postcode = "Postcode is required";
    }

    if (registerStep === 2) {
      if (!selectedServiceFormData.name || !selectedServiceFormData.name.trim()) newErrors.name = "Name is required";
      // if (!formData.company_name.trim()) newErrors.company_name = "Company Name is required";
      if (!selectedServiceFormData.email || !selectedServiceFormData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(selectedServiceFormData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!selectedServiceFormData.password || !selectedServiceFormData.password.trim()) {
        newErrors.password = "Password is required";
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(selectedServiceFormData.password)) {
        newErrors.password = "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)";
      }
    }

    if (registerStep === 3) {
      // if (!formData.address.trim()) newErrors.address = "Address is required";
      // if (!formData.state.trim()) newErrors.state = "State is required";
      // if (!formData.city.trim()) newErrors.city = "City is required";
      // if (formData.zipcode === 1 && !formData.is_zipcode.trim()) {
      //   newErrors.is_zipcode = "Zipcode is required";
      // }
    }
    if (registerStep === 4) {
      if (!selectedServiceFormData.miles2 || !selectedServiceFormData.miles2.trim()) newErrors.miles2 = "Miles is required";
      if (!selectedServiceFormData.service_id || !selectedServiceFormData.service_id.trim())
        newErrors.service_id = "Service Id is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, type, checked } = e.target;

    // dispatch(setSelectedServiceFormData((prevData) => ({
    //   ...prevData,
    //   [name]: type === "checkbox" ? (checked ? 1 : 0) : e.target.value,
    // })));
    dispatch(setSelectedServiceFormData({
      [name]: type === "checkbox" ? (checked ? 1 : 0) : e.target.value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error when user types
  };
  const nextStep = () => {
    window.scrollTo(0, 0);
    if (validateStep()) {
      dispatch(setRegisterStep(registerStep + 1));
    }
  
  };
  const prevStep = () => {
    dispatch(setRegisterStep(registerStep - 1));
  };
 


  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        {registerStep === 1 && (
          <ServiceLocationStep
            nextStep={nextStep}
            setFormData={setSelectedServiceFormData}
            formData={selectedServiceFormData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        {registerStep === 2 && (
          <ServiceDetailsStep
            nextStep={nextStep}
            setFormData={setSelectedServiceFormData}
            formData={selectedServiceFormData}
            prevStep={prevStep}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        {registerStep === 3 && (
          <ServiceBusinessAddressStep
            prevStep={prevStep}
            setFormData={setSelectedServiceFormData}
            formData={selectedServiceFormData}
            nextStep={nextStep}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        {registerStep === 4 && (
          <OtherServiceStep
            prevStep={prevStep}
            setFormData={setSelectedServiceFormData}
            formData={selectedServiceFormData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
      </div>


    </div>
  );
};

export default ServiceCreateAccount;
