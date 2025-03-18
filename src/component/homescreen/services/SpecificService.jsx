import styles from "./services.module.css";
import PropTypes from "prop-types";

const SpecificService = ({ service }) => {
  return (
    <div className={styles.serviceCard}>
      <img
        src={service.image}
        alt={service.title}
        className={styles.serviceImage}
      />
      <p className={styles.serviceTitle}>{service.title}</p>
    </div>
  );
};

SpecificService.propTypes = {
  service: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default SpecificService;
