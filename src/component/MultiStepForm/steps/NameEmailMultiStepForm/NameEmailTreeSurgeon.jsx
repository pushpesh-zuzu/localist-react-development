import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NameEmailMultiStepForm.module.css";
import { checkEmailIdApi } from "../../../../store/FindJobs/findJobSlice";
import { setbuyerRequestData } from "../../../../store/Buyer/BuyerSlice";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";
import LoaderWithTextMultiStepForm from "../../LoaderWithTextMultiStepForm/LoaderWithTextMultiStepForm";
import nameEmailBanner from "../nameEmailBanner.webp";
import BackgroundWrapperNameEmailMultiForm from "../../BackgroundWrapperNameEmailMultiForm/BackgroundWrapperNameEmailMultiForm";
import CheckStartCircle from "../../../../assets/Icons/CheckStartCircle.png";
const NameEmailTreeSurgeon = ({
  nextStep,
  isPPCPages = false,
  onBack,
  setIsStepFrom4,
}) => {
  const dispatch = useDispatch();
  const { errorMessage, searchServiceLoader } = useSelector(
    (state) => state.findJobs
  );
  const { buyerRequest } = useSelector((state) => state.buyer);
  const [email, setEmail] = useState(buyerRequest?.email);
  const [name, setName] = useState(buyerRequest?.name);

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [errors, setErrors] = useState({
    email: false,
    name: false,
  });
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isBannerText, setIsBannerText] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: false }));
  };

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

    const finalEmail = isPPCPages ? buyerRequest?.email || "" : email;
    const res = await dispatch(checkEmailIdApi({ email }));
    if (res.success) {
      dispatch(setbuyerRequestData({ name, email: finalEmail }));
      nextStep();
    } else {
      return;
    }
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

  const handleBackClick = async () => {
    onBack();
    setIsStepFrom4(true);
  };
  const handleBannerText = () => {
    setIsBannerText(false);
  };
  return (
    <BackgroundWrapperNameEmailMultiForm backgroundImage={nameEmailBanner}>
      <CardLayoutWrapper
        title={
          isBannerText
            ? ""
            : `You're nearly done! Just enter a few details to get your custom quotes.`
        }
        onButtonClick={isBannerText ? handleBannerText : handleSubmit}
        onBackClick={handleBackClick}
        buttonText="Next"
        showBackButton={true}
        disableNextButton={searchServiceLoader || isInitialLoading}
        loader={searchServiceLoader}
        NameEmailContainer={true}
      >
        {isInitialLoading ? (
          <LoaderWithTextMultiStepForm
            setIsInitialLoading={setIsInitialLoading}
            setIsBannerText={setIsBannerText}
          />
        ) : isBannerText && !isInitialLoading ? (
          <div className={styles.bannerContainer}>
            <img
              className={styles.bannerImage}
              src={CheckStartCircle}
              alt="CheckIcon"
            />
            <h3 className={styles.bannerHeading}>
              Perfect! We’ve found you some great local matches
            </h3>
            <p className={styles.bannerPara}>
              One more thing, we need your details just to send you quotes only
            </p>
          </div>
        ) : (
          <div className={styles.infoWrapper}>
            {!isPPCPages && (
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="email"
                  placeholder="Email"
                  className={`${styles.input} ${
                    errors?.email ? styles.inputError : ""
                  }`}
                  value={email}
                  onChange={handleEmailChange}
                />
                {errors?.email && (
                  <span
                    style={{ color: "red" }}
                    className={styles.errorMessage}
                  >
                    Please enter a valid email address.
                  </span>
                )}
              </div>
            )}
            <input
              style={{ marginTop: "5px" }}
              type="text"
              placeholder="Full Name"
              className={`${styles.input} ${
                errors?.name ? styles.inputError : ""
              }`}
              value={name}
              onChange={handleNameChange}
            />
            {errors?.name && (
              <span style={{ color: "red" }} className={styles.errorMessage}>
                Full name is required.
              </span>
            )}

            <p className={styles.subText}>
              We only use this to match you with trusted professionals.
            </p>
          </div>
        )}
      </CardLayoutWrapper>
    </BackgroundWrapperNameEmailMultiForm>
  );
};

export default NameEmailTreeSurgeon;
