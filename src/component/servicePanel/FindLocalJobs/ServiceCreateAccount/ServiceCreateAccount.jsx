import { useEffect, useRef, useState } from "react";
import styles from "./ServiceCreateAccount.module.css";
import ServiceLocationStep from "./ServiceLocationStep/ServiceLocationStep";
import ServiceDetailsStep from "./ServiceDetailsStep/ServiceDetailsStep";
import ServiceBusinessAddressStep from "./ServiceBusinessAddressStep/ServiceBusinessAddressStep";
import OtherServiceStep from "./OtherServiceStep/OtherServiceStep";
import { useDispatch, useSelector } from "react-redux";
import { checkAddressApi, checkCompanyNameApi, checkEmailIdApi, checkPhoneNumberApi, clearServiceFormData, setRegisterStep, setSelectedServiceFormData } from "../../../../store/FindJobs/findJobSlice";
import { showToast } from "../../../../utils";

const ServiceCreateAccount = () => {
  const dispatch = useDispatch();
  const { selectedServiceId, selectedServiceFormData } = useSelector((state) => state.findJobs);

  const { registerStep } = useSelector((state) => state.findJobs);
  const [errors, setErrors] = useState({});
  const [emailValue, setEmailValue] = useState("");
const [companyValue, setCompanyValue] = useState("");
const [phoneValue, setPhoneValue] = useState("");
const [addressValue,setAddressValue] = useState("");
const [emailCheck, setEmailCheck] = useState(false);
const [companyCheck, setCompanyCheck] = useState(false);
const [phoneCheck, setPhoneCheck] = useState(false);
const [addressCheck,setAddressCheck] = useState(false)
const [type,setType] = useState()
  console.log(emailCheck,companyCheck,phoneCheck,"emailCheck")
console.log(selectedServiceFormData?.company_reg_number,"pp")
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
     if (
  !selectedServiceFormData.phone || 
  !selectedServiceFormData.phone.trim()
) {
  newErrors.phone = "Phone number is required";
} else if (
  selectedServiceFormData.phone.trim().length < 10
) {
  newErrors.phone = "Phone number must be at least 10 digits";
}
const companyInput = selectedServiceFormData.company_website?.trim();
const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/[^\s]*)?$/;

if (companyInput && !urlRegex.test(companyInput)) {
  newErrors.company_website = "Please enter a valid URL (e.g. https://example.com or www.example.com)";
}
      // if (!selectedServiceFormData.password || !selectedServiceFormData.password.trim()) {
      //   newErrors.password = "Password is required";
      // } else if (
      //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
      //     selectedServiceFormData.password
      //   )
      // ) {
      //   newErrors.password =
      //     "Password must be 8-16 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)";
      // }
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
  
const debounceTimer = useRef({});
const latestEmailRef = useRef("");
const latestPhoneRef = useRef("");

useEffect(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(emailValue) && type === "email") {
    if (debounceTimer.current.email) clearTimeout(debounceTimer.current.email);

    debounceTimer.current.email = setTimeout(() => {
      const currentEmail = latestEmailRef.current;

      dispatch(checkEmailIdApi({ email: currentEmail })).then((result) => {
        
        if (latestEmailRef.current === currentEmail) {
          if (result?.success === true) {
           
            setEmailCheck(true);
          } else {
            
            setEmailCheck(false);
            
          }
        } 
      });
    }, 1000);
  }


//  if (companyValue.trim().length > 1 && type === "company_name") {
  
