import React from "react";
import styles from "./SuggestQuestions.module.css";
import union from "../../../../assets/Images/SuggestQuestion/union.svg";
import editIcon from "../../../../assets/Images/SuggestQuestion/editIcon.svg";
import deleteIcon from "../../../../assets/Images/SuggestQuestion/deleteIcon.svg";

const SuggestQuestions = () => {
  const cards = [
    { icon: union, label: "Suggest a new question" },
    { icon: editIcon, label: "Edit a current question" },
    { icon: deleteIcon, label: "Suggest a question to remove" },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Are you sure that you want to leave?</h2>
      <p className={styles.subheading}>
        We're asking a few questions so we can find you the right pros, <br/> and send you quotes fast and free!
      </p>

      <div className={styles.cardWrapper}>
        {cards.map((card, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconWrapper}>
              <img src={card.icon} alt="icon" />
            </div>
            <p className={styles.label}>{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestQuestions;
