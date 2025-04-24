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
} from "../../../../../store/Buyer/BuyerSlice";

const WhatServiceYouNeed = ({
  nextStep,
  serviceId,
  serviceName,
  onClose,
  pincodes,
  setShowConfirmModal,
}) => {
  const [input, setInput] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [pincode, setPincode] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({ service: "", pincode: "" });

  const { searchServiceLoader, service } = useSelector(
    (state) => state.findJobs
  );
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  console.log(serviceName, serviceId, "prem");

  useEffect(() => {
    if (isDropdownOpen && input.trim() !== "" && input !== serviceName) {
      const delayDebounce = setTimeout(() => {
        dispatch(searchService({ search: input }));
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [input, dispatch, isDropdownOpen, serviceName]);

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
    } else if (pincode.length < 6 || pincode.length > 10) {
      newErrors.pincode = "Pincode must be between 6 and 10 characters!";
    }

    setErrors(newErrors);

    if (!newErrors.service && !newErrors.pincode) {
      dispatch(
        setbuyerRequestData({
          service_id: selectedService.id || serviceId,
          postcode: pincode,
        })
      );
      dispatch(
        questionAnswerData({ service_id: selectedService.id || serviceId })
      );
      nextStep();
    }
  }, [selectedService, pincode, dispatch, serviceId, nextStep]);

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

        let postalCode = place.address_components.find((component) =>
          component.types.includes("postal_code")
        )?.long_name;

        if (postalCode) {
          setPincode(postalCode);
          setErrors((prev) => ({ ...prev, pincode: "" }));
          inputRef.current.value = postalCode;
        } else {
          alert("No PIN code found! Please try again.");
        }
      });
    };

    loadGoogleMapsScript();
  }, []);

  const handlePincodeChange = (e) => {
    const value = e.target.value.slice(0, 10);
    setPincode(value);

    setErrors((prev) => ({
      ...prev,
      pincode:
        value.length > 0 && (value.length < 6 || value.length > 10)
          ? "Pincode must be between 6 and 10 characters!"
          : "",
    }));
  };

  const handleCloseClick = () => {
    setShowConfirmModal(true);
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
