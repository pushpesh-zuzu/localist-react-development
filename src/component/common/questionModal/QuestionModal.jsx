import { useState, useEffect } from "react";
import { Progress, Result, Spin } from "antd";
import styles from "./QuestionModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSetbuyerRequestData,
  createRequestData,
  registerQuoteCustomer,
  setbuyerRequestData,
  setBuyerStep,
} from "../../../store/Buyer/BuyerSlice";

import { LoadingOutlined } from "@ant-design/icons";
import { showToast } from "../../../utils";
import { clearBuyerRegisterFormData } from "../../../store/FindJobs/findJobSlice";
import { useLocation } from "react-router";

const QuestionModal = ({
  questions = [],
  serviceName,
  onClose,
  nextStep,
  previousStep,
  loading,
  setShowConfirmModal,
  isStartWithQuestionModal,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest, requestLoader, citySerach, questionanswerData } =
    useSelector((state) => state.buyer);
  const { searchServiceLoader, service, registerData } = useSelector(
    (state) => state.findJobs
  );
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const campaignid = params.get("campaignid");
  const keyword = params.get("keyword");
  const gclid = params.get("gclid");
  // console.log("service_name", serviceName);
  const { userToken, adminToken } = useSelector((state) => state.auth);
  const lastQuestionIndex =
    buyerRequest?.questions?.length > 0 ? buyerRequest.questions.length - 1 : 0;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  const [questionHistory, setQuestionHistory] = useState([0]);
  useEffect(() => {
    if (questions.length > 0 && currentQuestion === -1) {
      setCurrentQuestion(0);
    }
  }, [questions]);
  // console.log(citySerach, questionanswerData, "citySerach");

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
      setError("");
    } else {
      setSelectedOption((prev) =>
        checked ? [...prev, value] : prev.filter((opt) => opt !== value)
      );
      setError("");
    }
  };

  const handleNext = () => {
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

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selectedOption[0]
    );

    const nextQ = selectedObj?.next_question;
    if (nextQ === "last") {
      // If last question, trigger submit or move next
      if (isStartWithQuestionModal) {
        dispatch(
          setbuyerRequestData({
            service_id: service?.id || buyerRequest?.service_id,
            serviceName: serviceName || buyerRequest?.serviceName,
            postcode: buyerRequest?.postcode,
            city: citySerach,
            questions: updatedAnswers,
          })
        );
        nextStep();
      } else if (adminToken || registerData?.remember_tokens) {
        nextStep();
      } else {
        // const formData = new FormData();
        // formData.append("email", buyerRequest?.email);
        // formData.append("name", buyerRequest?.name);
        // formData.append("phone", buyerRequest?.phone);
        // formData.append("service_id", buyerRequest?.service_id);
        // formData.append("postcode", buyerRequest?.postcode);
        // formData?.append("city", citySerach);
        // formData.append("questions", JSON.stringify(updatedAnswers));
        // formData.append("form_status", 1);
        // // form_status: 1,
        // // formData.append("recevive_online", consent ? 1 : 0);

        // dispatch(createRequestData(formData)).then((result) => {
        //   if (result) {
        //     showToast("success", result?.message);
        //     nextStep();
        //   }
        // });

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
        formData.append("keyword", keyword || "");

        dispatch(registerQuoteCustomer(formData)).then((result) => {
          if (result) {
            // showToast(
            //   "success",
            //   result?.message || "Customer registered successfully"
            // );
            nextStep();
          }
        });
      }
    } else if (nextQ && questionIndexMap[nextQ]) {
      setQuestionHistory((prev) => [...prev, questionIndexMap[nextQ]]);
      setCurrentQuestion(questionIndexMap[nextQ]);
    } else {
      // Fallback if no next_question found
      if (currentQuestion < totalQuestions - 1) {
        setQuestionHistory((prev) => [...prev, currentQuestion + 1]);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        nextStep();
      }
    }
  };

  // const handleBack = () => {
  //   if (currentQuestion > 0) {
  //     setCurrentQuestion(currentQuestion - 1);
  //   } else {
  //     if (buyerRequest?.questions?.length > 0) {
  //       setCurrentQuestion(buyerRequest.questions.length - 1);
  //     }
  //     previousStep();
  //   }
  // };

  const handleBack = () => {
    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevIndex = newHistory[newHistory.length - 1];
      setQuestionHistory(newHistory);
      setCurrentQuestion(prevIndex);
    } else {
      previousStep();
    }
  };

  const handleCloseClick = () => {
    if (questionanswerData?.length === 0) {
      onClose();
      dispatch(clearSetbuyerRequestData());
      dispatch(clearBuyerRegisterFormData());
    } else {
      if (!userToken?.remember_tokens && !registerData?.remember_tokens) {
        setShowConfirmModal(true);
      } else {
        onClose();
        dispatch(clearSetbuyerRequestData());
        dispatch(clearBuyerRegisterFormData());
      }
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

  return (
    <div className={styles.modalOverlay}>
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
            <div
              className={
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
                  : styles.headerImage // default fallback
              }
            >
              <h2 className={styles.headerBackground}>
                {questions[currentQuestion]?.questions}
              </h2>
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
                    />
                    <span style={{ color: "#000000" }}>{opt.option}</span>
                  </label>
                )
              )}
              {formattedQuestions[currentQuestion]?.answer?.includes(
                "Something else (please describe)"
              ) &&
                (formattedQuestions[currentQuestion]?.option_type === "single"
                  ? selectedOption.includes("Something else (please describe)")
                  : selectedOption.includes(
                      "Something else (please describe)"
                    )) && (
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
        ) : (
          <div className={styles.noQuestion}>
            <h2>No questions available</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionModal;

{
  /* <div className={styles.card}>
        <h3>Company Photos</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {formState.company_photosPreview.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`preview-${i}`}
              width={80}
              height={80}
              style={{ objectFit: "cover", borderRadius: 6 }}
            />
          ))}
        </div>
        <button
          className={styles.uploadBtn}
          onClick={() => fileInputRefs.company_photos.current.click()}
        >
          Upload new photos
        </button>
        <input
          type="file"
          name="company_photos"
          ref={fileInputRefs.company_photos}
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />
      </div> */
}

{
  /* <div className={styles.card}>
        <h3>Online Presence</h3>
        <label className={styles.label}>YouTube Video Link</label>
        <input
          className={styles.input}
          type="text"
          name="company_youtube_link"
          value={formState.company_youtube_link}
          onChange={handleInputChange}
          placeholder="YouTube link"
        />
        <label className={styles.label}>Facebook Link</label>
        <input
          className={styles.input}
          type="text"
          name="fb_link"
          value={formState.fb_link}
          onChange={handleInputChange}
          placeholder="Facebook link"
        />
        <label className={styles.label}>Twitter Link</label>
        <input
          className={styles.input}
          type="text"
          name="twitter_link"
          value={formState.twitter_link}
          onChange={handleInputChange}
          placeholder="Twitter link"
        />
        <label className={styles.label}>Custom Link Description</label>
        <input
          className={styles.input}
          type="text"
          name="link_desc"
          value={formState.link_desc}
          onChange={handleInputChange}
          placeholder="Link description"
        />
      </div> */
}

{
  /* <div className={styles.card}>
        <h3>Accreditations & Services</h3>
        <label className={styles.label}>Accreditation Name</label>
        <input
          className={styles.input}
          type="text"
          name="accre_name"
          value={formState.accre_name}
          onChange={handleInputChange}
          placeholder="e.g., ISO Certified"
        />
        <label className={styles.label}>Accreditation ID(s)</label>
        <input
          className={styles.input}
          type="text"
          name="accreditation_id"
          value={formState.accreditation_id}
          onChange={handleInputChange}
          placeholder="e.g., 1,2"
        />
        <label className={styles.label}>Service Title</label>
        <input
          className={styles.input}
          type="text"
          name="service_title"
          value={formState.service_title}
          onChange={handleInputChange}
          placeholder="Service title"
        />
        <label className={styles.label}>Service Description</label>
        <textarea
          className={styles.textarea}
          rows={3}
          name="service_desc"
          value={formState.service_desc}
          onChange={handleInputChange}
          placeholder="Describe the service"
        />
        <label className={styles.label}>Service Delete ID(s)</label>
        <input
          className={styles.input}
          type="text"
          name="service_delete_id"
          value={formState.service_delete_id}
          onChange={handleInputChange}
          placeholder="e.g., 2,3"
        />
        <label className={styles.label}>Accreditation Delete ID(s)</label>
        <input
          className={styles.input}
          type="text"
          name="accr_delete_id"
          value={formState.accr_delete_id}
          onChange={handleInputChange}
          placeholder="e.g., 16"
        />
      </div> */
}
