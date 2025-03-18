import styles from "./findaccountant.module.css";

const AccountFindingInfo = () => {
  return (
    <div className={styles.findAccountInfoContainer}>
      <p className={styles.breadcrumb}>
        Business / Financial and Accounting / General Accounting / <span>Accounting</span>
      </p>

      <div className={styles.infoContainer}>
        <h1 className={styles.title}>
          Need help finding an
          <span className={styles.highlight}> Accountant?</span>
        </h1>

        <div className={styles.descriptionContainer}>
          <p>
            You can find the best Accountants on Localists. Start your search
            and get free quotes now!
          </p>
          <p>
            First time looking for an Accountant and not sure where to start?
            Tell us about your project and we’ll send you a list of Accountants
            to review. There’s no pressure to hire, so you can compare profiles,
            read previous reviews and ask for more information before you make
            your decision.
          </p>
          <p>Best of all - it&apos;s completely free!</p>
        </div>
        <button className={styles.accountantBtn}>
          Find an Accountant today
        </button>
      </div>
    </div>
  );
};

export default AccountFindingInfo;
