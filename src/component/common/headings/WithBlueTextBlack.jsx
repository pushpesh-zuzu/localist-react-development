import styles from "./withbluetextblack.module.css";
function WithBlueTextBlack({
  firstblueText = "",
  secondText = "",
  firstblue = true,
}) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        {firstblue ? (
          <>
            <span className={styles.primaryText}>{firstblueText} </span>{" "}
            <span className={styles.textColor}>{secondText}</span>
          </>
        ) : (
          <>
            <span className={styles.textColor}>{secondText} </span>
            <span className={styles.primaryText}>{firstblueText}</span>
          </>
        )}
      </h2>
    </div>
  );
}

export default WithBlueTextBlack;
