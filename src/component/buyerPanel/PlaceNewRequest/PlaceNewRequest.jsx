import React, { useState } from "react";
import styles from "./PlaceNewRequest.module.css";
import BuyerRegistration from "./BuyerRegistration/BuyerRegistration";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerRegistrationModals } from "../../../store/Buyer/BuyerSlice";

const PlaceNewRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { buyerRegistrationModals } = useSelector((state) => state.buyer);
  const openModal = () => {
    dispatch(
      setBuyerRegistrationModals({
        modalName: "WhatServiceYouNeed",
        value: "true",
      })
    );
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Your <span className={styles.highlight}>requests</span>
        </h2>
        <button className={styles.topButton} onClick={openModal}>
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
        <button className={styles.bottomButton} onClick={openModal}>
          Place new request
        </button>
      </div>

      {buyerRegistrationModals.WhatServiceYouNeed && (
        <BuyerRegistration closeModal={closeModal} />
      )}
    </div>
  );
};

export default PlaceNewRequest;
