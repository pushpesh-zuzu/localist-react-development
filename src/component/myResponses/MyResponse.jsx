import React, { useEffect, useState } from "react";
import styles from "./MyResponse.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getBuyerActivitiesApi,
  getHiredLeadDataApi,
  getLeadProfileRequestList,
  getPendingLeadDataApi,
  getSellerRecommendedApi,
  purchaseTypeHiredStatusApi,
  purchaseTypeStatusApi,
} from "../../store/LeadSetting/leadSettingSlice";
import BlueSmsIcon from "../../assets/Images/Leads/BlueSmsIcon.svg";
import BluePhoneIcon from "../../assets/Images/Leads/BluePhoneIcon.svg";
import VerifiedPhoneIcon from "../../assets/Images/Leads/VerifiedPhoneIcon.svg";
import AdditionalDetailsIcon from "../../assets/Images/Leads/AdditionalDetailsIcon.svg";
import FrequentUserIcon from "../../assets/Images/Leads/FrequentUserIcon.svg";
import { useNavigate } from "react-router-dom";
import pendingImg from "../../assets/Images/MyResponse/PendingBtnImg.svg";
import HiredImg from "../../assets/Images/MyResponse/HiredBtnImg.svg";
import HiredClickImg from "../../assets/Images/MyResponse/RightClickHiredImg.svg";
import saveImg from "../../assets/Images/Leads/saveLaterImg.svg";
import MyResponseAccordion from "./MyResponseAccordian/MyResponseAccordian";
import pendingArrowIcon from "../../assets/Images/MyResponse/ArrowIconPending.svg";
import { Popover, Select } from "antd";
import moment from "moment";
import HireUserIcon from "../../assets/Images/MyResponse/hiringbadge.svg"

const MyResponse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("pending");
  const [selectedLead, setSelectedLead] = useState(null);
  const [purchaseType, setPurchaseType] = useState(null);

  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const {
    sellerRecommended,
    getPendingLeadList,
    getHiredLeadList,
    purchasePendingList,
    data,
  } = useSelector((state) => state.leadSetting);

  const handleProfieView = (item) => {
    navigate(`/pending/view-profile/${item?.customer_id}?id=${item?.id}`);
  };
  {
    /* const createdDate = moment(profileLeadViewData?.created_at);
          const today = moment();
          const daysAgo = today.diff(createdDate, 'days') */
  }
  const user_id = userToken?.remember_tokens || registerData?.remember_tokens;

  useEffect(() => {
    dispatch(getSellerRecommendedApi({ user_id }));
    dispatch(getPendingLeadDataApi({ user_id }));
  }, [dispatch, user_id]);

  const handlePendingApi = () => {
    setSelectedTab("pending");
    dispatch(getPendingLeadDataApi({ user_id })).then((result) => {
      if (result.success) {
        // showToast("success",result?.message)
      }
    });
  };
  const handleHiredApi = () => {
    setSelectedTab("hired");
    dispatch(getHiredLeadDataApi({ user_id })).then((result) => {
      if (result.success) {
        // showToast("success",result?.message)
        const activityData = {
          buyer_id: item?.customer_id,
          user_id: userToken?.remember_tokens
            ? userToken?.remember_tokens
            : registerData?.remember_tokens,
          lead_id: item?.id,
        };
        dispatch(getBuyerActivitiesApi(activityData));
      }
    });
  };

  const getLeadsToDisplay = () => {
    /** if (selectedTab === "pending") return getPendingLeadList || [];
     if (selectedTab === "hired") return getHiredLeadList || [];
     if (purchaseType && selectedTab === "pending") return purchasePendingList || []; 
     return []; */

    return data;
  };

  const handleOpen = (item) => {
    if (item?.id == selectedLead) {
      setSelectedLead(null);
    } else {
      setSelectedLead(item?.id);
    }

    const activityData = {
      buyer_id: item?.customer_id,
      user_id: userToken?.remember_tokens
        ? userToken?.remember_tokens
        : registerData?.remember_tokens,
      lead_id: item?.id,
    };
    dispatch(getBuyerActivitiesApi(activityData)).then((result) => {
      if (result) {
        const data = {
          customer_id: item?.customer_id,
          lead_id: item?.id,
          user_id: userToken?.remember_tokens
            ? userToken?.remember_tokens
            : registerData?.remember_tokens,
        };
        dispatch(getLeadProfileRequestList(data));
      }
    });
  };
  // const handlePurchaseChange = (value) => {
  //   const purchaseData = {
  //     user_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens,
  //     purchase_type: value
  //   }
  //   dispatch(purchaseTypeStatusApi(purchaseData))
  // }
  const handlePurchaseChange = (value) => {
    setPurchaseType(value);
    if (selectedTab === "pending") {
      const purchaseData = {
        user_id: userToken?.remember_tokens
          ? userToken?.remember_tokens
          : registerData?.remember_tokens,
        purchase_type: value,
      };

      dispatch(purchaseTypeStatusApi(purchaseData));
    } else {
      const hiredPurchaseData = {
        user_id: userToken?.remember_tokens
          ? userToken?.remember_tokens
          : registerData?.remember_tokens,
        purchase_type: value,
      };
      dispatch(purchaseTypeHiredStatusApi(hiredPurchaseData));
    }
  };
  // const handlePurchaseChange = (value) => {
  //   const purchaseData = {
  //     user_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens,
  //     purchase_type: value
  //   }
  //   dispatch(purchaseTypeStatusApi(purchaseData))
  // }
  // const handlePurchaseChange = (value) => {
  //   setPurchaseType(value);
  //   if (selectedTab === "pending") {
  //     const purchaseData = {
  //       user_id: userToken?.remember_tokens
  //         ? userToken?.remember_tokens
  //         : registerData?.remember_tokens,
  //       purchase_type: value,
  //     };

  //     dispatch(purchaseTypeStatusApi(purchaseData));
  //   } else {
  //   }
  // };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.mainTextBox}>
        <div className={styles.headerBox}>
          <div className={styles.emptySpace}>{""}</div>
          <div className={styles.headerBtn}>
            <button
              className={`${styles.filterButton} ${
                selectedTab === "pending" ? styles.activeButton : ""
              }`}
              onClick={handlePendingApi}
            >
              <img src={pendingImg} alt="pendingImg" /> Pending
            </button>
            <button
              className={`${styles.filterButton} ${
                selectedTab === "hired" ? styles.activeButton : ""
              }`}
              onClick={handleHiredApi}
            >
              {selectedTab === "hired" ? <img src={HiredClickImg} alt="..." /> :<img src={HiredImg} alt="hired" />} Hired
            </button>
          </div>
          {/* <div style={{ display: "flex", marginRight: 20 }}>
            <label className={styles.purchaseText}>Purchase Type </label>
            <Select
              placeholder="Select Purchase Type"
              style={{ width: 150, marginLeft: 10 }}
              onChange={handlePurchaseChange}
            >
              <Option value="Manual Bid">Manual Bid</Option>
              <Option value="Best Matches">Best Match</Option>
              <Option value="Autobid">Auto Bid</Option>
              <Option value="Request Reply">Request Reply</Option>
            </Select>
          </div> */}
          <div style={{ display: "flex", marginRight: 20 }} className={styles.purchaseSelect}>
  <label className={styles.purchaseText}>Purchase Type</label>
  <select
    className={`${styles.selectBox} ${styles.customSelect}`}
    value={purchaseType} // controlled value
    onChange={(e) => handlePurchaseChange(e.target.value)}
    // style={{ width: 150, marginLeft: 10,height:"30px",padding:"4px"}}
  >
    
    <option value="Manual Bid">Manual Bid</option>
    {/* <option value="Best Matches">Best Match</option> */}
    <option value="Autobid">Auto Bid</option>
    <option value="Request Reply">Request Reply</option>
  </select>
