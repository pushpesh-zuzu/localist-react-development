import React, { useEffect, useState } from "react";
import styles from "./MyResponse.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getHiredLeadDataApi,
  getPendingLeadDataApi,
  getSellerRecommendedApi,
} from "../../store/LeadSetting/leadSettingSlice";
import BlueSmsIcon from "../../assets/Images/Leads/BlueSmsIcon.svg";
import BluePhoneIcon from "../../assets/Images/Leads/BluePhoneIcon.svg";
import VerifiedPhoneIcon from "../../assets/Images/Leads/VerifiedPhoneIcon.svg";
import AdditionalDetailsIcon from "../../assets/Images/Leads/AdditionalDetailsIcon.svg";
import FrequentUserIcon from "../../assets/Images/Leads/FrequentUserIcon.svg";
import { showToast } from "../../utils";
import { useNavigate } from "react-router-dom";

const MyResponse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState("pending");

  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const { sellerRecommended, getPendingLeadList,getHiredLeadList } = useSelector(
    (state) => state.leadSetting
  );
const handleProfieView = (item) => {
  console.log(item,"item")
  navigate(`/pending/view-profile/${item?.customer_id}?id=${item?.id}`)
}
  const user_id = userToken?.remember_tokens || registerData?.remember_tokens;
console.log(getPendingLeadList,"getPendingLeadList")
  useEffect(() => {
    dispatch(getSellerRecommendedApi({ user_id }));
    dispatch(getPendingLeadDataApi({ user_id }))
  }, [dispatch, user_id]);

  const handlePendingApi = () => {
    setSelectedTab("pending");
    dispatch(getPendingLeadDataApi({ user_id })).then((result) => {
      if(result.success){
        // showToast("success",result?.message)
      }
    });
  };
  const handleHiredApi = () => {
    setSelectedTab("hired")
    dispatch(getHiredLeadDataApi({ user_id })).then((result) => {
      if(result.success){
        // showToast("success",result?.message)
      }
    });
  }

  const getLeadsToDisplay = () => {
    if (selectedTab === "pending") return getPendingLeadList || [];
    if (selectedTab === "hired") return getHiredLeadList || [];
    return sellerRecommended?.[0]?.leads || [];
  }

  return (
    <div className={styles.maincontainer}>
      <div className={styles.mainTextBox}>
        <div style={{ fontSize: "35px", fontWeight: 800 }}>My Response List</div>
        <div className={styles.buttonGroup}>
  {/* <button
    className={`${styles.filterButton} ${
      selectedTab === "all" ? styles.activeButton : ""
    }`}
    onClick={() => setSelectedTab("all")}
  >
    All
  </button> */}
  <button
    className={`${styles.filterButton} ${
      selectedTab === "pending" ? styles.activeButton : ""
    }`}
    onClick={handlePendingApi}
  >
    Pending
  </button>
  <button
    className={`${styles.filterButton} ${
      selectedTab === "hired" ? styles.activeButton : ""
    }`}
    onClick={handleHiredApi}
  >
    Hired
  </button>
</div>

      </div>

      {getLeadsToDisplay().map((item, idx) => (
        <div key={idx} className={styles.card}>
          <div className={styles.infoContainer}>
            <div className={styles.userInfo}>
              <div className={styles.userDetails}>
                <div className={styles.avatar}>
                  {item?.customer?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className={styles.details} onClick={()=>handleProfieView(item)} >
                  <h3>{item?.customer?.name}</h3>
                  <p>{item?.postcode}</p>
                </div>
              </div>
              <span className={styles.category}>{item?.category?.name}</span>
            </div>
            <div className={styles.contactContainer}>
              <div className={styles.contactItem}>
                <img src={BluePhoneIcon} alt="" />
                <span>
                  {item?.phone
                    ? `${item?.phone.substring(0, 2)}${"*".repeat(
                        item?.phone.length - 2
                      )}`
                    : "N/A"}
                </span>
              </div>
              <div className={styles.contactItem}>
                <img src={BlueSmsIcon} alt="" />
                <span>
                  {item?.customer?.email
                    ? `${item?.customer?.email
                        .split("@")[0]
                        .substring(0, 8)}${"*".repeat(
                        Math.max(
                          0,
                          item?.customer?.email.split("@")[0].length - 8
                        )
                      )}@${item?.customer?.email.split("@")[1]}`
                    : "N/A"}
                </span>
              </div>
            </div>
         {item?.profile_view && item?.profile_view_time &&  <div className={styles.profile_view}>
            <p>{item?.profile_view}</p>
            <p>{item?.profile_view_time}</p>
            </div>}
          </div>

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
                  <img src={AdditionalDetailsIcon} alt="" />
                  Additional details
                </span>
              )}
              {item?.is_frequent_user == 1 && (
                <span className={styles.frequent}>
                  <img src={FrequentUserIcon} alt="" />
                  Frequent user
                </span>
              )}
            </div>
            <div className={styles.jobInfo}>
              {item?.questions && (
                <p>
                  {JSON.parse(item?.questions)
                    .map((qa) => qa?.ans)
                    .join("/")}
                </p>
              )}
            </div>
          </div>

          {/* <div className={styles.leadActions}>
            <span className={styles.credits}>
              {item?.credit_score} Credits
            </span>
          </div> */}
           <div className={styles.leadActions}>
           {selectedTab === "pending" && <> 
                              <button className={styles.purchaseButton} >
                                {item?.status}
                              </button>
                              </>}
                              <span className={styles.credits}>
                                {item?.credit_score} Credits
                              </span>
                              {/* <p className={styles.responseStatus}>
                                <img src={FirstToRespondImg} alt="" />
                                1st to Responded
                              </p> */}
                            </div>
        </div>
      ))}
    </div>
  );
};

export default MyResponse;
