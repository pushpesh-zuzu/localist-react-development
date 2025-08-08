import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./findaccountant.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setcitySerach } from "../../../store/Buyer/BuyerSlice";
import BuyerRegistration from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";
import { message } from "antd";

const SearchAccountant = ({ title = "", panelImage }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { userToken } = useSelector((state) => state.auth);

  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [showModal, setShowModal] = useState(false);

  const showToast = (type, content) => message[type](content);

  const handleClose = () => {
    setShowModal(false);
    setPincode("");
  };

  const initGoogleAutocomplete = () => {
    if (!inputRef.current || !window.google?.maps?.places?.Autocomplete) return;

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
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCDR6sXvlQktXyC_0YsdiwlglSL2OkMSzY&libraries=places`;
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

    if (userToken?.active_status === 1) {
      showToast("error", "You are not a buyer.");
      return;
    }

    setShowModal(true);
  };

  return (
    <div className={styles.searchcontainer}>
      <h1 style={{ color: "white" }}>
        Looking for <span>{title}</span> Professionals Near Me?
      </h1>

      <div className={styles.searchBoxContainer}>
        <p>
          Where do you need <span>{title}s ?</span>
        </p>

        <div className={styles.searchInputContainer}>
          <input
            className={styles.searchInput}
            placeholder="Enter your postcode or town"
            ref={inputRef}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />

          <button onClick={handleContinue}>Go</button>
        </div>
      </div>

      {showModal && (userToken?.active_status === 2 || !userToken) && (
        <BuyerRegistration
          closeModal={handleClose}
          postcode={pincode}
          serviceName={title}
        />
      )}
    </div>
  );
};

export default SearchAccountant;
