import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ReEnterMobileNumberNewPPC.module.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { checkEmailIdApi } from "../../../../store/FindJobs/findJobSlice";
import { showToast } from "../../../../utils";
import {
  setbuyerRequestData,
  updateMobile,
} from "../../../../store/Buyer/BuyerSlice";
import { validateUKPhoneNumber } from "../../../../utils/formatUKPhoneNumber";
import FormWrapper from "../RegistrationForm/FormWrapper";
import Paragraph from "../../UITypography/Paragrah";
import H3 from "../../UITypography/H3";

const ReEnterMobileNumberNewPPC = ({ onClose, setReEnterMobile }) => {
  const dispatch = useDispatch();
  const { registerLoader, errorMessage } = useSelector(
    (state) => state.findJobs
  );
  const { requestLoader, buyerRequest, requestUserId } = useSelector(
    (state) => state.buyer
  );

  const [email, setEmail] = useState(buyerRequest?.email);
  const [name, setName] = useState(buyerRequest?.name);
  const [phone, setPhone] = useState(buyerRequest?.phone);

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    name: false,
    phone: false,
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: false }));
  };

  const handleEmailBlur = async () => {
    if (!email) return;

    try {
      const res = await dispatch(checkEmailIdApi({ email }));

      if (res?.success) {
        setErrors((prev) => ({ ...prev, email: false }));
        setIsEmailValid(true);
        setEmailErrorMessage("");
      } else {
        setEmail("");
        if (setEmails) setEmails("");
        setIsEmailValid(false);
        setEmailErrorMessage("Email is already registered.");
      }
    } catch (err) {
      console.error("Error checking email:", err);
      setErrors((prev) => ({ ...prev, email: false }));
      setIsEmailValid(false);
      setEmailErrorMessage("Something went wrong. Please try again.");
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prev) => ({ ...prev, name: false }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: false }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      email: !email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
      name: !name.trim(),
      phone: !phone || !/^\d{11}$/.test(phone),
    };

    if (newErrors.email && !emailErrorMessage) {
      setEmailErrorMessage("Please enter a valid email address.");
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError || !isEmailValid) return;

    if (!validateUKPhoneNumber(phone)) {
      return;
    }
    dispatch(setbuyerRequestData({ name, email: email, phone }));
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
      setReEnterMobile(2);
    });
  };

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 9000); // show for 2 seconds

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <FormWrapper>
      <div className={styles.formCard}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        {/* <div className={styles.titleContainer}>
          <h3 className={styles.formTitle}>
            You are one step away from comparing free quotes
          </h3>
          <p className={styles.description}>
            Your phone number and email are safe with us. We only use them to
            connect you with trusted professionals.
          </p>
        </div> */}
        <div className={styles.titleContainer}>
          <H3 className={`Inter ${styles.formTitle}`}>
            You are one step away from comparing free quotes
          </H3>
          <Paragraph className={styles.description}>
            Fill out the form and receive quotes from local professionals
          </Paragraph>
        </div>
        <div className={styles.form}>
          <label>Full Name *</label>
          <input value={name} disabled className={styles.input} />

          <label>Email *</label>
          <input value={email} disabled className={styles.input} />

          <label>Phone Number *</label>
          <input
            value={phone}
            onChange={handlePhoneChange}
            maxLength={11}
            className={`${styles.input} ${
              errors.phone ? styles.errorBorder : ""
            }`}
          />
          {errors.phone && (
            <span className={styles.errorText}>
              Please enter a valid 11-digit phone number
            </span>
          )}

          <button
            onClick={handleSubmit}
            disabled={requestLoader}
            className={styles.submitBtn}
          >
            {requestLoader ? (
              <Spin indicator={<LoadingOutlined spin />} />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </FormWrapper>
  );
};

export default ReEnterMobileNumberNewPPC;
