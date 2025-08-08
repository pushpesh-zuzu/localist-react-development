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
      <h2>
        The average price of {title} is {avg_price}
        <span></span>
      </h2>

      <AveragePriceTable AVERAGE_PRICE_LEVELTHREE={RELTED_PRICE} />
    </div>
  );
};

export default AveragePrice;
