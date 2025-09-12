// import { WORK_STEPS } from "../../../constant/Homepage";
import styles from "./landinghowitwork.module.css";
import { handleScrollToBottom } from "../../../utils/scroll";
import LandingHowItWorkSteps from "./LandingHowItWorkSteps";

const LandingHowItWork = ({WORK_STEPS}) => {
  return (
    <div className={styles.workContainer}>
      <h3 className={styles.header}>
        How <span>We Work</span>
      </h3>
      <div className={styles.description}>
        Get competitive home improvement quotes from leading suppliers in{" "}
        <span>3 simple steps!</span>
      </div>
      <div className={styles.workstepContainer}>
        {WORK_STEPS.map((item) => (
          <LandingHowItWorkSteps key={item.id} step={item} />
        ))}
      </div>
      <div className={styles.footer}>
        <button className={styles.quoteButton} onClick={handleScrollToBottom}>Get a Free Quote</button>
      </div>
      
    </div>
  );
};

export default LandingHowItWork;
