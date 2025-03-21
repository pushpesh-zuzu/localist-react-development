import styles from "./averageprice.module.css";
import AveragePriceTable from "./AveragePriceTable";

const AveragePrice = () => {
  return (
    <div className={styles.averagePriceContainer}>

      <h1>The average price of Accountants is <span>£200</span></h1>

      <AveragePriceTable />
    </div>
  );
};

export default AveragePrice;
