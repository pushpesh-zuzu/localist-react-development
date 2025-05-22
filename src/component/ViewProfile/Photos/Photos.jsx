import React from "react"
import styles from "./Photos.module.css"
import DummyImage from "../../../assets/Images/DummyImage.svg";

const Photos = () => {
  return (
    <div className={styles.photoContainer} >
      <h2>Photos</h2>
      <div className={styles.photosContainer}>
        <img src={DummyImage} alt="Profile" className={styles.profileImg} />
      </div>
    </div>
  )
}
export default Photos