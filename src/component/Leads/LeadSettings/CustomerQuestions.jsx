import React, { useState } from "react";
import styles from "./CustomerQuestions.module.css";

const CustomerQuestions = ({ service }) => {
  const [selectedProperty, setSelectedProperty] = useState("Flat");

  if (!service) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <h2 className={styles.title}>{service.name}</h2>
      </div>

      <div className={styles.subHeader}>
        <span className={styles.icon}>ℹ️</span> Customer questions
      </div>
      <p className={styles.description}>
        Every customer answers this series of questions, allowing you to define
        exactly which type of leads you see.
      </p>

      <div className={styles.questionBox}>
        <p className={styles.questionTitle}>
          What type of property is this for?
        </p>
        <div className={styles.options}>
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
        <span className={styles.locationIcon}>📍</span> Your locations
        <a href="#" className={styles.addLocation}>
          + Add a location
        </a>
      </div>

      <div className={styles.range}>
        <span>📍 Within</span> <strong>150 miles</strong> of{" "}
        <strong>01201</strong>
      </div>

      <div className={styles.footer}>
        <button className={styles.removeService}>🗑 Remove this service</button>
        <button className={styles.saveButton}>Save</button>
      </div>
    </div>
  );
};

export default CustomerQuestions;
