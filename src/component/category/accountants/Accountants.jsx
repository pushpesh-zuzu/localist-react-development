import styles from "./accountants.module.css";

const Accountants = () => {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.headingContainer}>
          <p>
            Find <span className={styles.blueText}>Business professionals</span>{" "}
            near you
          </p>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.innerformContainer}>
            <h2>
              Where do you need{" "}
              <span className={styles.blueText}>Accountants?</span>
            </h2>
            <div className={styles.inputGroup}>
              <div className={styles.inputBox}>
                <label>What service do you need?</label>
                <input
                  type="text"
                  placeholder="Driveway Installation, Gardening Services, etc..."
                />
              </div>
              <div className={styles.inputBox}>
                <label>Where do you need it?</label>
                <input type="text" placeholder="Enter your postcode or town" />
              </div>
            </div>
            <button className={styles.button}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accountants;
