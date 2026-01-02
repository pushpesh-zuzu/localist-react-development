// ProcessSteps.jsx
import { processSteps } from "./processStepsData";
import ProcessStepCard from "./ProcessStepCard";
import styles from "./ProcessSteps.module.css";

const ProcessSteps = () => {
  return (
    <section className={styles.container}>
      {processSteps.map((item) => (
        <ProcessStepCard
          key={item.id}
          step={item.id}
          title={item.title}
          description={item.description}
          badges={item.badges}
        />
      ))}
    </section>
  );
};

export default ProcessSteps;
