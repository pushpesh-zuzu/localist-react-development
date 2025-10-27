import React from "react";
import styles from "./ViewProfile.module.css";
const TabNav = ({ activeTab, onTabClick, tabs }) => {
  const tabs = [
    "About",
    "Services",
    "Reviews",
    "Accreditations",
    "Q+A's",
    "Photos",
    "Videos",
    "Links",
  ];

  return (
    <div className={styles.tabContainers}>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default TabNav;
