import React, { use, useEffect, useState } from "react";
import styles from "./LeadsCards.module.css";
import BlueSmsIcon from "../../../../assets/Images/Leads/BlueSmsIcon.svg";
import BluePhoneIcon from "../../../../assets/Images/Leads/BluePhoneIcon.svg";
import VerifiedPhoneIcon from "../../../../assets/Images/Leads/VerifiedPhoneIcon.svg";
import AdditionalDetailsIcon from "../../../../assets/Images/Leads/AdditionalDetailsIcon.svg";
import FrequentUserIcon from "../../../../assets/Images/Leads/FrequentUserIcon.svg";
import FirstToRespondImg from "../../../../assets/Images/Leads/FirstToRespondImg.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAddManualBidData, getLeadRequestList, saveForLaterApi, totalCreditData } from "../../../../store/LeadSetting/leadSettingSlice";
import { Spin } from "antd";
import CustomModal from "../ConfirmModal";
import { showToast } from "../../../../utils";
import saveImg from "../../../../assets/Images/Leads/saveLaterImg.svg"
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import ContactConfirmModal from "../ContactConfirmModal";

const LeadsCards = ({enoughCredit}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [visibleCount, setVisibleCount] = useState(5);
  const [saveLaterLoaderId, setSaveLaterLoaderId] = useState(null);
const [isopen,setIsOpen] = useState(false)
const [planpurcahse,setPlanPurchase] = useState("")

  const { leadRequestList, leadRequestLoader, manualBidLoader, saveLaterLoader,filters,totalCredit,purchasedData } = useSelector(
    (state) => state.leadSetting
  );
  const { registerData } = useSelector((state) => state.findJobs);
  const { userToken } = useSelector((state) => state.auth)
  const data = leadRequestList?.length

  useEffect(() => {
    const leadRequestData = {
      user_id: userToken?.remember_tokens
    }
    dispatch(getLeadRequestList(leadRequestData));
  }, []);
  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 5);
  };
  

  // const handleContinue = () => {
  //   if (!selectedItem) return;
  // if(totalCredit > 0) {

  // }

  //   const formData = new FormData();
  //   formData.append("buyer_id", selectedItem?.customer_id);
  //   formData.append("user_id", userToken?.remember_tokens);
  //   formData.append("bid", selectedItem?.credit_score);
  //   formData.append("lead_id", selectedItem?.id);
  //   formData.append("bidtype", "purchase_leads");
  //   formData.append("service_id", selectedItem?.service_id);
  //   formData.append("distance", "0");

  //   dispatch(getAddManualBidData(formData)).then((result) => {
  //     if (result) {
  //       showToast("success", result?.message)
  //       setModalOpen(false);
  //     }
  //     const data = {
  //       user_id: userToken?.remember_tokens
  //     }
  //     dispatch(totalCreditData(data))
  //     dispatch(getLeadRequestList(data))
  //   });
  // }
  console.log(purchasedData,"purchasedData")
//   const handleContinue = () => {
//   if (!selectedItem) return;
//   if(totalCredit?.plan_purchased === 0){
//     setIsOpen(true)
//   }

//   if (totalCredit?.total_credit <= 0 && selectedItem?.credit_score <= totalCredit?.total_credit) {
//    setIsOpen(true)
//     return;
//   }

//   const formData = new FormData();
//   formData.append("buyer_id", selectedItem?.customer_id);
//   formData.append("user_id", userToken?.remember_tokens);
//   formData.append("bid", selectedItem?.credit_score);
//   formData.append("lead_id", selectedItem?.id);
//   formData.append("bidtype", "purchase_leads");
//   formData.append("service_id", selectedItem?.service_id);
//   formData.append("distance", "0");

//   dispatch(getAddManualBidData(formData)).then((result) => {
//     if (result) {
//       showToast("success", result?.message);
//       setModalOpen(false);
//     }

//     const data = {
//       user_id: userToken?.remember_tokens
//     };

