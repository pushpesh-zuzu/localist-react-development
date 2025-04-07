import React, { useState, useRef, useEffect } from "react";
import styles from "./LeadSettings.module.css";
import BlackRightArrow from "../../../assets/Images/Leads/BlackRightArrow.svg";
import WhiteRightArrow from "../../../assets/Images/Leads/WhiteRightArrow.svg";
import EditIcon from "../../../assets/Images/Leads/EditIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getleadPreferencesList,
  leadPreferences,
} from "../../../store/LeadSetting/leadSettingSlice";
import { Spin } from "antd";

const LeadSettings = ({ setSelectedService, selectedService }) => {
  const serviceRefs = useRef({});
  const dispatch = useDispatch();

  const { preferenceList, serviceLoader } = useSelector(
    (state) => state.leadSetting
  );
  const { userToken } = useSelector((state) => state.auth);

  const [isMobileView, setIsMobileView] = useState(false);

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
    const data = {
      user_id: userToken?.remember_tokens,
    };
    dispatch(getleadPreferencesList(data));
  }, []);

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

  // ✅ Don't render if service is selected on mobile/tablet
  if (isMobileView && selectedService?.id) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Lead settings</h1>
      <p className={styles.subHeading}>Leads you can choose to contact.</p>

      <div className={styles.section}>
        <h4 className={styles.title}>Your services</h4>
        <p className={styles.info}>
          Fine-tune the leads you want to be alerted about.
        </p>
        {serviceLoader ? (
          <Spin />
        ) : (
          <div className={styles.serviceList}>
            {preferenceList?.map((service) =>
              service.user_services.map((userService) => (
                <div
                  key={userService.id}
                  ref={(el) => (serviceRefs.current[userService.id] = el)}
                  className={`${styles.serviceItem} ${
                    selectedService?.id === userService.id
                      ? styles.selectedService
                      : ""
                  }`}
                  onClick={() =>
                    handleServiceClick(userService?.id, userService?.name)
                  }
                >
                  <div className={styles.serviceNameWrapper}>
                    <p className={styles.serviceName}>{userService.name}</p>
                    <p className={styles.serviceDetails}>
                      All leads <span>|</span>{" "}
                      {service.location || "Unknown location"}
                    </p>
                  </div>
                  <img
                    src={
                      selectedService?.id === userService.id
                        ? WhiteRightArrow
                        : BlackRightArrow
                    }
                    alt="arrow"
                    className={styles.arrowImages}
                  />
                </div>
              ))
            )}
          </div>
        )}
        <button className={styles.addService}>+ Add a service</button>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>Your locations</h3>
        <p className={styles.info}>
          Choose where you want to find new customers.
        </p>
        <div className={styles.location}>
          <div className={styles.yourLocationInputWrapper}>
            <p className={styles.locationInput}>
              Within <strong>150 miles</strong> of <strong>01201</strong>
            </p>
            <p className={styles.locationInputService}>
              View on map <span>|</span> Remove | 3 services
            </p>
          </div>
          <div className={styles.editButton}>
            <img src={EditIcon} alt="Edit" />
          </div>
        </div>
        <button className={styles.addLocation}>+ Add a location</button>
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

      <button className={styles.viewLeads}>View leads</button>
    </div>
  );
};

export default LeadSettings;
