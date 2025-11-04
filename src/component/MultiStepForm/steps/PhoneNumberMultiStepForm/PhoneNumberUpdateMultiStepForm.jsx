import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../../utils";
import {
  setbuyerRequestData,
  updateMobile,
} from "../../../../store/Buyer/BuyerSlice";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";
import styles from "./PhoneNumberMultiStepForm.module.css";

const PhoneNumberUpdateMultiStepForm = ({ setUpdateNumberStep }) => {
  const dispatch = useDispatch();
  const { buyerRequest, requestUserId } = useSelector((state) => state.buyer);
  const [phone, setPhone] = useState(buyerRequest?.phone || "");
  const [errors, setErrors] = useState({
    phone: false,
  });
  const [mobileErrorMessage, setMobileErrorMessage] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: false }));
      setMobileErrorMessage("");
    }
  };

  const handleSubmit = () => {
    if (phone.startsWith("0")) {
      setMobileErrorMessage("Please enter phone number without '0'");
      setErrors((prev) => ({ ...prev, phone: true }));
      return;
    }

    const newErrors = {
      phone: !phone || !/^\d{10}$/.test(phone),
    };

    setErrors(newErrors);

    if (newErrors.phone) {
      setMobileErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("user_id", requestUserId);
    dispatch(updateMobile(formData)).then((result) => {
      if (result) {
        showToast(
          "success",
          result?.message || "Phone Number updated Successfully"
        );
      }
      setUpdateNumberStep(2);
    });

    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        phone: phone,
      })
    );
  };

  const handleBackClick = () => {
    setUpdateNumberStep(2);
  };

  return (
    <CardLayoutWrapper
      title="Just one more thing…"
      onButtonClick={handleSubmit}
      onBackClick={handleBackClick}
      buttonText="Compare quotes now"
      showBackButton={true}
    >
      <div className={styles.infoWrapper}>
        <div
          className={`${styles.phoneWrapper} ${
            errors?.phone ? styles.error44 : ""
          }`}
        >
          <input
            type="tel"
            placeholder="Phone Number"
            className={`${styles.phoneInput} ${
              errors?.phone ? styles.inputError : ""
            }`}
            value={phone}
            maxLength={10}
            onChange={handlePhoneChange}
          />
          {errors?.phone && (
            <span style={{ color: "red" }} className={styles.errorMessage}>
              {mobileErrorMessage}
            </span>
          )}
        </div>
        <p className={styles.phoneZero}>
          ** Enter Mobile Number without the 0 **
        </p>

        <p style={{ marginTop: "29px" }}>
          We can only send a passcode to a <strong>MOBILE NUMBER</strong>, not a{" "}
          <strong>LANDLINE</strong>
        </p>
        <p className={styles.phoneNote}>
          We only use this to match you with trusted professionals.
        </p>
      </div>
    </CardLayoutWrapper>
  );
};

export default PhoneNumberUpdateMultiStepForm;
