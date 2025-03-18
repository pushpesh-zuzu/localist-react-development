import styles from "./HowLoaclistsWorks.module.css";

const HowLoaclistsWorks = () => {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.headingContainer}>
          <p>
            How <span className={styles.blueText}>Localists.com</span> Works
          </p>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.innerformContainer}>
            <h2>
              Now you know how it works, start looking for a professional.
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

export default HowLoaclistsWorks;
