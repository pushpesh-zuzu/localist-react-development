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
  getProgressPercentageAPI,
} from "../../../../store/Buyer/BuyerSlice";

const PostCodeSearchTreeSurgeon = ({
  onNext,
  title = "What is your postcode",
  prevStep,
  setBackButtonTriggered,
  setProgressPercentage,
  titleHeading='landscaping specialists',
  setSelectedOption
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

  // ✅ Initialize progress to 80% when component mounts
  // useEffect(() => {
  //   setProgressPercentage(75);
  // }, [setProgressPercentage]);

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
    if (!isValid) {
      showToast("error", "Please enter a valid postcode.");
      return;
    }

    // Set progress to 90% before moving to next step
    setProgressPercentage((pre)=>pre+10);
    if (onNext) {
      onNext();
      setBackButtonTriggered(false);
      setSelectedOption([])
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleNext();
  };

  const handleBack = async() => {
    prevStep();
    const lastQuestionsArray = buyerRequest.questions;

    // Check if array is not empty  
      const lastAnswer = lastQuestionsArray[lastQuestionsArray.length - 1].ans;
      setSelectedOption([lastAnswer])
       const updatedBuyerRequest = {
          ...buyerRequest,
          questions: [...buyerRequest.questions].slice(0, -1), // remove last
        };
    
        dispatch(setbuyerRequestData(updatedBuyerRequest));
    
        // ✅ Send updated questions to API for progress calculation
        try {
          const formData = new FormData();
          formData.append(
            "questions",
            JSON.stringify(updatedBuyerRequest.questions)
          );
          formData.append("service_id", updatedBuyerRequest.service_id);
          const response = await dispatch(getProgressPercentageAPI(formData));
            setProgressPercentage(response.percentage);
          
        } catch (err) {
          console.error("Error updating progress on back:", err);
        }
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

export default PostCodeSearchTreeSurgeon;
