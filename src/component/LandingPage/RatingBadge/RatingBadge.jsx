import React from "react";
import styles from "./ratingbadge.module.css";
import GreenStar from "../../../assets/Icons/GreenStar.png";
import FiveStar from "../../../assets/Icons/FiveStar.png";

const RatingBadge = ({
  text = "Excellent",
  reviewsCount,
  platform = "Trustpilot",
}) => {
  return (
    <div  className={styles.wrapper}>
      <div className={styles.ratingContainer}>
        {/* Row 1 */}
        <div className={styles.row}>
          <p className={styles.mainText}>{text}</p>
          <img src={FiveStar} alt="stars" className={styles.fiveStar} />
        </div>

        {/* Row 2 */}
        <div className={styles.row}>
          <p className={styles.reviews}>
             18,359 reviews on
          </p>
        </div>
        <div className={styles.row}>
          <img
            src={GreenStar}
            alt="platform logo"
            className={styles.starIcon}
          />
          <p className={styles.mainText}>{platform}</p>
        </div>
      </div>
    </div>
  );
};

export default RatingBadge;
