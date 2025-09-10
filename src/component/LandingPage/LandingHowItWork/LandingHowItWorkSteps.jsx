import styles from "./landinghowitwork.module.css";
import PropTypes from "prop-types";

const LandingHowItWorkSteps = ({ step }) => {
  return (
    <div className={styles.stepContainer}>
      <div className={styles.descriptionIcon}>
        <img src={step.icon} alt="Step Icon" />
      </div>

      <div className={styles.stepDescription}>{step.description}</div>
    </div>
  );
};

LandingHowItWorkSteps.propTypes = {
  step: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default LandingHowItWorkSteps;
