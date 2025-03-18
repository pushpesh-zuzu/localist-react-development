import { PopularCitiesData } from "../../../constant/Location";
import CityBoxLocation from "./CityBoxLocation";
import styles from "./PopularCitiesLocation.module.css";

const PopularCitiesLocation = () => {
  return (
    <>
      <div className={styles.popularcityContainer}>
        <div>
          <h1>
            Popular Cities in <span>Derbyshire</span>
          </h1>

          <div className={styles.cityContainer}>
            {PopularCitiesData.map((city) => (
              <CityBoxLocation key={city?.city_name} city={city} />
            ))}
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default PopularCitiesLocation;
