import { useState, useEffect } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setbuyerRequestData,
  registerQuoteCustomer,
} from "../../../../store/Buyer/BuyerSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";
import { useLocation } from "react-router";
import styles from "./QuestionAnswerMultiStep.module.css";

const QuestionAnswerMultiStep = ({
  questions = [],
  onNext,
  onBack,
  loading,
  getProgressPercentage,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest, requestLoader, citySerach } = useSelector(
    (state) => state.buyer
  );
  const { service, registerData } = useSelector((state) => state.findJobs);
  const { userToken, adminToken } = useSelector((state) => state.auth);
  const firstStepProgress = (2 / 3) * 100; // 66.66%
  const remainingProgressPerStep = (100 - firstStepProgress) / 2; // baki 2 steps ke liye ≈16.665%

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const campaignid = params.get("campaignid") || "";
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

  const showToast = (type, content) => message[type](content);

  const totalQuestions = questions?.length;
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;
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

  // Load saved answers when question changes
  useEffect(() => {
    if (questions.length > 0 && buyerRequest?.questions?.length > 0) {
      const savedAnswer =
        buyerRequest.questions[buyerRequest?.questions.length - 1]?.ans || [];
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
  }, [currentQuestion, buyerRequest, questions]);

  // Reset when question changes
  useEffect(() => {
    // setSelectedOption([]);
    setOtherText("");
    setError("");
  }, [currentQuestion]);

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    const isSingle = questions[currentQuestion]?.option_type === "single";

    if (isSingle) {
      const newSelection = [value]; // ✅ local new state
      setSelectedOption(newSelection);
      setError("");

      // ✅ Use the newSelection directly for next step, not stale state
      setTimeout(() => {
        handleNext(newSelection);
      }, 100);
    } else {
      setSelectedOption((prev) =>
        checked ? [...prev, value] : prev.filter((opt) => opt !== value)
      );
      setError("");
    }
  };

  const handleNextCheckBox = () => {
    debugger;
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
      opt.toLowerCase() === "something else (please describe)" ? otherText : opt
    );

    const updatedAnswer = {
      ques: questions[currentQuestion]?.questions,
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

    getProgressPercentage(remainingProgressPerStep);

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selectedOption[0]
    );

    const nextQ = selectedObj?.next_question;

    if (nextQ === Number(nextQ)) {
      onNext();
    } else if (nextQ === "last") {
      onNext();
    } else if (nextQ && questionIndexMap[nextQ] !== undefined) {
      setQuestionHistory((prev) => {
        if (prev[prev.length - 1] !== questionIndexMap[nextQ]) {
          return [...prev, questionIndexMap[nextQ]];
        }
        return prev;
      });
      setCurrentQuestion(questionIndexMap[nextQ]);
    } else {
      if (currentQuestion < totalQuestions - 1) {
        setQuestionHistory((prev) => {
          if (prev[prev.length - 1] !== currentQuestion + 1) {
            return [...prev, currentQuestion + 1];
          }
          return prev;
        });
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

    getProgressPercentage(remainingProgressPerStep);

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selected[0]
    );

    const nextQ = selectedObj?.next_question;

    if (nextQ === Number(nextQ)) {
      // dispatch(
      //   setbuyerRequestData({
      //     service_id: service?.id || buyerRequest?.service_id,
      //     serviceName: serviceName || buyerRequest?.serviceName,
      //     postcode: buyerRequest?.postcode,
      //     city: citySerach,
      //     questions: updatedAnswers,
      //   })
      // );
      onNext();
    } else if (nextQ === "last") {
      onNext();
    } else if (nextQ && questionIndexMap[nextQ] !== undefined) {
      setQuestionHistory((prev) => {
        if (prev[prev.length - 1] !== questionIndexMap[nextQ]) {
          return [...prev, questionIndexMap[nextQ]];
        }
        return prev;
      });
      setCurrentQuestion(questionIndexMap[nextQ]);
    } else {
      if (currentQuestion < totalQuestions - 1) {
        setQuestionHistory((prev) => {
          if (prev[prev.length - 1] !== currentQuestion + 1) {
            return [...prev, currentQuestion + 1];
          }
          return prev;
        });
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onNext();
      }
    }
  };

  const handleBack = () => {
    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevIndex = newHistory[newHistory.length - 1];
      setQuestionHistory(newHistory);
      setCurrentQuestion(prevIndex);
    } else {
      onBack();
      getProgressPercentage(-remainingProgressPerStep);
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
      setQuestionHistory([0]);
      setCurrentQuestion(0);
    };
  }, []);
  return (
    <CardLayoutWrapper
      title={formattedQuestions[currentQuestion]?.questions}
      onButtonClick={handleNextCheckBox}
      onBackClick={handleBack}
      disableNextButton={
        formattedQuestions[currentQuestion]?.option_type === "single" &&
        !buyerRequest?.questions?.some(
          (q) => q.ques === formattedQuestions[currentQuestion]?.questions
        )
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
                  checked={selectedOption.includes(opt.option)}
                  onChange={handleOptionChange}
                  onClick={(e) => {
                    const isSingle =
                      formattedQuestions[currentQuestion]?.option_type ===
                      "single";
                    if (isSingle && selectedOption.includes(opt.option)) {
                      onNext();
                      getProgressPercentage(remainingProgressPerStep);
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
              placeholder="Please describe..."
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

export default QuestionAnswerMultiStep;
