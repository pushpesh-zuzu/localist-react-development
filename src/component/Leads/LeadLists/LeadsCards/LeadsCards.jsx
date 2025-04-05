import React, { use, useEffect } from "react";
import styles from "./LeadsCards.module.css";
import BlueSmsIcon from "../../../../assets/Images/Leads/BlueSmsIcon.svg";
import BluePhoneIcon from "../../../../assets/Images/Leads/BluePhoneIcon.svg";
import VerifiedPhoneIcon from "../../../../assets/Images/Leads/VerifiedPhoneIcon.svg";
import AdditionalDetailsIcon from "../../../../assets/Images/Leads/AdditionalDetailsIcon.svg";
import FrequentUserIcon from "../../../../assets/Images/Leads/FrequentUserIcon.svg";
import FirstToRespondImg from "../../../../assets/Images/Leads/FirstToRespondImg.svg";
import { useDispatch, useSelector } from "react-redux";
import { getLeadRequestList } from "../../../../store/LeadSetting/leadSettingSlice";
import { Spin } from "antd";

const LeadsCards = () => {
const dispatch = useDispatch();
  const {leadRequestList,leadRequestLoader} = useSelector((state) => state.leadSetting);

useEffect(() => {
  dispatch(getLeadRequestList());   
}, [])

  return (
    <>
    {leadRequestLoader ? <Spin style={{display:"flex", justifyContent:"center", margin:"auto",marginTop:"24px"}}/> : <>
  {  leadRequestList?.map((item)=>{
      return(
        <>
          <div className={styles.card}>
      {/* Left Section - User Info */}
      <div className={styles.infoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.userDetails}>
            <div className={styles.avatar}> {item?.customer?.name?.charAt(0).toUpperCase() || "U"}</div>
            <div className={styles.details}>
              <h3>{item?.customer?.name}</h3>
              <p>{item?.postcode}</p>
            </div>
          </div>
          <span className={styles.category}>{item?.category?.name}</span>
        </div>
        <div className={styles.contactContainer}>
          <div className={styles.contactItem}>
            <img src={BluePhoneIcon} alt="" />
            <span>{item?.phone}</span>
          </div>
          <div className={styles.contactItem}>
            <img src={BlueSmsIcon} alt="" />
            <span>{item?.customer?.email}</span>
          </div>
        </div>
      </div>

      {/* Middle Section - Job Details */}
      <div className={styles.jobDetails}>
        <div className={styles.badges}>
         {item?.is_phone_verified == 1 && <span className={styles.verified}>
            <img src={VerifiedPhoneIcon} alt="" />
            Verified Phone
          </span>}
         {item?.has_additional_details == 1 && <span className={styles.additional}>
            {" "}
            <img src={AdditionalDetailsIcon} alt="" />
            Additional details
          </span>}
         {item?.is_frequent_user == 1 && <span className={styles.frequent}>
            {" "}
            <img src={FrequentUserIcon} alt="" />
            Frequent user
          </span>}
        </div>
        <div className={styles.jobInfo}>
          <p>
            <strong>End of Tenancy Cleaning</strong>
          </p>
          <p>Flat / apartment | 3 bedrooms | 1 bathroom</p>
          <p>
            <strong>Starting:</strong> In the next month
          </p>
        </div>
      </div>

      {/* Right Section - Lead Purchase */}
      <div className={styles.leadActions}>
        <button className={styles.purchaseButton}>Purchase Lead</button>
        <span className={styles.credits}>{item?.credit_score}Credits</span>
        <p className={styles.responseStatus}>
          <img src={FirstToRespondImg} alt="" />
          1st to Responded
        </p>
      </div>
    </div>
        </>
      )
    })
  } </>}
  </>
  );
};

export default LeadsCards;
