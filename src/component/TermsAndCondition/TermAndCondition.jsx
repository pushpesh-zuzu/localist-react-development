import React, { useEffect, useState } from "react";
import styles from "./TermsConditions.module.css";
import { useLocation, Link } from "react-router-dom";
import ContentForProfessonal from "./ContentForProfessonal";
import ContentForConsumers from "./ContentForConsumers";
const TermsAndCondition = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("professionals");

  // Set active tab from URL hash (#customers / #professionals)
  useEffect(() => {
    if (location.hash === "#professionals") {
      setActiveTab("professionals");
    } else {
      setActiveTab("customers");
    }
  }, [location]);
  console.log(location, "locationlocation");

  return (
    // 'hello'
    <div className={styles.container}>
      {/* Navigation Tabs */}
      <nav className={styles.navWrapper}>
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <Link
              to="#consumers"
              className={`${styles.navLink} ${
                activeTab === "customers" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("customers")}
            >
              Consumers
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="#professionals"
              className={`${styles.navLink} ${
                activeTab === "professionals" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("professionals")}
            >
              Professionals
            </Link>
          </li>
        </ul>
      </nav>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          {activeTab === "customers" ? (
            <ContentForConsumers />
          ) : (
            <ContentForProfessonal />
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
