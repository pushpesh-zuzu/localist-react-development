// company_logo, company_name, profile_image, name, company_email, company_phone, company_website, company_location, company_locaion_reason, company_size, company_total_years, about_company

import React, { useState, useRef, useEffect } from "react";
import styles from "./AboutAccordion.module.css";
import defaultImage from "../../../assets/Images/DefaultProfileImage.svg";
import iIcon from "../../../assets/Images/iIcon.svg";
import axiosInstance from "../../../Api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { updateSellerProfile, clearUpdateStatus } from "../../../store/MyProfile/myProfileSlice";
import { toast } from "react-toastify";
import { BASE_IMAGE, showToast, updateLocalStorageValue } from "../../../utils";
import { setUserToken } from "../../../store/Auth/authSlice";
import { checkAddressApi, checkCompanyNameApi, setRegisterData } from "../../../store/FindJobs/findJobSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { addViewProfileList } from "../../../store/LeadSetting/leadSettingSlice";
import { setCompanyError,fetchCompanyDetails } from "../../../store/Company/companyLookup";


const AboutAccordion = ({details}) => {
  const dispatch = useDispatch();
  const { sellerLoader, updateSuccess, updateError ,loading, error, success } = useSelector((state) => state.myProfile);
   const { userToken } = useSelector((state) => state.auth); 
     const { registerData,errorCheckComanyName } = useSelector(
        (state) => state.findJobs
      );
  const user_id = userToken?.id ? userToken?.id : registerData?.id;
  // const companyNameData = useSelector((state)=> state.company)
   const companyData = useSelector((state) => state.companyLook?.companyData)
  console.log(companyData?.registered_office_address?.address_line_1,"companyNameData")
   const [debouncedCompanyLocation, setDebouncedCompanyLocation] = useState("");
    const [hideAddress, setHideAddress] = useState(false);
  const [debouncedCompanyName, setDebouncedCompanyName] = useState("");
  const [formState, setFormState] = useState({
    type: "about", // default from given sample
tiktok_link: "",
insta_link: "",
linkedin_link: "",
extra_links: "",

    company_logo: null,
    company_logoPreview: null,
    profile_image: null,
    profile_imagePreview: null,
    company_photos: [],
    company_photosPreview: [],
    company_name: "",
    name: "",
    company_email: "",
    company_phone: "",
    company_website: "",
    company_location: "",
    company_locaion_reason: "",
    company_size: "",
    company_total_years: "",
    company_reg_number:"",
    about_company: "",
    is_youtube_video: 1,
    company_youtube_link: "",
    is_fb: 1,
    fb_link: "",
    is_twitter: 1,
    twitter_link: "",
    is_link_desc: 1,
    link_desc: "",
    is_accreditations: 1,
    accre_name: "",
    accreditation_id: "",
    accre_image: null,
    accre_imagePreview: null,
    service_title: "",
    service_desc: "",
    user_service_id: 0,
    deleteData: 0,
    accr_delete_id: "",
    service_delete_id: ""
  });

  const [errors, setErrors] = useState({});
  const fileInputRefs = {
    company_logo: useRef(),
    profile_image: useRef(),
    accre_image: useRef(),
    company_photos: useRef()
  };
console.log(details?.profile_image,formState.company_size,details?.company_size,"details")
const companyError = useSelector(state => state.companyLook?.companyError);

  useEffect(()=>{
    if(details?.id){
// setFormState(details)
setFormState({
  ...formState,company_email:details?.company_email,
  company_phone:details?.company_phone,
  company_name:details?.company_name,
  name:details?.name,
  company_website:details?.company_website,
  company_location:details?.company_location,
  company_locaion_reason:details?.company_locaion_reason,
  company_size:details?.company_size,
  company_total_years:details?.company_total_years,
  company_reg_number:details?.company_reg_number,
  about_company:details?.about_company,
  profile_imagePreview:details?.profile_image ? `${BASE_IMAGE}/users/${details?.profile_image}`: null,
  // company_logoPreview:{`https://localists.zuzucodes.com/admin/storage/app/public/images/users/${details?.company_logo}`},
  
 company_logoPreview: details?.company_logo ? `${BASE_IMAGE}/users/${details?.company_logo}` : null,


})
}
  },[details])
  useEffect(()=>{
    let data={...formState}

if(companyData.company_name){
  data.company_name= companyData?.company_name 
  // setFormState({...formState,company_name:companyData?.company_name})
}
if(companyData?.registered_office_address){
   data.company_location= companyData?.registered_office_address?.address_line_1 
  // setFormState({...formState,company_location:companyData?.registered_office_address?.address_line_1})
}
if(companyData.company_name || companyData?.registered_office_address ) {

  setFormState({...data})
}


  },[companyData])

  const previewFile = (file) => URL.createObjectURL(file);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "company_photos") {
      const arr = Array.from(files);
      setFormState((prev) => ({
        ...prev,
        company_photos: arr,
        company_photosPreview: arr.map(previewFile),
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: files[0],
        [`${name}Preview`]: previewFile(files[0]),
      }));
    }
  };

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // if (name === "company_reg_number" && value.length === 8) {
    //   dispatch(fetchCompanyDetails(value));
    // }
    if(name==='company_reg_number'){
        setFormState((prev) => ({
        ...prev,
        [name]: value,
        company_name: '', // reset company_name
      }));
      phoneAPI(value)
    }

    if (name === "company_location") {
      setDebouncedCompanyLocation(value);
    }

    if (name === "company_name") {
      setDebouncedCompanyName(value);
    }
  };

  // Debounce for company_location
  useEffect(() => {
    if (debouncedCompanyLocation.length !== 10) return;

    const timeout = setTimeout(() => {
      dispatch(checkAddressApi({ company_location: debouncedCompanyLocation })).then((result) => {
        if (result?.success) {
          showToast("success", result.message);
        }
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [debouncedCompanyLocation]);

  // Debounce for company_name

  useEffect(() => {
    if (companyError && formState.company_reg_number !== "") {
      showToast("error", companyError);
      setFormState((prev) => ({
      ...prev,
      company_reg_number: "",
    }));
    }
  
    if (companyError) {
      dispatch(setCompanyError(null)); // Always clear after handling
    }
  }, [companyError, formState.company_reg_number, dispatch]);


  useEffect(() => {
    if (!debouncedCompanyName) return;

    const timeout = setTimeout(() => {

      dispatch(
        checkCompanyNameApi({
          company_name: debouncedCompanyName,
          company_reg_number: formState.company_reg_number
        })
      ).then((result) => {
        if (result?.success) {
          showToast("success", result.message);
         
        }
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [debouncedCompanyName]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     console.log(name,value,"value")
// if(name==='company_reg_number'){
//   phoneAPI(value)
// }
// if(name === "company_location"){
//   companyLocationApi(value)
// }
// if(name === "company_name"){
//   companyNameApi(value)
// }
//     setFormState((prev) => ({ ...prev, [name]: value }));
//   };
  const phoneAPI=(regNo)=>{
    // const regNo = formState.company_reg_number;

  // Only call API if exactly 8 characters
  if (regNo && regNo.length === 8) {
    dispatch(fetchCompanyDetails(regNo , user_id));
  }
  }

//   const companyLocationApi =(location) => {
// //  const location = formState?.company_location;

//   // Only proceed if exactly 10 characters
//   if (location) {
//     const handler = setTimeout(() => {
//       dispatch(checkAddressApi({ company_location: location })).then((result) => {
//         if (result.success) {
//           showToast("success", result?.message);
//         }
//       });
//     }, 1000); // 300ms debounce delay

//     // Cleanup to cancel previous timer if user types again
//     return () => {
//       clearTimeout(handler);
//     };
//   }
//   }

//   const companyNameApi = (name) => {
//  if (name) {
//     const handler = setTimeout(() => {
//       dispatch(checkCompanyNameApi({ company_name: name, company_reg_number:formState.company_reg_number})).then((result) => {
//         if (result.success) {
//           showToast("success", result?.message);
//         }
//       });
//     }, 1000); // 300ms debounce delay

//     // Cleanup to cancel previous timer if user types again
//     return () => {
//       clearTimeout(handler);
//     };
//   }
//   }

  // const validate = () => {
  //   const temp = {};
  //   // if (!formState.company_name) temp.company_name = "Please fill this Required";
  //   if (!formState.name) temp.name = "Please fill this Required";
  //   // if(!formState.company_email) temp.company_email = "Please fill this Required";
  //   // if (
  //   //   formState.company_email &&       /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formState.company_email)
  //   // ) temp.company_email = "Invalid email";
  //   setErrors(temp);
  //   return Object.keys(temp).length === 0;
  // };

  const validate = () => {
  const temp = {};

  // 1. Always required
  if (!formState.name) {
    temp.name = "Please fill this Required";
  }

  // 2. If company_reg_number is filled
  if (formState.company_reg_number) {
    // 2.a company_name required
    if (!formState.company_name) {
      temp.company_name = "Company name is required";
    }

    // 2.b company_location required
    if (!formState.company_location) {
      temp.company_location = "Company location is required";
    }

    // 2.c handle API validation errors (assuming they're in a variable)
    // if (companyValidationError?.company_name) {
    //   temp.company_name = companyValidationError.company_name;
    // }

    // if (companyValidationError?.company_location) {
    //   temp.company_location = companyValidationError.company_location;
    // }
  }

  setErrors(temp);
  return Object.keys(temp).length === 0;
};

// useEffect(() => {
//   const regNo = formState.company_reg_number;

//   // Only call API if exactly 8 characters
//   if (regNo && regNo.length === 8) {
//     dispatch(fetchCompanyDetails(regNo));
//   }
 
// }, [formState.company_reg_number]);

// useEffect(()=>{
//  if(formState?.company_location){
//     dispatch(checkAddressApi({company_location:formState?.company_location})).then((result) => {
//       if(result.success){
//         showToast("success",result?.message)
//       }
//     })
//   }
// },[formState?.company_location])
// useEffect(() => {
//   const location = formState?.company_location;

//   // Only proceed if exactly 10 characters
//   if (location) {
//     const handler = setTimeout(() => {
//       dispatch(checkAddressApi({ company_location: location })).then((result) => {
//         if (result.success) {
//           showToast("success", result?.message);
//         }
//       });
//     }, 1000); // 300ms debounce delay

//     // Cleanup to cancel previous timer if user types again
//     return () => {
//       clearTimeout(handler);
//     };
//   }
// }, [formState?.company_location]);
// useEffect(() => {
//   const name = formState?.company_name;

//   // Only proceed if exactly 10 characters
//   if (name) {
//     const handler = setTimeout(() => {
//       dispatch(checkCompanyNameApi({ company_name: name, company_reg_number:formState.company_reg_number})).then((result) => {
//         if (result.success) {
//           showToast("success", result?.message);
//         }
//       });
//     }, 1000); // 300ms debounce delay

//     // Cleanup to cancel previous timer if user types again
//     return () => {
//       clearTimeout(handler);
//     };
//   }
// }, [formState?.company_name]);



const handleCheckboxChange = (e) => {
    setHideAddress(e.target.checked);
  };

  const handleCaptureWebcam = async (target) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const track = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);
      const blob = await imageCapture.takePhoto();
      track.stop();
      const file = new File([blob], `${target}.jpg`, { type: blob.type });
      setFormState((prev) => ({
        ...prev,
        [target]: file,
        [`${target}Preview`]: URL.createObjectURL(blob),
      }));
    } catch (err) {
      console.error("Webcam capture failed:", err);
    }
  };

  

 
  // const handleSubmit = async () => {
  //   if (!validate()) {
  //     alert("Fix validation errors");
  //     return;
  //   }
  
  //   const allowedKeys = [
  //     "type", // Include this if your backend expects it for `user_details`
  //     "company_logo",
  //     "company_name",
  //     "profile_image",
  //     "name",
  //     "company_email",
  //     "company_phone",
  //     "company_website",
  //     "company_location",
  //     "company_locaion_reason",
  //     "company_size",
  //     "company_total_years",
  //     "about_company",
  //   ];
  
  //   const body = new FormData();
  //   allowedKeys.forEach((key) => {
  //     const val = formState[key];
  //     if (val != null) {
  //       body.append(key, val);
  //     }
  //   });
  //   console.log(formState)
  // console.log(body)
  //   try {
  //     const response = await axiosInstance.post(apiUrl, body, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  
  //     alert("Profile updated successfully!");
  //     console.log(response);
  //   } catch (err) {
  //     console.error("Submission failed:", err);
  //     alert("Submission failed.");
  //   }
  // };

  const CompanyNameFirstLetter = details?.company_name?.[0] || '';
const ProfileNameFirstLetter = details?.name?.[0] || '';
  console.log(errorCheckComanyName,"name")
  
 
  const handleSubmit = () => {
    if (!validate()) {
      showToast("error", "Please fix validation errors");
      return;
    }
if( errorCheckComanyName === false){
  showToast("error", "Company name already exists");
  return;
}
    dispatch(updateSellerProfile(formState)).then((result)=> {
      if(result){
         const sellerData ={
                     seller_id:user_id
                 }
                 dispatch (addViewProfileList(sellerData))
      }
    });
  };
 // Show toast on success/failure
useEffect(() => {
  if (updateSuccess) {
    toast.success("Profile updated successfully!");
    updateLocalStorageValue('barkUserToken', 'name', formState?.name)
    updateLocalStorageValue("registerDataToken","name",formState?.name)
     updateLocalStorageValue('barkUserToken', 'profile_image', details?.profile_image)
    updateLocalStorageValue("registerDataToken","profile_image",details?.profile_image)
     const storedData = localStorage.getItem("barkUserToken");
     const registerData = localStorage.getItem("registerDataToken")


    const parsedData = JSON.parse(storedData);
    const registerDatas = JSON.parse(registerData)
    if(parsedData) {

      parsedData.name = formState?.name;
      parsedData.profile_image = details?.profile_image;
      dispatch(setUserToken(parsedData));
    }
    if(registerDatas){

      registerDatas.name = formState?.name
      registerDatas.profile_image = details?.profile_image
      dispatch(setRegisterData(registerDatas))
    }


    dispatch(clearUpdateStatus()); // reset flags
  } else if (updateError) {
    toast.error(`Error: ${updateError}`);
    dispatch(clearUpdateStatus());
  }
}, [updateSuccess, updateError, dispatch]);

 
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h3>Business Name & Logo</h3>
        <p>
          Help Customers recognise your business. This is what customers see first <br /> when browsing for professionals on Localists.com. 
         
        </p>
        <div className={styles.imageSection}>
         {details?.company_logoPreview || formState.company_logoPreview ? <img
            src={formState.company_logoPreview || defaultImage}
            alt="Default Logo"
          />  : <div className={styles.CompanyText}>{CompanyNameFirstLetter.toUpperCase() ? CompanyNameFirstLetter.toUpperCase() : "C"}</div>}
          <button
            className={styles.uploadBtn}
            onClick={() => fileInputRefs.company_logo.current.click()}
          >
            Upload
          </button>
          {/* <button
            className={styles.webcamBtn}
            onClick={() => handleCaptureWebcam("company_logo")}
          >
            Upload using Webcam
          </button> */}
          <input
            type="file"
            name="company_logo"
            ref={fileInputRefs.company_logo}
            style={{ display: "none" }}
            onChange={handleFileChange}
            
          />
        </div>
        <label className={styles.label}>Company name</label>
        <input
          className={styles.input}
          type="text"
          name="company_name"
          value={formState.company_name}
          onChange={handleInputChange}
          placeholder="Enter your company name"
          readOnly
        />
        {errors.company_name && (
          <p style={{ color: "red" }}>{errors.company_name}</p>
        )}
      </div>

      <div className={styles.card}>
        <h3>Your Name & Profile Picture</h3>
        <p>
         Customers on Localists.com will see this information when you message them. Adding a photo helps build trust and makes your profile more personal.
        </p>
        <div className={styles.imageSection}>
          {
            details?.profile_imagePreview || formState.profile_imagePreview ?   <img
            src={formState.profile_imagePreview || defaultImage}
            alt="Default Profile"
          /> : 
          <div className={styles.CompanyText}>{ProfileNameFirstLetter.toUpperCase()}</div>
          }
        
          <div className={styles.buttonGroup}>
            <button
              className={styles.uploadBtn}
              onClick={() => fileInputRefs.profile_image.current.click()}
            >
              Upload 
            </button>
            <button
              className={styles.webcamBtn}
              onClick={() => handleCaptureWebcam("profile_image")}
            >
             Take Photo
            </button>
            <input
              type="file"
              name="profile_image"
              ref={fileInputRefs.profile_image}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p style={{ color: "red" }}>{errors.name}</p>
        )}
      </div>
      <div className={styles.card}>
        <h3>Your Contact Information</h3>
        <p>
         Customers on Localists.com will see these details when viewing your profile. You can update your private contact info anytime under {" "}
          <a href="/settings/account_details" className={styles.link}>
            Account Details
          </a>
          .
        </p>
        {/* <div className={styles.imageSection}>
          <img src={defaultImage} alt="Default Contact" />
          <div className={styles.buttonGroup}>
            <button
              className={styles.uploadBtn}
              onClick={() => fileInputRefs.accre_image.current.click()}
            >
              Upload new picture
            </button>
            <button
              className={styles.webcamBtn}
              onClick={() => handleCaptureWebcam("accre_image")}
            >
              Upload using Webcam
            </button>
            <input
              type="file"
              name="accre_image"
              ref={fileInputRefs.accre_image}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div> */}
        <div className={styles.formGroup}>
          <div className={styles.halfInput}>
            <label className={styles.label}>Company email address</label>
            <input
              className={styles.input}
              type="text"
              name="company_email"
              value={formState.company_email}
              onChange={handleInputChange}
              placeholder="company@example.com"
            />
            {errors.company_email && (
              <p style={{ color: "red" }}>{errors.company_email}</p>
            )}
          </div>
          <div className={styles.halfInput}>
            <label className={styles.label}>Company phone number</label>
            <input
              className={styles.input}
              type="text"
              name="company_phone"
              value={formState.company_phone}
              onChange={handleInputChange}
              placeholder="Enter company's phone number"
               maxLength={10}
            />
          </div>
        </div>
         <div className={styles.formGroup}>
        <div className={styles.halfInput}>
        <label className={styles.label}>Website</label>
        <input
          className={styles.input}
          type="text"
          name="company_website"
          value={formState.company_website}
          onChange={handleInputChange}
          placeholder="Enter website url"
        />
        </div>
        <div className={styles.halfInput}>
        <label className={styles.label}>Company Reg. No</label>
        <input
          className={styles.input}
          type="text"
          name="company_reg_number"
          value={formState.company_reg_number}
          onChange={handleInputChange}
          placeholder="Enter Company Reg. No"
           maxLength={8}
        />
        </div>
        </div>
      </div>

      <div className={styles.infoCard}>
        <h3 className={styles.companyLocation}>Business Location</h3>
        <div className={styles.infoSubtext}>
         This won’t affect the areas you’ve selected to receive leads from.
        </div>
        <p className={styles.secondaryText}>
         Please provide your business address to help customers find your local services on Localists.com.
        </p>
       {!hideAddress && <>
       <label className={styles.label}>What’s your business address?</label>
        <input
          className={styles.input}
          type="text"
          name="company_location"
          value={formState.company_location}
          onChange={handleInputChange}
          placeholder="Enter your business location"
        />
        </>}
        <div className={styles.checkboxRow}>
          <input type="checkbox" id="dontShow" checked={hideAddress}
          onChange={handleCheckboxChange} />
          <label className={styles.DontLabel} htmlFor="dontShow">
            Hide this address from my public profile{" "}
            <span className={styles.infoIcon}>
              <img src={iIcon} alt="" />
            </span>
          </label>
        </div>
        <hr className={styles.hrline} />
        <label className={styles.label}>
         Can’t provide a specific location?
        </label>
        <select
          className={`${styles.input} ${styles.customSelect}`}
          name="company_locaion_reason"
          value={formState.company_locaion_reason}
          onChange={handleInputChange}
        >
          <option value="">Select a reason</option>
          <option value="No reason">No reason</option>
          <option value="Remote business">Remote business</option>
        </select>
      </div>
      <div className={styles.infoCard}>
        <h3 className={styles.aboutCompany}>About Your Business</h3>
        <p className={styles.secondaryTextCustomers}>
        Introduce your company to customers on Localists.com.
        </p>
        <div className={styles.flexRow}>
          <div className={styles.flexItem}>
            <label className={styles.label}>Team Size</label>
            <select
              className={`${styles.input} ${styles.customSelect}`}
              name="company_size"
              value={details?.company_size}
              // value={String(formState.company_size)}
              onChange={handleInputChange}
            >
              <option value="">How many people work in your business</option>
              <option value="Self-employed, Sole trader">Self-employed, Sole trader</option>
              <option value="2-10">2–10 employees</option>
              <option value="11-50">11–50 employees</option>
              <option value='51-200'>51–200 employees</option>
              <option value="200+">200+ employees</option>
            </select>
          </div>
          <div className={styles.flexItem}>
            <label className={styles.label}>Years in Business</label>
            <input
              className={styles.input}
              type="text"
              name="company_total_years"
              value={formState.company_total_years}
              onChange={handleInputChange}
              placeholder="How long have you been operating"
            />
          </div>
        </div>
        <label className={styles.label}>Describe Your Business</label>
        <textarea
          className={styles.textarea}
          rows={5}
          name="about_company"
          value={formState.about_company}
          onChange={handleInputChange}
          placeholder="What makes your business stand out? Tell customers why they should choose you."
        />
        <p className={styles.charLimit}>Minimum 20 characters</p>
        {/* <a href="#!" className={styles.link}>
         Use our free online AI tool to help you write a great business description
        </a> */}
      </div>

      

      
      <div className={styles.buttonRow}>
        <button className={styles.cancelBtn} type="button">Cancel</button>
        <button
          className={styles.saveBtn}
          type="button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <Spin
                  indicator={<LoadingOutlined spin style={{ color: "white" }} />}
                /> : "Save"}
        </button>
      </div>
      {success && <p style={{ color: "green" }}>Profile updated successfully!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
    </div>
  
  );
};

export default AboutAccordion;





