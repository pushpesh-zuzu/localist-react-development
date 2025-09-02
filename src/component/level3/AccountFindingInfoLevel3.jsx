import Breadcrumb from "../common/BreadCrum/Breadcrum";
import styles from "./accountfindinginfolevel3.module.css";

const AccountFindingInfoLevel3 = ({
  findingHeading = "",
  breadcrumb,
  para1,
  para2,
  para3,
  isNeedS=false
}) => {
  return (
    <div className={styles.findAccountInfoContainer}>
      {/* <p className={styles.breadcrumb}> */}
      {/* {service && <span> {breadcrumb}</span>} */}
      <Breadcrumb
        breadcrumb={breadcrumb}
      />
      {/* </p> */}
      <div className={styles.infoContainer}>
        <h2 className={styles.title}>
          Vetted
          <span className={styles.highlight}> {findingHeading}{isNeedS?"s":""} </span>
           experts you can trust
        </h2>

        <div className={styles.descriptionContainer}>
          <p>
            {/* Looking for local accountants near me or reliable accountancy firms?
            Not sure who to trust with your accounting needs? */}
            {para1}
          </p>
          <p>
            {/* Localists will help you find the best quality accountants in your
            area. Whether you need help filing taxes, starting a business, or
            getting your finances on track, we simplify the process. Just tell
            us what you are looking for, and we will connect you with qualified
            accounting professionals in your local area. */}
            {para2}
          </p>
          <p>{para3}</p>
        </div>
        {/* <button className={styles.accountantBtn}>Find an {title} today</button> */}
      </div>
    </div>
  );
};

export default AccountFindingInfoLevel3;
