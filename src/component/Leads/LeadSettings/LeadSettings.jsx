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
  getOnlineRemoteApi,
  getSevenWeekBidApi,
  getSevenWeekPausedBidApi,
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
import TravelTimeModal from "../AddLocation/TravelTimeModal";
import DrawOnMapModal from "../AddLocation/DrawOnMapModal";
import ViewOnMapModal from "../AddLocation/ViewOnMapModal";

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
  // const [pincode, setPincode] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    preferenceList,
    serviceLoader,
    getlocationData,
    removeLocationLoader,
    sevenDays,
    onlineRemote,
    sevenPausedData,
    getOnlineRemote
  } = useSelector((state) => state.leadSetting);
  const { userToken } = useSelector((state) => state.auth);
  const [autobid_pause, setAutoBid] = useState(sevenPausedData?.autobidpause === 1);
  const [is_online, setIsOnline] = useState(getOnlineRemote?.isonline === 1);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [isEditModalOpen, setIseditModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [previousPostcode, setPreviousPostcode] = useState("");
  const [isTravelTimeModalOpen, setIsTravelTimeModalOpen] = useState(false);
  const [isDrawTimeOpen, setIsDrawTimeOpen] = useState(false)
  const [selectedTravelLocation, setSelectedTravelLocation] = useState(null);
  const [isopenviewModal,setIsOpenViewModal]  = useState(false)
  const[isEdit,setIsEdit]=useState(false)
  const [latitude,setLatitude] = useState([])
  const type = useRef();
  // Add this useEffect to keep the checkbox state in sync with Redux
  useEffect(() => {
    setAutoBid(sevenPausedData?.autobidpause === 1);
    setIsOnline(getOnlineRemote?.isonline === 1);
  }, [sevenPausedData?.autobidpause, getOnlineRemote?.isonline]);
console.log(selectedServices,"selectedServices123")


  const [isMobileView, setIsMobileView] = useState(false);
  const { searchServiceLoader, service, registerData } = useSelector(
    (state) => state.findJobs
  );

  const [locationData, setLocationData] = useState({
    miles1: "1",
    postcode: "",
  });

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (userToken?.active_status == 1) {
      const data = {
        user_id: userToken?.remember_tokens,
      };
      dispatch(getleadPreferencesList(data));
      dispatch(getSevenWeekPausedBidApi(data))
      dispatch(getOnlineRemoteApi(data))
    } else {
      const data = {
        user_id: registerData?.remember_tokens,
      };
      dispatch(getleadPreferencesList(data));
      dispatch(getSevenWeekPausedBidApi(data))
      dispatch(getOnlineRemoteApi(data))
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
      setInput("");
      setIsDropdownOpen(false);
  
      setSelectedServices((prev) => {
        const isAlreadySelected = prev.some((service) => service.id === item.id);
        return isAlreadySelected ? prev : [...prev, item];
      });
  
      setTimeout(() => dispatch(setService([])), 100);
    },
    [dispatch]
  );
  const handleSubmitData = useCallback(() => {
    const serviceIds = selectedServices.map((item) => item.id).join(",");
  
    const serviceDataList = {
      user_id: userToken?.remember_tokens,
      service_id: serviceIds,
    };
  
    dispatch(addServiceLead(serviceDataList)).then((result) => {
      if (result?.success) {
        dispatch(getleadPreferencesList({ user_id: userToken?.remember_tokens }));
        setIsModalOpen(false);
        setSelectedServices([]); // Clear after submission
      }
    });
  }, [selectedServices, userToken, dispatch]);
  
  const handleRemoveService = useCallback(
    (id) => {
      setSelectedServices((prev) => prev.filter((service) => service.id !== id));
    },
    []
  ); 
  const [removeModal, setRemoveModal] = useState({
    show: false,
    service_id: null,
  });
 

  console.log(setEditLocationId, "selectedTravelLocation")
  const handleNext = () => {
    // Optional: Validate the locationData here
    if (!locationData.postcode || !locationData.miles1) {
      // message.warning("Please fill in both fields");
      return;
    }
    // Close current modal
    setIsLocationModalOpen(false);
  };

  const handleLocationNext = () => {
    setIseditModalOpen(false);
    setIsNextModalOpen(true);
  };

  const handleEditLocation = (location) => {
    // Set edit mode
    setIsEdit(true);
    type.current = location.type;
    
    // IMPORTANT: First, completely reset selectedServices
   
    
    // Then extract services from location
    console.log("Location data for edit:", location);
    
    // Extract service IDs based on the location format
    if (location.service_ids) {
      try {
        let serviceIdsArray = [];
        
        // Handle string format (comma-separated)
        if (typeof location.service_ids === 'string') {
          serviceIdsArray = location.service_ids
            .split(',')
            .map(id => id.trim())
            .filter(id => id !== '');
        } 
        // Handle array format
        else if (Array.isArray(location.service_ids)) {
          serviceIdsArray = location.service_ids.map(id => id.toString());
        } 
        // Handle single number format
        else if (typeof location.service_ids === 'number') {
          serviceIdsArray = [location.service_ids.toString()];
        }
        
        console.log("Extracted service IDs:", serviceIdsArray);
        
        // Map IDs to service objects with name
        const serviceArray = serviceIdsArray.map(id => {
          const serviceObj = preferenceList.find(s => s.id.toString() === id.toString());
          return {
            id: id,
            name: serviceObj ? serviceObj.name : `Service ${id}`
          };
        });
        
        console.log("Setting services to:", serviceArray);
        setSelectedServices(serviceArray);
      } catch (error) {
        console.error("Error processing service IDs:", error);
        setSelectedServices([]);
      }
    } else {
      console.log("No service_ids found in location data");
      setSelectedServices([]);
    }
  console.log(location,"location123")
    // Handle different location types
    if (location?.type === "Travel Time") {
      setLocationData({
        travel_time: location?.travel_time || '',
        travel_by: location?.travel_by || '',
        postcode: location?.postcode || '',
        coordinates: location?.coordinates || ""
      });
      setSelectedTravelLocation(location);
      setIsTravelTimeModalOpen(true);
      setEditLocationId(location.id);
      setPreviousPostcode(location.postcode);
      return;
    }
    
    if (location?.type === "Draw on Map") {
      try {
        const data = JSON.parse(location.coordinates);
        setLatitude(data);
      } catch (error) {
        console.error("Error parsing coordinates:", error);
        setLatitude([]);
      }
      
      setLocationData({
        postcode: location?.postcode,
        city: location?.city
      });
      setIsDrawTimeOpen(true);
      setEditLocationId(location.id);
      setPreviousPostcode(location.postcode);
      return;
    }
  
    if (location?.type  === "Distance") {
      setLocationData({
        miles1: location.miles,
        postcode: location.postcode,
        coordinates: location?.coordinates
      });
      setEditLocationId(location.id);
      setIseditModalOpen(true);
      setPreviousPostcode(location.postcode);
      return;
    }
    if(location?.nation_wide == 0 ){
      setLocationData({
        miles1: location.miles,
        postcode: location.postcode,
        coordinates: location?.coordinates
      });
      setEditLocationId(location.id);
      setIseditModalOpen(true);
      setPreviousPostcode(location.postcode);
      return;
    }
    
    if (location?.type === "Nationwide" &&  location?.nation_wide == 1) {
      setLocationData({
        miles1: location.miles,
        postcode: location.postcode,
        city: location?.city,
         coordinates: ""
      });
      setIsNextModalOpen(true);
      return;
    }
  };

  const handleConfirm = (data) => {
    const serviceIds = data.join(",");
   
    const typeOfTravel = type.current;
    const locationdata = {
      user_id: userToken?.remember_tokens,
      miles: locationData.miles1 ? locationData.miles1 : 0,
      postcode: locationData.postcode ?? previousPostcode,
      service_id: serviceIds,
      postcode_old: previousPostcode,
      travel_time: locationData?.travel_time,
      travel_by: locationData?.travel_by,
      type: typeOfTravel,
      miles_old: previousPostcode,
      city: locationData?.city,
      coordinates:locationData?.coordinates??[]
    };
    console.log(locationData,"445566")

    dispatch(
      editLocationLead({ ...locationdata, location_id: editLocationId })
    ).then((result) => {
      if (result?.success) {
        const data = { user_id: userToken?.remember_tokens };
        dispatch(getLocationLead(data));
        dispatch(getleadPreferencesList(data));
        setIsNextModalOpen(false);
        setIseditModalOpen(false);
        setIsEditingLocation(false);
        setSelectedOption(false);
        setIsLocationModalOpen(false);
        setEditLocationId(null);
        setLocationData({
          miles1: "1",
          postcode: "",
        });
      }
    });
  };
  const handleRemoveOpen = (id) => {
    setRemoveModal({ show: true, service_id: id });
  };

  const onHandleCancel = () => {
    setRemoveModal({ show: false, service_id: null });
  };
  const handleViewMap = (item) => {
    setLocationData(item)
    setIsOpenViewModal(true)
  }

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
                  className={`${styles.serviceItem} ${selectedService?.id === service.id
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
                  // onClick={() =>
                  //   handleServiceClick(service?.id, service?.name)
                  // }
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
                {item?.type === "Distance" ? (
                  <p className={styles.locationInput}>
                    Within <strong>{item.miles} miles</strong> of{" "}
                    <strong>{item.postcode}</strong>
                  </p>
                ) : item?.type === "Draw on Map" ? (
                  <p className={styles.locationInput}>
                    Draws area near {" "}
                    <strong>{item.city}</strong>
                  </p>
                ) : item?.type === "Nationwide" && item?.nation_wide !== 0 ? (
                  <p className={styles.locationInput}>
                    Nationwide
                  </p>
                )
                : item?.type === "Travel Time" ? 
                (
                  <p className={styles.locationInput}>
                    Within <strong>{item?.travel_time} </strong> {item?.travel_by} of{" "}
                    <strong>{item.city ? item.city : item?.postcode}</strong>
                  </p>
                ) : 
                
                <p className={styles.locationInput}>
                Within <strong>{item.miles} miles</strong> of{" "}
                <strong>{item.postcode}</strong>
              </p>
                
                }

                <p className={styles.locationInputService}>
                  <span className={styles.link} onClick={()=> handleViewMap(item)}>View on map</span> |{" "}
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
                  const newValue = !is_online;
                  setIsOnline(newValue);

                  const isOnlineData = {
                    user_id: registerData?.remember_tokens,
                    is_online: newValue ? 1 : 0,
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
                const newValue = !autobid_pause;
                setAutoBid(newValue);

                const isAutoBidPauseData = {
                  user_id: registerData?.remember_tokens,
                  autobid_pause: newValue ? 1 : 0,
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
          handleRemoveService={handleRemoveService}
          selectedServices={selectedServices}

        />

        {isEditModalOpen && (
          <LocationModal
            open={isEditModalOpen}
            isEditing={isEditingLocation}
            locationData={locationData}
            onChange={handleLocationChange}
            onClose={() => {
              setIseditModalOpen(false);
              setIsEditingLocation(false);
              setEditLocationId(null);
              setLocationData({ miles1: "", postcode: "" });
            }}
            onNext={handleLocationNext}
          />
        )}

        {isNextModalOpen && (
          <ServiceSelectionModal
            isOpen={isNextModalOpen}
            isEditing={isEdit}
            onClose={() => setIsNextModalOpen(false)}
            onConfirm={handleConfirm}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            locationData={locationData}
    setLocationData={setLocationData}
          />
        )}

        <AddLocationModal
          open={isLocationModalOpen}
          isEditing={isEditingLocation}
          // locationData={locationData}
          onChange={handleLocationChange}
          selectedServices={selectedServices}
          previousPostcode={previousPostcode}
          setSelectedServices={setSelectedServices}
          setIsLocationModalOpen={setIsLocationModalOpen}
          onCancel={() => {
            setIsLocationModalOpen(false);
            setIsEditingLocation(false);
            setEditLocationId(null);
            setLocationData({ miles1: "", postcode: "" });
          }}
          onNext={handleNext}
        />

        {removeModal?.show && (
          <RemoveServiceModal
            open={removeModal?.show}
            onCancel={onHandleCancel}
            onConfirm={handleRemove}
            loading={removeLocationLoader}
            serviceName={"This Location"}
          />
        )}

        {isTravelTimeModalOpen && (
          <TravelTimeModal
            isOpen={isTravelTimeModalOpen}
            onClose={() => setIsTravelTimeModalOpen(false)}
            locationData={locationData}
            setLocationData={setLocationData}
            onNext={handleLocationNext}

          />
        )}
        {isDrawTimeOpen && (
          <DrawOnMapModal
          isEdit={isEdit}
            locationData={locationData}
            setLocationData={setLocationData}
            onNext={handleLocationNext}
            isOpen={isDrawTimeOpen}
            onClose={() => setIsDrawTimeOpen(false)}
            data={latitude}
          />
        )}
{
  isopenviewModal && (
    <ViewOnMapModal  locationData={locationData}
    setLocationData={setLocationData}  
    isOpen={isopenviewModal}
    onClose={() => setIsOpenViewModal(false)}/>
  )
}
      </div>
    </>
  );
};

export default LeadSettings;
