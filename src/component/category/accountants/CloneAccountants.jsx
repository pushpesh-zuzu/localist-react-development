import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./cloneaccountants.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularServiceList,
  searchService,
  setService,
} from "../../../store/FindJobs/findJobSlice";
import {
  questionAnswerData,
  setcitySerach,
} from "../../../store/Buyer/BuyerSlice";
import BuyerRegistration from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";
import { Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const CloneAccountants = ({
  header,
  title,
  panelImage,
  defaultServiceName = "",
}) => {
  console.log(panelImage);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [input, setInput] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { userToken } = useSelector((state) => state.auth);
  const { service, searchServiceLoader } = useSelector(
    (state) => state.findJobs
  );
  const showToast = (type, content) => message[type](content);
  useEffect(() => {
    if (defaultServiceName) {
      setInput(defaultServiceName);
      setIsDropdownOpen(false);
      dispatch(searchService({ search: defaultServiceName }));
    }
  }, [defaultServiceName, dispatch]);
  useEffect(() => {
    if (service?.length > 0) {
      const match = service.find(
        (s) => s.name.trim().toLowerCase() === input.trim().toLowerCase()
      );
      if (match) {
        setSelectedService(match);
        setIsDropdownOpen(false);
      } else {
        setSelectedService(null); // clear if no match
      }
    }
  }, [service, input]);

  const handleClose = () => {
    setShowModal(false);
    setInput("");
    setPincode("");
    setSelectedService(null);
  };

  useEffect(() => {
    dispatch(getPopularServiceList());
    return () => dispatch(setService([]));
  }, [dispatch]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (isDropdownOpen && input.trim()) {
        dispatch(searchService({ search: input }));
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [input, dispatch, isDropdownOpen]);

  const handleSelectService = useCallback(
    (item) => {
      setInput(item.name);
      setSelectedService(item);
      setIsDropdownOpen(false);
      setTimeout(() => dispatch(setService([])), 100);
    },
    [dispatch]
  );

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
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
    if (!selectedService) {
      showToast("error", "Please select a service from the suggestions.");
      return;
    }

    if (userToken?.active_status === 1) {
      showToast("error", "You are not a buyer.");
      return;
    }

    dispatch(questionAnswerData({ service_id: selectedService.id }));
    setShowModal(true);
  };

  const style = {
    backgroundImage: `url(${panelImage})`,
  };

  return (
    <div className={styles.container} style={style}>
      <div className={styles.overlay}>
        <div className={styles.headingContainer}>
          <h1 style={{ color: "white" }}>
            Looking for <span className={styles.blueText}>{header} </span>{" "}
            Professionals Near You?
          </h1>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.innerformContainer}>
            <h2>
              Do you need <span className={styles.blueText}> {title} </span>
              Professionals?
            </h2>
            <div className={styles.inputGroup}>
              <div className={styles.inputBox}>
                <label>What service do you require?</label>
                <input
                  type="text"
                  placeholder="Driveway Installation, Gardening Services, etc..."
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setIsDropdownOpen(!!e.target.value);
                    setSelectedService(null);
                  }}
                />
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

              <div className={styles.inputBox}>
                <label>Tell us where you need it</label>
                <input
                  type="text"
                  placeholder="Enter your postcode or town"
                  ref={inputRef}
                  name="postcode"
                  value={pincode}
                  onChange={handlePincodeChange}
                />
              </div>
            </div>
            <button className={styles.button} onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>

      {showModal && (userToken?.active_status === 2 || !userToken) && (
        <BuyerRegistration
          closeModal={handleClose}
          serviceId={selectedService?.id}
          serviceName={selectedService?.name}
          postcode={pincode}
        />
      )}
    </div>
  );
};

export default CloneAccountants;
