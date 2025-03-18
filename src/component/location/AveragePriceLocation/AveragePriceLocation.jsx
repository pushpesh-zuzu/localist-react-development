import styles from "./AveragePriceLocation.module.css";

const AveragePriceLocation = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        The average price of <strong>Accountants</strong> in{" "}
        <strong>Derbyshire</strong> is{" "}
        <span className={styles.price}>£200</span>
      </p>
    </div>
  );
};

export default AveragePriceLocation;
