import { useState, useEffect } from "react";
import { Progress, Spin } from "antd";
import styles from "./QuestionModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setbuyerRequestData,
  setBuyerStep,
} from "../../../store/Buyer/BuyerSlice";

const QuestionModal = ({
  questions = [],
  onClose,
  nextStep,
  previousStep,
  loading,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest } = useSelector((state) => state.buyer);

  const lastQuestionIndex =
    buyerRequest?.questions?.length > 0 ? buyerRequest.questions.length - 1 : 0;
  const [currentQuestion, setCurrentQuestion] = useState(lastQuestionIndex);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
console.log(buyerRequest,"buyer")
  useEffect(() => {
    if (questions.length > 0 && currentQuestion === -1) {
      setCurrentQuestion(0);
    }
  }, [questions]);

  useEffect(() => {
    if (questions.length > 0 && buyerRequest?.questions?.length > 0) {
      const savedAnswer = buyerRequest.questions[currentQuestion]?.ans || [];

      const savedArray =
        typeof savedAnswer === "string"
          ? savedAnswer.split(",").map((a) => a.trim())
          : savedAnswer;

      setSelectedOption(savedArray);
      const otherVal = savedArray.find(
        (ans) =>
          ans.toLowerCase() !== "yes" &&
          ans.toLowerCase() !== "no" &&
          ans.toLowerCase() !== "maybe"
      );
      setOtherText(savedArray.includes("other") ? otherVal || "" : "");
    }
  }, [currentQuestion, buyerRequest, questions]);

  const totalQuestions = questions?.length;
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    let updatedOptions = [...selectedOption];

    if (checked) {
      updatedOptions.push(value);
    } else {
      updatedOptions = updatedOptions.filter((opt) => opt !== value);
    }

    setSelectedOption(updatedOptions);
    setError("");
  };

  const handleNext = () => {
    if (selectedOption.length === 0) {
      setError("Please select at least one option.");
      return;
    }

    if (
      selectedOption.includes("other") &&
      (!otherText.trim() || otherText.trim().toLowerCase() === "other")
    ) {
      setError("Please enter a value for 'Other' option.");
      return;
    }

    const finalAnswer = selectedOption.map((opt) =>
      opt.toLowerCase() === "other" ? otherText : opt
    );

    const updatedAnswer = {
      ques: questions[currentQuestion]?.questions,
      ans: finalAnswer.join(", "),
    };

    const previousAnswers = buyerRequest?.questions || [];
    const updatedAnswers = [...previousAnswers];
    updatedAnswers[currentQuestion] = updatedAnswer;

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      nextStep();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      if (buyerRequest?.questions?.length > 0) {
        setCurrentQuestion(buyerRequest.questions.length - 1);
      }
      previousStep();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          disabled={loading}
        >
          ✖
        </button>

        {loading ? (
          <div className={styles.loaderContainer}>
            <Spin size="large" />
          </div>
        ) : questions.length > 0 ? (
          <>
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

            <div className={styles.optionsContainer}>
              {questions[currentQuestion]?.answer
                ?.split(",")
                .map((option, index) => (
                  <label key={index} className={styles.option}>
                    <input
                      type="checkbox"
                      name="surveyOption"
                      value={option.trim()}
                      checked={selectedOption.includes(option.trim())}
                      onChange={handleOptionChange}
                    />
                    {option.trim()}
                  </label>
                ))}
            </div>

            {selectedOption.includes("other") && (
              <input
                type="text"
                placeholder="Please Enter..."
                className={styles.input}
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
              />
            )}

            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.buttonContainer}>
              {currentQuestion > 0 && (
                <button
                  onClick={handleBack}
                  disabled={currentQuestion === 0}
                  className={styles.backButton}
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={loading}
                className={styles.nextButton}
              >
                {currentQuestion === totalQuestions - 1 ? "Next" : "Next"}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default QuestionModal;
