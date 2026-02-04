import { useState, useEffect, useMemo } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProgressPercentageAPI,
  setbuyerRequestData,
} from "../../../../store/Buyer/BuyerSlice";
import CardLayoutWrapper from "../CardLayoutWrapper/CardLayoutWrapper";
import { useLocation } from "react-router";
import styles from "./QuestionAnswerMultiStep.module.css";

const QuestionAnswerMultiStepTreeSurgeon = ({
  questions = [],
  onNext,
  onBack,
  serviceName = "Tree Surgeon",
  setIsComingFromStep4,
  isComingFromStep4,
  setProgressPercentage,
  setSelectedOption,
  selectedOption,
  isStepFrom4,
  setIsStepFrom4,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest } = useSelector((state) => state.buyer);
  const { service, registerData } = useSelector((state) => state.findJobs);
  const { userToken, adminToken } = useSelector((state) => state.auth);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  const [questionHistory, setQuestionHistory] = useState([0]);
  const [isFirstQuestionAnswered, setIsFirstQuestionAnswered] = useState(false);

  const showToast = (type, content) => message[type](content);

  const totalQuestions = questions?.length;

  // ✅ Initialize progress to 85% when component mounts
  // useEffect(() => {
  //   setProgressPercentage(85);
  // }, [setProgressPercentage]);

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
        // setSelectedOption([]);
        setOtherText("");
      }
    }
  }, [currentQuestion]); // ✅ Removed unnecessary dependencies

  // Reset when question changes
  useEffect(() => {
    setError("");
  }, [currentQuestion]);

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    const isSingle = questions[currentQuestion]?.option_type === "single";

    if (isSingle) {
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
      opt.toLowerCase() === "something else (please describe)" ? otherText : opt
    );

    const updatedAnswer = {
      ques: questions[currentQuestion]?.questions,
      ans: finalAnswer.join(", "),
    };

    // Copy previous answers
    const previousAnswers = buyerRequest?.questions || [];

    // Check if question already exists
    const questionIndex = previousAnswers?.findIndex(
      (q) => q?.ques === updatedAnswer?.ques
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
    if (!isFirstQuestionAnswered) {
      setIsFirstQuestionAnswered(true);
      // setProgressPercentage(95);
    }
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
    setSelectedOption([]);
  };

  const handleNext = async (selected) => {
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
      // Update existing question
      updatedAnswers = [...previousAnswers];
      updatedAnswers[existingIndex] = updatedAnswer;
    } else {
      // Add new question
      updatedAnswers = [...previousAnswers, updatedAnswer];
    }

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selected[0]
    );

    const nextQ = selectedObj?.next_question;
    if (nextQ !== "last") {
      try {
        const formData = new FormData();
        formData.append("questions", JSON.stringify(updatedAnswers));
        formData.append("service_id", buyerRequest?.service_id);
        const respone = await dispatch(getProgressPercentageAPI(formData));
        setProgressPercentage(respone?.percentage);
      } catch (error) {
        console.log(error, "error progressPercent");
      }
    }
    if (!isFirstQuestionAnswered) {
      setIsFirstQuestionAnswered(true);
      // setProgressPercentage(95);
    }
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
    setSelectedOption([]);
  };

  const handleBack = async () => {
    setIsComingFromStep4(false);

    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevIndex = newHistory[newHistory.length - 1];
      setQuestionHistory(newHistory);
      setCurrentQuestion(prevIndex);

      // ✅ When going back to first question
      const lastQuestionsArray = buyerRequest.questions;

      // Check if array is not empty
      if (lastQuestionsArray.length > 0) {
        const lastAnswer =
          lastQuestionsArray[lastQuestionsArray.length - 1].ans;

        // Array format me set karna
        setSelectedOption([lastAnswer]);
      }
      const updatedBuyerRequest = {
        ...buyerRequest,
        questions: [...buyerRequest.questions].slice(0, -1), // remove last
      };

      dispatch(setbuyerRequestData(updatedBuyerRequest));

      // ✅ Send updated questions to API for progress calculation
      try {
        const formData = new FormData();
        formData.append(
          "questions",
          JSON.stringify(updatedBuyerRequest.questions)
        );
        formData.append("service_id", updatedBuyerRequest.service_id);
        if (prevIndex === 0) {
          const response = await dispatch(getProgressPercentageAPI(formData));
          setProgressPercentage(response.percentage);
        }
      } catch (err) {
        console.error("Error updating progress on back:", err);
      }
    } else {
      onBack();
      setIsStepFrom4(false);
      const updatedBuyerRequest = {
        ...buyerRequest,
        questions: [...buyerRequest.questions].slice(0, -1), // remove last
      };

      dispatch(setbuyerRequestData(updatedBuyerRequest));

      // ✅ Send updated questions to API for progress calculation
      try {
        const formData = new FormData();
        formData.append(
          "questions",
          JSON.stringify(updatedBuyerRequest.questions)
        );
        formData.append("service_id", updatedBuyerRequest.service_id);
        const response = await dispatch(getProgressPercentageAPI(formData));
        setProgressPercentage(response.percentage);
      } catch (err) {
        console.error("Error updating progress on back:", err);
      }
    }
  };
  const handleBack2 = async () => {
    setIsComingFromStep4(false);

    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop(); // remove current question index
      const prevIndex = newHistory[newHistory.length - 1]; // previous question index

      setQuestionHistory(newHistory);
      setCurrentQuestion(prevIndex);

      // ✅ Find the question text of the previous question
      const prevQuestionText = formattedQuestions[prevIndex]?.questions;

      // ✅ Find saved answer for that question (if any)
      const prevSaved = buyerRequest?.questions?.find(
        (q) => q.ques === prevQuestionText
      );

      if (prevSaved?.ans) {
        // Split string answers into array
        const prevAnsArray =
          typeof prevSaved.ans === "string"
            ? prevSaved.ans.split(",").map((a) => a.trim())
            : [prevSaved.ans];

        setSelectedOption(prevAnsArray);
      } else {
        // No answer saved for previous question → clear selection
        setSelectedOption([]);
      }

      // ✅ Remove current (last) question from buyerRequest in Redux
      const updatedBuyerRequest = {
        ...buyerRequest,
        questions: buyerRequest.questions.slice(0, -1),
      };

      dispatch(setbuyerRequestData(updatedBuyerRequest));

      // ✅ Update progress if needed
      try {
        const formData = new FormData();
        formData.append(
          "questions",
          JSON.stringify(updatedBuyerRequest.questions)
        );
        formData.append("service_id", updatedBuyerRequest.service_id);

        if (prevIndex === 0) {
          const response = await dispatch(getProgressPercentageAPI(formData));
          setProgressPercentage(response.percentage);
        }
      } catch (err) {
        console.error("Error updating progress on back:", err);
      }
    } else {
      setProgressPercentage((pre) => pre - 10);
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
      //setProgressPercentage(95);
    }
  }, [isComingFromStep4]);

  return (
    <CardLayoutWrapper
      title={formattedQuestions[currentQuestion]?.questions}
      onButtonClick={handleNextCheckBox}
      onBackClick={isStepFrom4 ? handleBack : handleBack2}
      disableNextButton={false}
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

export default QuestionAnswerMultiStepTreeSurgeon;
