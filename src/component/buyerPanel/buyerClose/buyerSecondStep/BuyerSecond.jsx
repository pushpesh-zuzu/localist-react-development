import React, { useState } from 'react';
import styles from './BuyerSecondStep.module.css';
import ImageModal from '../ImageModal';
import { useNavigate } from 'react-router-dom';

const BuyerSecondStep = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = () => {
setIsModalOpen(true);
    }
    const handleBack = () => {
        navigate(-1);
    }
  return (
    <div className={styles.container}>
      <div className={styles.infoBox}>
        <p>
          To help improve our matching service and to help with or pricing guides, please can you confirm.
        </p>
      </div>

      <h2 className={styles.question}>What was the final agreed price?</h2>
      <p className={styles.subtext}>
        This information is kept private and only used to help us provide you better leads in the future.
      </p>

      <div className={styles.inputGroup}>
        <div className={styles.priceInput}>
          <span>£</span>
          <input type="number" placeholder="0" />
        </div>
        <select className={styles.dropdown}>
          <option>Total Price</option>
          <option>Hour</option>
          <option>Day</option>
          <option>Visit</option>
          <option>Sessions</option>
          <option>Week</option>
          <option>Month</option>
        </select>
      </div>

      <div className={styles.checkboxGroup}>
        <input type="checkbox" id="hidePrice" />
        <label htmlFor="hidePrice">I don't want to disclose this information</label>
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.backBtn} onClick={handleBack}>Back</button>
        <button className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
      </div>
      {isModalOpen && (<ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />)}
    </div>
  );
};

export default BuyerSecondStep;
