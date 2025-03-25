import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./WhatServiceYouNeed.module.css";
import { getPopularServiceList, searchService, setService } from "../../../../../store/FindJobs/findJobSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { questionAnswerData } from "../../../../../store/Buyer/BuyerSlice";

const WhatServiceYouNeed = ({ nextStep }) => {
  const [input, setInput] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [pincode, setPincode] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { searchServiceLoader, service } = useSelector((state) => state.findJobs);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  // Search API call with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (isDropdownOpen && input.trim() !== "") {
        dispatch(searchService({ search: input }));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [input, dispatch, isDropdownOpen]);

  // Handle service selection
  const handleSelectService = useCallback((item) => {
    setInput(item.name);
    setSelectedService(item);
    setIsDropdownOpen(false);
    setTimeout(() => dispatch(setService([])), 100);
  }, [dispatch]);

  // Handle continue button click
  const handleContinue = useCallback(() => {
    if (!selectedService) return;
    dispatch(questionAnswerData({ service_id: selectedService.id }));
    nextStep();
  }, [selectedService, dispatch, nextStep]);

  // Load Google Maps script and initialize autocomplete
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

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"],
        componentRestrictions: { country: "IN" },
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.address_components) return;

        let postalCode = place.address_components.find((component) =>
          component.types.includes("postal_code")
        )?.long_name;

        if (postalCode) {
          setPincode(postalCode);
          inputRef.current.value = postalCode;
        } else {
          alert("No PIN code found! Please try again.");
        }
      });
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>What service do you need?</h2>

      {/* Service Selection Input */}
      <div className={styles.formGroup}>
        <label className={styles.label}>What service do you need?</label>
        <input
          type="text"
          placeholder="e.g. Personal Trainers, House Cleaning"
          className={styles.input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsDropdownOpen(!!e.target.value);
            setSelectedService(null);
          }}
          value={input}
        />

        {/* Dropdown for Service Suggestions */}
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
          className={styles.input}
          ref={inputRef}
          name="pincode"
          value={pincode || ""}
          onChange={(e) => setPincode(e.target.value)}
        />
      </div>

      {/* Continue Button */}
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleContinue} disabled={!selectedService}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default WhatServiceYouNeed;
