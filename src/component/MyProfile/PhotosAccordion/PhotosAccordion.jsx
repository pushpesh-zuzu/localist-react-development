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


import  { useEffect, useState } from "react";
import styles from "./PhotosAccordion.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateSellerPhotos, clearPhotoUpdateStatus } from "../../../store/MyProfile/myProfileSlice";
const PhotosAccordion = () => {
  const dispatch = useDispatch();
const { photoUpdateSuccess, photoUpdateError, sellerLoader } = useSelector((state) => state.myProfile);
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

 // Inside component


// useEffect for toast



useEffect(() => {
  if (photoUpdateSuccess) {
    toast.success("Photos updated successfully!");
    dispatch(clearPhotoUpdateStatus());
  } else if (photoUpdateError) {
    toast.error(`Failed: ${photoUpdateError}`);
    dispatch(clearPhotoUpdateStatus());
  }
}, [photoUpdateSuccess, photoUpdateError, dispatch]);

const handleSubmit = () => {
  if (!validate()) {
    toast.warn("Please fix validation errors");
    return;
  }
  dispatch(updateSellerPhotos(formState));
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

