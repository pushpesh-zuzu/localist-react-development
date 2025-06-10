import React, { useEffect, useState } from "react";
import styles from "./AddLocationModal.module.css";
import DistanceIcon from "../../../assets/Icons/DistanceIcon.svg";
import TravelTimeIcon from "../../../assets/Icons/TravelTimeIcon.svg";
import DrawOnMapIcon from "../../../assets/Icons/DrawOnMapIcon.svg";
import NationwideIcon from "../../../assets/Icons/NationwideIcon.svg";
import TravelTimeModal from "./TravelTimeModal";
import DrawOnMapModal from "./DrawOnMapModal";
import LocationModal from "../LocationModal";
import {
  addLocationLead,
  editLocationLead,
  getleadPreferencesList,
  getLocationLead,
} from "../../../store/LeadSetting/leadSettingSlice";
import { useDispatch, useSelector } from "react-redux";
import ServiceSelectionModal from "../LeadSettings/ServiceModal";

const AddLocationModal = ({
  open,
  onCancel,
  selectedServices,
  previousPostcode,
  setSelectedServices,
  setIsLocationModalOpen,
}) => {
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");
  // const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [editLocationId, setEditLocationId] = useState(null);
  const [locationType, setLocationType] = useState("");
  const { registerData } = useSelector((state) => state.findJobs);
  console.log(registerData, "registerData");
  const { getlocationData } = useSelector((state) => state.leadSetting);
  console.log(getlocationData,'getlocationData')
  const isNationWide = () => {
    if (getlocationData[0]?.nation_wide == 1) {
      return true;
    }
    let nationWideCount = 0;
    getlocationData?.forEach((item) => {
      if (item?.type === "Nationwide") {
        nationWideCount++;
      }
    });
    if (nationWideCount > 1) {
      return true;
    } else {
      return false;
    }
  };
  const [locationData, setLocationData] = useState({
    miles1: "1",
    postcode: "",
    // travel_time: "30 minutes",
    travel_time: "",
    // travel_by: "Driving",
    travel_by: "",
    coordinates: "",
  });
  const [isFromTravelTime, setIsFromTravelTime] = useState(false);
  useEffect(() => {
    setIsFromTravelTime(false);
  }, []);
  console.log(locationData, locationType, registerData, "locationData");
  const { userToken } = useSelector((state) => state.auth);
  console.log(isNextModalOpen, selectedOption, "isNextModalOpen");
  const dispatch = useDispatch();
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === "nationwide") {
      setLocationType("Nationwide");
      setIsNextModalOpen(true); // Open the service selection modal directly
      return; // Skip setting selectedOption
    }
    let type = "";
    if (option === "distance") type = "Distance";
    else if (option === "travelTime") type = "Travel Time";
    else if (option === "drawOnMap") type = "Draw on Map";
    // else if (option === "nationwide") type = "Nationwide";

    setLocationType(type);
  };
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };
console.log(locationType,"locationType")
  const handleConfirm = (data) => {
    const serviceIds = data.join(",");
    // const serviceIds = selectedServices.map((item) => item.id).join(",");
    
    const locationdata = {
      user_id: userToken?.remember_tokens,
      miles: locationType === "Nationwide" ? 0 : locationData.miles1 ?? 0,
      postcode: locationData.postcode ? locationData.postcode : "000000",

      // postcode: previousPostcode,
      city: locationData?.city ?? "",
      travel_time: locationData?.travel_time,
      travel_by: locationData?.travel_by,
      type: locationType,
      nation_wide:
        locationType === "Nationwide"
          ? 1
          // : isFromTravelTime
          // ? 0
          // : getlocationData[0]?.nation_wide
          // ? getlocationData[0]?.nation_wide
          : 0,
      service_id: serviceIds,
      // postcode_old: previousPostcode,
      postcode_old: locationData.postcode ? locationData.postcode : "000000",
      coordinates: locationData?.coordinates ?? "",
    };
     

    if (isEditingLocation && editLocationId) {
      dispatch(
        editLocationLead({ ...locationdata, location_id: editLocationId })
      ).then((result) => {
        if (result?.success) {
          const data = { user_id: userToken?.remember_tokens };
          dispatch(getLocationLead(data));
          dispatch(getleadPreferencesList(data));
          setIsEditingLocation(false);
          setSelectedOption(false);
          setIsLocationModalOpen(false);
          setEditLocationId(null);
          setLocationData({
            miles1: "1",
            postcode: "",
          });
          setSelectedServices([]);
        }
      });
    } else {
      dispatch(addLocationLead(locationdata)).then((result) => {
        if (result?.success) {
          const data = { user_id: userToken?.remember_tokens };
          dispatch(getLocationLead(data));
          dispatch(getleadPreferencesList(data));
          setSelectedOption(false);
          setLocationType("");
          setIsLocationModalOpen(false);
          setLocationData({
            miles1: "1",
            postcode: "",
          });
          // setSelectedServices([])
          setIsNextModalOpen(false);
        }
      });
    }
  };

  const handleNext = (data) => {
    if (data) {
      setIsFromTravelTime(true);
    }
    setSelectedOption("");
    setIsNextModalOpen(true);
  };

  if (!open) return null;
  console.log(open, selectedOption, "isLocationModalOpen123");
  const handleChildModalClose = () => {
    setSelectedOption("");
  };

  return (
    <>
      {!selectedOption && !isNextModalOpen && (
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

              {/* {registerData?.nationwide == 0 && !isNationWide() && ( */}
              {!isNationWide() && (
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
              )}
            </div>
          </div>
        </div>
      )}

      {/* Child modals based on selected option */}
      {selectedOption === "distance" && (
        <LocationModal
          onClose={handleChildModalClose}
          onChange={handleLocationChange}
          locationData={locationData}
          onNext={handleNext}
        />
      )}

      {selectedOption === "travelTime" && (
        <TravelTimeModal
          onClose={handleChildModalClose}
          onNext={handleNext}
          locationData={locationData}
          setLocationData={setLocationData}
        />
      )}

      {selectedOption === "drawOnMap" && (
        <DrawOnMapModal
          onClose={handleChildModalClose}
          onNext={handleNext}
          locationData={locationData}
          setLocationData={setLocationData}
        />
      )}

      {selectedOption === "nationwide" && (
        // <NationwideModal onClose={handleChildModalClose} />
        <></>
      )}

      {isNextModalOpen && (
        <ServiceSelectionModal
          isOpen={isNextModalOpen}
          onClose={() => {
            setIsLocationModalOpen(false);
            setIsNextModalOpen(false);
            setSelectedOption("");
          }}
          onConfirm={handleConfirm}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
        />
      )}
    </>
  );
};

export default AddLocationModal;
