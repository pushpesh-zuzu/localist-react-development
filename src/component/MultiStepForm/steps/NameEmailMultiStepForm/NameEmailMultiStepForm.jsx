import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NameEmailMultiStepForm.module.css";
import { checkEmailIdApi } from "../../../../store/FindJobs/findJobSlice";
import { setbuyerRequestData } from "../../../../store/Buyer/BuyerSlice";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";
import BackgroundWrapperNameEmailMultiForm from "../../BackgroundWrapperNameEmailMultiForm/BackgroundWrapperNameEmailMultiForm";
import LoaderWithTextMultiStepForm from "../../LoaderWithTextMultiStepForm/LoaderWithTextMultiStepForm";
import nameEmailBanner from "../nameEmailBanner.webp";
import CheckStartCircle from "../../../../assets/Icons/CheckStartCircle.png";
import { validateEmail } from "../../../../utils/validateEmail";
import { useEmailCheck } from "../../../../utils/emailExist";

const NameEmailMultiStepForm = ({ nextStep, isPPCPages = false, onBack }) => {
  const dispatch = useDispatch();
  const { searchServiceLoader } = useSelector((state) => state.findJobs);
  const { buyerRequest } = useSelector((state) => state.buyer);
  const [email, setEmail] = useState(buyerRequest?.email);
  const [name, setName] = useState(buyerRequest?.name);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isBannerText, setIsBannerText] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const { isEmailAvailable } = useEmailCheck(email);
  const [inputType, setInputType] = useState("text"); // Initially text to avoid email detection

  const [errors, setErrors] = useState({
    email: false,
    name: false,
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: false }));
     dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        email: e.target.value,
      })
    );
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prev) => ({ ...prev, name: false }));
    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        name: e.target.value,
      })
    );
  };

  const handleEmailFocus = () => {
    setInputType("email");
  };
  const handleEmailBlur = () => {
    if (!email) {
      setInputType("text");
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      email:
        !isPPCPages &&
        (!email || !validateEmail(email)),
      name: !name.trim(),
    };
    // !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)

    if (!isPPCPages && newErrors.email && !emailErrorMessage) {
      setEmailErrorMessage("Please enter a valid email address.");
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError) return;

    const finalEmail = isPPCPages ? buyerRequest?.email || "" : email;
    const res = await dispatch(checkEmailIdApi({ email }));
    if (res.success) {
      dispatch(setbuyerRequestData({ name, email: finalEmail }));
      nextStep();
    } else {
      return;
    }
  };

  const handleBackClick = () => {
    onBack();
  };
  const handleBannerText = () => {
    setIsBannerText(false);
  };

  useEffect(() => {
    console.log(isEmailAvailable, "sss");
    if (!isEmailAvailable) {
      setEmail("");
      dispatch(
        setbuyerRequestData({
          ...buyerRequest,
          name,
          email: "",
        })
      );
    }
  }, [isEmailAvailable]);
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
            {/* Hidden trap fields for auto-fill prevention */}
            <input
              type="text"
              name="username"
              style={{ display: "none", position: "absolute", left: "-9999px" }}
              autoComplete="new-password"
              tabIndex="-1"
            />
            <input
              type="password"
              name="password"
              style={{ display: "none", position: "absolute", left: "-9999px" }}
              autoComplete="new-password"
              tabIndex="-1"
            />

            {!isPPCPages && (
              <div style={{ marginBottom: "10px" }}>
                <input
                  type={inputType}
                  placeholder="Email"
                  className={`${styles.input} ${
                    errors?.email ? styles.inputError : ""
                  }`}
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                  autoComplete="new-password"
                  name="user_email_address"
                  id="user_email_address"
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
              autoComplete="new-password"
              name="user_full_name"
              id="user_full_name"
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

export default NameEmailMultiStepForm;
