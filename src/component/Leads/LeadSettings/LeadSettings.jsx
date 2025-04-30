import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./LeadSettings.module.css";
import BlackRightArrow from "../../../assets/Images/Leads/BlackRightArrow.svg";
import WhiteRightArrow from "../../../assets/Images/Leads/WhiteRightArrow.svg";
import EditIcon from "../../../assets/Images/Leads/EditIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addLocationLead,
  addServiceLead,
  editLocationLead,
  getleadPreferencesList,
  getLocationLead,
  getSevenWeekBidApi,
  isOnlineRemote,
  leadPreferences,
  removeItemLocationData,
} from "../../../store/LeadSetting/leadSettingSlice";
import { Spin } from "antd";
import {
  searchService,
  setService,
} from "../../../store/FindJobs/findJobSlice";
import { useNavigate } from "react-router-dom";
import RemoveServiceModal from "../RemoveModal";
import ServiceSelectionModal from "./ServiceModal";
import { showToast } from "../../../utils";
import LocationModal from "../LocationModal";
import AddServiceModal from "../LeadAddServiceModal";
import AddLocationModal from "../AddLocation/AddLocationModal";

const LeadSettings = ({ setSelectedService, selectedService }) => {
  const serviceRefs = useRef({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [selectValue, setSelectValue] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [editLocationId, setEditLocationId] = useState(null);
  const [is_online, setIsOnline] = useState(false);
  const [autobid_pause, setAutoBid] = useState(false);
  // const [pincode, setPincode] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    preferenceList,
    serviceLoader,
    getlocationData,
    removeLocationLoader,
  } = useSelector((state) => state.leadSetting);
  const { userToken } = useSelector((state) => state.auth);

  const [isMobileView, setIsMobileView] = useState(false);
  const { searchServiceLoader, service, registerData } = useSelector(
    (state) => state.findJobs
  );
  const ids = preferenceList?.map((item) => item.id);
  const locationRemoveId = getlocationData?.map(
    (item) => item?.user_service_id
  );
  const postCodeData = getlocationData?.map((item) => item?.postcode);
  console.log(getlocationData, "selectedService");
  const [locationData, setLocationData] = useState({
    miles1: "1",
    postcode: "",
  });

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };
  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 768); // can be adjusted as needed
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Fetch preferences
  useEffect(() => {
    if (userToken?.active_status == 1) {
      const data = {
        user_id: userToken?.remember_tokens,
      };
      dispatch(getleadPreferencesList(data));
    } else {
      const data = {
        user_id: registerData?.remember_tokens,
      };
      dispatch(getleadPreferencesList(data));
    }
  }, []);
  useEffect(() => {
    if (userToken?.active_status == 1) {
      const data = {
        user_id: userToken?.remember_tokens,
      };
      dispatch(getLocationLead(data));
    } else {
      const locationData = {
        user_id: registerData?.remember_tokens,
      };
      dispatch(getLocationLead(locationData));
    }
  }, []);
  const handleView = () => {
    navigate("/leads");
  };

  const handleServiceClick = (service, name) => {
    setSelectedService({
      name: name,
      id: service,
    });

    const questionData = {
      service_id: service,
      user_id: userToken?.remember_tokens,
    };
    dispatch(leadPreferences(questionData));
  };

  //  Don't render if service is selected on mobile/tablet

  const handleService = () => {
    setIsModalOpen(true);
    setInput(""); // reset the input field
    setSelectedService(null); // clear previously selected service
    dispatch(setService([]));
  };
  useEffect(() => {
    if (isDropdownOpen && input.trim() !== "") {
      const delayDebounce = setTimeout(() => {
        dispatch(searchService({ search: input }));
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [input, dispatch, isDropdownOpen]);
  const handleSelectService = useCallback(
    (item) => {
      setInput(item.name);
      console.log(item, "item");
      setSelectValue(item);
      setIsDropdownOpen(false);
      // setErrors((prev) => ({ ...prev, service: "" }));
      setTimeout(() => dispatch(setService([])), 100);
    },
    [dispatch]
  );
  const handleSubmitData = () => {
    const serviceDataList = {
      user_id: userToken?.remember_tokens,
      service_id: selectValue?.id,
    };
    dispatch(addServiceLead(serviceDataList)).then((result) => {
      if (result?.success) {
        const data = {
          user_id: userToken?.remember_tokens,
        };
        dispatch(getleadPreferencesList(data));
        setIsModalOpen(false);
      }
    });
  };

  const [removeModal, setRemoveModal] = useState({
    show: false,
    service_id: null,
  });

  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [previousPostcode, setPreviousPostcode] = useState("");
  const handleNext = () => {
    // Optional: Validate the locationData here
    if (!locationData.postcode || !locationData.miles1) {
      message.warning("Please fill in both fields");
      return;
    }

    // Close current modal
    setIsLocationModalOpen(false);

    // Open next modal
    setIsNextModalOpen(true); // make sure you have this state defined

    // You can pass data as props or store in shared state
  };
  const handleConfirm = () => {
    const serviceIds = selectedServices.join(",");

    const locationdata = {
      user_id: userToken?.remember_tokens,
      miles: locationData.miles1,
      postcode: locationData.postcode,
      service_id: serviceIds,
      postcode_old: previousPostcode,
    };

    if (isEditingLocation && editLocationId) {
      dispatch(
        editLocationLead({ ...locationdata, location_id: editLocationId })
      ).then((result) => {
        if (result?.success) {
          const data = { user_id: userToken?.remember_tokens };
          dispatch(getLocationLead(data));
          dispatch(getleadPreferencesList(data));
          setIsLocationModalOpen(false);
          setIsEditingLocation(false);
          setEditLocationId(null);
          setLocationData({
            miles1: "1",
            postcode: "",
          });
        }
      });
    } else {
      dispatch(addLocationLead(locationdata)).then((result) => {
        if (result?.success) {
          const data = { user_id: userToken?.remember_tokens };
          dispatch(getLocationLead(data));
          dispatch(getleadPreferencesList(data));
          setIsLocationModalOpen(false);
          setLocationData({
            miles1: "1",
            postcode: "",
          });
        }
      });
    }

    setIsNextModalOpen(false);
  };
  const handleEditLocation = (location) => {
    setLocationData({
      miles1: location.miles,
      postcode: location.postcode,
    });
    setEditLocationId(location.id);
    setIsEditingLocation(true);
    setIsLocationModalOpen(true);
    setPreviousPostcode(location.postcode);
  };
  const handleRemoveOpen = (id) => {
    console.log(id, "id");
    setRemoveModal({ show: true, service_id: id });
  };

  const onHandleCancel = () => {
    setRemoveModal({ show: false, service_id: null });
  };

  const handleRemove = () => {
    const removeData = {
      user_id: userToken?.remember_tokens,
      // service_id: ids.join(),
      postcode: removeModal?.service_id,
      // user_service_id:locationRemoveId
    };

    dispatch(removeItemLocationData(removeData)).then((result) => {
      if (result) {
        showToast(
          "success",
          result?.message || "Remove Location Successfully!"
        );
        setRemoveModal({ show: false, service_id: null });
        const data = {
          user_type: userToken?.remember_tokens,
        };
        dispatch(getLocationLead(data));
      }
    });
  };

  // const isOnlineRemotes = () => {
  //   const isOnlineData = {
  //     user_id:userToken?.remember_tokens,
  //     is_online: is_online ? 1 : 0
  //   }
  //   dispatch(isOnlineRemote(isOnlineData))
  // }
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Lead settings</h1>
        <p className={styles.subHeading}>Leads you can choose to contact.</p>

        <div className={styles.section}>
          <h3 className={styles.title}>Your services</h3>
          <p className={styles.info}>
            Fine-tune the leads you want to be alerted about.
          </p>
          {serviceLoader ? (
            <Spin />
          ) : (
            <div className={styles.serviceList}>
              {preferenceList?.map((service) => (
                <div
                  key={service.id}
                  ref={(el) => (serviceRefs.current[service.id] = el)}
                  className={`${styles.serviceItem} ${
                    selectedService?.id === service.id
                      ? styles.selectedService
                      : ""
                  }`}
                  onClick={() => handleServiceClick(service?.id, service?.name)}
                >
                  <div className={styles.serviceNameWrapper}>
                    <p className={styles.serviceName}>{service.name}</p>
                    <p className={styles.serviceDetails}>
                      All leads <span>|</span> {service?.locations} Location
                    </p>
                  </div>
                  <img
                    src={EditIcon}
                    alt="Edit"
                    onClick={() => handleEditLocation(item)}
                  />
                </div>
              ))}
            </div>
          )}
          <button className={styles.addService} onClick={handleService}>
            + Add a service
          </button>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>Your locations</h3>
          <p className={styles.info}>
            Choose where you want to find new customers.
          </p>

          {getlocationData?.map((item) => (
            <div className={styles.location}>
              <div key={item.id} className={styles.yourLocationInputWrapper}>
                <p className={styles.locationInput}>
                  Within <strong>{item.miles} miles</strong> of{" "}
                  <strong>{item.postcode}</strong>
                </p>
                <p className={styles.locationInputService}>
                  <span className={styles.link}>View on map</span> |{" "}
                  <span
                    className={styles.link}
                    onClick={() => handleRemoveOpen(item?.postcode)}
                  >
                    Remove
                  </span>{" "}
                  |{" "}
                  <span className={styles.link}>
                    {item?.total_services} services
                  </span>
                </p>
              </div>
              <div className={styles.editButton}>
                <img
                  src={EditIcon}
                  alt="Edit"
                  onClick={() => handleEditLocation(item)}
                />
              </div>
            </div>
          ))}

          <button
            className={styles.addLocation}
            onClick={() => setIsLocationModalOpen(true)}
          >
            + Add a location
          </button>
        </div>

        <div className={styles.section}>
          <h3 className={styles.title}>Online/remote leads</h3>
          <p className={styles.info}>
            Customers tell us if they're happy to receive services online or
            remotely.
          </p>
          <div className={styles.toggle}>
            <span>See online/remote leads</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={is_online}
                onChange={() => {
                  setIsOnline(!is_online);

                  const isOnlineData = {
                    user_id: registerData?.remember_tokens,
                    is_online: !is_online ? 1 : 0,
                  };
                  dispatch(isOnlineRemote(isOnlineData)).then((result) => {
                    if (result?.success) {
                      showToast(
                        "success",
                        result?.message ||
                          "Online/Remote status updated successfully"
                      );
                    }
                  });
                }}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
        <div className={styles.toggle}>
          <span>Pause Auto Bid for 7 Days</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={autobid_pause}
              onChange={() => {
                setAutoBid(!autobid_pause);

                const isAutoBidPauseData = {
                  user_id: registerData?.remember_tokens,
                  autobid_pause: !autobid_pause ? 1 : 0,
                };
                dispatch(getSevenWeekBidApi(isAutoBidPauseData)).then(
                  (result) => {
                    if (result?.success) {
                      showToast(
                        "success",
                        result?.message || "Auto Bid updated successfully"
                      );
                    }
                  }
                );
              }}
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <button className={styles.viewLeads} onClick={handleView}>
          View leads
        </button>

        <AddServiceModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          input={input}
          setInput={setInput}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          service={service}
          searchServiceLoader={searchServiceLoader}
          handleSelectService={handleSelectService}
          handleSubmitData={handleSubmitData}
        />

        <LocationModal
          open={isLocationModalOpen}
          isEditing={isEditingLocation}
          locationData={locationData}
          onChange={handleLocationChange}
          onCancel={() => {
            setIsLocationModalOpen(false);
            setIsEditingLocation(false);
            setEditLocationId(null);
            setLocationData({ miles1: "", postcode: "" });
          }}
          onNext={handleNext}
        />

        {/* <AddLocationModal
          open={isLocationModalOpen}
          isEditing={isEditingLocation}
          // locationData={locationData}
          onChange={handleLocationChange}
          onCancel={() => {
            setIsLocationModalOpen(false);
            setIsEditingLocation(false);
            setEditLocationId(null);
            setLocationData({ miles1: "", postcode: "" });
          }}
          onNext={handleNext}
        /> */}

        {removeModal?.show && (
          <RemoveServiceModal
            open={removeModal?.show}
            onCancel={onHandleCancel}
            onConfirm={handleRemove}
            loading={removeLocationLoader}
            serviceName={"This Location"}
          />
        )}
        {isNextModalOpen && (
          <ServiceSelectionModal
            isOpen={isNextModalOpen}
            onClose={() => setIsNextModalOpen(false)}
            onConfirm={handleConfirm}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />
        )}
      </div>
    </>
  );
};

export default LeadSettings;
