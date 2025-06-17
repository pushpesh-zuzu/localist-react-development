// import React from "react";
// import styles from "./AboutAccordion.module.css";
// import defaultImage from "../../../assets/Images/DefaultProfileImage.svg";
// import iIcon from "../../../assets/Images/iIcon.svg";

// const AboutAccordion = () => {
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.card}>
//         <h3>Company name & logo</h3>
//         <p>
//           This is the first thing customers will see when searching for a
//           professional. <br />
//           As a sole-trader, you can just enter your name.
//         </p>
//         <div className={styles.imageSection}>
//           <img src={defaultImage} alt="Default Logo" />
//           <button className={styles.uploadBtn}>Upload new picture</button>
//         </div>
//         <label className={styles.label}>Company name</label>
//         <input
//           className={styles.input}
//           type="text"
//           placeholder="ABC Pvt. Ltd."
//         />
//       </div>

//       <div className={styles.card}>
//         <h3>Name and profile picture</h3>
//         <p>
//           This is the person who will be communicating with customers on Bark.
//           The photo will appear alongside your messages with customers.
//         </p>
//         <div className={styles.imageSection}>
//           <img src={defaultImage} alt="Default Profile" />
//           <div className={styles.buttonGroup}>
//             <button className={styles.uploadBtn}>Upload new picture</button>
//             <button className={styles.webcamBtn}>Upload using Webcam</button>
//           </div>
//         </div>
//         <label className={styles.label}>Name</label>
//         <input className={styles.input} type="text" placeholder="Chander" />
//       </div>

//       <div className={styles.card}>
//         <h3>Company contact details</h3>
//         <p>
//           This information will be seen by customers on Bark. Change the details
//           Bark uses to contact you privately in{" "}
//           <a href="#!" className={styles.link}>
//             Account Details
//           </a>
//           .
//         </p>
//         <div className={styles.imageSection}>
//           <img src={defaultImage} alt="Default Contact" />
//           <div className={styles.buttonGroup}>
//             <button className={styles.uploadBtn}>Upload new picture</button>
//             <button className={styles.webcamBtn}>Upload using Webcam</button>
//           </div>
//         </div>
//         <div className={styles.formGroup}>
//           <div className={styles.halfInput}>
//             <label className={styles.label}>Company email address</label>
//             <input className={styles.input} type="text" placeholder="Chander" />
//           </div>
//           <div className={styles.halfInput}>
//             <label className={styles.label}>Company phone number</label>
//             <input
//               className={styles.input}
//               type="text"
//               placeholder="Company phone number"
//             />
//           </div>
//         </div>
//         <label className={styles.label}>Website</label>
//         <input
//           className={styles.input}
//           type="text"
//           placeholder="Company Website"
//         />
//       </div>

//       <div className={styles.infoCard}>
//         <h3 className={styles.companyLocation}>Company location</h3>
//         <div className={styles.infoSubtext}>
//           This will not affect the areas where you offer or provide services.
//         </div>
//         <p className={styles.secondaryText}>
//           Use a specific address to help customers searching for a local
//           business.
//         </p>
//         <label className={styles.label}>What’s the business location?</label>
//         <input
//           className={styles.input}
//           type="text"
//           placeholder="Enter the company’s address"
//         />
//         <div className={styles.checkboxRow}>
//           <input type="checkbox" id="dontShow" />
//           <label className={styles.DontLabel} htmlFor="dontShow">
//             Don’t show this on my profile{" "}
//             <span className={styles.infoIcon}>
//               <img src={iIcon} alt="" />
//             </span>
//           </label>
//         </div>
//         <hr className={styles.hrline}/>
//         <label className={styles.label}>
//           Can’t give us a particular location?
//         </label>
//         <select className={`${styles.input} ${styles.customSelect}`}>
//           <option>Select a reason</option>
//         </select>
//       </div>

