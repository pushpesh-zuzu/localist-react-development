import React, { useEffect, useState } from "react";
import styles from "./DescribeYourRequest.module.css";
import PlusIcon from "../../../../../assets/Icons/PlusIcon.svg";
import CheckIcon from "../../../../../assets/Icons/CheckIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addDetailsRequestData,
  addImageSubmittedData,
  clearSetbuyerRequestData,
  setBuyerStep,
  setQualityData,
  textQualityData,
} from "../../../../../store/Buyer/BuyerSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../../../utils";
import { clearBuyerRegisterFormData } from "../../../../../store/FindJobs/findJobSlice";
import { style } from "framer-motion/client";

const DescribeYourRequest = ({ onClose, setShowConfirmModal }) => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [professionalLetin, setProfessionalLetin] = useState(false);
  const [textError, setTextError] = useState(false);
  const [fileError, setFileError] = useState(false);

  const { requestId, qualityData, addDetailLoader } = useSelector(
    (state) => state.buyer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (text.trim() !== "") {
        dispatch(textQualityData({ text }));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [text, dispatch]);

  const handleChange = (e) => {
    setText(e.target.value);
    setTextError(false);
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

    // if (text.trim() === "") {
    //   setTextError(true);
    //   hasError = true;
    // }

    // if (files.length === 0) {
    //   setFileError(true);
    //   hasError = true;
    // }

    if (hasError) return;

    const detailsData = {
      request_id: requestId,
      details: text,
      professional_letin: professionalLetin ? 1 : 0,
    };

    dispatch(addDetailsRequestData(detailsData, navigate, requestId)).then(
      (result) => {
        if (result?.success) {
          showToast(
            "success",
            result?.message || "Create Request successfully!"
          );
        }
        // onClose();
        dispatch(clearSetbuyerRequestData());
        dispatch(clearBuyerRegisterFormData());
        dispatch(setQualityData());

        // navigate(`/bids-list/${requestId
        setShowConfirmModal(false);
        dispatch(setBuyerStep(0));

        navigate(`/conversion-redirect/${requestId}`);
      }
    );

    // .then(() => {
    //   navigate("/buyers/create");
    // })
    // .catch((error) => {
    //   console.error("Navigation failed due to API error:", error);
    // });
  };

  const handleCloseClick = () => {
    // setShowConfirmModal(true);
    onClose();
    dispatch(clearSetbuyerRequestData());
    dispatch(clearBuyerRegisterFormData());
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.closeButton}
        onClick={handleCloseClick}
        disabled={addDetailLoader}
      >
        &times;
      </div>
      <div className={styles.successMessage}>
        <img src={CheckIcon} alt="Success" className={styles.checkIcon} />
        <span>Your request has been submitted</span>
      </div>

      <div className={styles.header}>
        <h2>Tell us more about what you need for better responses</h2>
      </div>

      <p className={styles.textareaLabel}>
        The more information you provide, the quicker and more accurately
        professionals can respond
      </p>

      {/* ✅ Textarea Validation */}
      <textarea
        className={`${styles.textarea} ${textError ? styles.errorBorder : ""}`}
        value={text}
        // rows={6}
        onChange={handleChange}
        placeholder="What should the professional know to better understand your request? (Provide any relevant details here.)"
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
        <span>Upload photos or files (optional)</span>
        <input
          type="file"
          multiple
          className={styles.fileInput}
          onChange={handleFileChange}
          accept="image/png, image/jpg, image/jpeg"
        />
      </label>
      <p className={styles.textmes}>
        Image (jpeg, jpg, png) file can be uploaded
      </p>
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

      <div className={styles.progressContainer}>
        <span>Request quality</span>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: qualityData > 0 ? `${qualityData}%` : "0%" }}
          ></div>
        </div>
      </div>

      <div className={styles.addMoreDetail}>
        <p>Quality score increases as you add more detail</p>
      </div>

      {/* <label className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={professionalLetin}
          onChange={handleCheckboxChange}
        />
       Tick if you'd like to hear back quickly <br/>
       
 I’m happy to be contacted as soon as possible 

      </label> */}
      <label className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={professionalLetin}
          onChange={handleCheckboxChange}
          className={styles.checkbox}
        />
        <div style={{ marginLeft: "-4px", flexDirection: "column" }}>
          <span className={styles.textLine1}>
            Tick if you'd like to hear back quickly
          </span>
          <br />
          <span className={styles.textLine2}>
            I’m happy to be contacted as soon as possible
          </span>
        </div>
      </label>
      <div className={styles.buttonWrapper}>
        <button className={styles.viewMatchesBtn} onClick={handleSubmit}>
          {addDetailLoader ? (
            <Spin
              indicator={<LoadingOutlined spin style={{ color: "white" }} />}
            />
          ) : (
            " See My Matches"
          )}
        </button>
      </div>
      <div className={styles.privacyWrapper}>
        <p className={styles.privacyText}>
          Your information is protected by our{" "}<span className={styles.privacy}>privacy policy</span>
          {/* <a
            href="/privacy-policy"
            target="blank"
            className={styles.privacyLink}
          >
            privacy policy
          </a> */}
        </p>
      </div>
    </div>
  );
};

export default DescribeYourRequest;
