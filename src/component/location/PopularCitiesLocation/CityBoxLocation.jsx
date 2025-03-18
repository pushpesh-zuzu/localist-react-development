import PropTypes from "prop-types";
import styles from "./PopularCitiesLocation.module.css";

const CityBoxLocation = ({ city }) => {
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

export default CityBoxLocation;

CityBoxLocation.propTypes = {
  city: PropTypes.shape({
    city_image: PropTypes.string.isRequired,
    city_name: PropTypes.string.isRequired,
  }).isRequired,
};
