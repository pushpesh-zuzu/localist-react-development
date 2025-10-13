import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NameEmailMultiStepForm.module.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { checkEmailIdApi } from "../../../../store/FindJobs/findJobSlice";
import { showToast } from "../../../../utils";
import {
  registerQuoteCustomer,
  setbuyerRequestData,
} from "../../../../store/Buyer/BuyerSlice";
import { useLocation } from "react-router";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";

const NameEmailMultiStepForm = ({
  nextStep,
  setEmails,
  resetTrigger,
  isPPCPages = false,
  onBack,
}) => {
  const dispatch = useDispatch();
  const { registerLoader, errorMessage, searchServiceLoader } = useSelector(
    (state) => state.findJobs
  );
  const { requestLoader, buyerRequest, citySerach } = useSelector(
    (state) => state.buyer
  );
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const campaignid = params.get("campaignid");
  const keyword = params.get("keyword");
  const gclid = params.get("gclid");
  const campaign = params.get("utm_campaign");
  const adGroup = params.get("AgId");
  const targetID = params.get("utm_term");
  const msclickid = params.get("utm_msclkid");
  const utm_source = params.get("utm_source");
  const { userToken } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(buyerRequest?.email);
  const [name, setName] = useState(buyerRequest?.name);

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [errors, setErrors] = useState({
    email: false,
    name: false,
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: false }));
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
  //       if (setEmails) setEmails("");
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

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prev) => ({ ...prev, name: false }));
  };

  const handleSubmit = async () => {
    const newErrors = {
      email:
        !isPPCPages &&
        (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)),
      name: !name.trim(),
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
    const res = await dispatch(checkEmailIdApi({ email }));
    // save user info in redux
    if (res.success) {
      dispatch(setbuyerRequestData({ name, email: finalEmail, phone: "" }));
      const updatedAnswers = buyerRequest?.questions || [];
      nextStep();
    } else {
      return;
    }
    // if (isStartWithQuestionModal) {
    //   const formData = new FormData();
    //   formData.append("name", name);
    //   formData.append("email", finalEmail);
    // //   formData.append("phone", 4567877777);
    //   formData.append("questions", JSON.stringify(updatedAnswers));
    //   formData.append("service_id", buyerRequest?.service_id || "");
    //   formData.append("city", citySerach || "");
    //   formData.append("postcode", buyerRequest?.postal_code || "");
    //   formData.append("campaignid", campaignid || "");
    //   formData.append("gclid", gclid || "");
    //   formData.append("campaign", campaign || "");
    //   formData.append("adgroup", adGroup || "");
    //   formData.append("targetid", targetID || "");
    //   formData.append("msclickid", msclickid || "");
    //   formData.append("utm_source", utm_source || "");
    //   formData.append("keyword", keyword || "");
    //   formData.append("form_status", 1);
    //   dispatch(registerQuoteCustomer(formData)).then((result) => {
    //     if (result) {
    //       nextStep(); // Yaha pe sirf nextStep call karo, final submission nahi
    //     }
    //   });
    // } else {
    //   nextStep(); // Normal flow mein bhi nextStep call karo
    // }
  };

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (resetTrigger) {
      setName("");
      setEmail("");
      setErrors(null);
    }
  }, [resetTrigger]);

  const handleBackClick = () => {
    onBack();
    const firstStepProgress = (2 / 3) * 100; // 66.66%
    const remainingProgressPerStep = (100 - firstStepProgress) / 2; // baki 2 steps ke liye ≈16.665%
    // getProgressPercentage(-remainingProgressPerStep);
  };

  return (
    <CardLayoutWrapper
      title="You're nearly done! Just drop in your few details to get your custom quotes."
      onButtonClick={handleSubmit}
      onBackClick={handleBackClick}
      buttonText="Next"
      showBackButton={true}
      disableNextButton={
        searchServiceLoader ||
        !name ||
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
      }
      loader={searchServiceLoader}
    >
      <div className={styles.infoWrapper}>
        {/* <label className={styles.label}>Full Name</label> */}
        <input
          style={{ marginTop: "5px" }}
          type="text"
          placeholder="Full Name"
          className={`${styles.input} ${errors?.name ? styles.inputError : ""}`}
          value={name}
          onChange={handleNameChange}
        />
        {errors?.name && (
          <span style={{ color: "red" }} className={styles.errorMessage}>
            Full name is required.
          </span>
        )}

        {!isPPCPages && (
          <>
            {/* <label htmlFor="email" className={styles.label}>
              Email
            </label> */}
            <input
              type="email"
              placeholder="Email"
              className={`${styles.input} ${
                errors?.email ? styles.inputError : ""
              }`}
              value={email}
              onChange={handleEmailChange}
              // onBlur={handleEmailBlur}
            />
            {errors?.email && (
              <span style={{ color: "red" }} className={styles.errorMessage}>
                Please enter a valid email address.
              </span>
            )}
          </>
        )}
        <p className={styles.subText}>
          We only use this to match you with trusted professionals.
        </p>
      </div>
    </CardLayoutWrapper>
  );
};

export default NameEmailMultiStepForm;
