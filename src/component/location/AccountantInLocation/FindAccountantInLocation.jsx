import React from "react";
import styles from "./FindAccountantInLocation.module.css";

const FindAccountantInLocation = () => {
  return (
    <div className={styles.searchcontainer}>
      <h1>
        Find a <span>Accountants</span> in Derbyshire
      </h1>

      <div className={styles.searchBoxContainer}>
        <p>
          Where do you need <span>Accountants?</span>
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
