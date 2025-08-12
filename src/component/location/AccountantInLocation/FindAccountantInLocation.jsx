import React from "react";
import styles from "./FindAccountantInLocation.module.css";

const FindAccountantInLocation = ({title,isNeedS=false,locationName}) => {
  return (
    <div className={styles.searchcontainer}>
      <h1>
        Find a <span>{title}{isNeedS?'s':''}</span> in {locationName} 
        {/*  example Accountants in place of title */}
      </h1>

      <div className={styles.searchBoxContainer}>
        <p>
          Where do you need <span>{title}{isNeedS?'s':''}?</span>
        </p>

        <div className={styles.searchInputContainer}>
          <input
            className={styles.searchInput}
            placeholder="Enter your postcode or town"
          />

          <button>Go</button>
        </div>
      </div>
    </div>
  );
};

export default FindAccountantInLocation;
