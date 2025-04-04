import React, { useState } from "react";
import styles from "./CustomerQuestions.module.css";
import CustomerQuestionsImg from "../../../assets/Images/Leads/CustomerQuestionsImg.svg";
import UpArrowIcon from "../../../assets/Images/Leads/UpArrowIcon.svg";
import DownArrowIcon from "../../../assets/Images/Leads/DownArrowIcon.svg";
import LocationIcon from "../../../assets/Images/Leads/LocationIcon.svg";
import TickIcon from "../../../assets/Images/Leads/TickIcon.svg";
import TrashIcon from "../../../assets/Images/Leads/TrashIcon.svg";

const CustomerQuestions = ({ service }) => {
  const [selectedProperty, setSelectedProperty] = useState("Flat");
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h1 className={styles.title}>House Cleaning</h1>
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

        <div className={styles.questionBox}>
          <p
            className={styles.questionTitle}
            onClick={() => setIsQuestionOpen(!isQuestionOpen)}
          >
            What type of property is this for?
            <img
              src={isQuestionOpen ? UpArrowIcon : DownArrowIcon}
              alt="Toggle Icon"
              className={styles.arrowIcon}
            />
          </p>

          <div
            className={`${styles.options} ${
              isQuestionOpen ? styles.showOptions : ""
            }`}
          >
            {["Flat", "Apartment", "House", "Commercial property", "Other"].map(
              (type) => (
                <label key={type} className={styles.option}>
                  <input
                    type="radio"
                    name="propertyType"
                    value={type}
                    checked={selectedProperty === type}
                    onChange={() => setSelectedProperty(type)}
                  />
                  {type}
                </label>
              )
            )}
          </div>
        </div>

        {[
          "What type of commercial property is this?",
          "How many bedrooms does the property have?",
          "How many bathrooms does the property have?",
          "Which additional services do you need?",
          "Do you have a specific date already set?",
          "When do you want the cleaning done?",
        ].map((question, index) => (
          <div key={index} className={styles.dropdown}>
            <p className={styles.dropdownTitle}>{question}</p>
            <span className={styles.arrow}>▼</span>
          </div>
        ))}

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
          <button className={styles.saveButton}>Save</button>
        </div>
      </div>
    </>
  );
};

export default CustomerQuestions;