//       <div className={styles.infoCard}>
//         <h3 className={styles.aboutCompany}>About the company</h3>
//         <p className={styles.secondaryTextCustomers}>
//           Introduce the company to your customers.
//         </p>
//         <div className={styles.flexRow}>
//           <div className={styles.flexItem}>
//             <label className={styles.label}>Company size</label>
//             <select className={`${styles.input} ${styles.customSelect}`}>
//               <option>2–10 employees</option>
//             </select>
//           </div>
//           <div className={styles.flexItem}>
//             <label className={styles.label}>Years in business</label>
//             <input
//               className={styles.input}
//               type="text"
//               placeholder="Number of years"
//             />
//           </div>
//         </div>
//         <label className={styles.label}>Describe your company</label>
//         <textarea
//           className={styles.textarea}
//           rows={5}
//           placeholder="What sets you apart from other businesses?"
//         />
//         <p className={styles.charLimit}>Minimum 30 characters</p>
//         <a href="#!" className={styles.link}>
//           Use our free online tool to write the perfect description of your
//           business
//         </a>
//       </div>

//       <div className={styles.buttonRow}>
//         <button className={styles.cancelBtn}>Cancel</button>
//         <button className={styles.saveBtn}>Save</button>
//       </div>
//     </div>
//   );
// };

// export default AboutAccordion;



// import React from "react";
// import styles from "./AboutAccordion.module.css";
// import defaultImage from "../../../assets/Images/DefaultProfileImage.svg";
// import iIcon from "../../../assets/Images/iIcon.svg";

// const AboutAccordion = () => {
//   //testing github vercel link
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.card}>
//         <h3>Company name & logo</h3>
//         <p>
//           This is the first thing customers will see when searching for a
//           professional. <br />
//           As a sole-trader, you can just enter your name.
//         </p>
//         <div className={styles.imageSection}>
//           <img src={defaultImage} alt="Default Logo" />
//           <button className={styles.uploadBtn}>Upload new picture</button>
//         </div>
//         <label className={styles.label}>Company name</label>
//         <input
//           className={styles.input}
//           type="text"
//           placeholder="ABC Pvt. Ltd."
//         />
//       </div>

//       <div className={styles.card}>
//         <h3>Name and profile picture</h3>
//         <p>
//           This is the person who will be communicating with customers on Bark.
//           The photo will appear alongside your messages with customers.
//         </p>
//         <div className={styles.imageSection}>
//           <img src={defaultImage} alt="Default Profile" />
//           <div className={styles.buttonGroup}>
//             <button className={styles.uploadBtn}>Upload new picture</button>
//             <button className={styles.webcamBtn}>Upload using Webcam</button>
//           </div>
//         </div>
//         <label className={styles.label}>Name</label>
//         <input className={styles.input} type="text" placeholder="Chander" />
//       </div>

//       <div className={styles.card}>
//         <h3>Company contact details</h3>
//         <p>
//           This information will be seen by customers on Bark. Change the details
//           Bark uses to contact you privately in{" "}
//           <a href="#!" className={styles.link}>
//             Account Details
//           </a>
//           .
//         </p>
//         <div className={styles.imageSection}>
//           <img src={defaultImage} alt="Default Contact" />
//           <div className={styles.buttonGroup}>
//             <button className={styles.uploadBtn}>Upload new picture</button>
//             <button className={styles.webcamBtn}>Upload using Webcam</button>
//           </div>
//         </div>
//         <div className={styles.formGroup}>
//           <div className={styles.halfInput}>
//             <label className={styles.label}>Company email address</label>
//             <input className={styles.input} type="text" placeholder="Chander" />
//           </div>
//           <div className={styles.halfInput}>
//             <label className={styles.label}>Company phone number</label>
//             <input
//               className={styles.input}
//               type="text"
//               placeholder="Company phone number"
//             />
//           </div>
//         </div>
//         <label className={styles.label}>Website</label>
//         <input
//           className={styles.input}
//           type="text"
//           placeholder="Company Website"
//         />
//       </div>

