import React, { useState } from "react";
import styles from "./QandAAccordion.module.css";
import axios from "axios";
import axiosInstance from "../../../Api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updateSellerQandA,
  clearQnaStatus,
  setIsDirtyRedux,
} from "../../../store/MyProfile/myProfileSlice";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const questions = [
  {
    id: "businessDuration",
    label: "Tell us how long you’ve been running your business.",
  },
  {
    id: "equipment",
    label: "Do you provide your own tools and materials?",
  },
  {
    id: "jobLove",
    label: "What do you enjoy most about your work?",
  },
  // {
  //   id: "startBusiness",
  //   label: "What inspired you to start your own business?",
  // },
  {
    id: "clientChoose",
    label: "Why should Localists.com customers choose your business?",
  },
  // {
  //   id: "remoteServices",
  //   label: "Can you provide your services online or remotely? If so, please add details.",
  // },
  // {
  //   id: "safeFromCovid",
  //   label: "What changes have you made to keep your customers safe from Covid-19?",
  // },
];

const QandAAccordion = ({ details }) => {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingQuestionId, setLoadingQuestionId] = useState(null);
  console.log(details, "details");

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    dispatch(setIsDirtyRedux(true));
  };

  const dispatch = useDispatch();
  const { qnaUpdateSuccess, qnaUpdateError, sellerLoader } = useSelector(
    (state) => state.myProfile
  );

  const handleSubmit = () => {
    dispatch(updateSellerQandA(answers));
  };

  // useEffect(() => {
  //   if (details && Array.isArray(details)) {
  //     const initialAnswers = {};
  //     details.forEach((item) => {
  //       const matchingQuestion = questions.find(
  //         (q) => q.label === item.questions
  //       );
  //       if (matchingQuestion) {
  //         initialAnswers[matchingQuestion.id] = item.answer;
  //       }
  //     });
  //     setAnswers(initialAnswers);
  //   }
  // }, [details]);
  useEffect(() => {
    if (details && Array.isArray(details)) {
      const initialAnswers = {};
      details.forEach((item) => {
        console.log(item, "item");
        const match = questions.find(
          (q) =>
            q.label.toLowerCase().trim() === item.questions.toLowerCase().trim()
        );
        if (match) {
          initialAnswers[match.id] = item.answer;
        } else {
          console.warn("No match found for:", item.questions);
        }
      });
      setAnswers(initialAnswers);
    }
  }, [details]);

  useEffect(() => {
    if (qnaUpdateSuccess) {
      toast.success("Q&A updated successfully!");
      dispatch(clearQnaStatus());

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (qnaUpdateError) {
      toast.error(`Error: ${qnaUpdateError}`);
      dispatch(clearQnaStatus());
    }
  }, [qnaUpdateSuccess, qnaUpdateError, dispatch]);

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Q&A - Help Customers Choose You</h3>
      <p className={styles.subheading2}>
        Provide answers to the most common customer questions on Localists.com
        to build trust and make it easier for customers to hire you with
        confidence.
      </p>
      {questions.map((question, index) => (
        <div className={styles.qaItem} key={question.id}>
          <label className={styles.label}>{question.label}</label>
          <textarea
            value={answers[question.id] || ""}
            onChange={(e) => handleChange(question.id, e.target.value)}
            className={styles.textarea}
            rows={4}
          />
          <div className={styles.lastBoxContainer}>
            <div className={styles.liftBoxContainer}>
              <span className={styles.helperText}>Minimum 50 characters</span>
              {index === 2 && (
                <div className={styles.suggestion}>
                  {/* <a href="#" className={styles.link}>
               Use our free online AI tool to help you write a great business description.
              </a> */}
                </div>
              )}
            </div>
            <div className={styles.buttonRow}>
              {/* <button
        className={styles.saveBtn}
        onClick={() => dispatch(updateSellerQandA({ [question.id]: answers[question.id] }))}
        disabled={sellerLoader}
      >
        {sellerLoader ? "Saving..." : "Save"}
      </button> */}
              {/* <button
                className={styles.saveBtn}
                onClick={() => {
                  setLoadingQuestionId(question.id);
                  dispatch(
                    updateSellerQandA({ [question.id]: answers[question.id] })
                  )
                    .then(() => setLoadingQuestionId(null))
                    .catch(() => setLoadingQuestionId(null));
                }}
                disabled={loadingQuestionId === question.id}
              >
                {loadingQuestionId === question.id ? (
                  <Spin
                    indicator={
                      <LoadingOutlined spin style={{ color: "white" }} />
                    }
                  />
                ) : (
                  "Save"
                )}
              </button> */}
              <button
                className={styles.saveBtn}
                onClick={() => {
                  if (
                    !answers[question.id] ||
                    answers[question.id].trim() === ""
                  ) {
                    toast.error(
                      "Answer cannot be empty. Please provide an answer."
                    );
                    return;
                  }

                  if (answers[question.id].trim().length < 50) {
                    toast.error(
                      "Answer should be at least 50 characters long."
                    );
                    return;
                  }

                  setLoadingQuestionId(question.id);
                  dispatch(
                    updateSellerQandA({ [question.id]: answers[question.id] })
                  )
                    .then(() => setLoadingQuestionId(null))
                    .catch(() => setLoadingQuestionId(null));
                }}
                disabled={loadingQuestionId === question.id}
              >
                {loadingQuestionId === question.id ? (
                  <Spin
                    indicator={
                      <LoadingOutlined spin style={{ color: "white" }} />
                    }
                  />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QandAAccordion;
