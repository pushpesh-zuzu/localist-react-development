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
  bgImage,
  findAccoundTitle,
}) => {
  return (
    <>
      <div
        className={styles.findAccountantContainer}
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
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
          findAccoundTitle={findAccoundTitle}
          locationsName={locationsName}
        />
      </div>
    </>
  );
};

export default AccountantInLocation;
