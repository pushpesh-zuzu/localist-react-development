import Breadcrumb from "../common/BreadCrum/Breadcrum";
import styles from "./accountfindinginfolevel3.module.css";

const AccountFindingInfoLevel3 = ({
  findingHeading = "",
  breadcrumb,
  para1 = "",
  para2 = "",
  para3 = "",
  para4 = "",
  isNeedS = false,
}) => {
  return (
    <div className={styles.findAccountInfoContainer}>
      {/* <p className={styles.breadcrumb}> */}
      {/* {service && <span> {breadcrumb}</span>} */}

      {/* </p> */}
      <div className={styles.infoContainer}>
        <Breadcrumb breadcrumb={breadcrumb} />
        <h2 className={styles.title}>
          Vetted{" "}
          <span className={styles.highlight}>
            {" "}
            {findingHeading}
            {isNeedS ? "s" : ""}{" "}
          </span>{" "}
          you can trust
        </h2>

        <div className={styles.descriptionContainer}>
          {/* Looking for local accountants near me or reliable accountancy firms?
            Not sure who to trust with your accounting needs? */}
          {para1 !== "" && <p>{para1}</p>}
          {para2 !== "" && <p>{para2}</p>}
          {para3 !== "" && <p>{para3}</p>}
          {para4 !== "" && <p>{para4}</p>}
        </div>
        {/* <button className={styles.accountantBtn}>Find an {title} today</button> */}
      </div>
    </div>
  );
};

export default AccountFindingInfoLevel3;