//     if (debounceTimer.current.company_name) clearTimeout(debounceTimer.current.company_name);
//     debounceTimer.current.company_name = setTimeout(() => {
//       dispatch(checkCompanyNameApi({ company_name: companyValue,company_reg_number:selectedServiceFormData?.company_reg_number })).then((result) => {
//         if (result) {
//           showToast("success", result?.message);
//           setCompanyCheck(result?.success);
//         }
//       });
//     }, 1000);
//   }
  if (companyValue.trim().length > 1 && type === "company_name" &&  selectedServiceFormData?.company_reg_number) {
    if (debounceTimer.current.company_name) clearTimeout(debounceTimer.current.company_name);
    debounceTimer.current.company_name = setTimeout(() => {
      dispatch(checkCompanyNameApi({
        company_name: companyValue,
        company_reg_number: selectedServiceFormData?.company_reg_number
      })).then((result) => {
        if (result) {
          showToast("success", result?.message);
          setCompanyCheck(result?.success);
        }
      });
    }, 1000);
  }
  //   if (phoneValue.trim().length >= 10 && type === "phone") {
  //   if (debounceTimer.current.phone) clearTimeout(debounceTimer.current.phone);
  //   debounceTimer.current.phone = setTimeout(() => {
  //     dispatch(checkPhoneNumberApi({ phone: phoneValue, })).then((result) => {
  //       if (result) {
  //         showToast("success", result?.message);
  //         setPhoneCheck(result?.success);
  //       }
  //     });
  //   }, 1000);
  // }

  if (phoneValue.trim().length >= 10 && type === "phone") {
    latestPhoneRef.current = phoneValue;

    if (debounceTimer.current.phone) clearTimeout(debounceTimer.current.phone);

    debounceTimer.current.phone = setTimeout(() => {
      const currentPhone = latestPhoneRef.current;

      dispatch(checkPhoneNumberApi({ phone: currentPhone })).then((result) => {
        if (latestPhoneRef.current === currentPhone) {
          if (result?.success === true) {
            setPhoneCheck(true);
          } else {
            setPhoneCheck(false);
            
          }
        }
      });
    }, 1000);
  }
  //  if (addressValue.trim().length >= 4 && type === "address") {
  //   if (debounceTimer.current.address) clearTimeout(debounceTimer.current.address);
  //   debounceTimer.current.address = setTimeout(() => {
  //     dispatch(checkAddressApi({ company_location: addressValue })).then((result) => {
  //       if (result) {
  //         showToast("success", result?.message);
  //         setAddressCheck(result?.success);
  //       }
  //     });
  //   }, 1000);
  // }
  // Cleanup on unmount
  return () => {
        if (debounceTimer.current.email) clearTimeout(debounceTimer.current?.email);
    if (debounceTimer.current.company_name) clearTimeout(debounceTimer.current.company_name);
     if (debounceTimer.current.phone) clearTimeout(debounceTimer.current.phone);
     if(debounceTimer.current.address) clearTimeout(debounceTimer.current.address);
  };
}, [emailValue,companyValue,phoneValue,addressValue,selectedServiceFormData?.company_reg_number, dispatch]);


  const handleInputChange = (e) => {
    const { name,value, type, checked } = e.target;
    setType(name)
 if (name === "email") {
    setEmailValue(value);
    latestEmailRef.current = value;  
  }
  if(name === "company_name") {
    setCompanyValue(value)
  }
   if (name === "phone") {

     setPhoneValue(value);
   }
   if(name === "address"){
    setAddressValue(value)
   }

    dispatch(setSelectedServiceFormData({
      [name]: type === "checkbox" ? (checked ? 1 : 0) : e.target.value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

// const handleInputChange = (e) => {
//   const { name, value, type, checked } = e.target;
//   setFormData((prev) => ({
//     ...prev,
//     [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
//   }));
// };

  const nextStep = () => {
    window.scrollTo(0, 0);
    
    if (validateStep()) {
      dispatch(setRegisterStep(registerStep + 1));
    }

  };
  const prevStep = () => {
    dispatch(setRegisterStep(registerStep - 1));
  };
  useEffect(() => {
      dispatch(setRegisterStep(1))
    return () => {
      dispatch(setRegisterStep(1));
      // dispatch(clearServiceFormData())
    }
  }, [])


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
            emailCheck={emailCheck}
            companyCheck={companyCheck}
            phoneCheck={phoneCheck}
            companyValue={companyValue}
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
            addressCheck={addressCheck}
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
