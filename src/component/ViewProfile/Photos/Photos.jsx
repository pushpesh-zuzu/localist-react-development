// import React from "react"
// import styles from "./Photos.module.css"
// import DummyImage from "../../../assets/Images/DummyImage.svg";
// import paginationImg from "../../../assets/Icons/MyResponse/paginationImg.svg"
// import leftpaginationImg from "../../../assets/Icons/MyResponse/rightPagenationImg.svg"
// const Photos = ({details}) => {
//   return (
//     <div className={styles.photoContainer} >
//       <h2>Photos</h2>
//       <div className={styles.photosContainer}>
//         <img src={DummyImage} alt="Profile" className={styles.profileImg} />
//       </div>
//       <div className={styles.paginationBox}>
//         <img src={leftpaginationImg} alt="image" />
//         <img src={paginationImg} alt="image" />
//       </div>
//     </div>
//   )
// }
// export default Photos
import React from "react";
import styles from "./Photos.module.css";
import DummyImage from "../../../assets/Images/DummyImage.svg";
import paginationImg from "../../../assets/Icons/MyResponse/paginationImg.svg";
import leftpaginationImg from "../../../assets/Icons/MyResponse/rightPagenationImg.svg";

// ✅ Correct base URL
const BASE_IMAGE = "https://localists.zuzucodes.com/admin/storage/app/public/images/users";

const Photos = ({ details }) => {
  // ✅ Access company_photos string
  const photoString = details?.user_details?.company_photos;
  const photoArray = photoString ? photoString.split(",").filter(Boolean) : [];

  return (
    <div className={styles.photoContainer}>
      <h2>Photos</h2>

      <div className={styles.photosContainer}>
        {photoArray.length > 0 ? (
          photoArray.map((img, index) => (
            <img
              key={index}
              src={`${BASE_IMAGE}/${img.trim()}`}
              alt={`Company Photo ${index + 1}`}
              className={styles.profileImg}
            />
          ))
        ) : (
          <img src={DummyImage} alt="Profile" className={styles.profileImg} />
        )}
      </div>

      {photoArray.length > 1 && (
        <div className={styles.paginationBox}>
          <img src={leftpaginationImg} alt="left" />
          <img src={paginationImg} alt="right" />
        </div>
      )}
    </div>
  );
};

export default Photos;
