import { useEffect, useRef, useState } from "react";
import { message, Spin } from "antd";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";
import styles from "./PostcodeSearch.module.css";
import location from "../../../../assets/Icons/location.svg";
import CheckIcon from "../../../../assets/Icons/greenCheckBox.jpeg";
import { useDispatch, useSelector } from "react-redux";
import {
  setbuyerRequestData,
  setcitySerach,
  getCityName,
} from "../../../../store/Buyer/BuyerSlice";

const PostSearchMultiStepFence = ({
  onNext,
  title = "What is your postcode",
  prevStep,
  getProgressPercentage,
  backButtonTriggered,
  setBackButtonTriggered,
  returPercentage,
  titleHeading ='fencing companies '
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { buyerRequest, citySerach } = useSelector((state) => state.buyer);
  const [pincode, setPincode] = useState(buyerRequest?.postal_code || "");
  const [city, setCity] = useState(citySerach || "");
  const [postalCodeValidate, setPostalCodeValidate] = useState(
    !!buyerRequest?.postal_code
  );
  const [isCheckingPostcode, setIsCheckingPostcode] = useState(false);
  const [error, setError] = useState("");

  const firstStepProgress = (2 / 3) * 100; // 66.66%
  const remainingProgressPerStep = (100 - firstStepProgress) / 3; // ≈16.665%

  const showToast = (type, content) => message[type](content);

  // ✅ Handle postcode validation (onChange)
  const handlePincodeChange = async (e) => {
    const value = e.target.value.slice(0, 10);
    setPincode(value);
    setPostalCodeValidate(false);
    if (!value.trim()) {
      setError("");
      setCity("");
      setPostalCodeValidate(false);
      return;
    }
    // Don’t call API for short inputs
    if (value.length < 3) {
      setPostalCodeValidate(false);
      return;
    }

    setIsCheckingPostcode(true);

    try {
      const response =
        (await dispatch(getCityName({ postcode: value })).unwrap?.()) ??
        (await dispatch(getCityName({ postcode: value })));

      if (response?.data?.city) {
        const validPostcode = response.data.postcode;
        setPostalCodeValidate(true);
        setCity(response.data.city);
        dispatch(setcitySerach(response.data.city));
        dispatch(setbuyerRequestData({ postal_code: validPostcode }));
        setError("");

        // ✅ Automatically call Next when validation succeeds
        handleNext(true);
      } else {
        setPostalCodeValidate(false);
        setError("Please enter a valid postcode!");
      }
    } catch (error) {
      setPostalCodeValidate(false);
      setError("Please enter a valid postcode!");
    } finally {
      setIsCheckingPostcode(false);
    }
  };

  // ✅ Handle Next Button
  const handleNext = (isValid = postalCodeValidate) => {
    // if (!pincode) {
    //   showToast("error", "Please enter a valid postcode.");
    //   return;
    // }

    if (!isValid) {
      showToast("error", "Please enter a valid postcode.");
      return;
    }

    getProgressPercentage(remainingProgressPerStep);
    if (onNext) {
      onNext();
      setBackButtonTriggered(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleNext();
  };
  const handleBack = () => {
    getProgressPercentage(-returPercentage);

    prevStep();
  };
  return (
    <div>
      <h1 className={styles.headingH1}>
        Get quotes from verified {titleHeading} you can trust
      </h1>
      {/* <p className={styles.desciption}>
        Localists.com connects you with verified local experts quickly and
        easily.
      </p>
      <p className={styles.desciption2}>
        Simply answer a few questions about your requirements and get tailored
        quotes in seconds.
      </p> */}
      <div style={{ maxWidth: "592px", margin: "auto" }}>
        <CardLayoutWrapper
          title={title}
          onButtonClick={handleNext}
          buttonText="Next"
          disableNextButton={!postalCodeValidate}
          showBackButton
          onBackClick={handleBack}
          titlePrimary={true}
        >
          <p className={styles.subText}>
            This is to match you with the closest verified specialists
          </p>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              className={`${styles.postcodeInput} ${
                error ? styles.errorBorder : ""
              }`}
              placeholder="Enter Postcode (No Spaces)"
              ref={inputRef}
              value={pincode}
              onChange={handlePincodeChange}
              onKeyPress={handleKeyPress}
            />
            {isCheckingPostcode ? (
              <Spin
                className={styles.checkIcon}
                size="small"
                style={{ marginLeft: 10 }}
              />
            ) : postalCodeValidate ? (
              <img src={CheckIcon} alt="Success" className={styles.checkIcon} />
            ) : null}
            <img
              className={styles.locationicon}
              alt="location icon"
              src={location}
            />
          </div>
          {error && <p className={styles.errorText}>{error}</p>}
        </CardLayoutWrapper>
      </div>
    </div>
  );
};

export default PostSearchMultiStepFence;
