import React from "react";
import styles from "./NewQuestion.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const NewQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const serviceId = params.get("serviceId");
  console.log(serviceId, "serviceId from query param");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Suggest a new question</h2>
      <p className={styles.subtitle}>
        What question would you like to see added to future Branding & Brand
        Management requests?
      </p>

      <div className={styles.card}>
        <div>
          <label className={styles.label}>Question</label>
          <input type="text" className={styles.input} placeholder="Title..." />
        </div>

        <div>
          <label className={styles.label}>Type of answer</label>
          <select className={styles.select}>
            <option value disabled>
              Select an option
            </option>
            <option value="select">
              {" "}
              Select box (a buyer can only select one option from the list of
              answers)
            </option>
            <option value="checkbox">
              {" "}
              Check box (a buyer can select multiple options from the list of
              answers)
            </option>
            <option value="text">
              {" "}
              Short open text field (you only need a short answer from the
              buyer)
            </option>
            <option value="textarea">
              {" "}
              Large open text field (you would prefer a longer answer from the
              buyer)
            </option>
            <option value="date">
              {" "}
              Date (the buyer has to select a date from a calendar)
            </option>
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            Back
          </button>
          <button className={styles.saveButton}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default NewQuestion;
