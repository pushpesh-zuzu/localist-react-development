import React, { useState } from "react";
import styles from "./FeelingStuckFooter.module.css";
import GetHiredImage from "../../../../assets/Images/Leads/GetHiredImg.svg";
import FeelingStuckImg from "../../../../assets/Images/Leads/FeelingStuckImg.svg";

const FeelingStuckFooter = () => {
  const [showLeftCard, setShowLeftCard] = useState(true);
  const [showRightCard, setShowRightCard] = useState(true);

  return (
    <div className={styles.container}>
      {showLeftCard && (
        <div className={styles.card}>
          {/* <button
            className={styles.closeButton}
            onClick={() => setShowLeftCard(false)}
          >
            X
          </button>
          <div className={styles.leftText}>
            <h2>Feeling stuck?</h2>
            <p>
              Day or night, our team is available 24/7 to help guide you to
              success
            </p>
          </div> */}
          <img src={FeelingStuckImg} alt="feeling" />
        </div>
      )}

      {showRightCard && (
        <div className={styles.cardRight}>
          {/* <button
            className={styles.closeButton}
            onClick={() => setShowRightCard(false)}
          >
            X
          </button>
          <div className={styles.rightText}>
            <h2>No Hire? We&apos;ll refund your credits</h2>
            <div className={styles.descriptionImageWrapperRight}>
              <p>
                Your first pack is backed by our Get Hired Guarantee. Those who
                try again are <span>22% more likely to land the job!</span>
              </p>
              <div className={styles.imageWrapper}>
              </div>
              </div>
              </div> */}
              <img src={GetHiredImage} alt="Get Hired Guarantee" />
        </div>
      )}
    </div>
  );
};

export default FeelingStuckFooter;