//       <div className={styles.infoCard}>
//         <h3 className={styles.companyLocation}>Company location</h3>
//         <div className={styles.infoSubtext}>
//           This will not affect the areas where you offer or provide services.
//         </div>
//         <p className={styles.secondaryText}>
//           Use a specific address to help customers searching for a local
//           business.
//         </p>
//         <label className={styles.label}>What’s the business location?</label>
//         <input
//           className={styles.input}
//           type="text"
//           placeholder="Enter the company’s address"
//         />
//         <div className={styles.checkboxRow}>
//           <input type="checkbox" id="dontShow" />
//           <label className={styles.DontLabel} htmlFor="dontShow">
//             Don’t show this on my profile{" "}
//             <span className={styles.infoIcon}>
//               <img src={iIcon} alt="" />
//             </span>
//           </label>
//         </div>
//         <hr className={styles.hrline}/>
//         <label className={styles.label}>
//           Can’t give us a particular location?
//         </label>
//         <select className={`${styles.input} ${styles.customSelect}`}>
//           <option>Select a reason</option>
//         </select>
//       </div>

//       <div className={styles.infoCard}>
//         <h3 className={styles.aboutCompany}>About the company</h3>
//         <p className={styles.secondaryTextCustomers}>
//           Introduce the company to your customers.
//         </p>
//         <div className={styles.flexRow}>
//           <div className={styles.flexItem}>
//             <label className={styles.label}>Company size</label>
//             <select className={`${styles.input} ${styles.customSelect}`}>
//               <option>2–10 employees</option>
//             </select>
//           </div>
//           <div className={styles.flexItem}>
//             <label className={styles.label}>Years in business</label>
//             <input
//               className={styles.input}
//               type="text"
//               placeholder="Number of years"
//             />
//           </div>
//         </div>
//         <label className={styles.label}>Describe your company</label>
//         <textarea
//           className={styles.textarea}
//           rows={5}
//           placeholder="What sets you apart from other businesses?"
//         />
//         <p className={styles.charLimit}>Minimum 30 characters</p>
//         <a href="#!" className={styles.link}>
//           Use our free online tool to write the perfect description of your
//           business
//         </a>
//       </div>

//       <div className={styles.buttonRow}>
//         <button className={styles.cancelBtn}>Cancel</button>
//         <button className={styles.saveBtn}>Save</button>
//       </div>
//     </div>
//   );
// };

// export default AboutAccordion;



// company_logo, company_name, profile_image, name, company_email, company_phone, company_website, company_location, company_locaion_reason, company_size, company_total_years, about_company



import React, { useState, useRef } from "react";
import styles from "./AboutAccordion.module.css";
import defaultImage from "../../../assets/Images/DefaultProfileImage.svg";
import iIcon from "../../../assets/Images/iIcon.svg";
import axiosInstance from "../../../Api/axiosInstance";

