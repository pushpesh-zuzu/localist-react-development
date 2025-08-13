import React from "react";
import styles from "./FindAccountantInLocation.module.css";
import FindAccountantInLocation from "./FindAccountantInLocation";
import FindAccountantToday from "./FindAccountantToday";

const AccountantInLocation = ({
  title,
  breadcrumb,
  findData,
  locationsName,
  defaultService,
}) => {
  return (
    <>
      <div className={styles.findAccountantContainer}>
        <FindAccountantInLocation
          title={title}
          locationName={locationsName}
          defaultService={defaultService}
        />
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
