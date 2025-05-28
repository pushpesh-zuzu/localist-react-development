import React, { useEffect, useState } from "react";
import styles from "./AccountDetails.module.css";
import iIcon from "../../assets/Images/iIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { sellerEditProfileApi, sellerUpdateProfileApi } from "../../store/MyProfile/myProfileSlice";
import { useNavigate } from "react-router-dom";

const AccountDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { registerData } = useSelector((state) => state.findJobs);
  const { userToken } = useSelector((state) => state.auth)
  const { editProfileList } = useSelector((state) => state.myProfile)
  const [contactData, setContactData] = useState({
    email: '',
    phone: '',
    sms_notification_no: ''
  });

  console.log(editProfileList,contactData, "editProfileList")
  useEffect(() => {
    if (editProfileList) {
      setContactData({
        email: editProfileList.email || '',
        phone: editProfileList.phone || '',
        sms_notification_no: editProfileList.sms_notification_no || ''
      });
    }
  }, [editProfileList]);
  const userId =
    userToken?.remember_tokens ?? registerData?.remember_tokens;
  useEffect(() => {
    const data = {
      user_id: userId
    }
    dispatch(sellerEditProfileApi(data))
  }, [])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...contactData,
      [name]: value,
    };

    setContactData(updatedData);


  };
  const handleSubmit = () => {
    const data =  {
      user_id: userId,
      email:contactData?.email,
      phone: contactData?.phone,
      name:editProfileList?.name,
      sms_notification_no: contactData?.sms_notification_no
    }
    dispatch(sellerUpdateProfileApi(data))
  }
  const handleBack = () => {
    navigate("/settings")
  }
  return (
    <div className={styles.container}>
      <div className={styles.backText} onClick={handleBack}>← Setting</div>
      <h1 className={styles.heading}>Account Details</h1>
      <div className={styles.manageWrapper}>
        <span className={styles.infoIcon}>
          <img src={iIcon} alt="iIcon" />
        </span>
        <p className={styles.description}>
          Manage your account email, phone number, password and login details.
          We’ll use these details to contact you but won’t share it with
          customers. You can control the email address and phone number that
          customers see for your business in{" "}
          <a href="#" className={styles.link}>
            My Profile
          </a>
          .
        </p>
      </div>

      <div className={styles.card}>
        <h3 className={styles.subHeading}>Contact details</h3>
        <p className={styles.note}>
          These details are used for lead notifications, and to contact you
          about important account issues. Please ensure they’re kept up-to-date.
        </p>

        <label className={styles.label}>Account email</label>
        <input
          type="email"
          className={styles.input}
          name="email"
          value={contactData.email}
          onChange={handleInputChange}
        />

        <label className={styles.label}>Preferred contact number</label>
        <input type="text" className={styles.input} name="phone"
          value={contactData.phone}
          onChange={handleInputChange} />

        <label className={styles.label}>SMS notification number</label>
        <input type="text" className={styles.input} name="sms_notification_no"
          value={contactData.sms_notification_no}
          onChange={handleInputChange} />
        <div className={styles.btnBox}>
          <button className={styles.saveBtn} onClick={handleSubmit}>Save</button>
        </div>
      </div>

      <div className={styles.passwordSection}>
        <h4 className={styles.subHeading}>Change password</h4>
        <p className={styles.note}>
          It’s important to keep your password up-to-date.
        </p>
        <button className={styles.button}>change password</button>
      </div>
    </div>
  );
};

export default AccountDetails;
