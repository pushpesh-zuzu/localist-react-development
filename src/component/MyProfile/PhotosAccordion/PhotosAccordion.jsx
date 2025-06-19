
import { useEffect, useState } from "react";
import styles from "./PhotosAccordion.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateSellerPhotos, clearPhotoUpdateStatus } from "../../../store/MyProfile/myProfileSlice";
import AddYoutubeModal from "./AddYoutubeModal";
const PhotosAccordion = ({details}) => {
  const dispatch = useDispatch();
  const { photoUpdateSuccess, photoUpdateError, sellerLoader } = useSelector((state) => state.myProfile);
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [formState, setFormState] = useState({
    type: "photos",
    company_photos: [],
    company_youtube_link: "",
    company_youtube_links: [],
  });

  const [photoPreviews, setPhotoPreviews] = useState([]);
console.log(details,"details")

  // const handleFileChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setFormState((prev) => ({
  //     ...prev,
  //     company_photos: files,
  //   }));

  //   const previews = files.map((file) => URL.createObjectURL(file));
  //   setPhotoPreviews(previews);
  // };

  const handleFileChange = (e) => {
  const files = Array.from(e.target.files);

  setFormState((prev) => ({
    ...prev,
    company_photos: [...prev.company_photos, ...files],
  }));

  const previews = files.map((file) => URL.createObjectURL(file));
  setPhotoPreviews((prev) => [...prev, ...previews]);
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
//   const handleSubmit = () => {
//   if (!validate()) {
//     toast.warn("Please fix validation errors");
//     return;
//   }

//   const body = new FormData();
//   body.append("type", formState.type);

//   // Append each YouTube link (if any)
//   formState.company_youtube_links.forEach((link, index) => {
//     body.append(`company_youtube_links[${index}]`, link);
//   });
// console.log(formState.company_youtube_links,body,"formState")
//   // Append photos (if any)
//   formState.company_photos.forEach((file) =>
//     body.append("company_photos[]", file)
//   );

//   dispatch(updateSellerPhotos(body));
// };
 const handleSave = () => {
  const link = formState.company_youtube_link?.trim();

  if (!link) {
    toast.warn("Please enter a YouTube link.");
    return;
  }

  if (!getYoutubeEmbedUrl(link)) {
    toast.warn("Invalid YouTube link.");
    return;
  }

  setFormState((prev) => ({
    ...prev,
    company_youtube_links: [...prev.company_youtube_links, link],
    company_youtube_link: "", // clear input
  }));

  setAddModalOpen(false);
};



  const handleOpen = () => {
    setAddModalOpen(true)
  }

  const getYoutubeEmbedUrl = (url) => {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

  const handleCancel = () => {
    setFormState({
      type: "user_details",
      company_photos: [],
      company_youtube_link: "",
    });
    setPhotoPreviews([]);
  };

  useEffect(() => {
  if (details) {
    // Preload YouTube link if it exists
    const youtubeLink = details.company_youtube_link || "";

    // Convert image filenames into full URLs
    const photoFilenames = details.company_photos
      ? details.company_photos.split(",").map((item) => item.trim())
      : [];

   const BASE_IMAGE = "https://localists.zuzucodes.com/admin/storage/app/public/images/users";

    const previews = photoFilenames.map(
      (filename) => `${BASE_IMAGE}/${filename}`
    );

    setFormState((prev) => ({
      ...prev,
      company_photos: [], 
      company_youtube_link: "",
      company_youtube_links: youtubeLink ? [youtubeLink] : [],
    }));

    setPhotoPreviews(previews);
  }
}, [details]);

  return (
    <>
      <div className={styles.container}>
        {/* Photos Section */}
        <div className={styles.section}>
          <h3 className={styles.title}>Photos</h3>
          <p className={styles.description}>
            Showcase what your business can do – for certain services, photos are
            often what customers look for first – previous projects, locations and
            venues, or before and after shots for example.
          </p>
          <label htmlFor="photo-upload" className={styles.uploadBtn}>
            Upload photos
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className={styles.fileInput}
          />
<div className={styles.imageContainer}>
       {photoPreviews.length > 0 ? (
  <div className={styles.imageContainer}>
    {photoPreviews.map((src, idx) => (
      <img
        key={idx}
        src={src}
        alt={`preview-${idx}`}
        width="150"
        height="150"
        className={styles.previewImage}
      />
    ))}
  </div>
) : (
  <div className={styles.paraText}>
    Photos you add to your profile will appear here.
  </div>
)} 
</div> 

          {/* <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className={styles.fileInput}
        /> */}
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
              <span className={styles.optionalText}>Optional</span>
               <label className={styles.switch}>
                                <input type="checkbox" defaultChecked />
                                <span className={styles.slider}></span>
                              </label>
            </div>
          </div>
          <p className={styles.description}>
            Add YouTube videos to showcase your work and expertise – videos of
            previous events for example.
          </p>
          <button className={styles.uploadBtn} onClick={handleOpen}>Add YouTube video link</button>
          <div  className={styles.imageContainer}>
          {formState.company_youtube_links.length > 0 ? (
  <div className={styles.videoContainer}>
    {formState.company_youtube_links?.map((link, idx) => (
      <iframe
        key={idx}
        width="215"
        height="200"
        src={getYoutubeEmbedUrl(link)}
        title={`YouTube video ${idx + 1}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={styles.videoPreview}
      />
    ))}
  </div>
) : <div className={styles.paraText}>YouTube videos you add to your profile will appear here.</div>}
</div>
          {/* {formState.company_youtube_link && getYoutubeEmbedUrl(formState.company_youtube_link) && (
            <div className={styles.videoPreview}>
              <iframe
                width="50%"
                height="275"
                src={getYoutubeEmbedUrl(formState.company_youtube_link)}
                title="YouTube video preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )} */}
          {/* <input
          type="text"
          placeholder="Enter YouTube video link"
          name="company_youtube_link"
          value={formState.company_youtube_link}
          onChange={handleInputChange}
          className={styles.youtubeInput}
        /> */}
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
      {addModalOpen && <>
        <AddYoutubeModal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSave={handleSave}
          formState={formState}
          handleInputChange={handleInputChange}
        />
      </>}
    </>
  );
};

export default PhotosAccordion;

