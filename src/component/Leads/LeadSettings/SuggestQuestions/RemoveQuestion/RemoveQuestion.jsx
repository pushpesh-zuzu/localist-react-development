import React, { useState } from "react";
import styles from "./RemoveQuestion.module.css";
import { useNavigate } from "react-router-dom";

const questions = [
  "Which social media channels do you wish to use?",
  "What are your goals?",
  "Which of these are you looking to do?",
  "What type of business are you?",
  "What is your approximate monthly budget?",
  "How soon would you like the project to begin?",
  "How likely are you to make a hiring decision?",
];

const RemoveQuestion = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Suggest a question to remove</h2>
        <p className={styles.subheading}>
          Which question would you like us to remove?
        </p>

        <div className={styles.card}>
          <div className={styles.radioGroup}>
            {questions.map((question, index) => (
              <label key={index} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="question"
                  value={question}
                  checked={selected === question}
                  onChange={() => setSelected(question)}
                />
                <span className={styles.radioText}>{question}</span>
              </label>
            ))}
          </div>

          <div className={styles.reasonContainer}>
            <label className={styles.label}>Reason</label>
            <textarea
              className={styles.textarea}
              placeholder="Why should we remove this question?"
            />
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
              Back
            </button>
            <button className={styles.saveButton}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveQuestion;
