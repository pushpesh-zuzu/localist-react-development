import styles from "./findaccountant.module.css";

const SearchAccountant = ({title='Accountant',panelImage}) => {

  return (
    <div className={styles.searchcontainer} >
      <h1>
        Looking for <span>{title}s</span> Near Me?
      </h1>

      <div className={styles.searchBoxContainer}>
        <p>
          Where do you need <span>{title}s ?</span>
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
