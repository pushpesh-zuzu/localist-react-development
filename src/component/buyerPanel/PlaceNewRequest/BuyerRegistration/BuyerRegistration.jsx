import React from "react";
import styles from "./BuyerRegistration.module.css";
import WhatServiceYouNeed from "./WhatServiceYouNeed/WhatServiceYouNeed";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerRegistrationModals } from "../../../../store/Buyer/BuyerSlice";

const BuyerRegistration = () => {
  const dispatch = useDispatch();
  const { buyerRegistrationModals } = useSelector((state) => state.buyer);
  console.log(buyerRegistrationModals, "lll");

  const handleToggle = (modalName, value) => {
    dispatch(setBuyerRegistrationModals({ modalName, value }));
  };

  // Example usage
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {buyerRegistrationModals.WhatServiceYouNeed && (
          <WhatServiceYouNeed
            nextStep={() => {
              handleToggle("ServiceYouNeed", {
                status: true,
                record: { name: "bhavya", age: "45" },
              });
              handleToggle("WhatServiceYouNeed", false);
            }}
          />
        )}
        {/* {buyerRegistrationModals?.ServiceYouNeed?.status && "hello"} */}
      </div>
    </div>
  );
};

export default BuyerRegistration;
