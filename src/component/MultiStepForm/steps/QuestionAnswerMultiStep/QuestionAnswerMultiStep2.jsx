import { useState, useEffect } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setbuyerRequestData } from "../../../../store/Buyer/BuyerSlice";
import { message } from "antd";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";
import { useLocation } from "react-router";
import styles from "./QuestionAnswerMultiStep.module.css";
import { handleScrollToBottom } from "../../../../utils/scroll";

const QuestionAnswerMultiStep2 = ({
  questions = [],
  onNext,
  onBack,
  getProgressPercentage,
  isComingFromStep3 = false,
  setQuestionHistory,
  questionHistory,
  setIsComingFromStep3,
  setProgressPercentage,
  loading = true,
  serviceName = "Landscaping",
  isQuestionWithImage = false,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest, requestLoader, citySerach } = useSelector(
    (state) => state.buyer
  );
  const { service } = useSelector((state) => state.findJobs);

  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");

  const totalQuestions = questions?.length || 1;
  const formattedQuestions = questions.map((q) => ({
    ...q,
    parsedAnswers: Array.isArray(q.answer)
      ? q.answer
      : (() => {
          try {
            return JSON.parse(q.answer);
          } catch (e) {
            return [];
          }
        })(),
  }));

  const questionIndexMap = {};
  formattedQuestions.forEach((q, index) => {
    questionIndexMap[q.question_no] = index;
  });
  useEffect(() => {
    if (isComingFromStep3 && buyerRequest?.questions?.length > 0) {
      setCurrentQuestion(3);
    }
  }, [isComingFromStep3]);
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
      setOtherText(
        savedArray.includes("Something else (please describe)")
          ? otherVal || ""
          : ""
      );
    }
    handleScrollToBottom();
  }, [currentQuestion, buyerRequest, questions]);

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    const isSingle = questions[currentQuestion]?.option_type === "single";

    if (isSingle) {
      setSelectedOption([value]);
      setError("");

      if (value !== "Something else (please describe)") {
        setTimeout(() => {
          handleNext([value]);
        }, 150);
      }
    } else {
      setSelectedOption((prev) =>
        checked ? [...prev, value] : prev.filter((opt) => opt !== value)
      );
      setError("");
    }
  };

  const handleNextCheckBox = () => {
    if (selectedOption.length === 0) {
      setError("Please select at least one option.");
      return;
    }

    if (
      selectedOption.includes("Something else (please describe)") &&
      (!otherText.trim() ||
        otherText.trim().toLowerCase() === "something else (please describe)")
    ) {
      setError("Please enter a value for 'Other' option.");
      return;
    }

    const finalAnswer = selectedOption?.map((opt) =>
      opt.toLowerCase() === "something else (please describe)" ? otherText : opt
    );

    const updatedAnswer = {
      ques: questions[currentQuestion]?.questions,
      ans: finalAnswer.join(", "),
    };

    const previousAnswers = buyerRequest?.questions || [];
    const updatedAnswers = [...previousAnswers];
    updatedAnswers[currentQuestion] = updatedAnswer;

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));
    const percentage = (100 * 2) / (totalQuestions * 3);
    getProgressPercentage(percentage);
    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selectedOption[0]
    );

    const nextQ = selectedObj?.next_question;
    if (nextQ === Number(nextQ)) {
      dispatch(
        setbuyerRequestData({
          service_id: service?.id || buyerRequest?.service_id,
          postcode: buyerRequest?.postcode,
          city: citySerach,
          questions: updatedAnswers,
        })
      );
      onNext();
    }
    if (nextQ === "last") {
      onNext();
      const firstStepProgress = (2 / 3) * 100;
      const remainingProgressPerStep = (100 - firstStepProgress) / 2;
      getProgressPercentage(remainingProgressPerStep);
    } else if (nextQ && questionIndexMap[nextQ]) {
      setQuestionHistory((prev) => [...prev, questionIndexMap[nextQ]]);
      setCurrentQuestion(questionIndexMap[nextQ]);
    } else {
      if (currentQuestion < totalQuestions - 1) {
        setQuestionHistory((prev) => [...prev, currentQuestion + 1]);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onNext();
      }
    }
  };
  const handleNext = (selected) => {
    if (selected.length === 0) {
      setError("Please select at least one option.");
      return;
    }

    if (
      selected.includes("Something else (please describe)") &&
      (!otherText.trim() ||
        otherText.trim().toLowerCase() === "something else (please describe)")
    ) {
      setError("Please enter a value for 'Other' option.");
      return;
    }

    const finalAnswer = selected.map((opt) =>
      opt.toLowerCase() === "something else (please describe)" ? otherText : opt
    );

    const updatedAnswer = {
      ques: questions[currentQuestion]?.questions,
      ans: finalAnswer.join(", "),
    };

    const previousAnswers = buyerRequest?.questions || [];
    const updatedAnswers = [...previousAnswers];
    updatedAnswers[currentQuestion] = updatedAnswer;

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    const percentage = (100 * 2) / (totalQuestions * 3);

    getProgressPercentage(percentage);

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selected[0]
    );

    const nextQ = selectedObj?.next_question;

    let nextIndex = null;

    if (nextQ === Number(nextQ)) {
      onNext();
      return;
    } else if (nextQ === "last") {
      const firstStepProgress = (2 / 3) * 100;
      const remainingProgressPerStep = (100 - firstStepProgress) / 2;
      getProgressPercentage(remainingProgressPerStep);
      onNext();
      return;
    } else if (nextQ && questionIndexMap[nextQ]) {
      nextIndex = questionIndexMap[nextQ];
    } else if (currentQuestion < totalQuestions - 1) {
      nextIndex = currentQuestion + 1;
    }

    if (nextIndex !== null) {
      if (!questionHistory.includes(nextIndex)) {
        setQuestionHistory((prev) => [...prev, nextIndex]);
      }
      setCurrentQuestion(nextIndex);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    setIsComingFromStep3(false);
    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevIndex = newHistory[newHistory.length - 1];
      setQuestionHistory(newHistory);
      setCurrentQuestion(prevIndex);
      const percentage = (100 * 2) / (totalQuestions * 3);

      currentQuestion > 1 && getProgressPercentage(-percentage);
      currentQuestion === 1 &&
        setProgressPercentage((100 * 2) / (totalQuestions * 3));
    } else {
      onBack();
    }
  };

  useEffect(() => {
    setOtherText("");
    setError("");
  }, [currentQuestion]);

  return loading ? (
    <div className={styles.loaderContainer}>
      <Spin size="large" />
    </div>
  ) : (
    <CardLayoutWrapper
      title={
        currentQuestion === 0
          ? !isQuestionWithImage
            ? "Welcome to Localists!"
            : ""
          : formattedQuestions[currentQuestion]?.questions
      }
      onButtonClick={handleNextCheckBox}
      onBackClick={handleBack}
      showBackButton={currentQuestion === 0 ? false : true}
      disableNextButton={
        formattedQuestions[currentQuestion]?.option_type === "single" &&
        !buyerRequest?.questions?.some(
          (q) => q.ques === formattedQuestions[currentQuestion]?.questions
        ) &&
        !selectedOption.includes("Something else (please describe)")
      }
      buttonText="Next"
      headingCenter={currentQuestion === 0 ? false : true}
      subtitle={
        currentQuestion === 0
          ? !isQuestionWithImage
            ? "To find the ideal landscaping specialist for your project, simply complete the quick form below."
            : ""
          : ""
      }
    >
      {currentQuestion === 0 && isQuestionWithImage && (
        <div
          className={`${
            serviceName === "Patio Services"
              ? styles.headerImage
              : serviceName === "Artificial Grass Installation"
              ? styles.headerImage1
              : serviceName === "General Builders"
              ? styles.headerImage2
              : serviceName === "Driveway Installation"
              ? styles.headerImage3
              : serviceName === "Fence & Gate Installation"
              ? styles.headerImage4
              : serviceName === "Gardening"
              ? styles.headerImage5
              : serviceName === "Home and Garden"
              ? styles.headerImage6
              : serviceName === "Landscaping"
              ? styles.headerImage7
              : serviceName === "Gate Installation"
              ? styles.headerImage8
              : styles.headerImage
          } ${styles.bannerMargin}`}
        />
      )}{" "}
      {currentQuestion === 0 && (
        <h2
          style={{
            textAlign: isQuestionWithImage ? "center" : "left",
            maxWidth: "86%",
            margin: isQuestionWithImage ? "auto" : "",
            marginBottom: "10px",
          }}
          className={styles.question1}
        >
          {formattedQuestions[currentQuestion]?.questions}
        </h2>
      )}
      <div className={styles.optionsContainer}>
        {formattedQuestions[currentQuestion]?.parsedAnswers.map(
          (opt, index) => {
            const isSelected = selectedOption.includes(opt.option);
            return (
              <label
                key={index}
                className={
                  formattedQuestions[currentQuestion]?.option_type === "single"
                    ? styles.option
                    : styles.options
                }
                style={{
                  boxShadow: isSelected
                    ? "0px 4px 4px 0px rgba(0, 0, 0, 0.15)"
                    : "none",
                }}
              >
                <input
                  type={
                    formattedQuestions[currentQuestion]?.option_type ===
                    "single"
                      ? "radio"
                      : "checkbox"
                  }
                  name="surveyOption"
                  value={opt.option}
                  checked={selectedOption.includes(opt.option)}
                  onChange={handleOptionChange}
                  onClick={(e) => {
                    const isSingle =
                      formattedQuestions[currentQuestion]?.option_type ===
                      "single";
                    if (isSingle && selectedOption.includes(opt.option)) {
                      handleNext([e.target.value]);
                    }
                  }}
                />
                <span>{opt.option}</span>
              </label>
            );
          }
        )}

        {formattedQuestions[currentQuestion]?.answer?.includes(
          "Something else (please describe)"
        ) &&
          selectedOption.includes("Something else (please describe)") && (
            <input
              type="text"
              placeholder="Please enter...."
              className={styles.otherInput}
              value={otherText}
              onChange={(e) => {
                setOtherText(e.target.value);
              }}
            />
          )}
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </CardLayoutWrapper>
  );
};

export default QuestionAnswerMultiStep2;
