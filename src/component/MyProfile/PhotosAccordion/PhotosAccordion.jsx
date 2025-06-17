// import React from "react";
// import styles from "./PhotosAccordion.module.css";
// import iIcon from "../../../assets/Images/iIcon.svg";

// const PhotosAccordion = () => {
//   return (
//     <div className={styles.container}>
//       {/* Photos Section */}
//       <div className={styles.section}>
//         <h3 className={styles.title}>Photos</h3>
//         <p className={styles.description}>
//           Showcase what your business can do – for certain services, photos are
//           often what customers look for first – previous projects, locations and
//           venues, or before and after shots for example.
//         </p>
//         <button className={styles.uploadButton}>Upload photos</button>
//         <p className={styles.placeholder}>
//           Photos you add to your profile will appear here.
//         </p>
//       </div>

//       {/* Videos Section */}
//       <div className={styles.section}>
//         <div className={styles.videoHeader}>
//           <h3 className={styles.title}>Videos</h3>
//           <div className={styles.optional}>
//             <img src={iIcon} alt="info" className={styles.icon} />
//             <span>Optional</span>
//             <label className={styles.switch}>
//               <input type="checkbox" defaultChecked />
//               <span className={styles.slider}></span>
//             </label>
//           </div>
//         </div>
//         <p className={styles.description}>
//           Add YouTube videos to showcase your work and expertise – videos of
//           previous events for example.
//         </p>
//         <button className={styles.uploadButton}>Add YouTube video links</button>
//         <p className={styles.placeholder}>
//           YouTube videos you add to your profile will appear here.
//         </p>
//       </div>

//       {/* Footer Buttons */}
//       <div className={styles.footer}>
//         <button className={styles.cancelButton}>Cancel</button>
//         <button className={styles.saveButton}>Save</button>
//       </div>
//     </div>
//   );
// };

// export default PhotosAccordion;
import React, { useState } from "react";
import styles from "./PhotosAccordion.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";
import axios from "axios";
import axiosInstance from "../../../Api/axiosInstance";

const apiUrl = `https://localists.zuzucodes.com/admin/api/users/update-seller-profile`;

const PhotosAccordion = () => {
  const [formState, setFormState] = useState({
    type: "photos",
    company_photos: [],
    company_youtube_link: "",
  });

  const [photoPreviews, setPhotoPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormState((prev) => ({
      ...prev,
      company_photos: files,
    }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews(previews);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    return true; // Add any required validation logic here
  };

  // const handleSubmit = async () => {
  //   if (!validate()) {
  //     alert("Fix validation errors");
  //     return;
  //   }

  //   const body = new FormData();
  //   body.append("type", formState.type);

  //   if (formState.company_youtube_link) {
  //     body.append("company_youtube_link", formState.company_youtube_link);
  //   }

  //   formState.company_photos.forEach((file) =>
  //     body.append("company_photos[]", file)
  //   );
  //   for (let pair of body.entries()) {
  //     console.log(pair[0], pair[1]);
  //   }
    
  //   try {
  //     const token = localStorage.getItem("accessToken"); // Adjust the key if needed
    
  //     const response = await axiosInstance.post(apiUrl, body);
    
  //     alert("Profile updated successfully!");
  //     console.log(response.data);
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
  
    const body = new FormData();
    body.append("type", formState.type || "user_details");
  
    // Ensure youtube link is included (even if empty)
    body.append("company_youtube_link", formState.company_youtube_link || "");
  
    // Always include optional fields — even if empty
    // const optionalFields = ["fb_link", "twitter_link", "link_desc"];
    // optionalFields.forEach((key) => {
    //   body.append(key, formState[key] || "");
    // });
  
    // Append multiple photos
    if (Array.isArray(formState.company_photos)) {
      formState.company_photos.forEach((file) => {
        if (file instanceof File) {
          body.append("company_photos[]", file);
        }
      });
    }
  
    // Debug: log actual FormData content
    for (let pair of body.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axiosInstance.post(apiUrl, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      
  
      alert("Profile updated successfully!");
      console.log(response.data);
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Submission failed.");
    }
  };
  
  
  
  
  
  
  
  const handleCancel = () => {
    setFormState({
      type: "user_details",
      company_photos: [],
      company_youtube_link: "",
    });
    setPhotoPreviews([]);
  };

  return (
    <div className={styles.container}>
      {/* Photos Section */}
      <div className={styles.section}>
        <h3 className={styles.title}>Photos</h3>
        <p className={styles.description}>
          Showcase what your business can do – for certain services, photos are
          often what customers look for first – previous projects, locations and
          venues, or before and after shots for example.
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        {/* <div className={styles.previewContainer}>
          {photoPreviews.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`preview-${idx}`}
              className={styles.previewImage}
            />
          ))}
        </div> */}
      </div>

      {/* Videos Section */}
      <div className={styles.section}>
        <div className={styles.videoHeader}>
          <h3 className={styles.title}>Videos</h3>
          <div className={styles.optional}>
            <img src={iIcon} alt="info" className={styles.icon} />
            <span>Optional</span>
          </div>
        </div>
        <p className={styles.description}>
          Add YouTube videos to showcase your work and expertise – videos of
          previous events for example.
        </p>
        <input
          type="text"
          placeholder="Enter YouTube video link"
          name="company_youtube_link"
          value={formState.company_youtube_link}
          onChange={handleInputChange}
          className={styles.youtubeInput}
        />
      </div>

      {/* Footer Buttons */}
      <div className={styles.footer}>
        <button className={styles.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button className={styles.saveButton} onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default PhotosAccordion;

