import styles from "./HeroSectionNewPPC.module.css";
import NewPPCForm from "./NewPPCForm";
import H1 from "../UITypography/H1";

function HeroSectionNewPPC() {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.container}>
        {/* LEFT CONTENT */}
        <div className={styles.left}>
          <div className={styles.badge}>
            <span>✔</span> Trusted Driveway Specialists
          </div>

          <H1 className={`Inter ${styles.heading}`}>
            Local Expert <span>Driveway Installation</span> {""}
            Services Near You
          </H1>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.icon}>✓</div>
              <p>Vetted Professionals</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.icon}>₹</div>
              <p>Free Quotes</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.icon}>⚡</div>
              <p>Fast Response</p>
            </div>
          </div>

          <div className={styles.ctaRow}>
            <button className={styles.primaryBtn}>Find Professionals</button>
            <button className={styles.secondaryBtn}>Get Quotes Now</button>
          </div>
        </div>

        {/* RIGHT FORM */}

        <NewPPCForm />
      </div>
    </section>
  );
}

export default HeroSectionNewPPC;
