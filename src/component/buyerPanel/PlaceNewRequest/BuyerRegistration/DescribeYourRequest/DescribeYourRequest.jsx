import React, { useState } from "react";
import styles from "./DescribeYourRequest.module.css";
import PlusIcon from "../../../../../assets/Icons/PlusIcon.svg";
import CheckIcon from "../../../../../assets/Icons/CheckIcon.svg";

const MAX_WORDS = 200;

const DescribeYourRequest = () => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const progress = Math.min((wordCount / MAX_WORDS) * 100, 100);

  const handleChange = (e) => {
    const words = e.target.value.trim().split(/\s+/);
    if (words.filter(Boolean).length <= MAX_WORDS) {
      setText(e.target.value);
    }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.successMessage}>
        <img src={CheckIcon} alt="Success" className={styles.checkIcon} />
        <span>We've posted your request</span>
      </div>
      <div className={styles.header}>
        <h2>Describe your request in detail</h2>
      </div>
      <p className={styles.textareaLabel}>
        Add more details to get faster and more accurate responses
      </p>
      <textarea
        className={styles.textarea}
        value={text}
        rows={6}
        onChange={handleChange}
        placeholder="What would be helpful for the professional to know?"
      />
      {/* Custom Styled File Upload Button */}
      <label className={styles.fileUpload}>
        <img src={PlusIcon} alt="" />
        <span>Add photos/files</span>
        <input
          type="file"
          multiple
          className={styles.fileInput}
          onChange={handleFileChange}
        />
      </label>

      {/* Display Uploaded Files */}
      {files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}

      <div className={styles.privacyWrapper}>
        <p className={styles.privacyText}>
          Protected under our{" "}
          <a href="#" className={styles.privacyLink}>
            privacy policy
          </a>
        </p>
      </div>
      <div className={styles.progressContainer}>
        <span>Quality score</span>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className={styles.addMoreDetail}>
        <p>Add more detail to improve your request</p>
      </div>
      <label className={styles.checkboxContainer}>
        <input type="checkbox" />
        Let professionals know I want to be contacted ASAP
      </label>
      <div className={styles.buttonWrapper}>
        <button className={styles.viewMatchesBtn}>View Matches</button>
      </div>
    </div>
  );
};

export default DescribeYourRequest;
