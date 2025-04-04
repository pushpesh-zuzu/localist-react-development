import React, { useState, useRef } from "react";
import styles from "./LeadSettings.module.css";
import BlackRightArrow from "../../../assets/Images/Leads/BlackRightArrow.svg";
import WhiteRightArrow from "../../../assets/Images/Leads/WhiteRightArrow.svg";
import EditIcon from "../../../assets/Images/Leads/EditIcon.svg";
import CustomerQuestions from "./CustomerQuestions";

const LeadSettings = ({ setSelectedService, selectedService }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const serviceRefs = useRef({});

  const handleServiceClick = (service, event) => {
    setSelectedService(service);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Lead settings</h1>
      <p className={styles.subHeading}>Leads you can choose to contact.</p>

      <div className={styles.section}>
        <h4 className={styles.title}>Your services</h4>
        <p className={styles.info}>
          Fine-tune the leads you want to be alerted about.
        </p>
        <div className={styles.serviceList}>
          {[
            { name: "House Cleaning", location: "1 location", id: 1 },
            { name: "Deep Cleaning Services", location: "1 location", id: 2 },
            { name: "End of Tenancy Cleaning", location: "1 location", id: 3 },
          ].map((service) => (
            <div
              key={service.id}
              ref={(el) => (serviceRefs.current[service.id] = el)}
              className={`${styles.serviceItem} ${
                selectedService?.id === service.id ? styles.selectedService : ""
              }`}
              onClick={(e) => handleServiceClick(service, e)}
            >
              <div className={styles.serviceNameWrapper}>
                <p className={styles.serviceName}>{service.name}</p>
                <p className={styles.serviceDetails}>
                  All leads <span>|</span> {service.location}
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
            <img src={EditIcon} alt="" />
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
