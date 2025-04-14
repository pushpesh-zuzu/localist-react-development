import React, { useEffect, useRef } from "react";
import { Modal, Button } from "antd";
import styles from "./LocationModal.module.css";
import { showToast } from "../../utils";
// import { useDispatch } from "react-redux";
// import { setFormData } from "../redux/actions"; // Adjust based on your app

const LocationModal = ({
  open,
  isEditing,
  locationData,
  onChange,
  onCancel,
  onNext,
}) => {
  const inputRef = useRef(null);
  // const dispatch = useDispatch(); // Only needed if you're using Redux here

  useEffect(() => {
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
        place.address_components.forEach((component) => {
          if (component.types.includes("postal_code")) {
            postalCode = component.long_name;
          }
        });

        if (postalCode) {
          // If using Redux:
          // dispatch(setFormData({ postcode: postalCode }));

          // If using local handler:
          onChange({ target: { name: "postcode", value: postalCode } });

          inputRef.current.value = postalCode;
        } else {
          showToast("No PIN code found! Please try again.");
        }
      });
    };

    loadGoogleMapsScript();
  }, [onChange]);

  return (
    <Modal
      title={isEditing ? "Edit Location" : "Add a New Location"}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="next" type="primary" onClick={onNext}>
          Next
        </Button>,
      ]}
    >
      <div className={styles.formGroup}>
        <div
          className={styles.inputGroup}
          style={{ display: "flex", gap: "10px" }}
        >
          <div style={{ flex: 1 }}>
            <span className={styles.fromText}>Miles</span>
            <select
              name="miles1"
              value={locationData.miles1}
              onChange={onChange}
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <span className={styles.fromText}>ZIP Code</span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter your postcode"
              name="postcode"
              value={locationData.postcode}
              onChange={onChange}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LocationModal;
