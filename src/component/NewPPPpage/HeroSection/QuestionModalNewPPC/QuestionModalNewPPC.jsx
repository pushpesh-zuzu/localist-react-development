import { useState, useEffect, useRef } from "react";
import { Progress, Spin } from "antd";
import styles from "./QuestionModalNewPPC.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  registerQuoteCustomer,
  setbuyerRequestData,
} from "../../../../store/Buyer/BuyerSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";
import { extractAllParams } from "../../../../utils/decodeURLParams";
import { handleScrollToBottom } from "../../../../utils/scroll";
import useUserInfo from "../../../../utils/getUserIp";
import FormWrapper from "../../../NewPPPpage/HeroSection/RegistrationForm/FormWrapper";
import Button1 from "../../UITypography/Button1";
import H5 from "../../UITypography/H5";

const QuestionModalNewPPC = ({
  questions = [],
  serviceName,
  nextStep,
  loading = true,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest, requestLoader, citySerach, questionLoader } =
    useSelector((state) => state.buyer);
  const { registerData } = useSelector((state) => state.findJobs);
  const { search } = useLocation();
  const allParams =
    typeof window !== "undefined" &&
    extractAllParams(search || window.location.search);

  const campaignid = allParams.gad_campaignid || "";
  const keyword = allParams.keyword || "";
  const gclid = allParams.gclid || "";
  const campaign = allParams.utm_campaign || "";
  const adGroup = allParams.AgId || "";
  const targetID = allParams.utm_term || "";
  const msclickid = allParams.utm_msclkid || "";
  const utm_source = allParams.utm_source || "";

  const { userToken, adminToken } = useSelector((state) => state.auth);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  const [questionHistory, setQuestionHistory] = useState([0]);
  const [showDelay, setShowDelay] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("next");
  const { ip, url } = useUserInfo();

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
  }, [currentQuestion, buyerRequest, questions]);
  const totalQuestions = questions?.length;
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;

  // Animation functions
  const animateQuestionChange = (direction, callback) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setAnimationDirection(direction);

    setTimeout(() => {
      if (typeof callback === "function") {
        callback();
      }

      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 300);
  };

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
      (a) => a.option === selectedOption[0]
    );

    const nextQ = selectedObj?.next_question;
    handleScrollToBottom();

    const proceedToNext = () => {
      if (nextQ === "last") {
        if (adminToken || registerData?.remember_tokens) {
          nextStep();
        } else {
          const formData = new FormData();
          formData.append("name", buyerRequest?.name);
          formData.append("email", buyerRequest?.email);
          formData.append("phone", buyerRequest?.phone);
          formData.append("questions", JSON.stringify(updatedAnswers));
          formData.append("service_id", buyerRequest?.service_id);
          formData?.append("city", citySerach);
          formData.append("postcode", buyerRequest?.postcode);
          formData.append("form_status", 1);
          formData.append("campaignid", campaignid || "");
          formData.append("gclid", gclid || "");
          formData.append("campaign", campaign || "");
          formData.append("adgroup", adGroup || "");
          formData.append("targetid", targetID || "");
          formData.append("msclickid", msclickid || "");
          formData.append("utm_source", utm_source || "");
          formData.append("keyword", keyword || "");
          formData.append("entry_url", url);
          formData.append("user_ip_address ", ip);

          dispatch(registerQuoteCustomer(formData)).then((result) => {
            if (result) {
              nextStep();
            }
          });
        }
      } else if (nextQ && questionIndexMap[nextQ]) {
        setQuestionHistory((prev) => [...prev, questionIndexMap[nextQ]]);
        setCurrentQuestion(questionIndexMap[nextQ]);
      } else {
        if (currentQuestion < totalQuestions - 1) {
          setQuestionHistory((prev) => [...prev, currentQuestion + 1]);
          setCurrentQuestion(currentQuestion + 1);
        } else {
          nextStep();
        }
      }

      setSelectedOption([]);
      setOtherText("");
      setError("");
    };

    animateQuestionChange("next", proceedToNext);
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
    handleScrollToBottom();

    const proceedToNext = () => {
      if (nextQ === "last") {
        if (adminToken || registerData?.remember_tokens) {
          nextStep();
        } else {
          const formData = new FormData();
          formData.append("name", buyerRequest?.name);
          formData.append("email", buyerRequest?.email);
          formData.append("phone", buyerRequest?.phone);
          formData.append("questions", JSON.stringify(updatedAnswers));
          formData.append("service_id", buyerRequest?.service_id);
          formData?.append("city", citySerach);
          formData.append("postcode", buyerRequest?.postcode);
          formData.append("form_status", 1);
          formData.append("campaignid", campaignid || "");
          formData.append("gclid", gclid || "");
          formData.append("campaign", campaign || "");
          formData.append("adgroup", adGroup || "");
          formData.append("targetid", targetID || "");
          formData.append("msclickid", msclickid || "");
          formData.append("utm_source", utm_source || "");
          formData.append("keyword", keyword || "");
          formData.append("entry_url", url);
          formData.append("user_ip_address ", ip);

          dispatch(registerQuoteCustomer(formData)).then((result) => {
            if (result) {
              nextStep();
            }
          });
        }
      } else if (nextQ && questionIndexMap[nextQ]) {
        setQuestionHistory((prev) => [...prev, questionIndexMap[nextQ]]);
        setCurrentQuestion(questionIndexMap[nextQ]);
      } else {
        if (currentQuestion < totalQuestions - 1) {
          setQuestionHistory((prev) => [...prev, currentQuestion + 1]);
          setCurrentQuestion(currentQuestion + 1);
        } else {
          nextStep();
        }
      }

      setSelectedOption([]);
      setOtherText("");
      setError("");
    };

    animateQuestionChange("next", proceedToNext);
  };

  const handleBack = () => {
    const goBack = () => {
      if (questionHistory.length > 1) {
        const newHistory = [...questionHistory];
        newHistory.pop();
        const prevIndex = newHistory[newHistory.length - 1];
        setQuestionHistory(newHistory);
        setCurrentQuestion(prevIndex);
        // handleScrollToBottom();
      } else {
        // previousStep();
        handleScrollToBottom();
      }
    };

    animateQuestionChange("back", goBack);
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
          ) : questions.length > 0 ? (
            <>
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
                } ${
                  isAnimating
                    ? animationDirection === "next"
                      ? styles.fadeOut
                      : styles.fadeIn
                    : ""
                }`}
              >
                {/* <h2 className={styles.headerBackground}>
                  {questions[currentQuestion]?.questions}
                </h2> */}
                <H5 className={`Inter ${styles.headerBackground}`}>
                  {questions[currentQuestion]?.questions}
                </H5>
                <Progress
                  percent={progressPercent}
                  strokeColor="#00AFE3"
                  trailColor="#EDEDED"
                  strokeWidth={3}
                  showInfo={false}
                  className={styles.customProgress}
                />
              </div>

              <div
                className={`${styles.optionsContainer} ${
                  isAnimating ? styles.fadeContent : ""
                }`}
              >
                {formattedQuestions[currentQuestion]?.parsedAnswers.map(
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
                        disabled={isAnimating}
                      />
                      <span style={{ color: "#000000" }}>{opt.option}</span>
                    </label>
                  )
                )}
                {formattedQuestions[currentQuestion]?.answer?.includes(
                  "Something else (please describe)"
                ) &&
                  (formattedQuestions[currentQuestion]?.option_type === "single"
                    ? selectedOption.includes(
                        "Something else (please describe)"
                      )
                    : selectedOption.includes(
                        "Something else (please describe)"
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

              <div
                className={`${styles.buttonContainer} ${
                  isAnimating ? styles.fadeContent : ""
                }`}
              >
                {currentQuestion > 0 && (
                  <Button1
                    disabled={currentQuestion === 0 || isAnimating}
                    className={styles.backButton}
                    onClick={handleBack}
                    variant="secondary"
                  >
                    Back
                  </Button1>
                )}

                <Button1
                  onClick={handleNextCheckBox}
                  disabled={questionLoader || isAnimating}
                  className={styles.nextButton}
                >
                  {requestLoader ? (
                    <Spin
                      indicator={
                        <LoadingOutlined spin style={{ color: "white" }} />
                      }
                    />
                  ) : currentQuestion === totalQuestions - 1 ? (
                    "Next"
                  ) : (
                    "Next"
                  )}
                </Button1>
              </div>
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

export default QuestionModalNewPPC;
