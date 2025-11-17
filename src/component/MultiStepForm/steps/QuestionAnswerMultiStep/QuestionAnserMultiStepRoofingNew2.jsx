import { useState, useEffect } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setbuyerRequestData,
  setQuestionsForProgress,
} from "../../../../store/Buyer/BuyerSlice";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";
import styles from "./QuestionAnswerMultiStep.module.css";
import { handleScrollToBottom } from "../../../../utils/scroll";
import BannerImagesQuestion from "../BannerImagesQuestion/BannerImagesQuestion";

const QuestionAnserMultiStepRoofingNew2 = ({
  questions = [],
  onNext,
  onBack,
  isComingFromStep3 = false,
  setQuestionHistory,
  questionHistory,
  setIsComingFromStep3,
  loading = true,
  serviceName = "Driveway Installers",
  isQuestionWithImage = false,
  removeQuestionByNumber,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest, questionsForProgress } = useSelector(
    (state) => state.buyer
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(1);
  const totalQuestions = questions?.length || 1;
  const formattedQuestions = questions.map((q) => ({
    ...q,
    parsedAnswers: Array.isArray(q.answer)
      ? q?.answer
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
      setCurrentQuestion(5);
      setTotalQuestionsAnswered(5);
      const lastQuestion =
        questionsForProgress[questionsForProgress.length - 1];
      const lastQuestionNo = lastQuestion.number;
      removeQuestionByNumber(lastQuestionNo);
    }
  }, [isComingFromStep3]);

  useEffect(() => {
    if (questions.length > 0 && buyerRequest?.questions?.length > 0) {
      const currentQuestionNo =
        formattedQuestions[currentQuestion]?.question_no;

      const savedAnswerObj = buyerRequest.questions.find(
        (item) => item.question_no === currentQuestionNo
      );

      const savedAnswer = savedAnswerObj?.ans || [];

      const savedArray =
        typeof savedAnswer === "string"
          ? savedAnswer.split(",").map((a) => a.trim())
          : savedAnswer;

      setSelectedOption(savedArray);

      const otherVal = savedArray.find((ans) => {
        const lowerAns = ans.toLowerCase();
        return (
          lowerAns !== "yes" &&
          lowerAns !== "no" &&
          lowerAns !== "maybe" &&
          !lowerAns.includes("something else")
        );
      });

      setOtherText(otherVal || "");
    } else {
      setSelectedOption([]);
      setOtherText("");
    }
    handleScrollToBottom();
  }, [currentQuestion, buyerRequest, questions]);

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    const isSingle =
      formattedQuestions[currentQuestion]?.option_type === "single";

    if (value === "Something else (please describe)") {
      setOtherText("");
    }
    if (isSingle) {
      const newSelected = [value];
      setSelectedOption(newSelected);
      setError("");
      if (value !== "Something else (please describe)") {
        setTimeout(() => {
          handleNext(newSelected);
        }, 150);
      }
    } else {
      const newSelected = checked
        ? [...selectedOption, value]
        : selectedOption.filter((opt) => opt !== value);

      setSelectedOption(newSelected);
      setError("");
    }
  };

  const validateAndProceed = (selected) => {
    if (selected.length === 0) {
      setError("Please select at least one option.");
      return false;
    }

    if (
      selected.includes("Something else (please describe)") &&
      (!otherText.trim() ||
        otherText.trim().toLowerCase() === "something else (please describe)")
    ) {
      setError("Please enter a value for 'Other' option.");
      return false;
    }

    return true;
  };
  const saveAnswerToStore = (selected) => {
    const finalAnswer = selected.map((opt) =>
      opt.toLowerCase() === "something else (please describe)" ? otherText : opt
    );

    const updatedAnswer = {
      ques: formattedQuestions[currentQuestion]?.questions,
      ans: finalAnswer.join(", "),
      question_no: formattedQuestions[currentQuestion]?.question_no,
    };

    const previousAnswers = buyerRequest?.questions || [];

    const existingIndex = previousAnswers.findIndex(
      (item) => item.question_no === updatedAnswer.question_no
    );

    let updatedAnswers;

    if (existingIndex !== -1) {
      const oldAnswer = previousAnswers[existingIndex].ans;
      const newAnswer = updatedAnswer.ans;

      if (oldAnswer !== newAnswer) {
        const selectedObj = formattedQuestions[
          currentQuestion
        ]?.parsedAnswers.find((a) => a.option === selected[0]);
        const oldSelectedObj = formattedQuestions[
          currentQuestion
        ]?.parsedAnswers.find((a) => a.option === oldAnswer);

        const oldNextQ = oldSelectedObj?.next_question;
        const newNextQ = selectedObj?.next_question;

        if (oldNextQ !== newNextQ) {
          updatedAnswers = [...previousAnswers];
          updatedAnswers[existingIndex] = updatedAnswer;

          const oldNextIndex = updatedAnswers.findIndex(
            (item) => item.question_no === oldNextQ
          );
          if (oldNextIndex !== -1) {
            updatedAnswers.splice(oldNextIndex, 1);
          }
        } else {
          updatedAnswers = [...previousAnswers];
          updatedAnswers[existingIndex] = updatedAnswer;
        }
      } else {
        updatedAnswers = [...previousAnswers];
        updatedAnswers[existingIndex] = updatedAnswer;
      }
    } else {
      updatedAnswers = [...previousAnswers, updatedAnswer];
    }

    const answersWithoutQno = updatedAnswers.map(
      ({ question_no, ...rest }) => rest
    );

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));
    // dispatch(setBuyerRequestInternalQuestion({ questions: updatedAnswers }));

    return { updatedAnswer, finalAnswer };
  };
  const getNextQuestionIndex = (selected) => {
    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selected[0]
    );

    const nextQ = selectedObj?.next_question;
    let nextIndex = null;

    if (nextQ === "7" || nextQ === "last") {
      return "last";
    } else if (nextQ && questionIndexMap[nextQ] !== undefined) {
      nextIndex = questionIndexMap[nextQ];
    } else if (currentQuestion < totalQuestions - 1) {
      nextIndex = currentQuestion + 1;
    }

    return nextIndex;
  };

  const handleNextCheckBox = () => {
    if (!validateAndProceed(selectedOption)) {
      return;
    }

    const { updatedAnswer } = saveAnswerToStore(selectedOption);

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selectedOption[0]
    );
    const nextQ = selectedObj?.next_question;

    setTotalQuestionsAnswered((prev) => Math.min(prev + 1, 7));

    const UpdateQuestionWithNumber = {
      ...updatedAnswer,
      number: formattedQuestions[currentQuestion]?.question_no,
    };

    dispatch(
      setQuestionsForProgress([
        ...questionsForProgress,
        UpdateQuestionWithNumber,
      ])
    );

    const nextIndex = getNextQuestionIndex(selectedOption);

    if (nextIndex === "last") {
      onNext();
      return;
    } else if (nextIndex !== null) {
      setQuestionHistory((prev) => [...prev, nextIndex]);
      setCurrentQuestion(nextIndex);
    } else {
      onNext();
    }
  };

  const handleNext = (selected) => {
    if (!validateAndProceed(selected)) {
      return;
    }

    const { updatedAnswer } = saveAnswerToStore(selected);

    setTotalQuestionsAnswered((prev) => Math.min(prev + 1, 7));
    const UpdateQuestionWithNumber = {
      ...updatedAnswer,
      number: formattedQuestions[currentQuestion]?.question_no, // Use current question number
    };

    dispatch(
      setQuestionsForProgress([
        ...questionsForProgress,
        UpdateQuestionWithNumber,
      ])
    );

    const nextIndex = getNextQuestionIndex(selected);

    if (nextIndex === "last") {
      onNext();
      return;
    } else if (nextIndex !== null) {
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
      if (questionsForProgress.length > 0) {
        const lastQuestion =
          questionsForProgress[questionsForProgress.length - 1];
        const lastQuestionNo = lastQuestion.number;
        removeQuestionByNumber(lastQuestionNo);
      }

      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevIndex = newHistory[newHistory.length - 1];
      setQuestionHistory(newHistory);
      setCurrentQuestion(prevIndex);
      setTotalQuestionsAnswered((prev) => Math.max(1, prev - 1));
    } else {
      if (questionsForProgress.length > 0) {
        const firstQuestion = questionsForProgress[0];
        const firstQuestionNo = firstQuestion.number;
        removeQuestionByNumber(firstQuestionNo);
      }

      setCurrentQuestion(0);
      setTotalQuestionsAnswered(1);
      setSelectedOption([]);
      setOtherText("");

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
            ? "To find the ideal driveway installers specialist for your project, simply complete the quick form below."
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
            const isSingle =
              formattedQuestions[currentQuestion]?.option_type === "single";

            return (
              <>
                <label
                  key={index}
                  className={isSingle ? styles.option : styles.options}
                  style={{
                    boxShadow: isSelected
                      ? "0px 4px 4px 0px rgba(0, 0, 0, 0.15)"
                      : "none",
                  }}
                >
                  <input
                    type={isSingle ? "radio" : "checkbox"}
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
                {formattedQuestions[currentQuestion]?.answer?.includes(
                  "Something else (please describe)"
                ) &&
                  opt.option === "Something else (please describe)" &&
                  selectedOption.includes(
                    "Something else (please describe)"
                  ) && (
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
              </>
            );
          }
        )}
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </CardLayoutWrapper>
  );
};

export default QuestionAnserMultiStepRoofingNew2;
