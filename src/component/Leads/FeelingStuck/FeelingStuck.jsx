import React, { useState } from "react";
import styles from "./FeelingStuck.module.css";
import FeelingStuckGirlImg from "../../../assets/Images/Leads/FeelingStuckGirl.svg";
import FeelingStuckComputer from "../../../assets/Images/Leads/FeelingStuckComputer.svg";
import FeelingStuckProfileBig from "../../../assets/Images/Leads/FeelingStuckProfileBig.svg";
import FeelingStuckProfileSmall from "../../../assets/Images/Leads/FeelingStuckProfileSmall.svg";
import LeadsImg from "../../../assets/Images/Leads/LeadsImg.svg";

const FeelingStuck = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={styles.banner}>
      <button
        className={styles.closeButton}
        onClick={() => setIsVisible(false)}
      >
        X
      </button>
      <div className={styles.textContainer}>
        <h2>Feeling stuck?</h2>
        <p>
          Day or night, our team is available 24/7 to help guide <br />
          you to success.
        </p>
      </div>
      <div className={styles.imageContainer}>
        {/* <img
          src={FeelingStuckComputer}
          alt="Computer"
          className={styles.computer}
        />
        <img
          src={FeelingStuckGirlImg}
          alt="Support girl"
          className={styles.girl}
        />
        <img
          src={FeelingStuckProfileBig}
          alt="Profile Big"
          className={styles.profileBig}
        />
        <img
          src={FeelingStuckProfileSmall}
          alt="Profile Small"
          className={styles.profileSmall}
        /> */}
        <img src={LeadsImg} alt="" />
      </div>
    </div>
  );
};

export default FeelingStuck;
