import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./EmailMatch.module.css";
import { Alert, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  registerUserData,
  setbuyerRegisterFormData,
  checkEmailIdApi,
} from "../../../../../store/FindJobs/findJobSlice";
import { showToast } from "../../../../../utils";
import {
  createRequestData,
  registerQuoteCustomer,
  setbuyerRequestData,
} from "../../../../../store/Buyer/BuyerSlice";
import { useLocation } from "react-router";

const EmailMatch = ({
  onClose,
  nextStep,
  previousStep,
  setEmails,
  setShowConfirmModal,
  resetTrigger,
  isStartWithQuestionModal = false,
  isPPCPages = false,
  hideCloseButton = false,
}) => {
  const dispatch = useDispatch();
  const { registerLoader, buyerRegisterFormData, errorMessage } = useSelector(
    (state) => state.findJobs
  );
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  console.log(buyerRegisterFormData);
  const campaignid = params.get("campaignid");
  const keyword = params.get("keyword");
  const gclid = params.get("gclid");
  const campaign = params.get("utm_campaign");
  const adGroup = params.get("AgId");
  const targetID = params.get("utm_term");
  const msclickid = params.get("utm_msclkid");
  const utm_source = params.get("utm_source");
  const { userToken } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [isMobileValid, setIsMobileValid] = useState(true);
  const [mobileErrorMessage, setMobileErrorMessage] = useState("");

  const [errors, setErrors] = useState({
    email: false,
    name: false,
    phone: false,
  });
  const { requestLoader, buyerRequest, citySerach } = useSelector(
    (state) => state.buyer
  );
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // keep it simple
    setErrors((prev) => ({ ...prev, email: false }));
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (name || email || phone) {
        const formData = new FormData();
        formData.append("name", name || "");
        formData.append("email", email || "");
        formData.append("phone", phone || "");
        formData.append(
          "questions",
          JSON.stringify(buyerRequest?.questions || [])
        );
        formData.append("service_id", buyerRequest?.service_id || "");
        formData.append("city", citySerach || "");
        formData.append("postcode", buyerRequest?.postcode || "");
        formData.append("campaignid", campaignid || "");
        formData.append("gclid", gclid || "");
        formData.append("campaign", campaign || "");
        formData.append("adgroup", adGroup || "");
        formData.append("targetid", targetID || "");
        formData.append("msclickid", msclickid || "");
        formData.append("utm_source", utm_source || "");
        formData.append("keyword", keyword || "");
        formData.append("form_status", 1);

        // ⚠️ Send API request
        navigator.sendBeacon("/api/save-form", formData); // ✅ non-blocking safe method

        // ⚠️ Show browser default confirmation dialog
        e.preventDefault();
        e.returnValue =
          "Your progress will be saved automatically. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [
    name,
    email,
    phone,
    buyerRequest,
    citySerach,
    campaignid,
    gclid,
    campaign,
    adGroup,
    targetID,
    msclickid,
    utm_source,
    keyword,
  ]);

  const handleEmailBlur = async () => {
    if (!email) return;

    try {
      // no `.unwrap()` since it's not createAsyncThunk
      const res = await dispatch(checkEmailIdApi({ email }));

      if (res?.success) {
        setErrors((prev) => ({ ...prev, email: false }));
        setIsEmailValid(true);
        setEmailErrorMessage("");
      } else {
        setEmail(""); // clear instantly
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
    const value = e.target.value.replace(/\D/g, ""); // remove all non-digits
    if (value.length <= 10) {
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: false }));
    }
  };

  const handleSubmit = () => {
    if (phone.startsWith("0")) {
      showToast("error", "Please enter phone number without '0'");
      return;
    }

    const newErrors = {
      email:
        !isPPCPages &&
        (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)),
      name: !name.trim(),
      phone: !phone || !/^\d{10}$/.test(phone), // 10-digit phone validation
    };

    if (!isPPCPages && newErrors.email && !emailErrorMessage) {
      setEmailErrorMessage("Please enter a valid email address.");
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError || (!isPPCPages && !isEmailValid)) return;

    if (!isPPCPages && setEmails) {
      setEmails(email);
    }

    const finalEmail = isPPCPages ? buyerRequest?.email || "" : email;

    // save user info in redux
    dispatch(setbuyerRequestData({ name, email: finalEmail, phone }));
    const updatedAnswers = buyerRequest?.questions || [];

    if (isStartWithQuestionModal) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", finalEmail);
      formData.append("phone", phone);
      formData.append("questions", JSON.stringify(updatedAnswers));
      formData.append("service_id", buyerRequest?.service_id || "");
      formData.append("city", citySerach || "");
      formData.append("postcode", buyerRequest?.postcode || "");
      formData.append("campaignid", campaignid || "");
      formData.append("gclid", gclid || "");
      formData.append("campaign", campaign || "");
      formData.append("adgroup", adGroup || "");
      formData.append("targetid", targetID || "");
      formData.append("msclickid", msclickid || "");
      formData.append("utm_source", utm_source || "");
      formData.append("keyword", keyword || "");
      formData.append("form_status", 1);
      dispatch(registerQuoteCustomer(formData)).then((result) => {
        if (result) {
          // showToast(
          //   "success",
          //   result?.message || "Customer registered successfully"
          // );
          nextStep();
        }
      });
    } else {
      // normal flow
      nextStep();
    }
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

  useEffect(() => {
    if (resetTrigger) {
      // Clear form values
      setName("");
      setPhone("");
      setEmail("");
      setErrors(null);
      setResetEmailFormTrigger(false);
    }
  }, [resetTrigger]);

  const handleCloseClick = () => {
    if (!userToken?.remember_tokens) {
      console.log(name, email, phone, "p");
      dispatch(setbuyerRequestData({ name, email, phone }));
      setShowConfirmModal(true);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    dispatch(setbuyerRequestData({ name, email, phone }));
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (name || email || phone) {
        // setShowConfirmModal(true);
        e.preventDefault();
        e.returnValue = ""; // still needed for native popup
        dispatch(setbuyerRequestData({ name, email, phone }));
      }
    };

    // For internal route change
    const handleBeforeRouteChange = (event) => {
      if (name || email || phone) {
        event.preventDefault();
        dispatch(setbuyerRequestData({ name, email, phone }));
        // setShowConfirmModal(true);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleBeforeRouteChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleBeforeRouteChange);
    };
  }, [name, email, phone]);

  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     // Only trigger if user has partially filled the form
  //     if (name || email || phone) {
  //       // create a payload similar to registerQuoteCustomer API
  //       const payload = {
  //         name,
  //         email,
  //         phone,
  //         questions: buyerRequest?.questions || [],
  //         service_id: buyerRequest?.service_id || "",
  //         city: citySerach || "",
  //         postcode: buyerRequest?.postcode || "",
  //         campaignid: campaignid || "",
  //         gclid: gclid || "",
  //         campaign: campaign || "",
  //         adgroup: adGroup || "",
  //         targetid: targetID || "",
  //         msclickid: msclickid || "",
  //         utm_source: utm_source || "",
  //         keyword: keyword || "",
  //         form_status: 1, // same as your API expects
  //       };

  //       try {
  //         const url = `${process.env.REACT_APP_API_BASE_URL}/registerQuoteCustomer`;
  //         const blob = new Blob([JSON.stringify(payload)], {
  //           type: "application/json",
  //         });
  //         navigator.sendBeacon(url, blob);
  //       } catch (err) {
  //         console.error("Beacon send failed", err);
  //       }
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [
  //   name,
  //   email,
  //   phone,
  //   buyerRequest,
  //   citySerach,
  //   campaignid,
  //   gclid,
  //   campaign,
  //   adGroup,
  //   targetID,
  //   msclickid,
  //   utm_source,
  //   keyword,
  // ]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {!hideCloseButton && (
          <button
            className={styles.closeButton}
            onClick={handleCloseClick}
            disabled={registerLoader}
          >
            &times;
          </button>
        )}
        <div className={styles.header}>
          <h2>YOU ARE ONLY ONE STEP FROM COMPARING FREE QUOTES!</h2>
          <p style={{ color: "#000" }}>
            Your phone number and email are safe with us.
          </p>
          <p style={{ color: "#000" }}>
            We'll only use them to help you connect with trusted, verified
            professionals.
          </p>
        </div>
        {/* {String(errorMessage).trim() && (
  <div className={styles.errorText}>{errorMessage}</div>
)} */}
        {/* {showError && String(errorMessage).trim() && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )} */}
        <div className={styles.infoWrapper}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className={`${styles.input} ${
              errors?.name ? styles.inputError : ""
            }`}
            value={name}
            onChange={handleNameChange}
          />
          {errors?.name && (
            <span style={{ color: "red" }} className={styles.errorMessage}>
              Name is required.
            </span>
          )}

          {!isPPCPages && (
            <>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className={`${styles.input} ${
                  errors?.email ? styles.inputError : ""
                }`}
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
              />
              {errors?.email && (
                <span style={{ color: "red" }} className={styles.errorMessage}>
                  Please enter a valid email address.
                </span>
              )}
            </>
          )}

          <label className={styles.label}>Phone Number</label>
          {/* <div className={styles.phoneWrapper}>
            <span className={styles.prefix}>+44</span>
            <input
              type="tel"
              placeholder="Phone Number"
              className={`${styles.input} ${
                errors.phone ? styles.inputError : ""
              }`}
              value={phone}
              maxLength={10}
              onChange={handlePhoneChange}
            />
            {errors.phone && (
              <span className={styles.errorMessage}>
                Please enter a valid 10-digit phone number.
              </span>
            )}
          </div> */}

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
                Please enter a valid 10-digit phone number.
              </span>
            )}
          </div>

          <div className={styles.buttonContainer}>
            {/* <button
              className={styles.backButton}
              onClick={previousStep}
              disabled={registerLoader}
            >
              Back
            </button> */}
            <button
              className={styles.nextButton}
              onClick={handleSubmit}
              disabled={registerLoader || requestLoader}
              style={{
                marginLeft: "auto",
              }}
            >
              {registerLoader || requestLoader ? (
                <Spin
                  indicator={
                    <LoadingOutlined spin style={{ color: "white" }} />
                  }
                />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailMatch;