</div>
        </div>
      </div>

      {getLeadsToDisplay()?.length ? 
       getLeadsToDisplay()?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.card}>
            <div className={styles.infoContainer}>
              <div className={styles.userInfo}>
                <div className={styles.userDetails}>
                  <div className={styles.avatar}>
                    {item?.customer?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div
                    className={styles.details}
                    // onClick={() => handleProfieView(item)}
                  >
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
                    {/* {item?.phone
                      ? `${item?.phone.substring(0, 2)}${"*".repeat(
                          item?.phone.length - 2
                        )}`
                      : "N/A"} */}
                      {item?.phone}
                  </span>
                </div>
                <div className={styles.contactItem}>
                  <img src={BlueSmsIcon} alt="" />
                  <span>
                    {/* {item?.customer?.email
                      ? `${item?.customer?.email
                          .split("@")[0]
                          .substring(0, 8)}${"*".repeat(
                          Math.max(
                            0,
                            item?.customer?.email.split("@")[0].length - 8
                          )
                        )}@${item?.customer?.email.split("@")[1]}`
                      : "N/A"} */}
                      {
                        item?.customer?.email
                      }
                  </span>
                </div>
              </div>
              {item?.profile_view && item?.profile_view_time && (
                <div className={styles.profile_view}>
                  <p><span><img src={HiredImg} alt="..." /></span>{item?.profile_view}</p>
                  <p>{item?.profile_view_time}</p>
                </div>
              )}
            </div>

            <div className={styles.jobDetails}>
              {/* <div className={styles.saveBtnBox}>
                <button
                  className={styles.saveBtn}
                  // onClick={() => handleSaveLater(item)}
                >
                  {/* {saveLaterLoaderId === item.id ? (
                                     <Spin
                                     indicator={<LoadingOutlined spin style={{ color: "white" }} />}
                                   />
                                    ) : (
                                      <> 
                  <img src={saveImg} alt="image" />
                  Save For Later
                  
                </button>
              </div> */}
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
                {item?.is_urgent == 1 && (
                  <span className={styles.frequent}>
                    {" "}
                    <img src={FrequentUserIcon} alt="" />
                    Urgent
                  </span>
                )}
                {item?.is_high_hiring == 1 && (
                  <span className={styles.frequentHir}>
                    {" "}
                    <img src={HireUserIcon} alt="" />
                    High hiring
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

            <div className={styles.leadActions}>
              {selectedTab === "pending" ? (
                <>
                  <button className={styles.purchaseButton}>
                    <img src={pendingImg} alt="pendingImg" />{" "}
                    {item?.status === "pending" ? "Pending" : "Pending"}
                  </button>
                </>
              ) : (
                <>
                  <button className={styles.purchaseButton}>
                    <img src={HiredClickImg} alt="HiredImg" />{" "}
                    {item?.status === "hired" ? "Hired" : "Hired"} 
                  </button>
                </>
              )}

              <div
                className={styles.responseStatus}
                onClick={() => handleOpen(item)}
              >
                Responded {moment().diff(moment(item?.created_at), "days")}d
                ago
                <img src={pendingArrowIcon} alt="Response"  className={`${styles.arrowIcon} ${selectedLead === item.id ? "" : styles.rotated}`} />
              </div>
            </div>
          </div>

          {selectedLead === item?.id && (
            <MyResponseAccordion
              lead={selectedLead}
              onBack={() => setSelectedLead(null)}
              getPendingLeadList={data}
            />
          )}
        </div>
      )) : <div className={styles.NoDataText}>No {selectedTab === "pending" ? "Pending" : "Hired"} Data Available</div>}
    </div>
  );
};

export default MyResponse;
