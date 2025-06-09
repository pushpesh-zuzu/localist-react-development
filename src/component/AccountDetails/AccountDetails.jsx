import React, { useEffect, useState } from "react";
import styles from "./AccountDetails.module.css";
import iIcon from "../../assets/Images/iIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { sellerEditProfileApi, sellerUpdatePasswordApi, sellerUpdateProfileApi } from "../../store/MyProfile/myProfileSlice";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { showToast } from "../../utils";
import { updatePasswordData } from "../../store/Buyer/BuyerSlice";
import ChangePasswordModal from "./ChangePasswordModal";

const AccountDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { registerData } = useSelector((state) => state.findJobs);
  const { userToken } = useSelector((state) => state.auth)
  const { editProfileList,sellerLoader } = useSelector((state) => state.myProfile)
  const [contactData, setContactData] = useState({
    email: '',
    phone: '',
    sms_notification_no: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
    const [formData, setFormData] = useState({
      password: "",
      password_confirmation: "",
      error: "",
    });
  
    const handleFormChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value, error: "" });
    };
  
    const handleSavePassword = () => {
      const { password, password_confirmation } = formData;
    
      if (!password || !password_confirmation) {
        setFormData({
          ...formData,
          error: "Please fill out both password fields.",
        });
        return;
      }
    
      if (password !== password_confirmation) {
        setFormData({
          ...formData,
          error: "Passwords do not match.",
        });
        return;
      }
    
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{8,}$/;
    
      if (!passwordRegex.test(password)) {
        setFormData({
          ...formData,
          error:
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
        });
        return;
      }
    
      // ✅ Only send password
      const formDataToSend = new FormData();
      formDataToSend.append("password", password);
    
      dispatch(sellerUpdatePasswordApi(formDataToSend)).then((result) => {
        if (result?.success) {
          showToast("success", result?.message || "Password updated successfully!");
          setFormData({
            password: "",
            password_confirmation: "",
            error: "",
          });
          setIsModalOpen(false);
        } else {
          setFormData((prev) => ({
            ...prev,
            error: result?.message || "Failed to update password.",
          }));
        }
      });
    };
    

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
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return; 
      if (value.length > 10) return;    
    }
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
    dispatch(sellerUpdateProfileApi(data)).then((result)=>{
      if(result) {
        showToast("success",result?.message)
        const data = {
          user_id: userId
        }
        dispatch(sellerEditProfileApi(data))
      }
    })
  }
  const handleBack = () => {
    navigate("/settings")
  }
  return (
    <>
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
          <Link to="/settings/my_profile" className={styles.link} >
                            My Profile
                        </Link>
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
          <button className={styles.saveBtn} onClick={handleSubmit}>{sellerLoader ? <Spin
                                          indicator={<LoadingOutlined spin style={{ color: "blue" }} />}
                                      />  :"Save"}</button>
        </div>
      </div>

      <div className={styles.passwordSection}>
        <h4 className={styles.subHeading}>Change password</h4>
        <p className={styles.note}>
          It’s important to keep your password up-to-date.
        </p>
        <button className={styles.button} onClick={() => setIsModalOpen(true)}>change password</button>
      </div>
      </div>
       {
        isModalOpen && 

        // Inside your parent component's return:
        <ChangePasswordModal
          isOpen={isModalOpen}
          formData={formData}
          newPasswordVisible={newPasswordVisible}
          confirmPasswordVisible={confirmPasswordVisible}
          setNewPasswordVisible={setNewPasswordVisible}
          setConfirmPasswordVisible={setConfirmPasswordVisible}
          handleFormChange={handleFormChange}
          handleSavePassword={handleSavePassword}
          setIsModalOpen={setIsModalOpen}
          loading={true} // or a loading state from Redux/local state
        />
        
       }
   </>
  );
};

export default AccountDetails;
