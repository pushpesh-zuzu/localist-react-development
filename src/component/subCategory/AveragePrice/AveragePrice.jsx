import styles from "./averageprice.module.css";
import AveragePriceTable from "./AveragePriceTable";
import { AVERAGE_PRICE } from "../../../constant/subCategory";

const AveragePrice = ({
  title = "Accountants",
  avg_price ,
  RELTED_PRICE,
  showSpeicialits=false
}) => {
  function capitalizeEachWord(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
  return (
    <div className={styles.averagePriceContainer}>
      <h2 className={styles.heading}>
        Average cost of hiring {title} is {avg_price && <span>{avg_price}</span> }{" "}{showSpeicialits && 'specialists'} by region
        <span></span>
      </h2>

      <AveragePriceTable AVERAGE_PRICE_LEVELTHREE={RELTED_PRICE} />
    </div>
  );
};

export default AveragePrice;
