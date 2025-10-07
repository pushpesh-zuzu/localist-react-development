import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import styles from "./WhatServiceDoYouNeedPage.module.css";
import {
  searchService,
  setService,
} from "../../../store/FindJobs/findJobSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  questionAnswerData,
  setbuyerRequestData,
  setcitySerach,
} from "../../../store/Buyer/BuyerSlice";
import CheckIcon from "../../../assets/Icons/greenCheckBox.jpeg";
import { showToast } from "../../../utils";
import { googleAPI } from "../../../Api/axiosInstance";
import { useLocation, useParams } from "react-router";
import { megaMenu } from "../../../constant/Megamenu";

function getNameFromSlug(slug, categoryList) {
  if (typeof slug !== "string" || !slug || !Array.isArray(categoryList)) {
    return null;
  }

  const match = categoryList.find((item) => item?.path === slug);
  return match ? match.name ?? null : null;
}

const WhatServiceDoYouNeedPage = ({
  nextStep,
  serviceId,
  serviceName,
  onClose,
  pincodes,
  setShowConfirmModal,
  postalCodeIsValidate,
  resetServiceTrigger,
  getService,
}) => {
  console.log(pincodes, "pincodes");

  const [input, setInput] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const { slug } = useParams();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({ service: "", pincode: "" });
  const { userToken } = useSelector((state) => state.auth);
  const { searchServiceLoader, service, registerData } = useSelector(
    (state) => state.findJobs
  );
  const { citySerach } = useSelector((state) => state.buyer);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [postalCodeValidate, setPostalCodeValidate] = useState(false);
  const [isPincodeFromDropdown, setIsPincodeFromDropdown] = useState(false);

  const nameValue = useMemo(() => {
    return getNameFromSlug(slug, megaMenu[0].subcategory);
  }, [slug]);
  const disableServiceField = !!nameValue;

  useEffect(() => {
    if (nameValue) {
      dispatch(searchService({ search: nameValue }));
    }
  }, [dispatch, nameValue]);

  useEffect(() => {
    if (nameValue && service?.length === 1) {
      setSelectedService(service[0]);
      setInput(service[0].name);
    }
  }, [nameValue, service]);

  useEffect(() => {
    setPostalCodeValidate(postalCodeIsValidate);
  }, [postalCodeIsValidate]);
  useEffect(() => {
    if (isDropdownOpen && input.trim() !== "" && input !== serviceName) {
      const delayDebounce = setTimeout(() => {
        dispatch(searchService({ search: input }));
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [input, dispatch, isDropdownOpen, serviceName]);

  // const location = useLocation();

  // // Split by "/" and get last part
  // const lastSegment = location.pathname.split("/").filter(Boolean).pop();

  // const cleaned = lastSegment.replace("_ppc", "");

  // useEffect(() => {
  //   if (cleaned) {
  //     setInput("Landscaping");
  //     // setSelectedService({ id: serviceId });
  //     dispatch(searchService({ search: "Landscaping" }));
  //   }
  // }, [cleaned]);

  // useEffect(() => {
  //   if (serviceName && serviceId) {
  //     setInput(serviceName);
  //     setSelectedService({ id: serviceId });
  //   }

  //   if (pincodes) {
  //     setPincode(pincodes);
  //   }
  // }, [serviceName, serviceId, pincodes]);
  // useEffect(() => {
  //   if (serviceName && !service) {
  //     setInput(serviceName);
  //     setIsDropdownOpen(true);
  //     dispatch(searchService({ search: serviceName }));
  //   }
  //   if (service?.length > 0) {
  //     const match = service.find(
  //       (s) => s.name.trim().toLowerCase() === input.trim().toLowerCase()
  //     );
  //     if (match) {
  //       setSelectedService(match);
  //       setIsDropdownOpen(false);
  //     } else {
  //       setSelectedService(null); // clear if no match
  //     }
  //   }
  // }, [serviceName, dispatch, service]);
  // ✅ Pre-fill from props
  useEffect(() => {
    if (serviceName) {
      setInput(serviceName);
      setIsDropdownOpen(true);
      dispatch(searchService({ search: serviceName })); // trigger API
    }

    if (pincodes) {
      setPincode(pincodes);
    }
  }, [serviceName, pincodes, dispatch]);

  useEffect(() => {
    if (pincodes && postalCodeIsValidate) {
      setPincode(pincodes);
      setPostalCodeValidate(true);
      setIsPincodeFromDropdown(true);
      setErrors((prev) => ({ ...prev, pincode: "" }));
    }
  }, [pincodes, postalCodeIsValidate]);

  // ✅ Sync when service list updates
  useEffect(() => {
    if (serviceName && service?.length > 0) {
      const match = service.find(
        (s) => s.name.trim().toLowerCase() === serviceName.trim().toLowerCase()
      );

      if (match) {
        setSelectedService(match);
        setIsDropdownOpen(false); // close dropdown after match
      } else {
        setSelectedService(null);
      }
    }
  }, [serviceName, service]);

  const handleSelectService = useCallback(
    (item) => {
      setInput(item.name);
      setSelectedService(item);
      setIsDropdownOpen(false);
      setErrors((prev) => ({ ...prev, service: "" }));
      setTimeout(() => dispatch(setService([])), 100);
    },
    [dispatch]
  );

  const handleContinue = useCallback(() => {
    let newErrors = { service: "", pincode: "" };

    if (!selectedService) {
      newErrors.service = "Please select a service!";
    }

    if (!pincode) {
      newErrors.pincode = "Postcode is required!";
    } else if (pincode.length < 5 || pincode.length > 8) {
      newErrors.pincode = "Postcode must be between  5 or 8 characters!";
    }

    if (!isPincodeFromDropdown) {
      showToast("error", "Please select postcodes from suggestions below");
      return;
    }

    setErrors(newErrors);

    if (!newErrors.service && !newErrors.pincode) {
      dispatch(
        setbuyerRequestData({
          service_id: selectedService?.id || serviceId,
          postcode: pincode,
          city: city,
        })
      );
      dispatch(
        questionAnswerData({
          service_id: selectedService.id || serviceId || service?.[0]?.id,
        })
      );
      nextStep();
      getService(selectedService);
    }
  }, [
    selectedService,
    pincode,
    dispatch,
    serviceId,
    city,
    nextStep,
    isPincodeFromDropdown,
  ]);

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

        const postalCode = place.address_components.find((component) =>
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
          setPostalCodeValidate(true);
          setPincode(postalCode);
          inputRef.current.value = postalCode;
          setErrors((prev) => ({ ...prev, pincode: "" }));
          setIsPincodeFromDropdown(true); // ✅ mark as selected from dropdown
        }

        if (cityName) {
          setCity(cityName);
          dispatch(setcitySerach(cityName));
        }

        if (!postalCode && !cityName) {
          showToast("error", "Please select Postcode from dropdown");
        }
      });
    };

    loadGoogleMapsScript();
  }, []);
  // useEffect(() => {
  //   loadGooglePlacesAutocomplete({
  //     inputRef,
  //     setPincode,
  //     setCity,
  //     setErrors,
  //     dispatch,
  //     setcitySerach,
  //   });
  // }, []);

  // const initAutocomplete = () => {
  //   if (!inputRef.current) return;

  //   const autocomplete = new window.google.maps.places.Autocomplete(
  //     inputRef.current,
  //     {
  //       types: ["geocode"],
  //       componentRestrictions: { country: "IN" },
  //     }
  //   );

  //   autocomplete.addListener("place_changed", () => {
  //     const place = autocomplete.getPlace();
  //     if (!place.address_components) return;

  //     const postalCode = place.address_components.find((component) =>
  //       component.types.includes("postal_code")
  //     )?.long_name;

  //     const formattedAddress = place.formatted_address;

  //     if (postalCode) {
  //       setPincode(postalCode);
  //       inputRef.current.value = postalCode;
  //       setErrors((prev) => ({ ...prev, pincode: "" }));
  //     }

  //     if (formattedAddress) {
  //       setCity(formattedAddress); // <- set city state
  //     }

  //     if (!postalCode && !formattedAddress) {
  //       alert("No address or PIN code found! Please try again.");
  //     }
  //   });
  // };
  useEffect(() => {
    if (resetServiceTrigger) {
      // Clear form values
      setSelectedService("");
      setPincode("");
      setCity("");
      setIsDropdownOpen("");
      setErrors(null);
      // setResetServiceFormTrigger(false);
    }
  }, [resetServiceTrigger]);
  const handlePincodeChange = (e) => {
    const value = e.target.value.slice(0, 10);
    setPincode(value);
    setPostalCodeValidate(false);
    setIsPincodeFromDropdown(false); // ❌ typing resets validation
    setErrors((prev) => ({
      ...prev,
      pincode:
        value.length > 0 && (value.length < 5 || value.length > 8)
          ? "Postcode must be between 5 and 8 characters!"
          : "",
    }));
  };

  const handleCloseClick = () => {
    if (!userToken?.remember_tokens && !registerData?.remember_tokens) {
      setShowConfirmModal(true);
      dispatch(
        setbuyerRequestData({
          service_id: selectedService.id || serviceId,
          postcode: pincode,
          city: citySerach,
        })
      );
    } else {
      setInput("");
      setSelectedService(null);
      setPincode("");
      setCity("");

      onClose(); // close modal
    }
  };

  return (
    <div className={styles.pageContainer} style={{ position: "relative" }}>
      {/* <div className={styles.closeButton} onClick={handleCloseClick}>
        &times;
      
      </div> */}

      <h2 className={styles.title}>What service do you need?</h2>

      {/* Service Input */}
      <div className={styles.formGroup}>
        <label className={styles.label}>What service do you need?</label>
        <input
          disabled={
            !(userToken?.remember_tokens || registerData?.remember_tokens)
          }
          type="text"
          placeholder="e.g. Personal Trainers, House Cleaning"
          className={`${styles.input} ${
            errors?.service ? styles?.errorBorder : ""
          }`}
          onChange={(e) => {
            setInput(e.target.value);
            setIsDropdownOpen(!!e.target.value);
            setSelectedService(null);
            setErrors((prev) => ({ ...prev, service: "" }));
          }}
          value={input}
        />
        {errors?.service && (
          <p className={styles.errorText}>{errors?.service || ""}</p>
        )}

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

      {/* Pincode Input */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Where do you need it?</label>
        <input
          type="text"
          placeholder="Enter your Postcode"
          className={`${styles.input} ${
            errors?.pincode ? styles.errorBorder : ""
          }`}
          ref={inputRef}
          name="pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
        {postalCodeValidate && (
          <img src={CheckIcon} alt="Success" className={styles.checkIcon} />
        )}

        {errors?.pincode ? (
          <p className={styles.errorText}>{errors?.pincode}</p>
        ) : (
          <p className={styles.errorTexts}>{"."}</p>
        )}
      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default WhatServiceDoYouNeedPage;
