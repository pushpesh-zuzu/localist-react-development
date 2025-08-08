import styles from "./findaccountant.module.css";

const AccountFindingInfo = ({
  title = "Accountant",
  findingHeading = "Accounting",
  breadcrumb = "Business / Financial and Accounting / General Accounting",
}) => {
  return (
    <div className={styles.findAccountInfoContainer}>
      <p className={styles.breadcrumb}>
        {breadcrumb} /<span>{findingHeading}</span>
      </p>

      <div className={styles.infoContainer}>
        <h1 className={styles.title}>
          Find the Best
          <span className={styles.highlight}> {title} </span>
          In Your Area
        </h1>

        <div className={styles.descriptionContainer}>
          <p>
            Looking for local accountants near me or reliable accountancy firms?
            Not sure who to trust with your accounting needs?
          </p>
          <p>
            Localists will help you find the best quality accountants in your
            area. Whether you need help filing taxes, starting a business, or
            getting your finances on track, we simplify the process. Just tell
            us what you are looking for, and we will connect you with qualified
            accounting professionals in your local area.
          </p>
          <p>Start your search now and obtain free, no obligation quotes.</p>
        </div>
        {/* <button className={styles.accountantBtn}>Find an {title} today</button> */}
      </div>
    </div>
  );
};

export default AccountFindingInfo;
