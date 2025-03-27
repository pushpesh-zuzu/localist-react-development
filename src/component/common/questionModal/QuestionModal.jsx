import { useState } from "react";
import { Progress, Spin } from "antd";
import styles from "./QuestionModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setbuyerRequestData, } from "../../../store/Buyer/BuyerSlice";

const QuestionModal = ({ questions, onClose, nextStep, previousStep ,loading,formData}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [otherText, setOtherText] = useState("");
  const {buyerRequest} = useSelector((state)=> state.buyer)

const dispatch = useDispatch()
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const totalQuestions = questions?.length;
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleNext = () => {
    const updatedAnswer = {
      ques: questions[currentQuestion]?.questions,
      ans: selectedOption.toLowerCase() === "other" ? otherText : selectedOption
    };
  console.log(updatedAnswer,"prem")
// dispatch(setQuestions(updatedAnswer))
const previousAnswers = buyerRequest?.questions || [];

// Add the new answer to the existing array
const updatedAnswers = [...previousAnswers, updatedAnswer];

// Dispatch the updated answers to Redux inside `questions` array
dispatch(setbuyerRequestData({ questions: updatedAnswers }));
 
    if (currentQuestion < totalQuestions - 1) {
      setSelectedOption("");
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
