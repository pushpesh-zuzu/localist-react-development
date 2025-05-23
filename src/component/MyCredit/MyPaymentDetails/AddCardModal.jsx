import React, { useEffect, useState } from "react";
import styles from "./AddCardModal.module.css";

const AddCardModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic here
    console.log(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles.heading}>Add card details</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Card number</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="XXXX XXXX XXXX XXXX"
            value={formData.cardNumber}
            onChange={handleChange}
            className={styles.input}
          />

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Expiry date</label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM / YY"
                value={formData.expiryDate}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>CVC</label>
              <input
                type="text"
                name="cvc"
                placeholder="CVC"
                value={formData.cvc}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Add card details
            </button>
          </div>
        </form>

        <div className={styles.footerNote}>
          <p>
            🔒 Your payment is secure <br />
            Your card will be securely stored for future purchases. You can update it in settings at any time.
          </p>
          <div className={styles.cards}>
            <img src="/visa.png" alt="Visa" />
            <img src="/mastercard.png" alt="Mastercard" />
            <img src="/amex.png" alt="Amex" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
