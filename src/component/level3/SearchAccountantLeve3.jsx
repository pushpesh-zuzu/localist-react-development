import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./searchAccountantLevel3.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setbuyerRequestData,
  setcitySerach,
} from "../../store/Buyer/BuyerSlice";
import BuyerRegistration from "../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";
import { message } from "antd";

const SearchAccountantLeve3 = ({
  title = "",
  defaultService,
  isNeedS = false,
  isSingular = false,
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { userToken } = useSelector((state) => state.auth);

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
  };

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

      // let cityName =
      //   place.address_components.find((c) => c.types.includes("locality"))
      //     ?.long_name ||
      //   place.address_components.find((c) =>
      //     c.types.includes("administrative_area_level_3")
      //   )?.long_name;

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

      // console.log("place full object:", place);
      // console.log("PostalCode:", postalCode);
      // console.log("City:", cityName);

      if (postalCode) {
        // console.log(postalCode, "postalCode");

        setPincode(postalCode);
        setPostalCodeValidate(true);
        setIsPincodeFromDropdown(true);
        inputRef.current.value = postalCode;
        setIsPostcodeSelected(true);
      } else {
        showToast("error", "No PIN code found! Please try again.");
      }

      if (cityName) {
        setCity(cityName);
        dispatch(setcitySerach(cityName));
        // console.log(cityName, "cityName");
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

  // console.log(pincode, "pincode");

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

    if (!isPincodeFromDropdown) {
      showToast("error", "Please select postcodes from suggestions below");
      return;
    }

    if (userToken?.active_status === 1) {
      showToast("error", "You are not a buyer.");
      return;
    }

    setShowModal(true);
    dispatch(
      setbuyerRequestData({
        postcode: pincode,
      })
    );
  };

  return (
    <div className={styles.searchcontainer}>
      <h1 style={{ color: "white" }}>
        Find {isSingular ? "a " : ""}
        <span className={styles.heading}>
          {title}
          {isNeedS ? "s" : ""}
        </span>{" "}
        Near You
      </h1>
      <div className={styles.searchBoxContainer} style={{ margin: "auto" }}>
        <p>
          {/* Where do you need <span>{title}s</span>? */}
          Tell us where you need it?
        </p>

        <div className={styles.searchInputContainer}>
          <input
            className={styles.searchInput}
            placeholder="Enter your postcode"
            ref={inputRef}
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
              setIsPostcodeSelected(true);
              setPostalCodeValidate(false);
              setIsPincodeFromDropdown(false);
            }}
          />

          <button onClick={handleContinue}>Go</button>
        </div>
      </div>

      {showModal && (userToken?.active_status === 2 || !userToken) && (
        <BuyerRegistration
          closeModal={handleClose}
          postcode={pincode}
          serviceName={defaultService}
          postalCodeValidate={postalCodeValidate}
          city={city}
        />
      )}
    </div>
  );
};

export default SearchAccountantLeve3;
