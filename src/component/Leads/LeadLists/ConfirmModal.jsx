import React from 'react';
import styles from './CustomModal.module.css';

const CustomModal = ({ isOpen, onClose, onContinue, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.continueBtn} onClick={onContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
