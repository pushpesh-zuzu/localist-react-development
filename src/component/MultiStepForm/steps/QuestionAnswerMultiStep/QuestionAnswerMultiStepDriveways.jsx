import { useState, useEffect, useMemo } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setbuyerRequestData,
  registerQuoteCustomer,
} from "../../../../store/Buyer/BuyerSlice";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";
import { useLocation } from "react-router";
import styles from "./QuestionAnswerMultiStep.module.css";

const QuestionAnswerMultiStepDriveways = ({
  questions = [],
  onNext,
  onBack,
  getProgressPercentage,
  serviceName = "Driveway Installers",
  setIsComingFromStep4,
  isComingFromStep4,
  setProgressPercentage,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest } = useSelector((state) => state.buyer);
  const { service, registerData } = useSelector((state) => state.findJobs);
  const { userToken, adminToken } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const campaignid = params.get("gad_campaignid") || "";
  const keyword = params.get("keyword") || "";
  const gclid = params.get("gclid") || "";
  const campaign = params.get("utm_campaign") || "";
  const adGroup = params.get("AgId") || "";
  const targetID = params.get("utm_term") || "";
  const msclickid = params.get("utm_msclkid") || "";
  const utm_source = params.get("utm_source") || "";

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  const [questionHistory, setQuestionHistory] = useState([0]);
  const [isFirstQuestionAnswered, setIsFirstQuestionAnswered] = useState(false);

  const showToast = (type, content) => message[type](content);

  const totalQuestions = questions?.length;

  // ✅ Initialize progress to 85% when component mounts
  useEffect(() => {
    setProgressPercentage(85);
  }, [setProgressPercentage]);

  // ✅ FIXED: useMemo se formattedQuestions ko memoize karo
  const formattedQuestions = useMemo(() => {
    return questions.map((q) => ({
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
  }, [questions]); // ✅ Only re-calculate when questions change

  // ✅ FIXED: useMemo se questionIndexMap ko memoize karo
  const questionIndexMap = useMemo(() => {
    const map = {};
    formattedQuestions.forEach((q, index) => {
      map[q.question_no] = index;
    });
    return map;
  }, [formattedQuestions]);

  // ✅ FIXED: Simplified saved answers loading
  useEffect(() => {
    if (questions.length > 0 && buyerRequest?.questions?.length > 0) {
      const currentQuestionText =
        formattedQuestions[currentQuestion]?.questions;

      // Find saved answer for CURRENT question
      const savedQuestion = buyerRequest.questions.find(
        (q) => q?.ques === currentQuestionText
      );

      if (savedQuestion) {
        const savedAnswer = savedQuestion.ans || "";
        const savedArray =
          typeof savedAnswer === "string"
            ? savedAnswer.split(",").map((a) => a.trim())
            : [savedAnswer];

        setSelectedOption(savedArray);

        // Simple "Something else" handling
        if (savedArray.includes("Something else (please describe)")) {
          const otherVal = savedArray.find(
            (val) => val !== "Something else (please describe)"
          );
          setOtherText(otherVal || "");
        } else {
          setOtherText("");
        }
      } else {
        setSelectedOption([]);
        setOtherText("");
      }
    }
  }, [currentQuestion, buyerRequest, formattedQuestions]); // ✅ Removed unnecessary dependencies

  // Reset when question changes
  useEffect(() => {
    setError("");
  }, [currentQuestion]);

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    const isSingle =
      formattedQuestions[currentQuestion]?.option_type === "single";

    if (isSingle) {
      // ✅ Set selected option immediately
      setSelectedOption([value]);
      setError("");

      // ✅ If option is NOT "Something else", move to next after short delay
      if (value !== "Something else (please describe)") {
        setTimeout(() => {
          handleNext([value]);
        }, 150);
      }
    } else {
      // ✅ For checkboxes
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

    const finalAnswer = selectedOption.map((opt) =>
      opt === "Something else (please describe)" ? otherText : opt
    );

    const updatedAnswer = {
      ques: formattedQuestions[currentQuestion]?.questions,
      ans: finalAnswer.join(", "),
    };

    // Copy previous answers
    const previousAnswers = buyerRequest?.questions || [];

    // Check if question already exists
    const questionIndex = previousAnswers.findIndex(
      (q) => q.ques === updatedAnswer.ques
    );

    let updatedAnswers;
    if (questionIndex !== -1) {
      // Replace only if question already exists
      updatedAnswers = [...previousAnswers];
      updatedAnswers[questionIndex] = updatedAnswer;
    } else {
      // Append new answer
      updatedAnswers = [...previousAnswers, updatedAnswer];
    }

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selectedOption[0]
    );

    const nextQ = selectedObj?.next_question;

    // ✅ FIRST QUESTION: 10% increase (85% → 95%)
    if (!isFirstQuestionAnswered) {
      setIsFirstQuestionAnswered(true);
      setProgressPercentage(95);
    }

    if (nextQ === Number(nextQ)) {
      onNext();
    } else if (nextQ === "last") {
      onNext();
    } else if (nextQ && questionIndexMap[nextQ] !== undefined) {
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
      opt === "Something else (please describe)" ? otherText : opt
    );

    const updatedAnswer = {
      ques: formattedQuestions[currentQuestion]?.questions,
      ans: finalAnswer.join(", "),
    };

    const previousAnswers = buyerRequest?.questions || [];
    const questionIndex = previousAnswers.findIndex(
      (q) => q.ques === updatedAnswer.ques
    );

    let updatedAnswers;
    if (questionIndex !== -1) {
      updatedAnswers = [...previousAnswers];
      updatedAnswers[questionIndex] = updatedAnswer;
    } else {
      updatedAnswers = [...previousAnswers, updatedAnswer];
    }

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selected[0]
    );

    const nextQ = selectedObj?.next_question;

    // ✅ FIRST QUESTION: 10% increase (85% → 95%)
    if (!isFirstQuestionAnswered) {
      setIsFirstQuestionAnswered(true);
      setProgressPercentage(95);
    }

    if (nextQ === Number(nextQ)) {
      onNext();
    } else if (nextQ === "last") {
      onNext();
    } else if (nextQ && questionIndexMap[nextQ] !== undefined) {
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

  const handleBack = () => {
    setIsComingFromStep4(false);
    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevIndex = newHistory[newHistory.length - 1];
      setQuestionHistory(newHistory);
      setCurrentQuestion(prevIndex);

      // ✅ Reset first question flag and progress when going back to first question
      if (prevIndex === 0) {
        setIsFirstQuestionAnswered(false);
        setProgressPercentage(85);
      }
    } else {
      onBack();
    }
  };

  if (questions.length === 0) {
    return (
      <div className={styles.noQuestions}>
        <h2>No questions available</h2>
      </div>
    );
  }

  useEffect(() => {
    return () => {
      // Cleanup function - runs when component unmounts
    };
  }, []);

  useEffect(() => {
    if (isComingFromStep4 && buyerRequest?.questions?.length > 0) {
      setCurrentQuestion(1);
      setQuestionHistory([0, 1]);
      setIsFirstQuestionAnswered(true);
      setProgressPercentage(95);
    }
  }, [isComingFromStep4]);

  return (
    <CardLayoutWrapper
      title={formattedQuestions[currentQuestion]?.questions}
      onButtonClick={handleNextCheckBox}
      onBackClick={handleBack}
      disableNextButton={
        formattedQuestions[currentQuestion]?.option_type === "single" &&
        !buyerRequest?.questions?.some(
          (q) => q?.ques === formattedQuestions[currentQuestion]?.questions
        ) &&
        !selectedOption.includes("Something else (please describe)")
      }
      buttonText="Next"
      showBackButton={true}
    >
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
                  checked={isSelected}
                  onChange={handleOptionChange}
                  onClick={(e) => {
                    const isSingle =
                      formattedQuestions[currentQuestion]?.option_type ===
                      "single";
                    if (
                      isSingle &&
                      isSelected &&
                      opt.option !== "Something else (please describe)"
                    ) {
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
              placeholder="Please enter..."
              className={styles.otherInput}
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
            />
          )}
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </CardLayoutWrapper>
  );
};

export default QuestionAnswerMultiStepDriveways;
