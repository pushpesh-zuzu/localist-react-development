import { useEffect, useState } from "react";
import styles from "./PhotosAccordion.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updateSellerPhotos,
  clearPhotoUpdateStatus,
  setIsDirtyRedux,
} from "../../../store/MyProfile/myProfileSlice";
import AddYoutubeModal from "./AddYoutubeModal";
import { baseURL } from "../../../Api/axiosInstance";
import { BASE_IMAGE } from "../../../utils";
const PhotosAccordion = ({ details }) => {
  const dispatch = useDispatch();
  const { photoUpdateSuccess, photoUpdateError, sellerLoader } = useSelector(
    (state) => state.myProfile
  );
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    type: "photos",
    company_photos: [],
    company_youtube_link: [],
    company_youtube_links: [],
  });

  const [existingPhotos, setExistingPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  console.log(details, "details");

  const handleRemovePhoto = (indexToRemove) => {
    setPhotoPreviews((prevPhotos) =>
      prevPhotos.filter((_, idx) => idx !== indexToRemove)
    );

    setExistingPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

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
    dispatch(setIsDirtyRedux(true));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    dispatch(setIsDirtyRedux(true));
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
      dispatch(setIsDirtyRedux(true));

      setTimeout(() => {
        window.location.reload();
      }, 1000);
      window.scrollTo(0, 0);
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
    const body = new FormData();

    body.append("type", formState.type);

    if (existingPhotos.length > 0) {
      existingPhotos.forEach((filename, index) => {
        body.append(`existing_photos[${index}]`, filename);
      });
    }
    console.log("company photos", formState.company_photos);
    // ✅ Append new uploads
    if (formState.company_photos.length > 0) {
      formState.company_photos.forEach((file, index) => {
        body.append(`company_photos[${index}]`, file);
      });
    }

    // ✅ Append YouTube links
    if (formState.company_youtube_link.length > 0) {
      formState.company_youtube_link.forEach((link, index) => {
        body.append(`company_youtube_link[${index}]`, link);
      });
    }
    console.log("setbody", body);

    for (let [key, value] of body.entries()) {
      if (value instanceof File) {
        console.log(`${key}: [File] ${value.name}`);
      } else {
        console.log(`${key}:`, value);
      }
    }

    dispatch(updateSellerPhotos(body));
    dispatch(setIsDirtyRedux(false));
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
      company_youtube_links: "",
      company_youtube_link: [...prev.company_youtube_links, link], // clear input
    }));

    setAddModalOpen(false);
  };

  const handleOpen = () => {
    setAddModalOpen(true);
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;

    // Make sure it's always treated as a string
    const strUrl = String(url).trim();

    const match = strUrl.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
    );

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
      let youtubeLinks = [];
      if (details.company_youtube_link) {
        try {
          // Try parsing JSON (["link1", "link2"])
          youtubeLinks = JSON.parse(details.company_youtube_link);
        } catch (e) {
          // If not JSON, treat as a single string
          youtubeLinks = [details.company_youtube_link];
        }
      }

      // Convert image filenames into full URLs
      const photoFilenames = details.company_photos
        ? details.company_photos.split(",").map((item) => item.trim())
        : [];

      const previews = photoFilenames.map(
        (filename) => `${BASE_IMAGE}/users/${filename}`
      );
      setExistingPhotos(photoFilenames);
      setPhotoPreviews(previews);

      setFormState((prev) => ({
        ...prev,
        company_youtube_links: "",
        company_youtube_link: youtubeLinks ? [youtubeLinks] : [],
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
            Add photographs and show customers what your business can do. Photos
            are often the first thing people check — whether it’s examples of
            past work, locations, venues, or before-and-after shots.
          </p>
          <label htmlFor="photo-upload" className={styles.uploadBtn}>
            Upload Photos
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
                  <div
                    key={idx}
                    className={styles.photoWrapper}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      margin: "10px",
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        background: "#fff",
                        border: "none",
                        color: "#333",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        borderRadius: "50%",
                        width: "22px",
                        height: "22px",
                        lineHeight: "20px",
                        textAlign: "center",
                        boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                      }}
                      onClick={() => handleRemovePhoto(idx)}
                    >
                      ×
                    </button>
                    <img
                      src={src}
                      alt={`preview-${idx}`}
                      width="150"
                      height="150"
                      className={styles.previewImage}
                    />
                    {/* ❌ Delete button */}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.paraText}>
                Photos you upload will be displayed on your Localists.com
                profile.
              </div>
            )}
          </div>

          {/* <div className={styles.imageContainer}>
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
              Photos you upload will be displayed on your Localists.com profile.
            </div>
          )} 
          </div>  */}

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
            <h3 className={styles.title}>Add Videos to Your Profile</h3>
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
            Bring your services to life with YouTube, Instagram or TikTok
            videos. Share past projects, events, or examples of your work to
            help customers see your expertise in action.
          </p>
          <button className={styles.uploadBtn} onClick={handleOpen}>
            Add YouTube Video Links
          </button>
          <div className={styles.imageContainer}>
            {Array.isArray(formState.company_youtube_link) &&
            formState.company_youtube_link.length > 0 ? (
              <div className={styles.videoContainer}>
                {formState.company_youtube_link?.map((link, idx) => (
                  <iframe
                    key={idx}
                    width="215"
                    height="200"
                    src={getYoutubeEmbedUrl(link)}
                    title={`YouTubes video ${idx + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.videoPreview}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.paraText}>
                Your videos will appear directly on your Localists.com profile.
              </div>
            )}
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
          {/* <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button> */}
          <button
            className={styles.saveButton}
            style={{ marginLeft: "auto" }}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
      {addModalOpen && (
        <>
          <AddYoutubeModal
            isOpen={addModalOpen}
            onClose={() => setAddModalOpen(false)}
            onSave={handleSave}
            formState={formState}
            handleInputChange={handleInputChange}
          />
        </>
      )}
    </>
  );
};

export default PhotosAccordion;
