import { POPULAR_CITIES } from "../../../constant/subCategory";
import CityBox from "./CityBox";
import styles from "./popularcity.module.css";

const PopularCity = ({POPULAR_CITIES_LEVERL_THREE=POPULAR_CITIES}) => {
  return (
    <div className={styles.popularcityContainer}>
      <div>
        <h1>
          Popular <span>Cities</span>
        </h1>

        <div className={styles.cityContainer}>
          {POPULAR_CITIES_LEVERL_THREE.map((city) => (
            <CityBox key={city?.city_name} city={city} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCity;
