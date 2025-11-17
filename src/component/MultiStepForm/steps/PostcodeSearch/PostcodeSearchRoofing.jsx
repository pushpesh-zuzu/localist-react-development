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
import { useProgress } from "../../../../utils/useProgress";

const PostcodeSearchRoofing = ({
  onNext,
  title = "What is your postcode",
  prevStep,
  setPercetangForPost,
  titleHeading = "landscaping specialists",
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

  const showToast = (type, content) => message[type](content);

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

    if (value.length < 3) {
      setPostalCodeValidate(false);
      return;
    }

    setIsCheckingPostcode(true);

    try {
      const response = await dispatch(getCityName({ postcode: value }));
      const newResponse = response?.unwrap ? await response.unwrap() : response;

      if (newResponse?.data?.city) {
        const validPostcode = newResponse.data.postcode;
        setPostalCodeValidate(true);
        setCity(newResponse.data.city);
        dispatch(setcitySerach(newResponse.data.city));
        dispatch(setbuyerRequestData({ postal_code: validPostcode }));
        setError("");

        handleNext(true);
        setPercetangForPost(5);
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

  const handleNext = (isValid = postalCodeValidate) => {
    if (!isValid) {
      showToast("error", "Please enter a valid postcode.");
      return;
    }

    if (onNext) {
      onNext();
      setPercetangForPost(5);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleNext();
  };

  const handleBack = () => {
    prevStep();
  };

  return (
    <div>
      <h1 className={styles.headingH1}>
        Get quotes from verified {titleHeading} you can trust
      </h1>
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

export default PostcodeSearchRoofing;
