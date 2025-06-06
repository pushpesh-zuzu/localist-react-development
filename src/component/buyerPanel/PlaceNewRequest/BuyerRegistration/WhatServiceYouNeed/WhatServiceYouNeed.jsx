import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./WhatServiceYouNeed.module.css";
import {
  searchService,
  setService,
} from "../../../../../store/FindJobs/findJobSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  questionAnswerData,
  setbuyerRequestData,
  setcitySerach,
} from "../../../../../store/Buyer/BuyerSlice";
import CheckIcon from "../../../../../assets/Icons/greenCheckBox.jpeg";

const WhatServiceYouNeed = ({
  nextStep,
  serviceId,
  serviceName,
  onClose,
  pincodes,
  setShowConfirmModal,
  postalCodeIsValidate,
}) => {
  const [input, setInput] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({ service: "", pincode: "" });
  const { userToken } = useSelector((state) => state.auth);
  const { searchServiceLoader, service, registerData } = useSelector(
    (state) => state.findJobs
  );
  const { citySerach } = useSelector((state) => state.buyer);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  console.log(serviceName, serviceId, "prem");
  //NSai
  const [postalCodeValidate, setPostalCodeValidate] = useState(false);
  useEffect(() => {
    setPostalCodeValidate(postalCodeIsValidate);
  }, [postalCodeIsValidate]);
  useEffect(() => {
    if (isDropdownOpen && input.trim() !== "" && input !== serviceName) {
      const delayDebounce = setTimeout(() => {
        dispatch(searchService({ search: input }));
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [input, dispatch, isDropdownOpen, serviceName]);
  console.log(citySerach, "cityName");
  // useEffect(() => {
  //   if (serviceName && serviceId) {
  //     setInput(serviceName);
  //     setSelectedService({ id: serviceId });
  //   }
  // }, [serviceName, serviceId]);
  useEffect(() => {
    if (serviceName && serviceId) {
      setInput(serviceName);
      setSelectedService({ id: serviceId });
    }

    if (pincodes) {
      setPincode(pincodes);
    }
  }, [serviceName, serviceId, pincodes]);
  const handleSelectService = useCallback(
    (item) => {
      // console.log(item?.name, "clicked");
      setInput(item.name);
      setSelectedService(item);
      setIsDropdownOpen(false);
      setErrors((prev) => ({ ...prev, service: "" }));
      setTimeout(() => dispatch(setService([])), 100);
    },
    [dispatch]
  );

  const handleContinue = useCallback(() => {
    let newErrors = { service: "", pincode: "" };

    if (!selectedService) {
      newErrors.service = "Please select a service!";
    }

    if (!pincode) {
      newErrors.pincode = "Pincode is required!";
    } else if (pincode.length < 6 || pincode.length > 30) {
      newErrors.pincode = "Pincode must be between 6 and 10 characters!";
    }

    setErrors(newErrors);

    if (!newErrors.service && !newErrors.pincode) {
      dispatch(
        setbuyerRequestData({
          service_id: selectedService.id || serviceId,
          postcode: pincode,
          city: citySerach,
        })
      );
      dispatch(
        questionAnswerData({ service_id: selectedService.id || serviceId })
      );
      nextStep();
    }
  }, [selectedService, pincode, dispatch, serviceId, citySerach, nextStep]);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initAutocomplete;
        document.body.appendChild(script);
      } else {
        initAutocomplete();
      }
    };

    const initAutocomplete = () => {
      if (!inputRef.current) return;

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"],
          componentRestrictions: { country: "IN" },
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.address_components) return;

        const postalCode = place.address_components.find((component) =>
          component.types.includes("postal_code")
        )?.long_name;

        const cityName = place.address_components.find((component) =>
          component.types.includes("locality")
        )?.long_name;
        const townName = place.address_components.find((component) =>
          component.types.includes("administrative_area_level_3")
        )?.long_name;

        const formattedAddress = place.formatted_address;
        // const townName = place.formatted_address
        if (postalCode) {
          setPostalCodeValidate(true);
          setPincode(postalCode);
          inputRef.current.value = postalCode;
          setErrors((prev) => ({ ...prev, pincode: "" }));
        }

        if (cityName) {
          setCity(cityName);
          dispatch(setcitySerach(cityName)); // <- set city state
        }

        if (!postalCode && !cityName) {
          alert("No address or PIN code found! Please try again.");
        }
      });
    };

    loadGoogleMapsScript();
  }, []);
  // useEffect(() => {
  //   loadGooglePlacesAutocomplete({
  //     inputRef,
  //     setPincode,
  //     setCity,
  //     setErrors,
  //     dispatch,
  //     setcitySerach,
  //   });
  // }, []);

  // const initAutocomplete = () => {
  //   if (!inputRef.current) return;

  //   const autocomplete = new window.google.maps.places.Autocomplete(
  //     inputRef.current,
  //     {
  //       types: ["geocode"],
  //       componentRestrictions: { country: "IN" },
  //     }
  //   );

  //   autocomplete.addListener("place_changed", () => {
  //     const place = autocomplete.getPlace();
  //     if (!place.address_components) return;

  //     const postalCode = place.address_components.find((component) =>
  //       component.types.includes("postal_code")
  //     )?.long_name;

  //     const formattedAddress = place.formatted_address;

  //     if (postalCode) {
  //       setPincode(postalCode);
  //       inputRef.current.value = postalCode;
  //       setErrors((prev) => ({ ...prev, pincode: "" }));
  //     }

  //     if (formattedAddress) {
  //       setCity(formattedAddress); // <- set city state
  //     }

  //     if (!postalCode && !formattedAddress) {
  //       alert("No address or PIN code found! Please try again.");
  //     }
  //   });
  // };

  const handlePincodeChange = (e) => {
    const value = e.target.value.slice(0, 10);
    setPincode(value);
    setPostalCodeValidate(false);
    setErrors((prev) => ({
      ...prev,
      pincode:
        value.length > 0 && (value.length < 6 || value.length > 10)
          ? "Pincode must be between 6 and 10 characters!"
          : "",
    }));
  };

  const handleCloseClick = () => {
    if (!userToken?.remember_tokens && !registerData?.remember_tokens) {
      setShowConfirmModal(true);
      dispatch(
        setbuyerRequestData({
          service_id: selectedService.id || serviceId,
          postcode: pincode,
          city: citySerach,
        })
      );
    } else {
      onClose();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.closeButton} onClick={handleCloseClick}>
        x
      </div>

      <h2 className={styles.title}>What service do you need?</h2>

      {/* Service Input */}
      <div className={styles.formGroup}>
        <label className={styles.label}>What service do you need?</label>
        <input
          type="text"
          placeholder="e.g. Personal Trainers, House Cleaning"
          className={`${styles.input} ${
            errors.service ? styles.errorBorder : ""
          }`}
          onChange={(e) => {
            setInput(e.target.value);
            setIsDropdownOpen(!!e.target.value);
            setSelectedService(null);
            setErrors((prev) => ({ ...prev, service: "" }));
          }}
          value={input}
        />
        {errors.service && <p className={styles.errorText}>{errors.service}</p>}

        {isDropdownOpen && service?.length > 0 && (
          <div className={styles.searchResults}>
            {searchServiceLoader ? (
              <Spin indicator={<LoadingOutlined spin />} />
            ) : (
              service.map((item) => (
                <p
                  key={item.id}
                  className={styles.searchItem}
                  onClick={() => handleSelectService(item)}
                >
                  {item.name}
                </p>
              ))
            )}
          </div>
        )}
      </div>

      {/* Pincode Input */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Where do you need it?</label>
        <input
          type="text"
          placeholder="Enter your ZIP code or town"
          className={`${styles.input} ${
            errors.pincode ? styles.errorBorder : ""
          }`}
          ref={inputRef}
          name="pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
        {postalCodeValidate && (
          <img src={CheckIcon} alt="Success" className={styles.checkIcon} />
        )}

        {errors.pincode && <p className={styles.errorText}>{errors.pincode}</p>}
      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default WhatServiceYouNeed;
