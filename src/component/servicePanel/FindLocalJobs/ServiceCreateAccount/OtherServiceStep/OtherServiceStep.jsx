import React, { useEffect, useRef, useState } from "react";
import styles from "./OtherServiceStep.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  pendingLeadData,
  registerUserData,
  searchService,
  setselectedServices,
  setService,
} from "../../../../../store/FindJobs/findJobSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "../../../../../utils";
import LocationIcon from "../../../../../assets/Images/HowItWorks/locationImg.svg";

const OtherServiceStep = ({ prevStep, handleInputChange, formData, setFormData }) => {
  const [Input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [randomFallback] = useState(() => Math.floor(Math.random() * (45 - 35 + 1)) + 35)
  const item = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [expandedRadius, setExpandedRadius] = useState(0)
  console.log(inputRef,'inputref')
  console.log(formData, "form");
  const {
    service,
    registerLoader,
    searchServiceLoader,
    selectedServices,
    pendingLead,
  } = useSelector((state) => state.findJobs);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (Input.trim() !== "") {
        dispatch(
          searchService({
            search: Input,
            serviceid: formData?.service_id.toString(),
          })
        );
      }
    }, 500);

    return () => {
      clearTimeout(delayDebounce);
      dispatch(setService([]));
    };
  }, [Input, dispatch]);
  const [newpost,setNewPost]=useState('')

  useEffect(() => {
    // Load Google Places API script dynamically
    const loadGoogleMapsScript = () => {
      // if (!window.google) {
        if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBIdwxC-hvTxiXdHvrqYEuCGvOvpEV-wNE&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initAutocomplete;
        document.body.appendChild(script);
      } else {
        initAutocomplete();
      }
    };

    // Initialize Google Autocomplete
    const initAutocomplete = () => {
      if (!inputRef.current) return;

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"],
          componentRestrictions: { country: "IN" }, // Restrict to India
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.address_components) return;
        console.log(place,'place')

        let postalCode = "";
        place.address_components.forEach((component) => {
          if (component.types.includes("postal_code")) {
            postalCode = component.long_name; // Extract postal code correctly
          }
        });
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
console.log(postalCode,lat,lng,'postalCode')
        if (postalCode) {
          // dispatch(setSelectedServiceFormData(postalCode));

          // ✅ Update Input Field with Selected Postal Code
          dispatch(setFormData({ postcode2: postalCode }));
            dispatch(setFormData({ coordinates2: { lat, lng } }))
          inputRef.current.value = postalCode; // Update input value
        } else {
          showToast("error", "No PIN code found! Please try again.");
        }
      });
    };

    loadGoogleMapsScript();
  }, [setFormData, formData]);
  const allScripts = document.getElementsByTagName("script");
  console.log(allScripts,'allScripts'); 
  const handleSelectService = (item) => {
    // Don't allow more than 2 services
    if (selectedServices?.length >= 2) {
      showToast("error", "No more services can be added");
      return;
    }
  
    // Don't add duplicate services
    if (!selectedServices?.some((service) => service.id === item.id)) {
      dispatch(setselectedServices([...selectedServices, item]));
    }
  
    setInput("");
    dispatch(setService([]));
  };
  

  const handleRemoveService = (id) => {
    dispatch(
      setselectedServices(
        selectedServices?.filter((service) => service.id !== id)
      )
    );
  };
  const validateForm = () => {
    let newErrors = {};

    if (!formData.miles2) {
      newErrors.miles2 = "Please select a distance range.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (selectedServices.length > 0) {
      setErrors((prev) => ({ ...prev, service_id: undefined }));
    }
  }, [selectedServices]);

  useEffect(() => {
    if (show) {
      window.scroll(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  const handleSubmit = () => {
    // Ensure selectedServices is an array and map IDs
    const serviceIds = Array.isArray(selectedServices)
      ? selectedServices?.map((service) => service.id).filter(Boolean) // Remove empty values
      : [];

    // Ensure formData.service_id is an array and clean it
    const existingServiceIds = Array.isArray(formData?.service_id)
      ? formData.service_id.filter(Boolean) // Remove empty values
      : [];

    // Merge both arrays and remove duplicates
    const combinedServiceIds = [
      ...new Set([...existingServiceIds, ...serviceIds]),
    ];

    // Convert array to a comma-separated string
    const serviceCategoryData = combinedServiceIds.join(", ");

    
    // Create final payload
    const payload = {
      ...formData,
      service_id: serviceCategoryData,
      form_status: 1,
      user_type: 1,
      active_status: 1,
      loggedUser: 1,
      nation_wide: formData.nation_wide ? 1 : 0,
      is_online: formData.is_online ? 1 : 0,
        miles2: selectedServices.length > 0 ? formData.miles2 : "",
  postcode2: selectedServices.length > 0 ? formData.postcode2 : "",
  expanded_radius: selectedServices.length > 0 ? formData.expanded_radius : "",
    };
    payload.coordinates=JSON.stringify(payload.coordinates)
    delete payload.password
    delete payload.suite
    delete payload.is_zipcode
    delete payload.state
    // delete payload.password
 console.log(payload,formData,"payload")

    dispatch(registerUserData(payload)).then((result) => {
      if (result?.success) {
        showToast("success", result?.message || "Register successful!");
        navigate("/leads");
        dispatch(setService());
      }
    });
  };

  const handleOpenModal = () => {
    if (!validateForm()) return;
    setShow(true);
  };
  const handleCloseModal = () => {
    setShow(false);
  };
  const [leadCount, setLeadCount] = useState(0);

  useEffect(() => {
    const selectedId = selectedServices.map(item => item.id)
    const serviceId = {
      service_id: [formData?.service_id[0], ...selectedId].join(","),
    };

    dispatch(pendingLeadData(serviceId));
  }, [selectedServices]);

const disableWithService = selectedServices?.length > 0;

const handleExpandRadius = () => {
  setExpandedRadius((prev) => {
    const newRadius = prev + 10;

    // Dispatch the new radius to Redux store
    dispatch(setFormData({ expanded_radius: newRadius }));

    return newRadius;
  });
};
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h2 className={styles.otherService_heading}>
            Add other services you can provide
          </h2>
          <p className={styles.subHeading}>Maximise your leads</p>
        </div>

        <div className={styles.card}>
          <p className={styles.label}>
            You've asked for leads for:{" "}
            <div className={styles.serviceTag}>
              {item?.serviceTitle
                ?.replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </div>
          </p>

          <p className={styles.secondaryLabel}>
            We will also show you leads from
          </p>
          <div className={styles.selectedServices}>
            {selectedServices?.length > 0 &&
              selectedServices?.map((service) => (
                <span key={service.id} className={styles.selectedTag}>
                  {service.name}
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemoveService(service.id)}
                  >
                    ✕
                  </button>
                </span>
              ))}
          </div>

          <div className={styles.searchInputContainer}>
            <input
              className={styles.searchInput}
              placeholder="Search for more services..."
              onChange={(e) => {
                setInput(e.target.value);
                if (!e.target.value) {
                  dispatch(setService([]));
                }
              }}
              value={Input}
            />

            {service?.length > 0 && (
              <div className={styles.searchResults}>
                {searchServiceLoader ? (
                  <Spin />
                ) : (
                  <>
                    {service.map((item) => (
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

          <label className={styles.checkboxContainer}>
            <input
              type="checkbox"
              className={styles.checkbox}
              name="auto_bid"
              checked={formData?.auto_bid === 1}
              onChange={(e) => handleInputChange(e)}
            />
            <span className={styles.labelText}>Auto Bid</span>
          </label>
          <div className={styles.milesBox}>
            <div className={styles.dropdownWrapper}>
              <select
                className={styles.dropdown}
                name="miles2"
                value={formData?.miles2}
                onChange={handleInputChange}
                disabled = {!disableWithService}
              >
                <option value="1">1 mile</option>
                <option value="2">2 miles</option>
                <option value="5">5 miles</option>
                <option value="10">10 miles</option>
                <option value="30">30 miles</option>
                <option value="50">50 miles</option>
                <option value="100">100 miles</option>
              </select>
            </div>
            <div className={styles.inputWrapper}>
              <img src={LocationIcon} alt="" />
              <input
                type="text"
                placeholder="Enter your postcode"
                className={`${styles.input} ${errors.postcode ? styles.errorBorder : ""
                  }`}
                ref={inputRef}
                name="postcode2"
                // value={formData.postcode ||''}
                value={formData.postcode2 || ""}
                onChange={handleInputChange ? handleInputChange : () => { }}
              disabled = {!disableWithService}
                // onChange={(e)=>setNewPost(e.target.value)}
              />
            

            </div>
          </div>
          {errors.miles2 && <p className={styles.errorText}>{errors.miles2}</p>}
          <div className={styles.radiusBtn}>
            <button className={styles.expandBtn} disabled={!disableWithService} onClick={handleExpandRadius}>Expand Radius</button>
          </div>
         {expandedRadius > 0 && (
  <div className={styles.radiusText}>{expandedRadius} miles added</div>
)}
          <div className={styles.leadInfo_wrapper}>
            <div className={styles.leadInfo}>
              <h1 className={styles.leadCount}>
                {pendingLead != 0  ? pendingLead : randomFallback}
              </h1>
              <p className={styles.leadText}>current available leads</p>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.backButton}
              onClick={prevStep}
            >
              Back
            </button>
            <button
              type="button"
              className={styles.nextButton}
              onClick={handleSubmit}
            >
              {registerLoader ? (
                <Spin
                  indicator={
                    <LoadingOutlined spin style={{ color: "white" }} />
                  }
                />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      </div>
      {show && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.heading}>
              Are you sure that you want <br /> to Register?
            </h2>

            <div className={styles.buttonGroup}>
              <button
                className={styles.backButton}
                onClick={handleCloseModal}
                disabled={registerLoader}
              >
                Back
              </button>
              <button className={styles.continueButton} onClick={handleSubmit}>
                {registerLoader ? (
                  <Spin
                    indicator={
                      <LoadingOutlined spin style={{ color: "white" }} />
                    }
                  />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherServiceStep;
