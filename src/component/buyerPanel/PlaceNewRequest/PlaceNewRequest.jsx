import React, { useState } from "react";
import styles from "./PlaceNewRequest.module.css";
import BuyerRegistration from "./BuyerRegistration/BuyerRegistration";

const PlaceNewRequest = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Your <span className={styles.highlight}>requests</span>
        </h2>
        <button className={styles.topButton} onClick={() => setIsOpen(true)}>
          Place new request
        </button>
      </div>
      <div className={styles.card}>
        <h3 className={styles.heading}>
          Find services for your business on Localists
        </h3>
        <p className={styles.text}>
          Most business could be getting a better deal on the services they use
          day to day <br />
          We got thousands of suppliers ready and waiting to quote.
        </p>
        <p className={styles.text}>
          Find everything from web designers to bookkeepers and telephone
          systems to office stationary
        </p>
        <button className={styles.bottomButton} onClick={() => setIsOpen(true)}>
          Place new request
        </button>
      </div>
      {isOpen && (
        <div className={styles.stepsContainer}>
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
          >
            ✖ Close
          </button>
          <BuyerRegistration />
        </div>
      )}
    </div>
  );
};

export default PlaceNewRequest;
