import React, { useState } from "react";
import styles from "./EditQuestion.module.css";
import { useNavigate } from "react-router-dom";

const initialQuestions = [
  "Which social media channels do you wish to use?",
  "What are your goals?",
  "Which of these are you looking to do?",
  "What type of business are you?",
  "What is your approximate monthly budget?",
  "How soon would you like the project to begin?",
  "How likely are you to make a hiring decision?",
];

const EditQuestion = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [editIndex, setEditIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const navigate = useNavigate();

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedText(questions[index]);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = editedText;
      setQuestions(updatedQuestions);
      setEditIndex(null);
      setEditedText("");
    }
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Edit a current question</h2>
        <p className={styles.subheading}>
          Which question would you like us to change?
        </p>

        <div className={styles.card}>
          {questions.map((question, index) => (
            <div
              key={index}
              className={styles.questionItem}
              onClick={() => handleEditClick(index)}
            >
              {editIndex === index ? (
                <input
                  className={styles.input}
                  value={editedText}
                  onChange={handleInputChange}
                  onBlur={handleSaveEdit}
                  autoFocus
                />
              ) : (
                <>
                  <span>{question}</span>
                  <span className={styles.arrow}>&#8250;</span>
                </>
              )}
            </div>
          ))}
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            Back
          </button>
          <button className={styles.saveButton}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
