import React from "react";
import styles from "./FindAccountantInLocation.module.css";
import Breadcrumb from "../../common/BreadCrum/Breadcrum";
import { handleScrollToBottom } from "../../../utils/scroll";

const FindAccountantToday = ({
  breadcrumb,
  findData = {},
  findAccoundTitle,
  locationsName,
}) => {
  return (
    <div className={styles.findAccountInfoContainer}>
      {/* <p className={styles.breadcrumb}>
        Business / Financial and Accounting / General Accounting / Accounting /{" "}
        <span>Derbyshire</span>
      </p> */}
      <Breadcrumb breadcrumb={breadcrumb} />

      <div className={styles.infoContainer}>
        <h2 className={styles.title}>
          Trusted <span className={styles.highlight}> {findAccoundTitle} </span>
          {/* in {locationsName}? */}
        </h2>

        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionContainer}>
            {findData?.para1 && (
              <p dangerouslySetInnerHTML={{ __html: findData.para1 }}></p>
            )}
            {findData?.para2 && (
              <p dangerouslySetInnerHTML={{ __html: findData.para2 }}></p>
            )}
            {findData?.para3 && (
              <p dangerouslySetInnerHTML={{ __html: findData.para3 }}></p>
            )}
            {findData?.para4 && (
              <p dangerouslySetInnerHTML={{ __html: findData.para4 }}></p>
            )}
            {findData?.para5 && (
              <p dangerouslySetInnerHTML={{ __html: findData.para5 }}></p>
            )}
          </div>
        </div>
        {/* <button
          onClick={() => handleScrollToBottom()}
          className={styles.accountantBtn}
        >
          Find a {title} today
        </button> */}
      </div>
    </div>
  );
};

export default FindAccountantToday;
