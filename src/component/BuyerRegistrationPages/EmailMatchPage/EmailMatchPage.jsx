import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./EmailMatchPage.module.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { checkEmailIdApi } from "../../../store/FindJobs/findJobSlice";
import { showToast } from "../../../utils";
import {
  registerQuoteCustomer,
  setbuyerRequestData,
} from "../../../store/Buyer/BuyerSlice";
import { useLocation } from "react-router";
import useUserInfo from "../../../utils/getUserIp";
import { validateEmail } from "../../../utils/validateEmail";
import { useEmailCheck } from "../../../utils/emailExist";

const EmailMatchPage = ({
  nextStep,
  setEmails,
  resetTrigger,
  isStartWithQuestionModal,
  isPPCPages = false,
}) => {
  const dispatch = useDispatch();
  const { registerLoader, buyerRegisterFormData, errorMessage } = useSelector(
    (state) => state.findJobs
  );
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const { ip, url } = useUserInfo();

  const campaignid = params.get("campaignid");
  const keyword = params.get("keyword");
  const gclid = params.get("gclid");
  const campaign = params.get("utm_campaign");
  const adGroup = params.get("AgId");
  const targetID = params.get("utm_term");
  const msclickid = params.get("utm_msclkid");
  const utm_source = params.get("utm_source");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const { isEmailAvailable } = useEmailCheck(email);

  const [errors, setErrors] = useState({
    email: false,
    name: false,
    phone: false,
  });
  const { requestLoader, buyerRequest, citySerach } = useSelector(
    (state) => state.buyer
  );
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
        (!email ||
          !validateEmail(email)),
      name: !name.trim(),
      phone: !phone || !/^\d{10}$/.test(phone),
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
      formData.append("entry_url", url);
      formData.append("user_ip_address ", ip);

      dispatch(registerQuoteCustomer(formData)).then((result) => {
        if (result) {
          nextStep();
        }
      });
    } else {
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
      setName("");
      setPhone("");
      setEmail("");
      setErrors(null);
      setResetEmailFormTrigger(false);
    }
  }, [resetTrigger]);

  useEffect(() => {
    console.log(isEmailAvailable, "sss");
    if (!isEmailAvailable) {
      setEmail("");
      dispatch(
        setbuyerRequestData({
          ...buyerRequest,
          name,
          email: "",
          phone,
        })
      );
    }
  }, [isEmailAvailable]);
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.emailPage} onClick={(e) => e.stopPropagation()}>
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

        <div className={styles.infoWrapper}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Your Name"
            autoComplete="name"
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
                autoComplete="email"
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
              autoComplete="phone"
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

export default EmailMatchPage;
