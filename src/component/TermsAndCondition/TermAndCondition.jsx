import { useEffect, useState } from "react";
import styles from "./TermsConditions.module.css";
import { useLocation, Link } from "react-router-dom";
import ContentForProfessonal from "./ContentForProfessonal";
import ContentForConsumers from "./ContentForConsumers";
import { Helmet } from "react-helmet-async";

const TermsAndCondition = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("professionals");

  useEffect(() => {
    if (location.hash === "#professionals") {
      setActiveTab("professionals");
    } else {
      setActiveTab("customers");
    }
  }, [location]);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Terms & Conditions | Localists.com</title>
        {
          <meta
            name="description"
            content="Read the full Terms & Conditions for using Localists in the UK. Learn about user responsibilities, service professional rules, data policies, and legal guidelines."
          />
        }
      </Helmet>
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
