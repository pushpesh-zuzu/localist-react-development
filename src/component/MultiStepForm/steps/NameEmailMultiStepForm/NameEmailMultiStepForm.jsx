import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./NameEmailMultiStepForm.module.css";
import { checkEmailIdApi } from "../../../../store/FindJobs/findJobSlice";
import { setbuyerRequestData } from "../../../../store/Buyer/BuyerSlice";
import { useLocation } from "react-router";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";
import { extractAllParams } from "../../../../utils/decodeURLParams";

const NameEmailMultiStepForm = ({
  nextStep,
  setEmails,
  resetTrigger,
  isPPCPages = false,
  onBack,
}) => {
  const dispatch = useDispatch();
  const { errorMessage, searchServiceLoader } = useSelector(
    (state) => state.findJobs
  );
  const { buyerRequest } = useSelector((state) => state.buyer);
  const { search } = useLocation();
  const allParams = extractAllParams(search || window.location.search);

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
      dispatch(setbuyerRequestData({ name, email: finalEmail }));
      const updatedAnswers = buyerRequest?.questions || [];
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

  useEffect(() => {
    if (resetTrigger) {
      setName("");
      setEmail("");
      setErrors(null);
    }
  }, [resetTrigger]);

  const handleBackClick = () => {
    onBack();
    const firstStepProgress = (2 / 3) * 100;
    const remainingProgressPerStep = (100 - firstStepProgress) / 2;
  };

  return (
    <CardLayoutWrapper
      title="You're nearly done! Just enter a few details to get your custom quotes."
      onButtonClick={handleSubmit}
      onBackClick={handleBackClick}
      buttonText="Next"
      showBackButton={true}
      disableNextButton={searchServiceLoader}
      loader={searchServiceLoader}
    >
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
              <span style={{ color: "red" }} className={styles.errorMessage}>
                Please enter a valid email address.
              </span>
            )}
          </div>
        )}
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

        <p className={styles.subText}>
          We only use this to match you with trusted professionals.
        </p>
      </div>
    </CardLayoutWrapper>
  );
};

export default NameEmailMultiStepForm;
