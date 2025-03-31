import React, { useState, useEffect } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import styles from "./BuyerAccountSettings.module.css";
import iIcon from "../../assets/Images/iIcon.svg";
import DefaultProfileImage from "../../assets/Images/DefaultProfileImage.svg";
import {
  updateProfileData,
  updateProfileImageData,
  updateUserIfoData,
} from "../../store/Buyer/BuyerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const BuyerAccountSettings = () => {
  const dispatch = useDispatch();
  const { getuploadImg, infoLoader } = useSelector((state) => state.buyer);

  // Initial state for user details
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    profile_image: "",
  });
  useEffect(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  // Update state when data is available
  useEffect(() => {
    if (Array.isArray(getuploadImg) && getuploadImg.length > 0) {
      const userData = getuploadImg[0];
      setUserDetails({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        profile_image: userData.profile_image || "",
      });
    }
  }, [getuploadImg]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image_file", file);

      dispatch(updateProfileImageData(formData));
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    const infoData = {
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
    };
    dispatch(updateUserIfoData(infoData));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    error: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, error: "" });
  };

  const handleSavePassword = () => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      setFormData({
        ...formData,
        error: "New password and confirm password must match.",
      });
      return;
    }
    console.log("Password updated successfully!");
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Account settings</h2>

      <div className={styles.infoBox}>
        <p>
          <span>
            {/* <img src={iIcon} alt="" /> */}
            <img src={userDetails.profile_image || iIcon} alt="Profile" />
          </span>
          Keep your details updated so that professionals can get in touch. If
          you no longer require the service, please close the request.
        </p>
        <button className={styles.requestButton}>Go to My Requests</button>
      </div>

      <div className={styles.detailsBox}>
        <h3 className={styles.subHeading}>My details</h3>
        <div className={styles.profileSection}>
          <div className={styles.profileImage}>
            <img
              src={userDetails.profile_image || DefaultProfileImage}
              alt="Profile"
            />
          </div>
          <div className={styles.uploadButtons}>
            <label className={styles.uploadButton}>
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </label>
            <button className={styles.uploadButton}>Take Photo</button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Phone number</label>
          <input
            type="text"
            name="phone"
            value={userDetails.phone}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroupPassword}>
          <label>Password</label>
          <button
            className={styles.changePasswordButton}
            onClick={() => setIsModalOpen(true)}
          >
            Change Password
          </button>
        </div>
      </div>

      <div className={styles.saveButtonWrapper}>
        <button className={styles.saveButton} onClick={handleSubmit}>
          {infoLoader ? (
            <Spin
              indicator={<LoadingOutlined spin style={{ color: "white" }} />}
            />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Change Password</h3>
            </div>

            {/* New Password Field */}
            <div className={styles.formGroup}>
              <label>New Password</label>
              <div className={styles.passwordField}>
                <input
                  type={newPasswordVisible ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleFormChange}
                  className={`${styles.inputField} ${
                    formData.error ? styles.inputError : ""
                  }`}
                />
                <span
                  onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                  className={styles.eyeIcon}
                >
                  {newPasswordVisible ? (
                    <EyeInvisibleOutlined />
                  ) : (
                    <EyeOutlined />
                  )}
                </span>
              </div>
              {formData.error && (
                <p className={styles.error}>{formData.error}</p>
              )}
            </div>

            {/* Confirm New Password Field */}
            <div className={styles.formGroup}>
              <label>Confirm New Password</label>
              <div className={styles.passwordField}>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleFormChange}
                  className={`${styles.inputField} ${
                    formData.error ? styles.inputError : ""
                  }`}
                />
                <span
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className={styles.eyeIcon}
                >
                  {confirmPasswordVisible ? (
                    <EyeInvisibleOutlined />
                  ) : (
                    <EyeOutlined />
                  )}
                </span>
              </div>
              {formData.error && (
                <p className={styles.error}>{formData.error}</p>
              )}
            </div>

            <div className={styles.saveButtonWrapperModal}>
              <button
                className={styles.modalSaveButton}
                onClick={handleSavePassword}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerAccountSettings;
