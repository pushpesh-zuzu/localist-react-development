import React, { useEffect, useState } from "react";
import styles from "./CreditModal.module.css";
import HiredImg from "../../../assets/Images/MyResponse/HiredBtnImg.svg";

const CreditModal = ({ onClose }) => {
  const [creditValue, setCreditValue] = useState(400);

  const handleSliderChange = (e) => {
    setCreditValue(Number(e.target.value));
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const responseEstimate = Math.floor(creditValue / 8); // Example logic
  const price = (creditValue * 4.4625).toFixed(2); // Example: £1785 for 400 credits
  const getSliderBackground = (value, min, max) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, #007bff 0%, #007bff ${percentage}%, #e4e4e4 ${percentage}%, #e4e4e4 100%)`;
  };
  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
<div className={styles.title}>
        <h2 >Pricing to suit your business</h2>
        <p className={styles.subtitle}>Build a pack to suit your business needs</p>
        </div>

        <div className={styles.infoBar}>
          <span className={styles.credits}>Credits: {creditValue}</span>
          <span className={styles.responses}>Responses: Approximately {responseEstimate}    </span>
          <span className={styles.cost}>Cost: £{price} (ex VAT)</span>
        </div>

        {/* <input
          type="range"
          min="0"
          max="800"
          step="200"
          value={creditValue}
          onChange={handleSliderChange}
          className={styles.slider}
        />

        <div className={styles.rangeLabels}>
          <span>0</span>
          <span>200</span>
          <span>400</span>
          <span>800</span>
        </div> */}
         <div className={styles.sliderWrapper}>
        <input
          type="range"
          min="0"
          max="800"
          step="200"
          value={creditValue}
          onChange={handleSliderChange}
          className={styles.slider}
          style={{
            background: getSliderBackground(creditValue, 0, 800),
          }}
        />
        <div className={styles.sliderMarkers}>
          <span style={{ left: "5%" }}></span>
          <span style={{ left: "25%" }}></span>
          <span style={{ left: "50%" }}></span>
          <span style={{ left: "75%" }}></span>
          <span style={{ left: "95%" }}></span>
        </div>
      </div>

      <div className={styles.rangeLabels}>
        <span>0</span>
        <span>200</span>
        <span>400</span>
        <span>600</span>
        <span>800</span>
      </div>

        <div className={styles.centerBtn}>
          <button className={styles.buyBtn}>Buy credits</button>
        </div>

        <div className={styles.partnerSection}>
          <div>
            <h4>You now Qualify for partnership Pricing!</h4>
            <p>Contact our Partners team today and get:</p>
            <ul>
              <li><img src={HiredImg} alt="hire" /> Win New Business</li>
              <li><img src={HiredImg} alt="hire" /> Priority support & expert advice</li>
              <li><img src={HiredImg} alt="hire" /> Account Optimisation</li>
            </ul>
          </div>
          <button className={styles.callbackBtn}>Request callback</button>
        </div>
      </div>
    </div>
  );
};

export default CreditModal;
