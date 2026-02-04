import { useState, useEffect, useRef } from "react";
import { Spin } from "antd";
import styles from "./QuestionModalNewPPC.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setbuyerRequestData,
} from "../../../../store/Buyer/BuyerSlice";
import { useLocation } from "react-router";
import { extractAllParams } from "../../../../utils/decodeURLParams";
import { handleScrollToBottom } from "../../../../utils/scroll";
import useUserInfo from "../../../../utils/getUserIp";
import FormWrapper from "../../../NewPPPpage/HeroSection/RegistrationForm/FormWrapper";
import CardLayoutWrapper from "../../../MultiStepForm/steps/CardLayoutWrapper/CardLayoutWrapper";

const QuestionModalDrivewaysNewPPC = ({
  questions = [],
  serviceName='',
  nextStep,
  loading = true,
  isQuestionWithImage = false,
  backButtonTriggered
}) => {
  
  const dispatch = useDispatch();
  const { buyerRequest, requestLoader } =
    useSelector((state) => state.buyer);
  const { search } = useLocation();
  // const allParams =
  //   typeof window !== "undefined" &&
  //   extractAllParams(search || window.location.search);

  const optionsContainerRef = useRef(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  const [questionHistory, setQuestionHistory] = useState([0]);
  const [showDelay, setShowDelay] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("next");

    useEffect(() => {
    backButtonTriggered && setSelectedOption([''])
  }, [backButtonTriggered])

  const hasInitializedRef = useRef(false);

  
  useEffect(() => {
    if (questions.length > 0 && currentQuestion === -1) {
      setCurrentQuestion(0);
    }
  }, [questions]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDelay(true);
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (
      questions.length > 0 && 
      buyerRequest?.questions?.length > 0 && 
      !hasInitializedRef.current
    ) {
      const savedQuestions = buyerRequest.questions;
      const reconstructedHistory = [0];
      
      savedQuestions.forEach((savedQ, index) => {
        if (index > 0) { 
          const questionIndex = questionIndexMap[savedQ.question_no];
          if (questionIndex !== undefined) {
            reconstructedHistory.push(questionIndex);
          }
        }
      });
      
      const lastQuestionNo = savedQuestions[savedQuestions.length - 1]?.question_no;
      const lastQuestionIndex = questionIndexMap[lastQuestionNo];
      
      if (lastQuestionIndex !== undefined) {
        setQuestionHistory(reconstructedHistory);
        setCurrentQuestion(lastQuestionIndex);
      }
      
      hasInitializedRef.current = true;
    }
  }, [questions, buyerRequest?.questions]);

  // Reset initialization flag when leaving this step (component unmounts)
  useEffect(() => {
    return () => {
      hasInitializedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (questions.length > 0 && buyerRequest?.questions?.length > 0) {
      const savedAnswer = buyerRequest.questions.find(
        q => q.question_no === formattedQuestions[currentQuestion]?.question_no
      )?.ans || [];
      
      const savedArray =
        typeof savedAnswer === "string"
          ? savedAnswer.split(",").map((a) => a.trim())
          : savedAnswer;

      setSelectedOption(savedArray);
      const otherVal = savedArray.find(
        (ans) =>
          ans.toLowerCase() !== "yes" &&
          ans.toLowerCase() !== "no" &&
          ans.toLowerCase() !== "maybe",
      );
      setOtherText(
        savedArray.includes("Something else (please describe)")
          ? otherVal || ""
          : "",
      );
    }
  }, [currentQuestion, buyerRequest, questions]);

  const totalQuestions = questions?.length;

  const animateQuestionChange = (direction, callback) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setAnimationDirection(direction);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    const isSingle = questions[currentQuestion]?.option_type === "single";

    console.log('handleOptionChange called:', value, 'isSingle:', isSingle);

    if (isSingle) {
      setSelectedOption([value]);
      setError("");
      if (value !== "Something else (please describe)") {
        // Use requestAnimationFrame for better timing
        requestAnimationFrame(() => {
          handleNext([value]);
        });
      }
    } else {
      setSelectedOption((prev) =>
        checked ? [...prev, value] : prev.filter((opt) => opt !== value),
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
      opt.toLowerCase() === "something else (please describe)"
        ? otherText
        : opt,
    );

    const updatedAnswer = {
      ques: questions[currentQuestion]?.questions,
      ans: finalAnswer.join(", "),
      question_no: formattedQuestions[currentQuestion]?.question_no,
    };

    const previousAnswers = buyerRequest?.questions || [];

    const existingIndex = previousAnswers.findIndex(
      (item) => item?.question_no === updatedAnswer.question_no,
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
      (a) => a.option === selectedOption[0],
    );

    const nextQ = selectedObj?.next_question;
    
    // Clear current selections first
    setSelectedOption([]);
    setOtherText("");
    setError("");
    
    // Then move to next question
    if (nextQ === "last") {
      nextStep();
    } else if (nextQ && questionIndexMap[nextQ] !== undefined) {
      const nextIndex = questionIndexMap[nextQ];
      console.log('Moving to question from mapping, nextIndex:', nextIndex);
      
      // Update both states in sequence
      setQuestionHistory(prev => {
        const newHistory = [...prev, nextIndex];
        console.log('Setting history to:', newHistory);
        return newHistory;
      });
      
      // Use setTimeout to ensure state updates in correct order
      setTimeout(() => {
        setCurrentQuestion(nextIndex);
        console.log('Setting currentQuestion to:', nextIndex);
        // animateQuestionChange("next");
      }, 0);
      
    } else {
      if (currentQuestion < totalQuestions - 1) {
        const nextIndex = currentQuestion + 1;
        console.log('Moving to next sequential question, nextIndex:', nextIndex);
        
        setQuestionHistory(prev => {
          const newHistory = [...prev, nextIndex];
          console.log('Setting history to:', newHistory);
          return newHistory;
        });
        
        // Use setTimeout to ensure state updates in correct order
        setTimeout(() => {
          setCurrentQuestion(nextIndex);
          console.log('Setting currentQuestion to:', nextIndex);
          // animateQuestionChange("next");
        }, 0);
      } else {
        nextStep();
      }
    }
  };

  const handleNext = (selected) => {
    console.log('handleNext called with selected:', selected);
    console.log('currentQuestion before:', currentQuestion);

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

    const finalAnswer = selected?.map((opt) =>
      opt.toLowerCase() === "something else (please describe)"
        ? otherText
        : opt,
    );

    const updatedAnswer = {
      ques: questions[currentQuestion]?.questions,
      ans: finalAnswer.join(", "),
      question_no: formattedQuestions[currentQuestion]?.question_no,
    };

    const previousAnswers = buyerRequest?.questions || [];

    const existingIndex = previousAnswers.findIndex(
      (item) => item?.question_no === updatedAnswer.question_no,
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
      (a) => a.option === selected[0],
    );
    const nextQ = selectedObj?.next_question;
    console.log('nextQ:', nextQ, 'questionIndexMap[nextQ]:', questionIndexMap[nextQ]);
    
    setSelectedOption([]);
    setOtherText("");
    setError("");
    
    if (nextQ === "last") {
      nextStep();
    } else if (nextQ && questionIndexMap[nextQ] !== undefined) {
      const nextIndex = questionIndexMap[nextQ];
      
      setQuestionHistory(prev => {
        const newHistory = [...prev, nextIndex];
        console.log('Setting history to:', newHistory);
        return newHistory;
      });
      
      setTimeout(() => {
        setCurrentQuestion(nextIndex);
        // animateQuestionChange("next");
      }, 0);
      
    } else {
      if (currentQuestion < totalQuestions - 1) {
        const nextIndex = currentQuestion + 1;
        console.log('Moving to next sequential question, nextIndex:', nextIndex);
        
        setQuestionHistory(prev => {
          const newHistory = [...prev, nextIndex];
          console.log('Setting history to:', newHistory);
          return newHistory;
        });
        
        // Use setTimeout to ensure state updates in correct order
        setTimeout(() => {
          setCurrentQuestion(nextIndex);
          console.log('Setting currentQuestion to:', nextIndex);
          // animateQuestionChange("next");
        }, 0);
      } else {
        nextStep();
      }
    }
  };

  const handleBack = () => {
    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevIndex = newHistory[newHistory.length - 1];
      
      setQuestionHistory(newHistory);
      
      setTimeout(() => {
        setCurrentQuestion(prevIndex);
      }, 0);
      
      setError("");
      
      const currentQuestionNo = formattedQuestions[currentQuestion]?.question_no;
      const updatedAnswers = buyerRequest?.questions?.filter(
        (q) => q.question_no !== currentQuestionNo
      ) || [];
      dispatch(setbuyerRequestData({ questions: updatedAnswers }));
      setSelectedOption([]);
      setOtherText("");
    } else {
      handleScrollToBottom();
    }
  };

  useEffect(() => {
    setSelectedOption([]);
    setOtherText("");
  }, [currentQuestion]);

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
    typeof window !== "undefined" &&
      window.innerWidth < 768 &&
      handleScrollToBottom();
    if (optionsContainerRef.current) {
      optionsContainerRef.current.scrollTop = 0;
    }
  }, [currentQuestion]);
  
  // console.log('currentQuestion', currentQuestion)
  // console.log('questionIndexMap', questionIndexMap)
  // console.log('formattedQuestions', formattedQuestions)
  // console.log('Current question data:', formattedQuestions[currentQuestion])
  // console.log('Parsed answers:', formattedQuestions[currentQuestion]?.parsedAnswers)

  return (
    <FormWrapper>
      <div className={styles.modalOverlay}>
        <div
          className={`${styles.modalContent} ${
            isAnimating
              ? animationDirection === "next"
                ? styles.slideOutLeft
                : styles.slideOutRight
              : animationDirection === "next"
                ? styles.slideInRight
                : styles.slideInLeft
          }`}
          style={{ color: "#000", textAlign: "center" }}
          onClick={(e) => e.stopPropagation()}
        >
          {loading ? (
            <div className={styles.loaderContainer}>
              <Spin size="large" />
            </div>
          ) : questions.length > 0 && formattedQuestions[currentQuestion] ? (
            <>
              <CardLayoutWrapper
                loader={requestLoader}
                title={
                  currentQuestion === 0
                    ? !isQuestionWithImage
                      ? ""
                      : ""
                    : formattedQuestions[currentQuestion]?.questions
                }
                onButtonClick={handleNextCheckBox}
                onBackClick={handleBack}
                showBackButton={currentQuestion === 0 ? false : true}
                buttonText="Next"
                headingCenter={currentQuestion === 0 ? false : true}
                subtitle={
                  currentQuestion === 0 ? (!isQuestionWithImage ? "" : "") : ""
                }
                disableNextButton={requestLoader}
              >
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
                <div
                  ref={optionsContainerRef}
                  className={`${styles.optionsContainer} ${
                    isAnimating ? styles.fadeContent : ""
                  }`}
                >
                  {formattedQuestions[currentQuestion]?.parsedAnswers?.map(
                    (opt, index) => (
                      <label
                        key={index}
                        className={
                          formattedQuestions[currentQuestion]?.option_type ===
                          "single"
                            ? styles.option
                            : styles.options
                        }
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
                          disabled={isAnimating || requestLoader}
                        />
                        <span style={{ color: "#000000" }}>{opt.option}</span>
                      </label>
                    ),
                  )}
                  {formattedQuestions[currentQuestion]?.answer?.includes(
                    "Something else (please describe)",
                  ) &&
                    (formattedQuestions[currentQuestion]?.option_type ===
                    "single"
                      ? selectedOption.includes(
                          "Something else (please describe)",
                        )
                      : selectedOption.includes(
                          "Something else (please describe)",
                        )) && (
                      <input
                        type="text"
                        placeholder="Please Enter..."
                        className={styles.input}
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                        disabled={isAnimating}
                      />
                    )}
                </div>

                {error && <p className={styles.errorMessage}>{error}</p>}
              </CardLayoutWrapper>
            </>
          ) : (
            <div className={styles.noQuestion}>
              <h2>No questions available</h2>
            </div>
          )}
        </div>
      </div>
    </FormWrapper>
  );
};

export default QuestionModalDrivewaysNewPPC;