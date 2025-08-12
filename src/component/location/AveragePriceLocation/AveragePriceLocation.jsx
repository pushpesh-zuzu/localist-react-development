import styles from "./AveragePriceLocation.module.css";

const AveragePriceLocation = ({title,locationName,isNeedS=true}) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        The average price of <strong>{title}{isNeedS?'s':''}</strong> in{" "}
        <strong>{locationName}</strong> is{" "}
        <span className={styles.price}>£200</span>
      </p>
    </div>
  );
};

export default AveragePriceLocation;
