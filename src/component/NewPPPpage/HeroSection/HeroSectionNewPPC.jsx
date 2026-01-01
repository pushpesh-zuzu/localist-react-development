import styles from "./HeroSectionNewPPC.module.css";
import NewPPCForm from "./NewPPCForm";
import H1 from "../UITypography/H1";
import TrustedIcon from "../../../assets/ReactIcons/TrustedIcon";
import VettedProffessionIcon from "../../../assets/ReactIcons/VettedProffessionIcon";
import FreeQuoteIcon from "../../../assets/ReactIcons/FreeQuoteIcon";
import FastResponseIcon from "../../../assets/ReactIcons/FastResponseIcon";
import SearchWhiteIcon from "../../../assets/ReactIcons/SearchWhiteIcon";
import GetQuotesIcon from "../../../assets/ReactIcons/GetQuotesIcon";

function HeroSectionNewPPC() {
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.container}>
        {/* LEFT CONTENT */}
        <div className={styles.left}>
          <div className={styles.badge}>
            <TrustedIcon/> Trusted Driveway Specialists
          </div>

          <H1 className={`Inter ${styles.heading}`}>
            Local Expert <span>Driveway Installation</span> {""}
            Services Near You
          </H1>

          <div className={styles.features}>
            <div className={styles.feature}>
              {/* <div className={styles.icon}>✓</div> */}
              <VettedProffessionIcon/>
              <p>Vetted Professionals</p>
            </div>
            <div className={styles.feature}>
              {/* <div className={styles.icon}>₹</div> */}
              <FreeQuoteIcon/>
              <p>Free Quotes</p>
            </div>
            <div className={styles.feature}>
              <FastResponseIcon/>
              <p>Fast Response</p>
            </div>
          </div>

          <div className={styles.ctaRow}>
            <button className={`${styles.primaryBtn} `}>Find Professionals <SearchWhiteIcon /></button>
            <button className={`${styles.secondaryBtn}`} >Get Quotes Now <GetQuotesIcon/></button>
          </div>
        </div>

        {/* RIGHT FORM */}

        <NewPPCForm />
      </div>
    </section>
  );
}

export default HeroSectionNewPPC;
