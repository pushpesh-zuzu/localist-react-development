import React from "react";
import styles from "./FindAccountantInLocation.module.css";

const FindAccountantToday = () => {
  return (
    <div className={styles.findAccountInfoContainer}>
      <p className={styles.breadcrumb}>
        Business / Financial and Accounting / General Accounting / Accounting /{" "}
        <span>Derbyshire</span>
      </p>

      <div className={styles.infoContainer}>
        <h1 className={styles.title}>
          Looking for an
          <span className={styles.highlight}> Accountant? </span>
          in Derbyshire?
        </h1>

        <div className={styles.descriptionContainer}>
          <p>
            You’ll find the best Accountants near you on Bark. Start your search
            and get free quotes today!
          </p>
          <p>
            First time looking for an Accountant and not sure where to start?
            Let us do the legwork for you. Tell us about your project and we’ll
            send you a list of the top Accountants in Derbyshire to review.
            Whether you’re looking for quotes or you want to speak to some local
            professionals, we’ll connect you with the best Accountants for the
            job.
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

export default FindAccountantToday;
