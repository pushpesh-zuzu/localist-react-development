import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./EmailMatch.module.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { registerUserData } from "../../../../../store/FindJobs/findJobSlice";

const EmailMatch = ({ nextStep, previousStep }) => {
  const dispatch = useDispatch();
  const { buyerRequest, requestLoader } = useSelector((state) => state.buyer);

  const [email, setEmail] = useState(buyerRequest?.email || "");
  const [name, setName] = useState(buyerRequest?.name || "");
  const [error, setError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError(true);
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("form_status", 1);
    formData.append("loggedUser", 2);
    formData.append("active_status", 2);
    formData.append("user_type", 2);

    dispatch(registerUserData(formData));
    nextStep();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>View your matches now!</h2>
        </div>

        <div className={styles.infoWrapper}>
          <label htmlFor="email" className={styles.label}>
            Please enter your email
          </label>
          <input
            type="email"
            placeholder="Email"
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            value={email}
            onChange={handleEmailChange}
          />
          {error && (
            <span className={styles.errorMessage}>
              Please enter a valid email address.
            </span>
          )}

          <div className={styles.buttonContainer}>
            <button className={styles.backButton} onClick={previousStep}>
              Back
            </button>
            <button
              className={styles.nextButton}
              onClick={handleSubmit}
              disabled={requestLoader}
            >
              {requestLoader ? (
                <Spin
                  indicator={
                    <LoadingOutlined spin style={{ color: "white" }} />
                  }
                />
              ) : (
                "View Matches"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailMatch;
