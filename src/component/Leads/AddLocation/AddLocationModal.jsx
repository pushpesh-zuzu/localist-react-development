import React, { useState } from "react";
import styles from "./AddLocationModal.module.css";
import DistanceIcon from "../../../assets/Icons/DistanceIcon.svg";
import TravelTimeIcon from "../../../assets/Icons/TravelTimeIcon.svg";
import DrawOnMapIcon from "../../../assets/Icons/DrawOnMapIcon.svg";
import NationwideIcon from "../../../assets/Icons/NationwideIcon.svg";

// import DistanceModal from "./DistanceModal";
import TravelTimeModal from "./TravelTimeModal";
// import DrawOnMapModal from "./DrawOnMapModal";
// import NationwideModal from "./NationwideModal";

const AddLocationModal = ({ open, onCancel }) => {
  const [selectedOption, setSelectedOption] = useState("");

  if (!open) return null;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleChildModalClose = () => {
    setSelectedOption("");
  };

  return (
    <>
      {/* Main Add Location Modal */}
      {!selectedOption && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <button className={styles.closeButton} onClick={onCancel}>
              &times;
            </button>

            <h2 className={styles.title}>Add a location</h2>
            <p className={styles.subtitle}>
              Choose how you want to set your location
            </p>

            <div className={styles.optionsContainer}>
              <div
                className={styles.option}
                onClick={() => handleOptionClick("distance")}
              >
                <img
                  src={DistanceIcon}
                  alt="Distance"
                  className={styles.icon}
                />
                <div className={styles.textContainer}>
                  <h3 className={styles.optionTitle}>Distance</h3>
                  <p className={styles.optionDescription}>
                    Enter a ZIP code or town and then choose how far from there
                    - as the crow flies.
                  </p>
                </div>
              </div>

              <div
                className={styles.option}
                onClick={() => handleOptionClick("travelTime")}
              >
                <img
                  src={TravelTimeIcon}
                  alt="Travel Time"
                  className={styles.icon}
                />
                <div className={styles.textContainer}>
                  <h3 className={styles.optionTitle}>Travel time</h3>
                  <p className={styles.optionDescription}>
                    Enter a ZIP code or town and tell us how long you want your
                    maximum drive to be.
                  </p>
                </div>
              </div>

              <div
                className={styles.option}
                onClick={() => handleOptionClick("drawOnMap")}
              >
                <img
                  src={DrawOnMapIcon}
                  alt="Draw on a Map"
                  className={styles.icon}
                />
                <div className={styles.textContainer}>
                  <h3 className={styles.optionTitle}>Draw on a map</h3>
                  <p className={styles.optionDescription}>
                    Draw your own specific area on the map.
                  </p>
                </div>
              </div>

              <div
                className={styles.option}
                onClick={() => handleOptionClick("nationwide")}
              >
                <img
                  src={NationwideIcon}
                  alt="Nationwide"
                  className={styles.icon}
                />
                <div className={styles.textContainer}>
                  <h3 className={styles.optionTitle}>Nationwide</h3>
                  <p className={styles.optionDescription}>
                    Choose the nationwide location if you provide services
                    across the whole country.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Child modals based on selected option */}
      {/* {selectedOption === "distance" && (
        <DistanceModal onClose={handleChildModalClose} />
      )} */}

      {selectedOption === "travelTime" && (
        <TravelTimeModal onClose={handleChildModalClose} />
      )}

      {/* {selectedOption === "drawOnMap" && (
        <DrawOnMapModal onClose={handleChildModalClose} />
      )} */}

      {/* {selectedOption === "nationwide" && (
        <NationwideModal onClose={handleChildModalClose} />
      )} */}
    </>
  );
};

export default AddLocationModal;
