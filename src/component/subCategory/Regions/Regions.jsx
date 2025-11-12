import styles from "./Regions.module.css";
import mapIcon from "../../../assets/Icons/map-pin.svg";
import arrowDownIcon from "../../../assets/Icons/arrow-down.svg";
import arrowIcon from "../../../assets/Images/subcategory/arrowicon.svg";
import { useEffect, useState } from "react";

const RegionsComponent = ({ regionsData, heading = "" }) => {
  const [activeKey, setActiveKey] = useState(regionsData?.[0]?.key || "");

  useEffect(() => {
    if (regionsData && regionsData.length > 0) {
      setActiveKey(regionsData[0].key);
    }
  }, [regionsData]);

  const handlePanelClick = (key) => {
    if (activeKey === key) {
      setActiveKey(""); // Close if already open
    } else {
      setActiveKey(key); // Open new one
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.blueTitle}>
          {heading ? heading : "Regions"}
        </span>
        {heading ? "Places" : "we work in"}{" "}
        {heading ? "" : <img src={arrowDownIcon} width={44} />}
      </h2>
      {regionsData?.map((category, index) => {
        const categoryName = category.title;
        const services = category.items;
        const isActive = activeKey === category.key;

        return (
         <div key={index} className={`${styles.customCollapse} ${isActive ? styles.active : ''}`}>
            <div 
              className={`${styles.customPanelHeader} ${isActive ? styles.active : ''}`}
              onClick={() => handlePanelClick(category.key)}
            >
              <span className={styles.categoryTitle}>
                {heading ? "" : categoryName}
              </span>
              <img
                src={arrowIcon}
                alt="Toggle"
                className={`${styles.arrowIcon} ${isActive ? "" : styles.arrowRotated}`}
              />
            </div>
            
            <div className={`${styles.customPanelContent} ${isActive ? styles.contentOpen : styles.contentClosed}`}>
              <div className={styles.categoryContainer}>
                <div className={styles.servicesContainer}>
                  {services?.map((service, idx) => (
                    <span key={idx} className={styles.serviceItem}>
                      <img src={mapIcon} width={24} alt="" />
                      {service.path ? (
                        <a style={{ color: "#000" }} href={service.path}>
                          {service.name}
                        </a>
                      ) : (
                        service?.name
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RegionsComponent;