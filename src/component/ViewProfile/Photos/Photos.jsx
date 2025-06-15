import React from "react"
import styles from "./Photos.module.css"
import DummyImage from "../../../assets/Images/DummyImage.svg";
import paginationImg from "../../../assets/Icons/MyResponse/paginationImg.svg"
import leftpaginationImg from "../../../assets/Icons/MyResponse/rightPagenationImg.svg"
const Photos = ({details}) => {
  return (
    <div className={styles.photoContainer} >
      <h2>Photos</h2>
      <div className={styles.photosContainer}>
        <img src={DummyImage} alt="Profile" className={styles.profileImg} />
      </div>
      <div className={styles.paginationBox}>
        <img src={leftpaginationImg} alt="image" />
        <img src={paginationImg} alt="image" />
      </div>
    </div>
  )
}
export default Photos