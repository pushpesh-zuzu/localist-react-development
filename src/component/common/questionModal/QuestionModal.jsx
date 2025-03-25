import { useState } from "react";
import { Progress, Spin } from "antd";
import styles from "./QuestionModal.module.css";

const QuestionModal = ({ questions, onClose, nextStep, previousStep ,loading}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [otherText, setOtherText] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const totalQuestions = questions?.length;
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      nextStep();
    }
  };

  return (
    <>
    
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>

        <div className={styles.headerImage}>
          <h2>{questions[currentQuestion]?.questions}</h2>
          <Progress
            percent={progressPercent}
            strokeColor="#00AFE3"
            trailColor="#EDEDED"
            strokeWidth={3}
            showInfo={false}
            className={styles.customProgress}
          />
        </div>
        {loading ? <Spin/> : <>
        <div className={styles.optionsContainer}>
          {questions[currentQuestion]?.answer
            ?.split(",")
            .map((option, index) => (
              <label key={index} className={styles.option}>
                <input
                  type="radio"
                  name="surveyOption"
                  value={option?.trim()}
                  onChange={handleOptionChange}
                />
                {option?.trim()}
              </label>
            ))}
        </div>
        {selectedOption.toLowerCase() === "other" && (
        <input
          type="text"
          placeholder="Please Enter..."
          className={styles.input}
          value={otherText}
          onChange={(e) => setOtherText(e.target.value)}
        />
      )}
      </>
    }
        <div className={styles.buttonContainer}>
          <button
            onClick={previousStep}
            disabled={currentQuestion === 0}
            className={styles.backButton}
          >
            Back
          </button>
          <button onClick={handleNext} className={styles.nextButton}>
            {currentQuestion === totalQuestions - 1 ? "Next" : "Next"}
          </button>
        </div>
      </div>
    </div>

  </>
  );
};

export default QuestionModal;
