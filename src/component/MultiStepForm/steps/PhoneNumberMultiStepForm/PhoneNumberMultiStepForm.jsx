import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { showToast } from "../../../../utils";
import {
  registerQuoteCustomer,
  setbuyerRequestData,
} from "../../../../store/Buyer/BuyerSlice";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";
import styles from "./PhoneNumberMultiStepForm.module.css";
import { useLocation } from "react-router";

const PhoneNumberMultiStepForm = ({ nextStep, onBack }) => {
  const dispatch = useDispatch();
  const { requestLoader, buyerRequest } = useSelector((state) => state.buyer);
  const { userToken } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const campaignid = params.get("gad_campaignid") || "";
  const keyword = params.get("keyword") || "";
  const gclid = params.get("gclid") || "";
  const campaign = params.get("utm_campaign") || "";
  const adGroup = params.get("AgId") || "";
  const targetID = params.get("utm_term") || "";
  const msclickid = params.get("utm_msclkid") || "";
  const utm_source = params.get("utm_source") || "";

  const [phone, setPhone] = useState(buyerRequest?.phone || "");
  const [errors, setErrors] = useState({
    phone: false,
  });
  const [mobileErrorMessage, setMobileErrorMessage] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove all non-digits
    if (value.length <= 10) {
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: false }));
      setMobileErrorMessage("");
    }
  };
  const updatedAnswers = buyerRequest?.questions || [];

  const handleSubmit = () => {
    if (phone.startsWith("0")) {
      setMobileErrorMessage("Please enter phone number without '0'");
      setErrors((prev) => ({ ...prev, phone: true }));
      return;
    }

    const newErrors = {
      phone: !phone || !/^\d{10}$/.test(phone), // 10-digit phone validation
    };

    setErrors(newErrors);

    if (newErrors.phone) {
      setMobileErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    // Save phone number in redux
    const formData = new FormData();
    formData.append("name", buyerRequest?.name);
    formData.append("email", buyerRequest?.email);
    formData.append("phone", phone);
    formData.append("questions", JSON.stringify(updatedAnswers));
    formData.append("service_id", buyerRequest?.service_id);
    formData?.append("city", buyerRequest?.city);
    formData.append("postcode", buyerRequest?.postal_code);
    formData.append("form_status", 1);
    formData.append("campaignid", campaignid || "");
    formData.append("gclid", gclid || "");
    formData.append("campaign", campaign || "");
    formData.append("adgroup", adGroup || "");
    formData.append("targetid", targetID || "");
    formData.append("msclickid", msclickid || "");
    formData.append("utm_source", utm_source || "");
    formData.append("keyword", keyword || "");

    dispatch(registerQuoteCustomer(formData)).then((result) => {
      if (result) {
        // showToast(
        //   "success",
        //   result?.message || "Customer registered successfully"
        // );
        nextStep();
      }
    });

    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        phone: phone,
      })
    );
  };

  const handleBackClick = () => {
    onBack();
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
        {/* <label className={styles.label}>Phone Number</label> */}

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

export default PhoneNumberMultiStepForm;
