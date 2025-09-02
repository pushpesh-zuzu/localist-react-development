import styles from "./averageprice.module.css";
import AveragePriceTable from "./AveragePriceTable";
import { AVERAGE_PRICE } from "../../../constant/subCategory";

const AveragePrice = ({
  title = "Accountants",
  avg_price = "£200",
  RELTED_PRICE,
}) => {
  return (
    <div className={styles.averagePriceContainer}>
      <h2 className={styles.heading}>
        Average cost of hiring {title} is <span>{avg_price}</span> specialists by region
        <span></span>
      </h2>

      <AveragePriceTable AVERAGE_PRICE_LEVELTHREE={RELTED_PRICE} />
    </div>
  );
};

export default AveragePrice;
