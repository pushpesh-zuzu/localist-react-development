import React, { useEffect, useState } from "react";
import styles from "./SaveForLater.module.css"
import { useDispatch, useSelector } from "react-redux"
import { getAddManualBidData, getSaveLaterListData, totalCreditData } from "../../store/LeadSetting/leadSettingSlice"
import BlueSmsIcon from "../../assets/Images/Leads/BlueSmsIcon.svg";
import BluePhoneIcon from "../../assets/Images/Leads/BluePhoneIcon.svg";
import VerifiedPhoneIcon from "../../assets/Images/Leads/VerifiedPhoneIcon.svg";
import AdditionalDetailsIcon from "../../assets/Images/Leads/AdditionalDetailsIcon.svg";
import FrequentUserIcon from "../../assets/Images/Leads/FrequentUserIcon.svg";
import { showToast } from "../../utils";
import CustomModal from "../Leads/LeadLists/ConfirmModal";



const SaveForLater = () => {
  const dispatch = useDispatch()
  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const { saveForLaterDataList, manualBidLoader } = useSelector((state) => state.leadSetting)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)

  console.log(saveForLaterDataList, "saveForLaterDataList")
  useEffect(() => {

    const data = {
      user_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens
    }
    dispatch(getSaveLaterListData(data))
  }, [])
  const handleContinue = () => {
    if (!selectedItem) return;

    const formData = new FormData();
    formData.append("buyer_id", selectedItem?.customer_id);
    formData.append("user_id", userToken?.remember_tokens);
    formData.append("bid", selectedItem?.credit_score);
    formData.append("lead_id", selectedItem?.id);
    formData.append("bidtype", "purchase_leads");
    formData.append("service_id", selectedItem?.service_id);
    formData.append("distance", "0");

    dispatch(getAddManualBidData(formData)).then((result) => {
      if (result) {
        showToast("success", result?.message)
        setModalOpen(false);
      }
      const datas = {
        user_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens
      }
      dispatch(getSaveLaterListData(datas))

    });
  }
  return (
    <>
      <div className={styles.maincontainer}>
        <div style={{ fontSize: "24px", fontWeight: 800, }}>Save For Later List</div>
        {
          saveForLaterDataList?.[0]?.savedLeads
            ?.map((item) => {
              return (
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
                        {item?.is_urgent == 1 && (
                          <span className={styles.frequent}>
                            {" "}
                            <img src={FrequentUserIcon} alt="" />
                            Urgent
                          </span>
                        )}
                        {item?.is_high_hiring == 1 && (
                          <span className={styles.frequent}>
                            {" "}
                            <img src={FrequentUserIcon} alt="" />
                            High hiring
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
                      <button className={styles.purchaseButton} onClick={() => {
                        setSelectedItem(item);
                        setModalOpen(true);
                      }}>
                        Contact {item?.customer?.name}
                      </button>
                      <span className={styles.credits}>
                        {item?.credit_score}Credits
                      </span>

                      {/* <span className={styles.credits}>
                            {item?.credit_score}Credits
                          </span> */}
                    </div>
                  </div>
                </>
              )
            })
        }
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onContinue={handleContinue}
        message="Are you sure you want to continue?"
        loading={manualBidLoader}
      />
    </>
  )
}
export default SaveForLater