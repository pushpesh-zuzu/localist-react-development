import React, { useEffect, useState } from "react";
import styles from "./DescribeYourRequest.module.css";
import PlusIcon from "../../../../../assets/Icons/PlusIcon.svg";
import CheckIcon from "../../../../../assets/Icons/CheckIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addDetailsRequestData,
  addImageSubmittedData,
  textQualityData,
} from "../../../../../store/Buyer/BuyerSlice";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

const MAX_WORDS = 200;
const MIN_WORDS = 5;

const DescribeYourRequest = ({onClose}) => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [professionalLetin, setProfessionalLetin] = useState(false);
  const [textError, setTextError] = useState(false);
  const [fileError, setFileError] = useState(false);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const progress = Math.min((wordCount / MAX_WORDS) * 100, 100);

  const { requestId ,qualityData,addDetailLoader} = useSelector((state) => state.buyer);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // const handleChange = (e) => {
  //   const words = e.target.value.trim().split(/\s+/);
  //   if (words.filter(Boolean).length <= MAX_WORDS) {
  //     setText(e.target.value);
  //     setTextError(false);
  //   }

  //   const textData = { text: e.target.value };
  //   dispatch(textQualityData(textData));
  // };
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (text.trim() !== "") {
        dispatch(textQualityData({ text }));
      }
    }, 2000);

    return () => clearTimeout(delayDebounce);
  }, [text, dispatch]); 

  const handleChange = (e) => {
    const qualityData = e.target.value.trim().split(/\s+/);
    if (qualityData.filter(Boolean).length <= MAX_WORDS) {
      setText(e.target.value);
      setTextError(false);
    }
  };

  const handleCheckboxChange = (e) => {
    setProfessionalLetin(e.target.checked);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length === 0) {
      setFileError(true);
      return;
    }

    setFiles(selectedFiles);
    setFileError(false);

    const formData = new FormData();
    formData.append("request_id", requestId);
    selectedFiles.forEach((file) => {
      formData.append("image_file", file);
    });

    dispatch(addImageSubmittedData(formData));
  };

  const handleSubmit = () => {
    let hasError = false;

    if (wordCount < MIN_WORDS) {
      setTextError(true);
      hasError = true;
    }

    if (files.length === 0) {
      setFileError(true);
      hasError = true;
    }

    if (hasError) return;

    const detailsData = {
      request_id: requestId,
      details: text,
      professional_letin: professionalLetin ? 1 : 0,
    };

    dispatch(addDetailsRequestData(detailsData))
    onClose()
    
     
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

      {/* ✅ Textarea Validation */}
      <textarea
        className={`${styles.textarea} ${textError ? styles.errorBorder : ""}`}
        value={text}
        rows={6}
        onChange={handleChange}
        placeholder="What would be helpful for the professional to know?"
      />
      {textError && (
        <span className={styles.errorMessage}>
          Please fill this input field.
        </span>
      )}

      {/* ✅ File Upload Validation */}
      <label
        className={`${styles.fileUpload} ${
          fileError ? styles.errorBorder : ""
        }`}
      >
        <img src={PlusIcon} alt="" />
        <span>Add photos/files</span>
        <input
          type="file"
          multiple
          className={styles.fileInput}
          onChange={handleFileChange}
          accept="image/png, image/jpg, image/jpeg"
        />
      </label>
      <p className={styles.textmes}>Image (jpeg, jpg, png) file can be uploaded</p>
      {fileError && (
        <span className={styles.errorMessage}>Please upload a file.</span>
      )}

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
            style={{ width: qualityData > 0 ? `${qualityData}%` : "0%" }} 
          ></div>
        </div>
      </div>

      <div className={styles.addMoreDetail}>
        <p>Add more detail to improve your request</p>
      </div>

      <label className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={professionalLetin}
          onChange={handleCheckboxChange}
        />
        Let professionals know I want to be contacted ASAP
      </label>

      <div className={styles.buttonWrapper}>
        <button className={styles.viewMatchesBtn} onClick={handleSubmit}>
         {addDetailLoader ?  <Spin indicator={<LoadingOutlined spin  style={{color:"white"}}/>} /> :" View Matches"}
        </button>
      </div>
    </div>
  );
};

export default DescribeYourRequest;
