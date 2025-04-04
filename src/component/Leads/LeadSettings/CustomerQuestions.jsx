import React, { use, useState } from "react";
import styles from "./CustomerQuestions.module.css";
import CustomerQuestionsImg from "../../../assets/Images/Leads/CustomerQuestionsImg.svg";
import UpArrowIcon from "../../../assets/Images/Leads/UpArrowIcon.svg";
import DownArrowIcon from "../../../assets/Images/Leads/DownArrowIcon.svg";
import LocationIcon from "../../../assets/Images/Leads/LocationIcon.svg";
import TickIcon from "../../../assets/Images/Leads/TickIcon.svg";
import TrashIcon from "../../../assets/Images/Leads/TrashIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { leadPreferencesData } from "../../../store/LeadSetting/leadSettingSlice";
import { showToast } from "../../../utils";

const CustomerQuestions = ({ setSelectedService }) => {
  const dispatch = useDispatch();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { leadPreferenceData } = useSelector((state) => state.leadSetting)
  const { userToken } = useSelector((state) => state.auth)
const handleSubmitData = () => {
  const questionIds = Object.keys(selectedAnswers); 
  const answers = Object.values(selectedAnswers);
  const selectData = {
    user_id: userToken?.remember_tokens,
    service_id: setSelectedService?.service_id,
    question_id: questionIds,
    answers: answers,
  }
  dispatch(leadPreferencesData(selectData)).then((result)=>{
    if(result?.success){

      showToast("success", result?.message || "Data submitted successfully")
    }
    setSelectedAnswers({})
  })
}
 


  return (
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h1 className={styles.title}>{setSelectedService?.name}</h1>
        </div>

        <div className={styles.subHeader}>
          <span className={styles.icon}>
            <img src={CustomerQuestionsImg} alt="" />
          </span>{" "}
          Customer questions
        </div>
        <p className={styles.description}>
          Every customer answers this series of questions, allowing you to
          define exactly which type of leads you see.
        </p>
        {leadPreferenceData?.map((item) => {
           const options = item.answer ? item.answer.split(",") : [];
          const isOpen = openQuestionId === item.id;

          return (
            <div key={item.id} className={styles.questionBox}>
              <p
                className={styles.questionTitle}
                onClick={() =>
                  setOpenQuestionId((prev) => (prev === item.id ? null : item.id))
                }
              >
                {item.questions}
                <img
                  src={isOpen ? UpArrowIcon : DownArrowIcon}
                  alt="Toggle Icon"
                  className={styles.arrowIcon}
                />
              </p>

              <div
                className={`${styles.options} ${isOpen ? styles.showOptions : ""
                  }`}
              >
                {options.map((opt) => (
                  <label key={opt} className={styles.option}>
                    <input
                      type="radio"
                      name={`question-${item.id}`}
                      value={opt}
                      checked={selectedAnswers[item.id] === opt}
                      onChange={() =>
                        setSelectedAnswers((prev) => ({
                          ...prev,
                          [item.id]: opt,
                        }))
                      }
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          );
        })}

        <div className={styles.suggestion}>
          <span>Something missing?</span>
          <a href="#" className={styles.suggestLink}>
            Suggest a question
          </a>
        </div>

        <div className={styles.locations}>
          <span className={styles.locationIcon}>
            <img src={LocationIcon} alt="" /> Your locations
          </span>
          <a href="#" className={styles.addLocation}>
            + Add a location
          </a>
        </div>

        <div className={styles.range}>
          <span>
            {" "}
            <img src={TickIcon} alt="" /> Within
          </span>{" "}
          <strong>150 miles</strong> of <strong>01201</strong>
        </div>

        <div className={styles.footer}>
          <button className={styles.removeService}>
            <img src={TrashIcon} alt="" /> Remove this service
          </button>
          <button className={styles.saveButton} onClick={handleSubmitData}>Save</button>
        </div>
      </div>
    </>
  );
};

export default CustomerQuestions;
