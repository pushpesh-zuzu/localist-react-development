import styles from "./averageprice.module.css";

const AveragePriceTable = ({ AVERAGE_PRICE_LEVELTHREE }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>Service Area</th>
            <th className={styles.th}>Budget Value</th>
            <th className={styles.th}>Standard Rate</th>
            <th className={styles.th}>Premium Rate</th>
          </tr>
        </thead>
        <tbody>
          {AVERAGE_PRICE_LEVELTHREE.map((row, index) => (
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
