import React from "react";
import styles from "./FindAccountantInLocation.module.css";
import FindAccountantInLocation from "./FindAccountantInLocation";
import FindAccountantToday from "./FindAccountantToday";

const AccountantInLocation = () => {
  return (
    <>
      <div className={styles.findAccountantContainer}>
        <FindAccountantInLocation />
      </div>
      <div>
        <FindAccountantToday />
      </div>
    </>
  );
};

export default AccountantInLocation;
