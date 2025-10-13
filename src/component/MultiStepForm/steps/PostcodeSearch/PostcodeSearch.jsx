import { useEffect, useRef, useState } from "react";
import { message } from "antd";
import { googleAPI } from "../../../../Api/axiosInstance";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";
import styles from "./PostcodeSearch.module.css";
import location from "../../../../assets/Icons/location.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setbuyerRequestData,
  setcitySerach,
} from "../../../../store/Buyer/BuyerSlice";

const PostcodeSearch = ({
  onNext,
  title = "What is your postcode",
  prevStep,
  getProgressPercentage,
  backButtonTriggered,
  setBackButtonTriggered,
  returPercentage,
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const {
    buyerRequest,
    requestLoader,
    citySerach,
    questionanswerData,
    questionLoader,
    postal_code,
  } = useSelector((state) => state.buyer);
  const [pincode, setPincode] = useState(buyerRequest?.postal_code || "");
  const [city, setCity] = useState(citySerach);
  const [isPostcodeSelected, setIsPostcodeSelected] = useState(
    !!buyerRequest?.postal_code
  );
  const [postalCodeValidate, setPostalCodeValidate] = useState(
    !!buyerRequest?.postal_code
  );
  const [isPincodeFromDropdown, setIsPincodeFromDropdown] = useState(
    !!buyerRequest?.postal_code
  );
  const firstStepProgress = (2 / 3) * 100; // 66.66%
  const remainingProgressPerStep = (100 - firstStepProgress) / 2; // baki 2 steps ke liye ≈16.665%

  const showToast = (type, content) => message[type](content);

  // ✅ Initialize Google Autocomplete
  const initGoogleAutocomplete = () => {
    if (!inputRef.current || !window.google?.maps?.places?.Autocomplete) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode"],
        componentRestrictions: { country: "UK" },
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      let postalCode = place.address_components.find((c) =>
        c.types.includes("postal_code")
      )?.long_name;

      let cityName =
        place.address_components.find((c) => c.types.includes("locality"))
          ?.long_name ||
        place.address_components.find((c) => c.types.includes("postal_town"))
          ?.long_name ||
        place.address_components.find((c) =>
          c.types.includes("administrative_area_level_2")
        )?.long_name ||
        place.address_components.find((c) =>
          c.types.includes("administrative_area_level_3")
        )?.long_name;

      if (postalCode) {
        const isSamePostcode =
          buyerRequest?.postal_code?.toLowerCase() === postalCode.toLowerCase();
        onNext();
        getProgressPercentage(remainingProgressPerStep);
        setPincode(postalCode);
        setPostalCodeValidate(true);
        setIsPincodeFromDropdown(true);
        inputRef.current.value = postalCode;
        setIsPostcodeSelected(true);
        dispatch(setbuyerRequestData({ postal_code: postalCode }));
      } else if (isSamePostcode) {
        setTimeout(() => {
          onNext();
          setBackButtonTriggered(false);
        }, 200);
      } else {
        showToast("error", "No postal code found! Please try again.");
      }

      if (cityName) {
        setCity(cityName);
        dispatch(setcitySerach(cityName));
      }
    });
  };
  // useEffect(() => {
  //   !backButtonTriggered &&
  //     pincode &&
  //     postalCodeValidate &&
  //     setTimeout(() => {
  //       handleNext();
  //     }, 200);
  // }, [pincode]);

  // ✅ Load Google Maps Script
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleAPI}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initGoogleAutocomplete;
        document.body.appendChild(script);
      } else {
        initGoogleAutocomplete();
      }
    };
    loadGoogleMapsScript();
  }, []);

  // ✅ Handle Next Button
  const handleNext = () => {
    if (!pincode) {
      showToast("error", "Please enter a valid postcode.");
      return;
    }

    if (!isPostcodeSelected) {
      showToast("error", "Please select a postcode from the suggestions.");
      return;
    }

    if (!isPincodeFromDropdown) {
      showToast("error", "Please select postcode from the dropdown.");
      return;
    }
    getProgressPercentage(remainingProgressPerStep);
    dispatch(
      setbuyerRequestData({
        postal_code: pincode,
        city: city,
        postalCodeValidate,
      })
    );

    dispatch(setcitySerach(city));

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
        Get quotes from verified landscaping specialists you can trust
      </h1>
      <p className={styles.desciption}>
        Localists.com connects you with verified local experts quickly and
        easily.
      </p>
      <p className={styles.desciption2}>
        Simply answer a few questions about your requirements and get tailored
        quotes in seconds
      </p>

      <CardLayoutWrapper
        title={title}
        onButtonClick={handleNext}
        buttonText="Next"
        disableNextButton={!buyerRequest?.postal_code}
        showBackButton
        onBackClick={handleBack}
      >
        <p className={styles.subText}>
          This is to match you with the closest verified specialists
        </p>
        <div style={{ position: "relative" }}>
          <input
            className={styles.postcodeInput}
            placeholder="e.g: ch41 tlh"
            ref={inputRef}
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
              setIsPostcodeSelected(true);
              setPostalCodeValidate(false);
              setIsPincodeFromDropdown(false);
              dispatch(
                setbuyerRequestData({
                  postal_code: e.target.value,
                })
              );
            }}
            onKeyPress={handleKeyPress}
            onBlur={() => {
              // ✅ If same value as before and it was a valid postcode, move next
              if (
                pincode &&
                buyerRequest?.postal_code?.toLowerCase() ===
                  pincode.toLowerCase() &&
                postalCodeValidate &&
                !backButtonTriggered
              ) {
                setTimeout(() => {
                  onNext();
                  setBackButtonTriggered(false);
                  // getProgressPercentage(remainingProgressPerStep);
                }, 20);
              }
            }}
          />
          <img
            className={styles.locationicon}
            alt="location icon"
            src={location}
          />
        </div>
      </CardLayoutWrapper>
    </div>
  );
};

export default PostcodeSearch;
