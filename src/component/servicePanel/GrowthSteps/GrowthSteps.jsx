import React, { useState } from "react";
import styles from "./GrowthSteps.module.css";
import { GrowthStepsData } from "../../../constant/ServicePanel";
import { useNavigate } from "react-router-dom";
import LeadInfoModal from "./LeadStaticModal";

const GrowthSteps = () => {
  
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    if (item?.id === 2) {
      setShowModal(true);
    } else {
      navigate(item.path);
    }
  };
  return (
    <>
      <div className={styles.growContainer}>
        <div className={styles.growHeader}>
          <div className={styles.container}>
            {GrowthStepsData.map((item) => (
              <div className={styles.card} key={item.id}>
               <div>
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
               </div>
                {/* <button className={styles.button} onClick={() => navigate(item.path)}>{item.button}</button> */}
                <button
                  className={styles.button}
                  onClick={() => handleCardClick(item)}
                >
                  {item.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LeadInfoModal visible={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
export default GrowthSteps;
