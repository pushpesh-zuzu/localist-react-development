import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./LeadSettings.module.css";
import BlackRightArrow from "../../../assets/Images/Leads/BlackRightArrow.svg";
import WhiteRightArrow from "../../../assets/Images/Leads/WhiteRightArrow.svg";
import EditIcon from "../../../assets/Images/Leads/EditIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addLocationLead,
  addServiceLead,
  getleadPreferencesList,
  getLocationLead,
  leadPreferences,
} from "../../../store/LeadSetting/leadSettingSlice";
import { Button, Modal, Spin } from "antd";
import {
  searchService,
  setService,
} from "../../../store/FindJobs/findJobSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import RemoveServiceModal from "../RemoveModal";
import ServiceSelectionModal from "./ServiceModal";

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
  const { preferenceList, serviceLoader, getlocationData } = useSelector(
    (state) => state.leadSetting
  );
  const { userToken } = useSelector((state) => state.auth);

  const [isMobileView, setIsMobileView] = useState(false);
  const { searchServiceLoader, service, registerData } = useSelector(
    (state) => state.findJobs
  );
  console.log(selectedService, setSelectedService, "selectedService");
  const [locationData, setLocationData] = useState({
    miles1: "",
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
  // const handleLocationSubmit = () => {
  //   const locationdata = {
  //     user_id: userToken?.remember_tokens,
  //     miles: locationData.miles1,
  //     postcode: locationData.postcode,
  //     service_id: selectedService?.id,
  //   };
  //   dispatch(addLocationLead(locationdata)).then((result) => {

  //     if (result?.success) {
  //       const data = {
  //         user_id: userToken?.remember_tokens,
  //       };
  //       dispatch(getLocationLead(data));
  //       dispatch(getleadPreferencesList(data));
  //       setIsLocationModalOpen(false);
  //     }
  //   });
  // };

  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
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
    };

    if (isEditingLocation && editLocationId) {
      dispatch(
        addLocationLead({ ...locationdata, location_id: editLocationId }) // ✅ Correct field name
      ).then((result) => {
        if (result?.success) {
          const data = { user_id: userToken?.remember_tokens };
          dispatch(getLocationLead(data));
          dispatch(getleadPreferencesList(data));
          setIsLocationModalOpen(false);
          setIsEditingLocation(false);
          setEditLocationId(null);
        }
      });
    } else {
      dispatch(addLocationLead(locationdata)).then((result) => {
        if (result?.success) {
          const data = { user_id: userToken?.remember_tokens };
          dispatch(getLocationLead(data));
          dispatch(getleadPreferencesList(data));
          setIsLocationModalOpen(false);
        }
      });
    }

    setIsNextModalOpen(false);
  };

  const handleLocationSubmit = () => {
    const locationdata = {
      user_id: userToken?.remember_tokens,
      miles: locationData.miles1,
      postcode: locationData.postcode,
      service_id: selectedService?.id,
    };

    if (isEditingLocation && editLocationId) {
      // Update location logic — You might need to create an `updateLocationLead` thunk
      dispatch(
        addLocationLead({ ...locationdata, setvice_id: editLocationId })
      ).then((result) => {
        if (result?.success) {
          const data = { user_id: userToken?.remember_tokens };
          dispatch(getLocationLead(data));
          dispatch(getleadPreferencesList(data));
          setIsLocationModalOpen(false);
          setIsEditingLocation(false);
          setEditLocationId(null);
        }
      });
    } else {
      dispatch(addLocationLead(locationdata)).then((result) => {
        if (result?.success) {
          const data = { user_id: userToken?.remember_tokens };
          dispatch(getLocationLead(data));
          dispatch(getleadPreferencesList(data));
          setIsLocationModalOpen(false);
        }
      });
    }
  };

  const handleEditLocation = (location) => {
    setLocationData({
      miles1: location.miles,
      postcode: location.postcode,
    });
    setEditLocationId(location.id);
    setIsEditingLocation(true);
    setIsLocationModalOpen(true);
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
            // <div className={styles.serviceList}>
            //   {preferenceList?.map((service) =>
            //     service.user_services.map((userService) => (
            //       <div
            //         key={userService.id}
            //         ref={(el) => (serviceRefs.current[userService.id] = el)}
            //         className={`${styles.serviceItem} ${
            //           selectedService?.id === userService.id
            //             ? styles.selectedService
            //             : ""
            //         }`}
            //         onClick={() =>
            //           handleServiceClick(userService?.id, userService?.name)
            //         }
            //       >
            //         <div className={styles.serviceNameWrapper}>
            //           <p className={styles.serviceName}>{userService.name}</p>
            //           <p className={styles.serviceDetails}>
            //             All leads <span>|</span>{" "}
            //             {service?.locations} Location
            //           </p>
            //         </div>
            //         <img
            //           src={
            //             selectedService?.id === userService.id
            //               ? WhiteRightArrow
            //               : BlackRightArrow
            //           }
            //           alt="arrow"
            //           className={styles.arrowImages}
            //         />
            //       </div>
            //     ))
            //   )}
            // </div>
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
                    src={
                      selectedService?.id === service.id
                        ? WhiteRightArrow
                        : BlackRightArrow
                    }
                    alt="arrow"
                    className={styles.arrowImages}
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
                  View on map | Remove | {item?.total_services} services
                </p>
              </div>
              <div className={styles.editButton}>
                <img
                  src={EditIcon}
                  alt="Edit"
                  // onClick={() => handleEditLocation(item)}
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
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <button className={styles.viewLeads} onClick={handleView}>
          View leads
        </button>
        <Modal
          title="Add a New Service"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => {
            handleSubmitData();
            // setIsModalOpen(false);
          }}
        >
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="e.g. Personal Trainers, House Cleaning"
              className={styles.fullWidthInput}
              onChange={(e) => {
                setInput(e.target.value);
                setIsDropdownOpen(!!e.target.value);
                // setSelectedService(null);
              }}
              value={input}
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
        </Modal>

        {/* <Modal
          title={isEditingLocation ? "Edit Location" : "Add a New Location"}
          open={isLocationModalOpen}
          onCancel={() => {
            setIsLocationModalOpen(false);
            setIsEditingLocation(false);
            setEditLocationId(null);
            setLocationData({ miles1: "", postcode: "" });
          }}
          onOk={handleLocationSubmit}
        >
          <div className={styles.formGroup}>
            <div
              className={styles.inputGroup}
              style={{ display: "flex", gap: "10px" }}
            >
              <div style={{ flex: 1 }}>
                <span className={styles.fromText}>Miles</span>
                <select
                  name="miles1"
                  value={locationData.miles1}
                  onChange={handleLocationChange}
                  style={{ width: "100%", padding: "8px" }}
                >
                  {/* <option value="">Select</option> 
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <span className={styles.fromText}>ZIP Code</span>
                <input
                  type="text"
                  placeholder="Enter your postcode"
                  name="postcode"
                  value={locationData.postcode}
                  onChange={handleLocationChange}
                  style={{ width: "100%", padding: "8px" }}
                />
              </div>
            </div>
          </div>
        </Modal> */}

        <Modal
          title={isEditingLocation ? "Edit Location" : "Add a New Location"}
          open={isLocationModalOpen}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                setIsLocationModalOpen(false);
                setIsEditingLocation(false);
                setEditLocationId(null);
                setLocationData({ miles1: "", postcode: "" });
              }}
            >
              Cancel
            </Button>,
            <Button key="next" type="primary" onClick={handleNext}>
              Next
            </Button>,
          ]}
        >
          <div className={styles.formGroup}>
            <div
              className={styles.inputGroup}
              style={{ display: "flex", gap: "10px" }}
            >
              <div style={{ flex: 1 }}>
                <span className={styles.fromText}>Miles</span>
                <select
                  name="miles1"
                  value={locationData.miles1}
                  onChange={handleLocationChange}
                  style={{ width: "100%", padding: "8px" }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <span className={styles.fromText}>ZIP Code</span>
                <input
                  type="text"
                  placeholder="Enter your postcode"
                  name="postcode"
                  value={locationData.postcode}
                  onChange={handleLocationChange}
                  style={{ width: "100%", padding: "8px" }}
                />
              </div>
            </div>
          </div>
        </Modal>
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