//     dispatch(totalCreditData(data));
//     dispatch(getLeadRequestList(data));
//   });
// };
const handleContinue = (item) => {
  if (!item) return;
  setSelectedItem(item)
setPlanPurchase(totalCredit?.plan_purchased)
  

  // Condition 1: Plan not purchased
  if (totalCredit?.plan_purchased === 0) {
    setIsOpen(true);
    return;
  }
  // Condition 2: Not enough credits
  if (totalCredit?.total_credit < item?.credit_score) {
    setIsOpen(true);
    return;
  }
  if(totalCredit?.total_credit > item?.credit_score){
    setModalOpen(true)
    return;
  }

  // Proceed with API call if conditions are okay
  // const formData = new FormData();
  // formData.append("buyer_id", item?.customer_id);
  // formData.append("user_id", userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens);
  // formData.append("bid", item?.credit_score);
  // formData.append("lead_id", item?.id);
  // formData.append("bidtype", "purchase_leads");
  // formData.append("service_id", item?.service_id);
  // formData.append("distance", "0");

  // dispatch(getAddManualBidData(formData)).then((result) => {
  //   if (result) {
  //     showToast("success", result?.message);
  //     setModalOpen(false);
  //   }

  //   const data = {
  //     user_id: userToken?.remember_tokens,
  //   };

  //   dispatch(totalCreditData(data));
  //   dispatch(getLeadRequestList(data));
  // });
};
const handleContinues = () => {
  const formData = new FormData();
  formData.append("buyer_id", selectedItem?.customer_id);
  formData.append("user_id", userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens);
  formData.append("bid", selectedItem?.credit_score);
  formData.append("lead_id", selectedItem?.id);
  formData.append("bidtype", "purchase_leads");
  formData.append("service_id", selectedItem?.service_id);
  formData.append("distance", "0");

  dispatch(getAddManualBidData(formData)).then((result) => {
    if (result) {
      showToast("success", result?.message);
      // setIsOpen(false)
      setModalOpen(false);
    }

    const data = {
      user_id: userToken?.remember_tokens,
    };

    dispatch(totalCreditData(data));
    dispatch(getLeadRequestList(data));
  });
}


  const handleViewProfile = (item) => {
    navigate(`/lead/profile-view/${item?.customer_id}?id=${item?.id}`)
  }
  const handleSaveLater = (item) => {
    setSaveLaterLoaderId(item.id);

    const saveLaterData = {
      user_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens,
      lead_id: item?.id,
      buyer_id: item?.customer_id
    }
    dispatch(saveForLaterApi(saveLaterData)).then((result) => {
      if (result.success) {
        showToast("success", result?.message)
        // const leadRequestData = {
        //   user_id: userToken?.remember_tokens
        // }
        // dispatch(getLeadRequestList(leadRequestData)) 
          const formData = new FormData();
        
            formData.append("user_id", userToken?.remember_tokens || "");
            formData.append("name", filters.keyword || "");
            formData.append("lead_time", filters.submittedWhen || "");
            formData.append("distance_filter", filters.location || "");
        
            const selectedServiceIds = filters.selectedServices
              .map((serviceName) => {
                const match = popularList.find((s) => s.name === serviceName);
                return match?.id;
              })
              .filter(Boolean);
        
            formData.append("service_id", selectedServiceIds.join(","));
        
            formData.append("credits", filters.credits.join(","));
            // formData.append("contact_preferences", filters.contactPreferences.join(","));
            formData.append("lead_spotlights", filters.leadSpotlights.join(","));
            // formData.append("buyer_actions", filters.buyerActions.join(","));
            formData.append("unread", filters.unread ? 1 : 0);
        
            dispatch(getLeadRequestList(formData)).then((result) => {
              if (result) {
                showToast("success", result?.message);
              }
            })
       
      }
      setSaveLaterLoaderId(null);
    })
  }
  const handleOpenClose = (e) => {
    setIsOpen(false)
    if(e){
setTimeout(()=> {
  setModalOpen(true)

},2000)
    }
  }
  return (
    <>
      {leadRequestLoader ? (
        <Spin
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "auto",
            marginTop: "24px",
          }}
        />
      ) : (
        <>
          {leadRequestList?.slice(0, visibleCount)?.map((item) => {
            console.log(item?.view_count,'itemss')
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
                        <div className={styles.details} onClick={() => handleViewProfile(item)}>
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
                        <span>
  {item?.customer?.email 
    ? `${item?.customer?.email.split('@')[0].substring(0, 2)}${'*'.repeat(Math.max(0, item?.customer?.email.split('@')[0].length - 2))}@${item?.customer?.email.split('@')[1]}` 
    : 'N/A'}
</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section - Job Details */}
                  <div className={styles.jobDetails}>
                    <div className={styles.saveBtnBox}>
                      <button className={styles.saveBtn} onClick={() => handleSaveLater(item)}>
                        {saveLaterLoaderId === item.id ? (
                         <Spin
                         indicator={<LoadingOutlined spin style={{ color: "white" }} />}
                       />
                        ) : (
                          <>
                            <img src={saveImg} alt="image" />
                            Save For Later
                          </>
                        )}
                      </button>
                    </div>
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
                    <button className={styles.purchaseButton} 
                    // onClick={() => {
                    //   // setSelectedItem(item);
                    //   // setModalOpen(true);
                      
                    // }}
                    onClick={() => handleContinue(item)}
                    >
                   
                      Contact {item?.customer?.name}
                    </button>
                    <span className={styles.credits}>
                      {item?.credit_score} Credits
                    </span>
                    {/* <p className={styles.responseStatus}>
                      <img src={FirstToRespondImg} alt="" />
                      1st to Responded
                    </p> */}
                 <div className={styles?.mainText}> <p>ACT FAST</p>  <span>{item?.view_count} Professionals</span> <br/>  have viewed this lead</div>

                  </div>
                </div>
              </>
            );
          })}{" "}
          {/* <div className={styles.viewMoreBtnWrapper}>
            <button>View More</button>
          </div> */}
          {leadRequestList?.length > visibleCount && (
            <div className={styles.viewMoreBtnWrapper}>
              <button onClick={handleViewMore}>View More</button>
            </div>
          )}

        </>
      )}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onContinue={handleContinues}
        message="Are you sure you want to continue?"
        loading={manualBidLoader}
      />
{isopen && <ContactConfirmModal 
// onClose={() => setIsOpen(false)} 
onClose={(e) => handleOpenClose(e)}
  enoughCredit={planpurcahse}
  confirmModal = {isModalOpen}
  />}
  
    </>
  );
};

export default LeadsCards;
