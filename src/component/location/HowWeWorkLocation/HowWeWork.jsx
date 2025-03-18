import { HowWeWorkLocationData } from "../../../constant/Location";
import styles from "./HowWeWork.module.css";

const HowWeWork = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        How <span className={styles.highlight}>We Work</span>
      </h2>
      <div className={styles.stepsContainer}>
        {HowWeWorkLocationData.map((item, index) => (
          <div className={styles.step} key={index}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.title} className={styles.icon} />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>
                {item.heading1}
                <span className={styles.blueText}> {item.heading2}</span>
              </h3>

              <p className={styles.description}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.ctaButton}>
        Get quotes from Accountants near you
      </button>
    </div>
  );
};

export default HowWeWork;
