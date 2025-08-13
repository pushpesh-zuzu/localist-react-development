import { handleScrollToBottom } from "../../../utils/scroll";
import styles from "./HowWeWork.module.css";

const HowWeWork = ({
  title,
  isNeedS = true,
  HowWeWorkLocationData,
  heading = "",
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        How{" "}
        <span className={styles.highlight}>
          {heading ? heading : "We"} Work
        </span>
      </h2>
      <div className={styles.stepsContainer}>
        {HowWeWorkLocationData?.map((item, index) => (
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
      <button
        onClick={() => handleScrollToBottom()}
        className={styles.ctaButton}
      >
        Get quotes from {title}
        {isNeedS ? "s" : ""} near you
      </button>
    </div>
  );
};

export default HowWeWork;
