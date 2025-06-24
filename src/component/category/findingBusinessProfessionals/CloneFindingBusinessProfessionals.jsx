import styles from "./findingBusinessProfessionals.module.css";
const CloneFindingBusinessProfessionals = ({header,subHeader}) => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <span className={styles.title}>
          Find the Best {" "}
          <span className={styles.highlight}>{subHeader} Professionals </span>
          {" "}In Your Area
        </span>
        <div className={styles.descriptionContainer}>
          <p>
          At Localists, we connect you with the right Business Professionals for your local business
          </p>
          <p>
            Not sure how to find the right Business Professionals? Simply tell us what you need help with and where you need it, and we’ll recommend the best Business Professionals near you. See what they offer, check out their reviews, and get free quotation for the work you require.
            It's super fast and easy!
          </p>
          <p>Best of all - it&apos;s completely free!</p>
        </div>
        <button type="primary" className={styles.button}>
          Find a {subHeader} professional today
        </button>
      </div>
    </div>
  );
}

export default CloneFindingBusinessProfessionals