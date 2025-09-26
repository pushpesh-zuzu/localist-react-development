import styles from "./search.module.css";
import { SearchOutlined } from "@ant-design/icons";
import calloutArrow from "../../../assets/Images/callOutArrow.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  getPopularServiceList,
  searchService,
  // setSelectedServiceId,
  setService,
} from "../../../store/FindJobs/findJobSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  // generateSlug,
  showToast,
} from "../../../utils";
import {
  questionAnswerData,
  setbuyerRequestData,
  setBuyerStep,
  setcitySerach,
} from "../../../store/Buyer/BuyerSlice";
import BuyerRegistration from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";
import location from "../../../assets/Images/HowItWorks/locationImg.svg";
import { googleAPI } from "../../../Api/axiosInstance";

const SearchProfessionals = ({ nextStep }) => {
  const [Input, setInput] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPincodeFromDropdown, setIsPincodeFromDropdown] = useState(false);
  const [postalCodeValidate, setPostalCodeValidate] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPostcodeSelected, setIsPostcodeSelected] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { popularList, service, searchServiceLoader } = useSelector(
    (state) => state.findJobs
  );
  const [selectedServiceId, setSelectedServiceId] = useState({
    id: null,
    name: "",
  });
  const [show, setShow] = useState(false);
  const { userToken } = useSelector((state) => state.auth);
  const [placeholder, setPlaceholder] = useState("Search service... ");
  const divRef = useRef(null);

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth <= 768) {
        setPlaceholder("Search service...");
      } else {
        setPlaceholder("Search service... ");
      }
    };

    updatePlaceholder(); // call on first load
    window.addEventListener("resize", updatePlaceholder); // update on resize

    return () => window.removeEventListener("resize", updatePlaceholder); // cleanup
  }, []);
  const handleClose = () => {
    setShow(false);
    setInput("");
    setPincode("");
    setSelectedService("");
  };
  useEffect(() => {
    const checkPendingModal = () => {
      const pendingModal = JSON.parse(
        localStorage.getItem("pendingBuyerModal")
      );

      if (pendingModal?.shouldOpen) {
        setSelectedServiceId({
          id: pendingModal.serviceId,
          name: pendingModal.serviceName 
        });

        dispatch(setbuyerRequestData(pendingModal.buyerRequest));
        dispatch(setcitySerach(pendingModal.city));

        setShow(true);
        dispatch(setBuyerStep(7));
      }
    };

    checkPendingModal();
  }, [dispatch]);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (!popularList || popularList.length === 0)
    ) {
      dispatch(getPopularServiceList());
    }
    return () => {
      dispatch(setService([]));
    };
  }, []);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (isDropdownOpen && Input.trim() !== "") {
        dispatch(searchService({ search: Input }));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [Input, dispatch, isDropdownOpen]);
  const handleSelectService = useCallback(
    (item) => {
      setInput(item.name);
      setSelectedService(item);
      setIsDropdownOpen(false);
      setTimeout(() => dispatch(setService([])), 100);
    },
    [dispatch]
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the div
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setPincode(e.target.value);
    setPostalCodeValidate(false);
    setIsPostcodeSelected(false);
    setIsPincodeFromDropdown(false); // ❌ mark as invalid if typed
  };

  // --- GOOGLE AUTOCOMPLETE ---
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleAPI}&libraries=places`;
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
          componentRestrictions: { country: "UK" },
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.address_components) return;

        let postalCode = place.address_components.find((component) =>
          component.types.includes("postal_code")
        )?.long_name;

        let cityName =
          place.address_components.find((component) =>
            component.types.includes("postal_town")
          )?.long_name ||
          place.address_components.find((component) =>
            component.types.includes("administrative_area_level_2")
          )?.long_name;

        if (postalCode) {
          setPincode(postalCode);
          setPostalCodeValidate(true);
          setIsPincodeFromDropdown(true); // ✅ valid only when chosen
          inputRef.current.value = postalCode;
          setIsPostcodeSelected(true);
        } else {
          showToast("error", "No Postcode found! Please try again.");
          showToast("error", "No Postcode  found! Please try again.");
        }

        if (cityName) {
          setCity(cityName);
          dispatch(setcitySerach(cityName));
        }
      });
    };

    loadGoogleMapsScript();
  }, []);

  const DEBOUNCE_MS = 250;
  const debounceRef = useRef(null);
  // --- VALIDATION BEFORE CONTINUE ---
  const handleGetStarted = (requireValidationPin) => {
    if (!selectedService) {
      showToast("error", "Please select a service from the suggestions.");
      return;
    }

    if (!isPostcodeSelected && !!requireValidationPin) {
      showToast("error", "Please select a postcode from the suggestions.");
      return;
    }

    if (!pincode && !!requireValidationPin) {
      showToast("error", "Please enter a pincode");
      return;
    }
    if ((pincode.length < 5 || pincode.length > 8) && !!requireValidationPin) {
      showToast("error", "Pincode must be between 5 and 8 characters!");
      return;
    }

    if (!isPincodeFromDropdown && requireValidationPin) {
      showToast("error", "Please select postcodes from suggestions below");
      return;
    }

    if ((pincode.length < 5 || pincode.length > 8) && requireValidationPin) {
      showToast("error", "Postcode must be between 5 and 8 characters!");
      return;
    }

    if (!city && requireValidationPin) {
      showToast("error", "Please provide valid postcode!");
      return;
    }

    const { id, name } = selectedService;
    dispatch(questionAnswerData({ service_id: id }));
    setSelectedServiceId({ id, name });
    dispatch(
      setbuyerRequestData({
        postcode: pincode,
        service_id: id || "",
      })
    );
    setShow(true);
  };

  const triggerSearch = (value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const trimmed = value.trim();
      dispatch(
        searchService({ search: trimmed === "" ? "" : trimmed.slice(0, 4) })
      );
    }, DEBOUNCE_MS);
  };

  // console.log("home screen redered");

  return (
    <div className={styles.searchContainer}>
      <div className={styles.popularExamples}>
        <div className={styles.exampleBox} style={{ minWidth: "min-content" }}>
          <p className="xl:font-bold xl:text-[18px] xl:whitespace-nowrap xl:leading-[12px] xl:tracking-[0] xl:m-0 xl:mb-[20px] xl:text-[color:var(--primary-color)]">
            Popular examples:
          </p>
          <span className={styles.exampledescription}>
            Driveway Installation, Gardening Services, Web Design....
          </span>
        </div>
      </div>

      <div className={styles.calloutArrow}>
        <img src={calloutArrow} alt="calloutArrow" />
      </div>

      <div className={styles.container}>
        <h1 className={styles.heading}>
          Find Local
          <span className={styles.highlight}> Services</span>{" "}
          <span className={styles.heading}>- Fast</span>
        </h1>

        <h4 className={styles.subText}>
          Get fast quotes from local professionals
        </h4>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder={placeholder}
            className={`${styles.input} ${isFocused ? styles.inputFocus : ""}`}
            onFocus={() => {
              setIsFocused(true);
              setIsDropdownOpen(true); // open dropdown on focus
              // if field is empty on focus, load ALL services so dropdown isn't blank
              if (Input.trim() === "") {
                dispatch(searchService({ search: "" /*, serviceid*/ }));
              }
            }}
            onBlur={() => {
              setIsFocused(false);
              // optionally close dropdown here, or keep it open for clicks inside the list
              // setIsDropdownOpen(false);
            }}
            onChange={(e) => {
              if (userToken?.active_status === 1) {
                showToast("error", "Switch to buyer to place a new request.");
                return; // typing block
              }
              const value = e.target.value;
              setInput(value);
              setIsDropdownOpen(true); // keep dropdown open while typing/clearing
              setSelectedService(null); // your existing line
              triggerSearch(value); //  refresh dropdown results on every change
            }}
            value={Input}
          />

          <div className={styles.divider}></div>
          <div className={styles.locationWrapper}>
            {/* <EnvironmentOutlined /> */}
            <img src={location} alt="..." />
            <input
              type="text"
              placeholder="Postcode"
              className={styles.locationInput}
              ref={inputRef}
              name="postcode"
              value={pincode || ""}
              onChange={handleChange}
            />
          </div>
          <button
            className={styles.searchButton}
            onClick={() => {
              handleGetStarted(true);
            }}
          >
            Search
          </button>
          <button
            className={styles.searchButtonPhone}
            onClick={() => {
              handleGetStarted(false);
            }}
          >
            <SearchOutlined />
          </button>
        </div>
        {isDropdownOpen && service?.length > 0 && (
          <div className={styles.searchResults} ref={divRef}>
            {searchServiceLoader ? (
              <Spin indicator={<LoadingOutlined spin />} />
            ) : (
              <>
                {" "}
                {service?.map((item) => (
                  <p
                    key={item.id}
                    className={styles.searchItem}
                    onClick={() => handleSelectService(item)}
                  >
                    {item.name}
                  </p>
                ))}
              </>
            )}
          </div>
        )}
      </div>
      {show && (userToken?.active_status == 2 || !userToken) && (
        <>
          <BuyerRegistration
            closeModal={handleClose}
            service_Id={selectedServiceId?.id}
            service_Name={selectedServiceId.name}
            postcode={pincode}
            postalCodeValidate={postalCodeValidate}
            // city={city}
          />
        </>
      )}
    </div>
  );
};

export default SearchProfessionals;
