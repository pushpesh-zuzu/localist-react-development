import React, { useState } from "react";
import styles from "./CreditMatch.module.css";
import locallistImgs from "../../../../assets/Images/Leads/localistImg.svg";
import { useSelector } from "react-redux";
const CreditMatch = () => {
  const [autoTopUp, setAutoTopUp] = useState(false);
  const { userToken } = useSelector((state) => state.auth)
  const { registerData, registerLoader } = useSelector(
    (state) => state.findJobs
  );
  const handleAutoTopUpChange = () => {
    setAutoTopUp(!autoTopUp);
  };

  return (
    <div className={styles.buyCreditsContainer}>
      <div className={styles.titleSection}>
        <h2 className={styles.title}>Buy more credits now</h2>
      </div>
      <div className={styles.creditsSection}>
        <div className={styles.infoSection}>
          <div className={styles.creditsInfo}>
            <div className={styles.locationTag}>
              <img src={locallistImgs} alt="image" />
              <span className={styles.creditsAmount}>{userToken?.total_credit ? userToken?.total_credit : registerData?.total_credit} credits</span>
            </div>
            <div className={styles.usageInfo}>
              <span className={styles.usageText}>
                Enough for about 10 leads
              </span>
            </div>
          </div>
        </div>

        <div className={styles.priceSection}>
          <div className={styles.priceInfo}>
            <div className={styles.totalPrice}>$123.20 (Excl. tax)</div>
            <div className={styles.unitPrice}>$1.76/credit</div>
          </div>
        </div>
      </div>
      <div className={styles.actionSection}>
        <button className={styles.buyButton}>Buy {userToken?.total_credit ? userToken?.total_credit : registerData?.total_credit}</button>
        <div className={styles.autoTopUpContainer}>
          <input
            type="checkbox"
            id="autoTopUp"
            className={styles.autoTopUpCheckbox}
            checked={autoTopUp}
            onChange={handleAutoTopUpChange}
          />
          <label htmlFor="autoTopUp" className={styles.autoTopUpLabel}>
            Auto top-up next time
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreditMatch;
