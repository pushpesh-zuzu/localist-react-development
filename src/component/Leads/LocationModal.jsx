import React, { useEffect, useRef } from "react";
import styles from "./LocationModal.module.css";
import { showToast } from "../../utils";
import iIcon from "../../assets/Images/iIcon.svg";

const LocationModal = ({
  open,
  isEditing,
  locationData,
  onChange,
  onCancel,
  onNext,
  onClose,
}) => {
  const inputRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places";
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

        let postalCode = "";
        let lat = place.geometry?.location?.lat();
        let lng = place.geometry?.location?.lng();

        place.address_components.forEach((component) => {
          if (component.types.includes("postal_code")) {
            postalCode = component.long_name;
          }
        });

        if (postalCode) {
          onChange({ target: { name: "postcode", value: postalCode } });
          inputRef.current.value = postalCode;

          if (mapRef.current && lat && lng) {
            const map = new window.google.maps.Map(mapRef.current, {
              center: { lat, lng },
              zoom: 12,
            });

            new window.google.maps.Marker({
              position: { lat, lng },
              map,
            });
          }
        } else {
          showToast("No PIN code found! Please try again.");
        }
      });
    };

    loadGoogleMapsScript();
  }, [open, onChange]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalHeader}>
          <h2>Distance</h2>
        </div>

        <div className={styles.infoBox}>
          <img src={iIcon} alt="" />
          <span>Enter a ZIP code or town and the distance around it.</span>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputField}>
            <label>ZIP Code / City</label>
            <input
              ref={inputRef}
              type="text"
              name="postcode"
              value={locationData.postcode}
              onChange={onChange}
              placeholder="Enter ZIP or City"
            />
          </div>
          <div className={styles.inputField}>
            <label>Distance</label>
            <select
              name="miles1"
              value={locationData.miles1}
              onChange={onChange}
            >
              <option value="1">1 mile</option>
              <option value="5">5 miles</option>
              <option value="10">10 miles</option>
              <option value="30">30 miles</option>
              <option value="50">50 miles</option>
              <option value="100">100 miles</option>
            </select>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.nextBtn} onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
