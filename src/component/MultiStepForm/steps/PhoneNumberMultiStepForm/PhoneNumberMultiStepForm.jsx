import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../../utils";
import {
  registerQuoteCustomer,
  setbuyerRequestData,
  updateMobile,
} from "../../../../store/Buyer/BuyerSlice";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";
import styles from "./PhoneNumberMultiStepForm.module.css";
import { useLocation } from "react-router";
import useUserInfo from "../../../../utils/getUserIp";
import { validateUKPhoneNumber } from "../../../../utils/formatUKPhoneNumber";

const PhoneNumberMultiStepForm = ({
  nextStep,
  onBack,
  updateNumberStep,
  setUpdateNumberStep,
  setLocalRequestId,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest, requestUserId } = useSelector((state) => state.buyer);
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
  const [phone, setPhone] = useState(buyerRequest?.phone);
  const [errors, setErrors] = useState({
    phone: false,
  });
  const { ip, url } = useUserInfo();
  const [mobileErrorMessage, setMobileErrorMessage] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove all non-digits
    if (value.length <= 11) {
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: false }));
      setMobileErrorMessage("");
    }
    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        phone: value,
      })
    );
  };
  const updatedAnswers = Array.isArray(buyerRequest?.questions)
    ? buyerRequest.questions.filter(Boolean) // remove undefined/null items
    : [];

  const hasQuestionNo = updatedAnswers.some(
    (q) => q && typeof q === "object" && "question_no" in q
  );

  const answersToSend = hasQuestionNo
    ? updatedAnswers.map((q) => {
        if (!q || typeof q !== "object") return q;
        const { question_no, ...rest } = q;
        return rest;
      })
    : updatedAnswers;

  const handleSubmit = () => {
    if (!phone) {
      setMobileErrorMessage("Phone number is required");
      setErrors((prev) => ({ ...prev, phone: true }));
      return;
    }

    const newErrors = {
      phone: !phone || !/^\d{11}$/.test(phone),
    };

    setErrors(newErrors);

    if (newErrors.phone) {
      setMobileErrorMessage("Please enter a valid 11-digit phone number.");
      return;
    }
     if (!validateUKPhoneNumber(phone)) {
          return;
        }
    if (updateNumberStep === 2) {
      const formData = new FormData();
      formData.append("name", buyerRequest?.name);
      formData.append("email", buyerRequest?.email);
      formData.append("phone", phone);
      formData.append("questions", JSON.stringify(answersToSend));
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
      formData.append("entry_url", url);
      formData.append("user_ip_address ", ip);

      dispatch(registerQuoteCustomer(formData)).then((result) => {
        if (result) {
          setLocalRequestId(result?.data?.user_id);
          nextStep();
        }
      });
    } else {
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
        nextStep();
      });
    }

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
            maxLength={11}
            onChange={handlePhoneChange}
            autoComplete="off"
          />
          {errors?.phone && (
            <span style={{ color: "red" }} className={styles.errorMessage}>
              {mobileErrorMessage}
            </span>
          )}
        </div>
        {/* <p className={styles.phoneZero}>
          ** Enter Mobile Number with the 0 **
        </p> */}

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
