import React from "react";
import styles from "./GrowthSteps.module.css";
import { GrowthStepsData } from "../../../constant/ServicePanel";
import { useNavigate } from "react-router-dom";

const GrowthSteps = () => {
  const navigate = useNavigate()
  
  return (
    <>
      <div className={styles.growContainer}>
        <div className={styles.growHeader}>
          <div className={styles.container}>
            {GrowthStepsData.map((item) => (
              <div className={styles.card} key={item.id}>
                <div className={styles.header}>
                  <div className={styles.iconContainer}>
                    <img src={item.image} alt="icon" className={styles.icon} />
                  </div>
                  <h3 className={styles.title}>
                    {item.title1} <span>{item.title2}</span>
                  </h3>
                </div>
                <ul className={styles.list}>
                  <li>{item.Description1}</li>
                  <li>{item.Description2}</li>
                  <li>{item.Description3}</li>
                </ul>
                <button className={styles.button} onClick={() => navigate(item.path)}>{item.button}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default GrowthSteps;