const AboutAccordion = () => {
  const apiUrl = `https://localists.zuzucodes.com/admin/api/users/update-seller-profile`;

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
  };

  const validate = () => {
    const temp = {};
    if (!formState.company_name) temp.company_name = "Required";
    if (!formState.name) temp.name = "Required";
    // if (
    //   formState.company_email &&       /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formState.company_email)
    // ) temp.company_email = "Invalid email";
    setErrors(temp);
    return Object.keys(temp).length === 0;
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
  //   console.log("Form state before submit:", formState);
  //   const body = new FormData();
  //   Object.entries(formState).forEach(([key, val]) => {
  //     if (val == null || key.endsWith("Preview")) return;
  //     if (key === "company_photos") {
  //       val.forEach((file) => body.append("company_photos[]", file));
  //     } else {
  //       body.append(key, val);
  //     }
  //   });
  //   console.log("Form state before submit:", formState);

  
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
  
 
  const handleSubmit = async () => {
    if (!validate()) {
      alert("Fix validation errors");
      return;
    }
  
    const allowedKeys = [
      "type", // Include this if your backend expects it for `user_details`
      "company_logo",
      "company_name",
      "profile_image",
      "name",
      "company_email",
      "company_phone",
      "company_website",
      "company_location",
      "company_locaion_reason",
      "company_size",
      "company_total_years",
      "about_company",
    ];
  
    const body = new FormData();
    allowedKeys.forEach((key) => {
      const val = formState[key];
      if (val != null) {
        body.append(key, val);
      }
    });
    console.log(formState)
  console.log(body)
    try {
      const response = await axiosInstance.post(apiUrl, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("Profile updated successfully!");
      console.log(response);
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Submission failed.");
    }
  };
  
 
 
 
 
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h3>Company name & logo</h3>
        <p>
          This is the first thing customers will see when searching for a
          professional. <br />
          As a sole-trader, you can just enter your name.
        </p>
        <div className={styles.imageSection}>
          <img
            src={formState.company_logoPreview || defaultImage}
            alt="Default Logo"
          />
          <button
            className={styles.uploadBtn}
            onClick={() => fileInputRefs.company_logo.current.click()}
          >
            Upload new picture
          </button>
          <button
            className={styles.webcamBtn}
            onClick={() => handleCaptureWebcam("company_logo")}
          >
            Upload using Webcam
          </button>
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
          placeholder="ABC Pvt. Ltd."
        />
        {errors.company_name && (
          <p style={{ color: "red" }}>{errors.company_name}</p>
        )}
      </div>

      <div className={styles.card}>
        <h3>Name and profile picture</h3>
        <p>
          This is the person who will be communicating with customers on Bark.
          The photo will appear alongside your messages with customers.
        </p>
        <div className={styles.imageSection}>
          <img
            src={formState.profile_imagePreview || defaultImage}
            alt="Default Profile"
          />
          <div className={styles.buttonGroup}>
            <button
              className={styles.uploadBtn}
              onClick={() => fileInputRefs.profile_image.current.click()}
            >
              Upload new picture
            </button>
            <button
              className={styles.webcamBtn}
              onClick={() => handleCaptureWebcam("profile_image")}
            >
              Upload using Webcam
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
          placeholder="Chander"
        />
        {errors.name && (
          <p style={{ color: "red" }}>{errors.name}</p>
        )}
      </div>
      <div className={styles.card}>
        <h3>Company contact details</h3>
        <p>
          This information will be seen by customers on Bark. Change the details
          Bark uses to contact you privately in{" "}
          <a href="#!" className={styles.link}>
            Account Details
          </a>
          .
        </p>
        <div className={styles.imageSection}>
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
        </div>
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
              placeholder="Company phone number"
            />
          </div>
        </div>
        <label className={styles.label}>Website</label>
        <input
          className={styles.input}
          type="text"
          name="company_website"
          value={formState.company_website}
          onChange={handleInputChange}
          placeholder="Company Website"
        />
      </div>

      <div className={styles.infoCard}>
        <h3 className={styles.companyLocation}>Company location</h3>
        <div className={styles.infoSubtext}>
          This will not affect the areas where you offer or provide services.
        </div>
        <p className={styles.secondaryText}>
          Use a specific address to help customers searching for a local
          business.
        </p>
        <label className={styles.label}>What’s the business location?</label>
        <input
          className={styles.input}
          type="text"
          name="company_location"
          value={formState.company_location}
          onChange={handleInputChange}
          placeholder="Enter the company’s address"
        />
        <div className={styles.checkboxRow}>
          <input type="checkbox" id="dontShow" />
          <label className={styles.DontLabel} htmlFor="dontShow">
            Don’t show this on my profile{" "}
            <span className={styles.infoIcon}>
              <img src={iIcon} alt="" />
            </span>
          </label>
        </div>
        <hr className={styles.hrline} />
        <label className={styles.label}>
          Can’t give us a particular location?
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
        <h3 className={styles.aboutCompany}>About the company</h3>
        <p className={styles.secondaryTextCustomers}>
          Introduce the company to your customers.
        </p>
        <div className={styles.flexRow}>
          <div className={styles.flexItem}>
            <label className={styles.label}>Company size</label>
            <select
              className={`${styles.input} ${styles.customSelect}`}
              name="company_size"
              value={formState.company_size}
              onChange={handleInputChange}
            >
              <option value="">Select size</option>
              <option value="2–10">2–10 employees</option>
              <option value="11–50">11–50 employees</option>
              <option value="51–100">51–100 employees</option>
              <option value="100+">100+ employees</option>
            </select>
          </div>
          <div className={styles.flexItem}>
            <label className={styles.label}>Years in business</label>
            <input
              className={styles.input}
              type="text"
              name="company_total_years"
              value={formState.company_total_years}
              onChange={handleInputChange}
              placeholder="Number of years"
            />
          </div>
        </div>
        <label className={styles.label}>Describe your company</label>
        <textarea
          className={styles.textarea}
          rows={5}
          name="about_company"
          value={formState.about_company}
          onChange={handleInputChange}
          placeholder="What sets you apart from other businesses?"
        />
        <p className={styles.charLimit}>Minimum 30 characters</p>
        <a href="#!" className={styles.link}>
          Use our free online tool to write the perfect description of your
          business
        </a>
      </div>

      <div className={styles.card}>
        <h3>Company Photos</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {formState.company_photosPreview.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`preview-${i}`}
              width={80}
              height={80}
              style={{ objectFit: "cover", borderRadius: 6 }}
            />
          ))}
        </div>
        <button
          className={styles.uploadBtn}
          onClick={() => fileInputRefs.company_photos.current.click()}
        >
          Upload new photos
        </button>
        <input
          type="file"
          name="company_photos"
          ref={fileInputRefs.company_photos}
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />
      </div>

      <div className={styles.card}>
        <h3>Online Presence</h3>
        <label className={styles.label}>YouTube Video Link</label>
        <input
          className={styles.input}
          type="text"
          name="company_youtube_link"
          value={formState.company_youtube_link}
          onChange={handleInputChange}
          placeholder="YouTube link"
        />
        <label className={styles.label}>Facebook Link</label>
        <input
          className={styles.input}
          type="text"
          name="fb_link"
          value={formState.fb_link}
          onChange={handleInputChange}
          placeholder="Facebook link"
        />
        <label className={styles.label}>Twitter Link</label>
        <input
          className={styles.input}
          type="text"
          name="twitter_link"
          value={formState.twitter_link}
          onChange={handleInputChange}
          placeholder="Twitter link"
        />
        <label className={styles.label}>Custom Link Description</label>
        <input
          className={styles.input}
          type="text"
          name="link_desc"
          value={formState.link_desc}
          onChange={handleInputChange}
          placeholder="Link description"
        />
      </div>

      <div className={styles.card}>
        <h3>Accreditations & Services</h3>
        <label className={styles.label}>Accreditation Name</label>
        <input
          className={styles.input}
          type="text"
          name="accre_name"
          value={formState.accre_name}
          onChange={handleInputChange}
          placeholder="e.g., ISO Certified"
        />
        <label className={styles.label}>Accreditation ID(s)</label>
        <input
          className={styles.input}
          type="text"
          name="accreditation_id"
          value={formState.accreditation_id}
          onChange={handleInputChange}
          placeholder="e.g., 1,2"
        />
        <label className={styles.label}>Service Title</label>
        <input
          className={styles.input}
          type="text"
          name="service_title"
          value={formState.service_title}
          onChange={handleInputChange}
          placeholder="Service title"
        />
        <label className={styles.label}>Service Description</label>
        <textarea
          className={styles.textarea}
          rows={3}
          name="service_desc"
          value={formState.service_desc}
          onChange={handleInputChange}
          placeholder="Describe the service"
        />
        <label className={styles.label}>Service Delete ID(s)</label>
        <input
          className={styles.input}
          type="text"
          name="service_delete_id"
          value={formState.service_delete_id}
          onChange={handleInputChange}
          placeholder="e.g., 2,3"
        />
        <label className={styles.label}>Accreditation Delete ID(s)</label>
        <input
          className={styles.input}
          type="text"
          name="accr_delete_id"
          value={formState.accr_delete_id}
          onChange={handleInputChange}
          placeholder="e.g., 16"
        />
      </div>

      <div className={styles.buttonRow}>
        <button className={styles.cancelBtn} type="button">
          Cancel
        </button>
        <button className={styles.saveBtn} type="button" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AboutAccordion;





