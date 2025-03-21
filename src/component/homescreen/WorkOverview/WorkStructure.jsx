import { WORK_STEPS } from "../../../constant/Homepage";
import StepsBox from "./StepsBox";
import styles from "./workstructure.module.css";

const WorkStructure = () => {
  return (
    <div className={styles.workContainer}>
      <div className={styles.header}>
        How <span>We Work</span>
      </div>
      <div className={styles.description}>
        Get Competitive Home Improvements quotes from leading suppliers in{" "}
        <span>3 Simples Step!</span>
      </div>
      <div className={styles.workstepContainer}>
        {WORK_STEPS.map((item) => (
          <StepsBox key={item.id} step={item} />
        ))}
      </div>
      <div className={styles.footer}>
        <button className={styles.quoteButton}>Get a Free Quote</button>
      </div>
    </div>
  );
};

export default WorkStructure;
