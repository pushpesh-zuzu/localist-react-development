import { AVERAGE_PRICE } from "../../../constant/subCategory";
import styles from "./averageprice.module.css";

const AveragePriceTable = () => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Region</th>
            <th className={styles.th}>Great Value</th>
            <th className={styles.th}>Average</th>
            <th className={styles.th}>Premium</th>
          </tr>
        </thead>
        <tbody>
          {AVERAGE_PRICE.map((row, index) => (
            <tr key={index} className={styles.tr}>
              <td className={styles.td}>{row?.Region}</td>
              <td className={styles.td}>{row["Great Value"]}</td>
              <td className={styles.td}>{row.Average}</td>
              <td className={styles.td}>{row.Premium}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AveragePriceTable;
