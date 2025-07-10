import { useState, useEffect } from "react";
import { Progress, Result, Spin } from "antd";
import styles from "./QuestionModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSetbuyerRequestData,
  createRequestData,
  setbuyerRequestData,
  setBuyerStep,
} from "../../../store/Buyer/BuyerSlice";

import { LoadingOutlined } from "@ant-design/icons";
import { showToast } from "../../../utils";
import { clearBuyerRegisterFormData } from "../../../store/FindJobs/findJobSlice";

const QuestionModal = ({
  questions = [],
  onClose,
  nextStep,
  previousStep,
  loading,
  setShowConfirmModal,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest, requestLoader,citySerach,questionanswerData } = useSelector((state) => state.buyer);
  const { searchServiceLoader, service, registerData } = useSelector(
    (state) => state.findJobs
  );
  const { userToken,adminToken } = useSelector((state) => state.auth);
  const lastQuestionIndex =
    buyerRequest?.questions?.length > 0 ? buyerRequest.questions.length - 1 : 0;
  const [currentQuestion, setCurrentQuestion] = useState(lastQuestionIndex);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (questions.length > 0 && currentQuestion === -1) {
      setCurrentQuestion(0);
    }
  }, [questions]);
  console.log(citySerach,questionanswerData,"citySerach")

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
      setOtherText(savedArray.includes("Something else (please describe)") ? otherVal || "" : "");
    }
  }, [currentQuestion, buyerRequest, questions]);

  const totalQuestions = questions?.length;
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;

  // const handleOptionChange = (e) => {
  //   const { value, checked } = e.target;
  //   let updatedOptions = [...selectedOption];

  //   if (checked) {
  //     updatedOptions.push(value);
  //   } else {
  //     updatedOptions = updatedOptions.filter((opt) => opt !== value);
  //   }

  //   setSelectedOption(updatedOptions);
  //   setError("");
  // };
// const handleOptionChange = (e) => {
//   const { value, checked, type } = e.target;
//   const isSingle = questions[currentQuestion]?.option_type === "single";

//   if (isSingle) {
//     setSelectedOption(value); // Only one option at a time
//   } else {
//     // Multiple checkboxes
//     setSelectedOption((prev) =>
//       checked ? [...prev, value] : prev.filter((opt) => opt !== value)
//     );
//   }
// };
const handleOptionChange = (e) => {
  const { value, checked } = e.target;
  const isSingle = questions[currentQuestion]?.option_type === "single";

  if (isSingle) {
    setSelectedOption([value]); // Wrap in array
  } else {
    setSelectedOption((prev) =>
      checked ? [...prev, value] : prev.filter((opt) => opt !== value)
    );
  }
};

  const handleNext = () => {
    if (selectedOption.length === 0) {
      setError("Please select at least one option.");
      return;
    }

    if (
      selectedOption.includes("Something else (please describe)") &&
      (!otherText.trim() || otherText.trim().toLowerCase() === "something else (please describe)")
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

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if(adminToken ||registerData?.remember_tokens ){
        nextStep();

      }
      else {
      
        const formData = new FormData();
        formData.append("email", buyerRequest?.email);
        formData.append("name", buyerRequest?.name);
        formData.append("phone", buyerRequest?.phone);
        formData.append("service_id", buyerRequest?.service_id);
        formData.append("postcode", buyerRequest?.postcode);
        formData?.append("city",citySerach)
        formData.append("questions", JSON.stringify(updatedAnswers));
        formData.append("form_status", 1);
        // form_status: 1,
        // formData.append("recevive_online", consent ? 1 : 0);

        dispatch(createRequestData(formData)).then((result) => {
          if (result) {
            
            showToast("success", result?.message);
            nextStep();
          }
        });
      }
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

  const handleCloseClick = () => {
    if(questionanswerData?.length === 0) {
onClose()
dispatch(clearSetbuyerRequestData())
         dispatch(clearBuyerRegisterFormData())
    }
    else {

    
    if (!userToken?.remember_tokens && !registerData?.remember_tokens) {
      setShowConfirmModal(true);
    } else {
      onClose();
      dispatch(clearSetbuyerRequestData())
         dispatch(clearBuyerRegisterFormData())
    }
  }
  };
  useEffect(() => {
  setSelectedOption([]);
  setOtherText("");
}, [currentQuestion]);



  return (
    <div className={styles.modalOverlay} >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={handleCloseClick}
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
                      type={questions[currentQuestion]?.option_type === "single" ? "radio" : "checkbox"}
                      name="surveyOption"
                      value={option.trim()}
                      // checked={selectedOption.includes(option.trim())}
                      // onChange={handleOptionChange}
                checked={
  questions[currentQuestion]?.option_type === "single"
    ? selectedOption.includes(option.trim())
    : selectedOption.includes(option.trim())
}
          onChange={handleOptionChange}
                    />
                    {option.trim()}
                  </label>
                ))}
                       {/* {selectedOption.includes("Something else (please describe)") && (
              <input
                type="text"
                placeholder="Please Enter..."
                className={styles.input}
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
              />
            )} */}
              {selectedOption &&
    (questions[currentQuestion]?.option_type === "single"
      ? selectedOption === "Something else (please describe)"
      : selectedOption.includes("Something else (please describe)")) && (
      <input
        type="text"
        placeholder="Please Enter..."
        className={styles.input}
        value={otherText}
        onChange={(e) => setOtherText(e.target.value)}
      />
    )}


            </div>
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
              </button>
            </div>
          </>
        ) :  <div className={styles.noQuestion}>
    <h2>No questions available</h2>
  </div>}
      </div>
    </div>
  );
};

export default QuestionModal;
