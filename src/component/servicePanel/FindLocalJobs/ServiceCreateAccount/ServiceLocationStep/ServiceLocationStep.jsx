import React, { useEffect, useRef, useState } from "react";
import styles from "./ServiceLocationStep.module.css";
import iIcon from "../../../../../assets/Images/iIcon.svg";
import LocationIcon from "../../../../../assets/Icons/LocationIcon.png";
import { setSelectedServiceFormData } from "../../../../../store/FindJobs/findJobSlice";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../../utils";

const ServiceLocationStep = ({
  nextStep,
  handleInputChange,
  formData,
  setFormData,
  errors,
}) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
console.log(inputRef,'inputref')
  useEffect(() => {
    // Load Google Places API script dynamically
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

    // Initialize Google Autocomplete
    const initAutocomplete = () => {
      if (!inputRef.current) return;

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"],
          componentRestrictions: { country: "IN" }, // Restrict to India
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.address_components) return;

        let postalCode = "";
        place.address_components.forEach((component) => {
          if (component.types.includes("postal_code")) {
            postalCode = component.long_name; // Extract postal code correctly
          }
        });
        

        if (postalCode) {
          // dispatch(setSelectedServiceFormData(postalCode));

          // ✅ Update Input Field with Selected Postal Code
          dispatch(setFormData({ postcode: postalCode }));
          inputRef.current.value = postalCode; // Update input value
        } else {
          showToast("error", "No PIN code found! Please try again.");
        }
      });
    };

    loadGoogleMapsScript();
  }, [setFormData, formData]);

  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Where would you like to see leads from?
        </h2>
        <p className={styles.subheading}>
          Tell us the area you cover so we can show you leads for your location
        </p>

        <div className={styles.card}>
          <p className={styles.formHeading}>I serve customers within</p>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <span className={styles.fromText}>Miles</span>
              <select
                className={`${styles.dropdown} ${
                  errors.miles1 ? styles.errorBorder : ""
                }`}
                name="miles1"
                value={formData.miles1 || ""}
                onChange={handleInputChange}
              >
               <option value="1">1 mile</option>
  <option value="2">2 miles</option>
  <option value="5">5 miles</option>
  <option value="10">10 miles</option>
  <option value="30">30 miles</option>
  <option value="50">50 miles</option>
  <option value="100">100 miles</option>
              </select>
              {errors.miles1 && (
                <p className={styles.errorText}>{errors.miles1}</p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <span className={styles.fromText}>From</span>
              <img src={LocationIcon} alt="" />
              <input
                type="text"
                placeholder="Enter your postcode"
                className={`${styles.input} ${
                  errors.postcode ? styles.errorBorder : ""
                }`}
                ref={inputRef}
                name="postcode"
                value={formData.postcode || ""}
                onChange={handleInputChange ? handleInputChange : () => {}}
              />
              {errors.postcode && (
                <p className={styles.errorText}>{errors.postcode}</p>
              )}
            </div>
          </div>
          <div className={styles.nationwideFooter}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="nation_wide"
              checked={formData?.nation_wide === 1}
              onChange={handleInputChange}
              className={styles.checkboxInput}
            />
            <span className={styles.checkboxCustom}></span> Nationwide
           
          </label>
          <div className={styles.switchWrapper}>
    <label className={styles.switch}>
      <input
        type="checkbox"
        name="is_online"
        checked={formData?.is_online === 1}
        onChange={handleInputChange}
      />
      <span className={styles.slider}></span>
    </label>
    <span className={styles.switchLabel}>Online/Remote Lead</span>
  </div>
  <div></div>
          </div>
          <div className={styles.footer}>
            <p className={styles.infoText}>
              <img src={iIcon} alt="" /> You can change your location at any
              time
            </p>
            <button className={styles.nextButton} onClick={nextStep}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceLocationStep;
