import { useState, useEffect } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setbuyerRequestData } from "../../../../store/Buyer/BuyerSlice";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";
import styles from "./QuestionAnswerMultiStep.module.css";
import { handleScrollToBottom } from "../../../../utils/scroll";
import BannerImagesQuestion from "../BannerImagesQuestion/BannerImagesQuestion";

const QuestionAnserMultiStepDriways2 = ({
  questions = [],
  onNext,
  onBack,
  isComingFromStep3 = false,
  setQuestionHistory,
  questionHistory,
  setIsComingFromStep3,
  setProgressPercentage,
  loading = true,
  serviceName = "Driveway Installers",
  isQuestionWithImage = false,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest, citySerach } = useSelector((state) => state.buyer);
  const { service } = useSelector((state) => state.findJobs);
  const [specialFlowPercentage, SpecialFlowPercentage] = useState(70);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(1);

  const totalQuestions = questions?.length || 1;

  const calculateProgress = () => {
    const progress = (totalQuestionsAnswered / 7) * specialFlowPercentage;
    return Math.min(progress, specialFlowPercentage);
  };

  const progressPercent = calculateProgress();

  useEffect(() => {
    setProgressPercentage(progressPercent);
  }, [progressPercent, setProgressPercentage]);

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
    questionIndexMap[q?.question_no] = index;
  });

  useEffect(() => {
    if (isComingFromStep3 && buyerRequest?.questions?.length > 0) {
      setCurrentQuestion(4);
      setTotalQuestionsAnswered(5);
    }
  }, [isComingFromStep3]);
  useEffect(() => {
    if (questions.length > 0 && buyerRequest?.questions?.length > 0) {
      const currentQuestionText = questions[currentQuestion]?.questions;

      const savedQuestion = buyerRequest?.questions.find(
        (q) => q?.ques === currentQuestionText
      );

      const savedAnswer = savedQuestion?.ans || [];
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
  useEffect(() => {
    if (buyerRequest && Array.isArray(buyerRequest.questions)) {
      const hasSpecialAnswer = buyerRequest.questions.some(
        (q) =>
          q?.ans === "Replace the current driveway" ||
          q?.ans === "Business or Commercial Premises"
      );

      if (hasSpecialAnswer) {
        SpecialFlowPercentage(70);
      } else {
        SpecialFlowPercentage(90);
      }
    }
  }, [buyerRequest]);

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

    const existingIndex = previousAnswers.findIndex(
      (item) => item?.ques === updatedAnswer?.ques
    );

    let updatedAnswers;
    if (existingIndex !== -1) {
      updatedAnswers = [...previousAnswers];
      updatedAnswers[existingIndex] = updatedAnswer;
    } else {
      updatedAnswers = [...previousAnswers, updatedAnswer];
    }
    dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selectedOption[0]
    );

    const nextQ = selectedObj?.next_question;
    setTotalQuestionsAnswered((prev) => Math.min(prev + 1, 7));
    if (nextQ === "6") {
      dispatch(
        setbuyerRequestData({
          service_id: service?.id || buyerRequest?.service_id,
          postcode: buyerRequest?.postcode,
          city: citySerach,
          questions: updatedAnswers,
        })
      );
      setProgressPercentage(75);
      onNext();
      return;
    }

    if (nextQ === "6") {
      setProgressPercentage(75);
      onNext();
      return;
    } else if (nextQ && questionIndexMap[nextQ]) {
      setQuestionHistory((prev) => [...prev, questionIndexMap[nextQ]]);
      setCurrentQuestion(questionIndexMap[nextQ]);
    } else {
      if (currentQuestion < totalQuestions - 1) {
        setQuestionHistory((prev) => [...prev, currentQuestion + 1]);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setProgressPercentage(75);
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

    const existingIndex = previousAnswers.findIndex(
      (item) => item?.ques === updatedAnswer.ques
    );

    let updatedAnswers;
    if (existingIndex !== -1) {
      updatedAnswers = [...previousAnswers];
      updatedAnswers[existingIndex] = updatedAnswer;
    } else {
      updatedAnswers = [...previousAnswers, updatedAnswer];
    }

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selected[0]
    );

    const nextQ = selectedObj?.next_question;
    setTotalQuestionsAnswered((prev) => Math.min(prev + 1, 7));

    let nextIndex = null;
    if (nextQ === Number(nextQ)) {
      setProgressPercentage(75);
      onNext();
      return;
    } else if (nextQ === "last") {
      setProgressPercentage(75);
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
      setProgressPercentage(75);
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
      setTotalQuestionsAnswered((prev) => Math.max(1, prev - 1));
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
      buttonText="Next"
      headingCenter={currentQuestion === 0 ? false : true}
      subtitle={
        currentQuestion === 0
          ? !isQuestionWithImage
            ? "To find the ideal Driveway Installation specialist for your project, simply complete the quick form below."
            : ""
          : ""
      }
    >
      {currentQuestion === 0 && isQuestionWithImage && (
        <BannerImagesQuestion serviceName={serviceName} />
      )}

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

export default QuestionAnserMultiStepDriways2;
