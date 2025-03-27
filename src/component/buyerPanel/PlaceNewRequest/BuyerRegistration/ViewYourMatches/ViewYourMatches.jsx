import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Adjust the import path if needed
import styles from "./ViewYourMatches.module.css";
import { createRequestData } from "../../../../../store/Buyer/BuyerSlice";

const ViewYourMatches = ({ onClose, nextStep, previousStep, formData }) => {
  const { buyerRequest, } = useSelector(
    (state) => state.buyer
  );
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [consent, setConsent] = useState(false); // State to track checkbox

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
    setPhoneNumber(value);
  };

  const handleSubmit = () => {
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const formData = new FormData();
    // Append required fields to FormData
    formData.append("service_id",buyerRequest?.service_id)
    formData.append("postcode",buyerRequest?.postcode)
    formData.append("questions",JSON.stringify(buyerRequest?.questions))
    
    formData.append("phone", phoneNumber);
    formData.append("recevive_online", consent ? 1 : 0);
    
    dispatch(createRequestData(formData));

    nextStep(); // Proceed to the next step
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>View your matches now!</h2>
        </div>

        <div className={styles.infoWrapper}>
          <label htmlFor="phoneNumber" className={styles.label}>
            Please enter your phone number
          </label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Phone Number"
            className={styles.input}
            maxLength={10}
            value={phoneNumber}
            onChange={handleInputChange}
          />

          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <label htmlFor="consent">
              I'm happy to receive this online or remotely.
            </label>
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.backButton} onClick={previousStep}>
              Back
            </button>
            <button className={styles.nextButton} onClick={handleSubmit}>
              View Matches
            </button>
          </div>
        </div>

        <p className={styles.disclaimer}>
          Localists will provide your information to up to 5 professionals who
          may contact you about your project in accordance with our privacy
          policy. By submitting this form, you consent that such professionals
          may call or text you on the phone number you provided to offer their
          services (these calls may be made using automated phone technology).
          Consent is not a condition of purchasing or receiving any of the
          services.
        </p>
      </div>
    </div>
  );
};

export default ViewYourMatches;
