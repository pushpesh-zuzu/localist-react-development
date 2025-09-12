import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./searchpostandbanner.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setcitySerach } from "../../../store/Buyer/BuyerSlice";
import BuyerRegistration from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";
import { message } from "antd";
import BuyerRegistrationLandingPage from "../BuyerRegistrationLandingPage/BuyerRegistrationLandingPage";

const SearchPostAndBanner = ({
  title = "",
  defaultService,
  isNeedS = false,
  cancelHeading,
  cancelPara,
  serviceId,
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { userToken } = useSelector((state) => state.auth);
  const [isStartWithQuestionModal, setIsStartWithQuestionModal] =
    useState(false);
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isPostcodeSelected, setIsPostcodeSelected] = useState(false);
  const [postalCodeValidate, setPostalCodeValidate] = useState(false);
  const [isPincodeFromDropdown, setIsPincodeFromDropdown] = useState(false);

  const showToast = (type, content) => message[type](content);

  const handleClose = () => {
    setShowModal(false);
    setPincode("");
    setIsPostcodeSelected(false);
    setIsStartWithQuestionModal(false);
  };
  useEffect(() => {
    setShowModal(true);
    setIsStartWithQuestionModal(true);
  }, []);

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

      const postalCode = place.address_components.find((c) =>
        c.types.includes("postal_code")
      )?.long_name;

      const cityName =
        place.address_components.find((c) => c.types.includes("locality"))
          ?.long_name ||
        place.address_components.find((c) =>
          c.types.includes("administrative_area_level_3")
        )?.long_name;

      if (postalCode) {
        setPincode(postalCode);
        inputRef.current.value = postalCode;
        setIsPostcodeSelected(true);
        setPostalCodeValidate(true);
        setIsPincodeFromDropdown(true);
      } else {
        showToast("error", "No PIN code found! Please try again.");
      }

      if (cityName) {
        setCity(cityName);
        dispatch(setcitySerach(cityName));
      }
    });
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB1I_cRCeZ13mKqYKhsO5e3aOMgxtD7Irw&libraries=places`;
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

  const handleContinue = () => {
    if (!pincode) {
      showToast("error", "Please enter a valid postcode or town.");
      return;
    }

    if (!isPostcodeSelected) {
      //  prevent manual typing
      showToast("error", "Please select a postcode from the suggestions.");
      return;
    }

    if (userToken?.active_status === 1) {
      showToast("error", "You are not a buyer.");
      return;
    }

    if (!isPincodeFromDropdown) {
      showToast("error", "Please select postcodes from suggestions below");
      return;
    }

    setShowModal(true);
  };

  return (
    <div className={styles.searchcontainer}>
      <h1 style={{ color: "white" }}>
        Compare{" "}
        <span className={styles.heading}>FREE QUOTES{isNeedS ? "s" : ""}</span>{" "}
        from local {title}!
      </h1>
      <div className={styles.searchBoxContainer} style={{ margin: "auto" }}>
        <div className={styles.searchInputContainer}>
          <input
            className={styles.searchInput}
            placeholder="Postcode"
            ref={inputRef}
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
              setIsPostcodeSelected(false);
              setPostalCodeValidate(false);
              setIsPincodeFromDropdown(false);
            }}
          />

          <button onClick={handleContinue}>Search</button>
          <div></div>
        </div>
      </div>

      {showModal && (userToken?.active_status === 2 || !userToken) && (
        <BuyerRegistrationLandingPage
          closeModal={handleClose}
          postcode={pincode}
          postalCodeValidate={postalCodeValidate}
          serviceName={defaultService}
          cancelHeading={cancelHeading}
          cancelPara={cancelPara}
          isStartWithQuestionModal={isStartWithQuestionModal}
          serviceId={serviceId}
        />
      )}
    </div>
  );
};

export default SearchPostAndBanner;
