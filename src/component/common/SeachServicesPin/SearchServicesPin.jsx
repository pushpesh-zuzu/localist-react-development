import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPopularServiceList, searchService, setService } from "../../../store/FindJobs/findJobSlice";
import { questionAnswerData, setcitySerach } from "../../../store/Buyer/BuyerSlice";
import { Spin } from "antd";
import BuyerRegistration from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";
import { LoadingOutlined } from "@ant-design/icons";
import { showToast } from "../../../utils";
import styles from './searchservices.module.css'
const SearchServicesPin = ({ 
  title = "Now you know how it works, start looking for a professional.",
  buttonText = "Continue",
  serviceLabel = "What service do you need?",
  servicePlaceholder = "Driveway Installation, Gardening Services, etc...",
  locationLabel = "Where do you need it?",
  locationPlaceholder = "Enter your postcode or town",
  className = "",
  onCustomContinue = null // Optional custom callback
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [input, setInput] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { userToken } = useSelector((state) => state.auth);
  const { service, searchServiceLoader } = useSelector(
    (state) => state.findJobs
  );

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

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"],
      componentRestrictions: { country: "UK" },
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      const postalCode = place.address_components.find((c) =>
        c.types.includes("postal_code")
      )?.long_name;

      const cityName =
        place.address_components.find((c) =>
          c.types.includes("locality")
        )?.long_name ||
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
    if (!selectedService) {
      showToast("error", "Please select a service from the suggestions.");
      return;
    }

    if (userToken?.active_status === 1) {
      showToast("error", "You are not a buyer.");
      return;
    }

    // If custom callback is provided, call it first
    if (onCustomContinue) {
      const shouldProceed = onCustomContinue({
        selectedService,
        pincode,
        city,
        input
      });
      
      // If custom callback returns false, don't proceed with default behavior
      if (shouldProceed === false) return;
    }

    dispatch(questionAnswerData({ service_id: selectedService.id }));
    setShowModal(true);
  };

  return (
    <>
      <div className={`${styles?.formContainer || ''} ${className}`}>
      <div className={styles?.innerformContainer || ''}>
       <h2 className={styles.titleContainer}>{title}</h2>
        <div className={styles?.inputGroup || ''}>
          <div className={styles?.inputBox || ''}>
            <label>{serviceLabel}</label>
            <input
              type="text"
              placeholder={servicePlaceholder}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setIsDropdownOpen(!!e.target.value);
                setSelectedService(null);
              }}
            />
            {isDropdownOpen && service?.length > 0 && (
              <div className={styles?.searchResults || ''}>
                {searchServiceLoader ? (
                  <Spin indicator={<LoadingOutlined spin />} />
                ) : (
                  service.map((item) => (
                    <p
                      key={item.id}
                      className={styles?.searchItem || ''}
                      onClick={() => handleSelectService(item)}
                    >
                      {item.name}
                    </p>
                  ))
                )}
              </div>
            )}
          </div>
          <div className={styles?.inputBox || ''}>
            <label>{locationLabel}</label>
            <input 
              type="text" 
              placeholder={locationPlaceholder}
              ref={inputRef}
              name="postcode"
              value={pincode}
              onChange={handlePincodeChange} 
            />
          </div>
        </div>
        <button 
          className={styles?.button || ''} 
          onClick={handleContinue}
        >
          {buttonText}
        </button>
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
    </>
  );
};

export default SearchServicesPin;