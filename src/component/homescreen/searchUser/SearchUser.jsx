import styles from "./search.module.css";
import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import calloutArrow from "../../../assets/Images/callOutArrow.svg";

const SearchProfessionals = () => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.popularExamples}>
        <div className={styles.exampleBox}>
          <p className={styles.exampleTitle}>Popular examples:</p>
          <span className={styles.exampledescription}>
            Driveway Installation, Gardening Services, Web Design....
          </span>
        </div>
      </div>

      <div className={styles.calloutArrow}>
        <img src={calloutArrow} alt="calloutArrow" />
      </div>

      <div className={styles.container}>
        <h2 className={styles.heading}>Find Local</h2>
        <h2 className={styles.heading}>
          <span className={styles.highlight}>Services</span> - Fast
        </h2>

        <p className={styles.subText}>
          Get fast quotes from local professionals
        </p>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Type your service and choose from provided options."
            className={styles.input}
          />
          <div className={styles.divider}></div>
          <div className={styles.locationWrapper}>
            <EnvironmentOutlined />
            <input
              type="text"
              placeholder="Postcode"
              className={styles.locationInput}
            />
          </div>
          <button className={styles.searchButton}>Search</button>
          <button className={styles.searchButtonPhone}><SearchOutlined /></button>
        </div>
      </div>
    </div>
  );
};

export default SearchProfessionals;
