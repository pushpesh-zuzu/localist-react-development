import React, { useEffect } from "react"
import styles from "./MyResponse.module.css"
import { useDispatch, useSelector } from "react-redux"
import { getSaveLaterListData } from "../../store/LeadSetting/leadSettingSlice"
import BlueSmsIcon from "../../assets/Images/Leads/BlueSmsIcon.svg";
import BluePhoneIcon from "../../assets/Images/Leads/BluePhoneIcon.svg";
import VerifiedPhoneIcon from "../../assets/Images/Leads/VerifiedPhoneIcon.svg";
import AdditionalDetailsIcon from "../../assets/Images/Leads/AdditionalDetailsIcon.svg";
import FrequentUserIcon from "../../assets/Images/Leads/FrequentUserIcon.svg";

const MyResponse = () => {
    const dispatch = useDispatch()
    const { userToken } = useSelector((state) => state.auth);
    const { registerData } = useSelector((state) => state.findJobs);
    const { saveForLaterDataList } = useSelector((state) => state.leadSetting)
console.log(saveForLaterDataList,"saveForLaterDataList")
    useEffect(()=>{
const data = {
    user_id:userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens
}
dispatch(getSaveLaterListData(data))
    },[])
    return(
        <>
        <div className={styles.maincontainer}> 
        {
            saveForLaterDataList?.map((item) => {
                return(
                    <>
                    <div className={styles.card} >
                  {/* Left Section - User Info */}
                  <div className={styles.infoContainer}>
                    <div className={styles.userInfo}>
                      <div className={styles.userDetails}>
                        <div className={styles.avatar}>
                          {" "}
                          {item?.customer?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className={styles.details} >
                          <h3>{item?.customer?.name}</h3>
                          <p>{item?.postcode}</p>
                        </div>
                      </div>
                      <span className={styles.category}>
                        {item?.category?.name}
                      </span>
                    </div>
                    <div className={styles.contactContainer}>
                      <div className={styles.contactItem}>
                        <img src={BluePhoneIcon} alt="" />
                        <span>{item?.phone ? `${item?.phone.substring(0, 2)}${'*'.repeat(item?.phone.length - 2)}` : 'N/A'}</span>
                      </div>
                      <div className={styles.contactItem}>
                        <img src={BlueSmsIcon} alt="" />
                        <span>{item?.customer?.email ? `${item?.customer?.email.split('@')[0].substring(0, 8)}${'*'.repeat(Math.max(0, item?.customer?.email.split('@')[0].length - 8))}@${item?.customer?.email.split('@')[1]}` : 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section - Job Details */}
                  <div className={styles.jobDetails}>
                   
                    <div className={styles.badges}>
                      {item?.is_phone_verified == 1 && (
                        <span className={styles.verified}>
                          <img src={VerifiedPhoneIcon} alt="" />
                          Verified Phone
                        </span>
                      )}
                      {item?.has_additional_details == 1 && (
                        <span className={styles.additional}>
                          {" "}
                          <img src={AdditionalDetailsIcon} alt="" />
                          Additional details
                        </span>
                      )}
                      {item?.is_frequent_user == 1 && (
                        <span className={styles.frequent}>
                          {" "}
                          <img src={FrequentUserIcon} alt="" />
                          Frequent user
                        </span>
                      )}
                    </div>
                    <div className={styles.jobInfo}>
                      {item?.questions && (
                        <p>
                          {JSON.parse(item?.questions)
                            .map(qa => qa?.ans)
                            .join("/")}
                        </p>
                      )}
                    </div>
                    {/* <p>
                        <strong>Starting:</strong> In the next month
                      </p> */}
                  </div>

                  {/* Right Section - Lead Purchase */}
                 <div className={styles.leadActions}>
                   {/*   <button className={styles.purchaseButton} onClick={() => {
                      setSelectedItem(item);
                      setModalOpen(true);
                    }}>
                      Contact {item?.customer?.name}
                    </button>
                    <span className={styles.credits}>
                      {item?.credit_score}Credits
                    </span>> */}
                  
                  <span className={styles.credits}>
                      {item?.credit_score}Credits
                    </span>
                      </div>
                </div>
                    </>
                )
            })
        }
         </div>
        
        </>
    )
}

export default MyResponse