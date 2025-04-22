import React, { use, useEffect, useState } from "react";
import styles from "./LeadsCards.module.css";
import BlueSmsIcon from "../../../../assets/Images/Leads/BlueSmsIcon.svg";
import BluePhoneIcon from "../../../../assets/Images/Leads/BluePhoneIcon.svg";
import VerifiedPhoneIcon from "../../../../assets/Images/Leads/VerifiedPhoneIcon.svg";
import AdditionalDetailsIcon from "../../../../assets/Images/Leads/AdditionalDetailsIcon.svg";
import FrequentUserIcon from "../../../../assets/Images/Leads/FrequentUserIcon.svg";
import FirstToRespondImg from "../../../../assets/Images/Leads/FirstToRespondImg.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAddManualBidData, getLeadRequestList } from "../../../../store/LeadSetting/leadSettingSlice";
import { Spin } from "antd";
import CustomModal from "../ConfirmModal";
import { showToast } from "../../../../utils";
import saveImg from "../../../../assets/Images/Leads/saveLaterImg.svg"

const LeadsCards = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [visibleCount, setVisibleCount] = useState(5);

  const { leadRequestList, leadRequestLoader, manualBidLoader } = useSelector(
    (state) => state.leadSetting
  );
  const { userToken } = useSelector((state) => state.auth)
  const data = leadRequestList?.length
  console.log(leadRequestList, "leadRequestList")
  useEffect(() => {
    const leadRequestData = {
      user_id: userToken?.remember_tokens
    }
    dispatch(getLeadRequestList(leadRequestData));
  }, []);
  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleContinue = () => {
    if (!selectedItem) return;

    const formData = new FormData();
    formData.append("buyer_id", selectedItem?.customer_id);
    formData.append("user_id", userToken?.remember_tokens);
    formData.append("bid", selectedItem?.credit_score);
    formData.append("lead_id", selectedItem?.id);
    formData.append("bidtype", "purchase_leads");
    formData.append("service_id", selectedItem?.service_id);
    formData.append("distance", null);

    dispatch(getAddManualBidData(formData)).then((result) => {
      if (result) {
        showToast("success", result?.message)
        setModalOpen(false);
      }
    });
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
            return (
              <>
                <div className={styles.card}>
                  {/* Left Section - User Info */}
                  <div className={styles.infoContainer}>
                    <div className={styles.userInfo}>
                      <div className={styles.userDetails}>
                        <div className={styles.avatar}>
                          {" "}
                          {item?.customer?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className={styles.details}>
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
                    <div className={styles.saveBtnBox}>
                      <button className={styles.saveBtn}><img src={saveImg} alt="image" />Save For Later</button>
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
                    </div>
                    <div className={styles.jobInfo}>
                      {item?.questions &&
                        JSON.parse(item?.questions)?.map((qa, index) => (
                          <div key={index}>
                            <p>
                              <strong>{qa?.ques}</strong>
                            </p>
                            <p>{qa?.ans}</p>
                          </div>
                        ))}
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
                      Contact Isabella
                    </button>
                    <span className={styles.credits}>
                      {item?.credit_score}Credits
                    </span>
                    {/* <p className={styles.responseStatus}>
                      <img src={FirstToRespondImg} alt="" />
                      1st to Responded
                    </p> */}
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
        onContinue={handleContinue}
        message="Are you sure you want to continue?"
        loading={manualBidLoader}
      />

    </>
  );
};

export default LeadsCards;
