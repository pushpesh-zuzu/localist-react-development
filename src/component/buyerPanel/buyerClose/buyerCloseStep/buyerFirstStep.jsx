import React from 'react';
import styles from './BuyerFirstStep.module.css';
import { useNavigate } from 'react-router-dom';

const BuyerFirstStep = () => {
    const navigate = useNavigate();
    const handleNext = () => {
        
        navigate('/buyer-second-step');
    };
  return (
    <div className={styles.container}>
      <div className={styles.infoBox}>
        <p>
         Thank you for using <a href='#' className={styles.textcolor}>Localists.com</a>{" "} to find your local professional. 
         To help improve our platform and to provide you with the most accurate matches in future we would be grateful 
         if you could confirm the following pieces of information:
        </p>
      </div>
      <h2 className={styles.question}>Which professional did you hire?</h2>
      <div className={styles.options}>
        <label className={styles.radioLabel}>
          <input type="radio" name="hire" />
          David William
        </label>
        <label className={styles.radioLabel}>
          <input type="radio" name="hire" />
          Someone not on Localists
        </label>
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.cancelBtn}>Cancel</button>
        <button className={styles.nextBtn} onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default BuyerFirstStep;
