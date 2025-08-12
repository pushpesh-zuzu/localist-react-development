import React from "react";
import styles from "./FindAccountantInLocation.module.css";
import Breadcrumb from "../../common/BreadCrum/Breadcrum";
import { handleScrollToBottom } from "../../../utils/scroll";

const FindAccountantToday = ({
  breadcrumb,
  findData = {},
  title,
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
        <h1 className={styles.title}>
          Looking for a<span className={styles.highlight}> {title} </span>
          in {locationsName}?
        </h1>

        <div className={styles.descriptionContainer}>
          <p>{findData?.para1}</p>
          <p>{findData?.para2}</p>
          {findData?.para3 && <p>{findData?.para3}</p>}
        </div>
        <button onClick={() => handleScrollToBottom()} className={styles.accountantBtn}>
          Find an {title} today
        </button>
      </div>
    </div>
  );
};

export default FindAccountantToday;
