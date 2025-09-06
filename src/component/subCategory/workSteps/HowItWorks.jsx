// import { HowItWorksData } from "../../../constant/subCategory";
import { handleScrollToBottom } from "../../../utils/scroll";
import styles from "./HowItWorks.module.css";

const HowItWorks = ({ HowItWorksData = [] ,title }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        How <span className={styles.highlight}>Localists</span> Works
      </h2>
      <div className={styles.stepsContainer}>
        {HowItWorksData && HowItWorksData.map((item, index) => (
          <div className={styles.step} key={index}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.title} className={styles.icon} />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>
                {item.heading1} <br className={styles.lineBreak} />
                {item?.lBreak && <br className={styles.lineBreak} />}
                {/* <span className={styles.blueText}> {item.heading2}</span> */}
              </h3>

              <p className={styles.description}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => handleScrollToBottom()}
        className={styles.ctaButton}
      >
        {/* Get Quotes From {title}s Near You */}
        Get Quotes Now
      </button>
    </div>
  );
};

export default HowItWorks;
