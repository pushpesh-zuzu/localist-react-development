import styles from "./findaccountant.module.css";

const SearchAccountant = () => {
  return (
    <div className={styles.searchcontainer}>
      <h1>
        Find <span>Accountants</span> near you
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

export default SearchAccountant;
