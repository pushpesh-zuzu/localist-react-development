import PropTypes from "prop-types";
import styles from "./popularcity.module.css";

const CityBox = ({ city }) => {
  return (
    <div className={styles.cityBox}>
      <img src={city?.city_image} alt={city?.city_name} />

      <div className={styles.cityNameBtn}>
        <p className={styles.cityName}>{city?.city_name}</p>
        <button>{`Search ${city?.city_name}`}</button>
      </div>
    </div>
  );
};

export default CityBox;

CityBox.propTypes = {
  city: PropTypes.shape({
    city_image: PropTypes.string.isRequired,
    city_name: PropTypes.string.isRequired,
  }).isRequired,
};
