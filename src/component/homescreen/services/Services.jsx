import { services } from "../../../constant/Homepage";
import styles from "./services.module.css";
import SpecificService from "./SpecificService";

const formatTitle = (title) => {
  const parts = title.split("&");

  if (parts.length > 1) {
    return (
      <>
        <span className={styles.categoryTitleText}>{parts[0]}</span>
        <span className={styles.blackText}>&</span>
        <span className={styles.categoryTitleText}>{parts[1]}</span>
      </>
    );
  } else {
    return (
      <>
        <span className={styles.categoryTitleText}>{parts[0]}</span>
      </>
    );
  }
};

const Services = () => {
  return (
    <div className={styles.serviceContainer}>
      {services?.map((category, index) => (
        <div key={index} className={styles.category}>
          <h2 className={styles.categoryTitile}>
            {formatTitle(category.type)}
          </h2>
          <div className={styles.categoryGrid}>
            {category?.services?.map((service, idx) => (
              <SpecificService service={service} key={idx} />
            ))}
          </div>

          <div className={styles.viewAllBtn}>
            <button>View All</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
