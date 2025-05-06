import React from "react";
import styles from "./PhotosAccordion.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";

const PhotosAccordion = () => {
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
        <button className={styles.uploadButton}>Upload photos</button>
        <p className={styles.placeholder}>
          Photos you add to your profile will appear here.
        </p>
      </div>

      {/* Videos Section */}
      <div className={styles.section}>
        <div className={styles.videoHeader}>
          <h3 className={styles.title}>Videos</h3>
          <div className={styles.optional}>
            <img src={iIcon} alt="info" className={styles.icon} />
            <span>Optional</span>
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
        <button className={styles.uploadButton}>Add YouTube video links</button>
        <p className={styles.placeholder}>
          YouTube videos you add to your profile will appear here.
        </p>
      </div>

      {/* Footer Buttons */}
      <div className={styles.footer}>
        <button className={styles.cancelButton}>Cancel</button>
        <button className={styles.saveButton}>Save</button>
      </div>
    </div>
  );
};

export default PhotosAccordion;
