import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./WelcomeEmailModal.module.css"; // You'll need to create this CSS module
// import { Spin } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";
import { checkEmailIdApi } from "../../../../../store/FindJobs/findJobSlice";
import { setbuyerRequestData } from "../../../../../store/Buyer/BuyerSlice";
// import { showToast } from "../../../../../utils";
import logo from "../../../../../assets/Images/logo.png";
import fullRightArrow from "../../../../../assets/Icons/fullRightArrow.png"; // Capital I
const WelcomeEmailModal = ({
  onClose,
  nextStep,
  setShowConfirmModal,
  resetTrigger,
  welcomModalTitle = "",
  welcomModalButtonText = "",
}) => {
  const dispatch = useDispatch();
  const { registerLoader, searchServiceLoader } = useSelector(
    (state) => state.findJobs
  );
  const { userToken } = useSelector((state) => state.auth);
  const { buyerRequest } = useSelector((state) => state.buyer);

  const [email, setEmail] = useState(buyerRequest?.email || "");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [errors, setErrors] = useState({ email: false });
  console.log(logo, "logo", fullRightArrow, "fullRightArrow");
  // Pre-fill from Redux if available
  useEffect(() => {
    if (buyerRequest?.email) {
      setEmail(buyerRequest.email);
    }
  }, [buyerRequest?.email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: false }));
    setEmailErrorMessage("");
  };

  // const handleEmailBlur = async () => {
  //   if (!email) return;

  //   try {
  //     const res = await dispatch(checkEmailIdApi({ email }));

  //     if (res?.success) {
  //       setErrors((prev) => ({ ...prev, email: false }));
  //       setIsEmailValid(true);
  //       setEmailErrorMessage("");
  //     } else {
  //       setEmail("");
  //       setIsEmailValid(false);
  //       setEmailErrorMessage("Email is already registered.");
  //     }
  //   } catch (err) {
  //     console.error("Error checking email:", err);
  //     setErrors((prev) => ({ ...prev, email: false }));
  //     setIsEmailValid(false);
  //     setEmailErrorMessage("Something went wrong. Please try again.");
  //   }
  // };

  const handleSubmit = async () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const newErrors = {
      email: !email || !emailRegex.test(email),
    };

    setErrors(newErrors);

    if (newErrors.email) {
      setEmailErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      // call API for validation during submit
      const res = await dispatch(checkEmailIdApi({ email }));

      if (res?.success) {
        dispatch(setbuyerRequestData({ email }));
        nextStep(); // ✅ Only when email valid
      } else {
        setEmailErrorMessage("Email is already registered.");
      }
    } catch (err) {
      setEmailErrorMessage("Something went wrong. Please try again.");
    }
  };

  const handleCloseClick = () => {
    if (!userToken?.remember_tokens) {
      // Save current email to Redux before closing
      dispatch(setbuyerRequestData({ email }));
      setShowConfirmModal(true);
    } else {
      onClose();
    }
  };

  // Reset functionality
  useEffect(() => {
    if (resetTrigger) {
      setEmail("");
      setErrors({ email: false });
      setEmailErrorMessage("");
    }
  }, [resetTrigger]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={handleCloseClick}
          disabled={registerLoader}
        >
          &times;
        </button>

        <div className={styles.header}>
          {/* <h2>
            Welcome to{" "}
            <span className={styles.headingBlueText}>Localists.com</span>
          </h2> */}
          <img src={logo} className={styles.logo} alt="Localist Logo" />
        </div>
        {/* <div className={styles.welcomeTextContainer}>
          <p style={{ fontWeight: 700 }}>
            Get Free Quotes From Specialist {welcomModalTitle} In Minutes
          </p>
        </div> */}
        {/* <div>
          <p className={styles.info}>
            Answer A Few Quick Questions & We’ll Match You With The Best Local {welcomModalTitle} For Your Needs
          </p>
        </div> */}
        <div className={`${styles.info} ${styles.desktopInfoText}`}>
          <p>Answer A Few Quick Questions & We’ll Match You</p>
          <p>With The Best Local {welcomModalTitle}</p>
          <p>For Your Needs</p>
        </div>
        <div className={`${styles.info} ${styles.mobileInfoText}`}>
          <p>
            Answer A Few Quick Questions & We’ll Match You With The Best Local{" "}
            {welcomModalTitle} For Your Needs{" "}
          </p>
        </div>
        {/* <div className={styles.infoWrapper}>
          <input
            type="email"
            placeholder="Enter your email..."
            className={`${styles.input} ${
              errors.email ? styles.inputError : ""
            }`}
            value={email}
            onChange={handleEmailChange}
          />
         
          <button
            className={styles.nextButton}
            onClick={handleSubmit}
            disabled={searchServiceLoader}
          >
            {searchServiceLoader ? (
              <Spin
                indicator={<LoadingOutlined spin style={{ color: "white" }} />}
              />
            ) : (
              "Get Started"
            )}
          </button>
        </div> */}
        {/* <div style={{ maxWidth: "400px", margin: "auto" }}>
          {errors.email && (
            <span style={{ color: "red" }} className={styles.errorMessage}>
              {emailErrorMessage || "Please enter a valid email address."}
            </span>
          )}

          {!errors.email && emailErrorMessage && (
            <span style={{ color: "red" }} className={styles.errorMessage}>
              {emailErrorMessage}
            </span>
          )}
        </div> */}
        {/* <div className={styles.buttonContainer}>
          <button
            className={styles.nextButtonMobile}
            onClick={handleSubmit}
            disabled={searchServiceLoader}
          >
            {searchServiceLoader ? (
              <Spin
                indicator={<LoadingOutlined spin style={{ color: "white" }} />}
              />
            ) : (
              "Get Started"
            )}
          </button>
        </div> */}
        <div className={styles.buttonContainer}>
          <button className={styles.nextButtonMobile} onClick={nextStep}>
            Find {welcomModalButtonText}
            <img
              className={styles.arrow}
              src={fullRightArrow}
              alt="arrow"
            />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeEmailModal;
