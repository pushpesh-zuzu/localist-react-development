import React from "react";
import styles from "./FindAccountantInLocation.module.css";
import FindAccountantInLocation from "./FindAccountantInLocation";
import FindAccountantToday from "./FindAccountantToday";

const AccountantInLocation = ({
  title,
  breadcrumb,
  findData,
  locationsName,
}) => {
  return (
    <>
      <div className={styles.findAccountantContainer}>
        <FindAccountantInLocation title={title} locationName={locationsName} />
      </div>
      <div>
        <FindAccountantToday
          breadcrumb={breadcrumb}
          findData={findData}
          title={title}
          locationsName={locationsName}
        />
      </div>
    </>
  );
};

export default AccountantInLocation;
