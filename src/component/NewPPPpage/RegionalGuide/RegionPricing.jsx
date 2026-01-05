import styles from "./RegionPricing.module.css";
import LocationPinIcon from "../../../assets/ReactIcons/LocationPinIcon";
import H5 from '../UITypography/H5';
import Paragrah from '../UITypography/Paragrah';

export default function RegionPricing({regionPricingData}) {
  return (
    <div className={styles.grid}>
      {regionPricingData.map((item, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.header}>
            <span className={styles.icon}>
              <LocationPinIcon size={18} />
            </span>
            <H5>{item.region}</H5>
          </div>

          <div className={styles.list}>
            {item.prices.map((price, i) => (
              <div key={i} className={styles.row}>
                <Paragrah className={styles.label}>{price.label}</Paragrah>
                <Paragrah className={styles.value} bold={false}>{price.value}</Paragrah>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
