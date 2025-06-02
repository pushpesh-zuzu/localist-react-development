import React, { useState } from "react";
import styles from "./QandAAccordion.module.css";
import { label } from "framer-motion/client";

const questions = [
  {
    id: "businessDuration",
    label: "How long have you been in business?",
  },
  {
    id: "equipment",
    label: "Do you bring your own equipment and supplies?",
  },
  {
    id: "jobLove",
    label: "What do you love most about your job?",
  },
  {
    id: "startBusiness",
    label: "What inspired you to start your own business?",
  },
   {
    id:"clientChoose",
    label:"Why should our clients choose you?"
  },
  {
    id: "remoteServices",
    label:
      "Can you provide your services online or remotely? If so, please add details.",
  },
 
  //  {
  //   id:"serviceOnline",
  //   label:"Can you provide your services online or remotely? If so, please add details."
  // },
  {
    id: "safeFromCovid",
    label:
      "What changes have you made to keep your customers safe from Covid-19?",
  },
];

const QandAAccordion = () => {
  const [answers, setAnswers] = useState({
    businessDuration: "",
    equipment: "",
    jobLove: "",
    startBusiness: "",
    remoteServices: "",
    safeFromCovid: "",
  });

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Questions & answers</h3>
      <p className={styles.subheading}>
        Answer common questions upfront to remove customer reservations and
        doubt, bringing them closer to making a hiring decision.
      </p>

      {questions.map((question, index) => (
        <div className={styles.qaItem} key={question.id}>
          <label className={styles.label}>{question.label}</label>
          <textarea
            value={answers[question.id]}
            onChange={(e) => handleChange(question.id, e.target.value)}
            className={styles.textarea}
            rows={4}
          />
          <span className={styles.helperText}>Minimum 50 characters</span>

          {index === 2 && (
            <>
              <div className={styles.suggestion}>
                <a href="#" className={styles.link}>
                  Use our free online tool to write the perfect description of
                  your business
                </a>
              </div>
            </>
          )}
        </div>
      ))}

      <div className={styles.buttonRow}>
        <button className={styles.cancelBtn}>Cancel</button>
        <button className={styles.saveBtn}>Save</button>
      </div>
    </div>
  );
};

export default QandAAccordion;
