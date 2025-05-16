import React, { useEffect, useState } from "react";
import styles from "./MyResponseAccordian.module.css";
import UserImage from "../../../assets/Icons/MyResponse/UserImage.svg";
import CallImage from "../../../assets/Icons/MyResponse/CallImage.svg";
import EmailImage from "../../../assets/Icons/MyResponse/EmailImage.svg";
import PurchasedImage from "../../../assets/Icons/MyResponse/PurchasedImage.svg";
import AddImage from "../../../assets/Icons/MyResponse/AddImage.svg";
import ProfileImg from "../../../assets/Images/MyResponse/ProfileIcon.svg";
import PhoneImg from "../../../assets/Images/MyResponse/PhoneIcon.svg";
import MailIcon from "../../../assets/Images/MyResponse/mail-02.svg";
import Mailbtn from "../../../assets/Images/MyResponse/mail-02.svg";
import smsBtn from "../../../assets/Images/MyResponse/annotation.svg";
import phoneBtn from "../../../assets/Images/MyResponse/phone.svg";
import whatsappBtn from "../../../assets/Images/MyResponse/WhatsappBtn.svg";
import contact from "../../../assets/Images/MyResponse/EmailIcon.svg";
import MailImg from "../../../assets/Images/MyResponse/mailIcon.svg";
import HiredImg from "../../../assets/Images/MyResponse/HiredBtnImg.svg";
import locallistImgs from "../../../assets/Images/Leads/localistImg.svg";
import {
  addSellerNotesApi,
  getAddHiredLeadDataApi,
  getBuyerActivitiesApi,
  getLeadProfileRequestList,
  getPendingLeadDataApi,
  getSellerNotesApi,
  sellerResponseStatusApi,
} from "../../../store/LeadSetting/leadSettingSlice";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../utils";
import moment from "moment";
import LeadMap from "../LeadMap/LeadMap";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const TimelineItem = ({
  icon,
  title,
  description,
  time,
  children,
  isLast,
  name,
}) => (
  <div className={styles.timelineItem}>
    <div className={styles.iconWrapper}>
      <img className={styles.icon} src={icon} alt={title} />
      {!isLast && <div className={styles.verticalLine}></div>}
    </div>
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={styles.time}>{time}</span>
      </div>
      <div className={styles.title}>{title}</div>
      {description && <p className={styles.desc}>{description}</p>}
      {children}
    </div>
  </div>
);

const MyResponseAccordion = ({ lead, onBack, getPendingLeadList, item }) => {
    const [note, setNote] = useState("");
  const [activeTab, setActiveTab] = useState("activity");
  const [status, setStatus] = useState("pending");
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const {
    profileLeadViewData,
    autobidLoader,
    getActivies,
    getSellerNotes,
    sellerNotesLoader,
    leadListLoader,
  } = useSelector((state) => state.leadSetting);
  const user = {
    phoneNumber: "918123456789",
    email: "test@example.com",
  };
  const userIdActivity = userToken?.id || registerData?.id
  console.log(userIdActivity,"profileLeadViewData");
  const handleResponseChange = (clickName) => {
    const responseStatus = {
      lead_id: profileLeadViewData?.leads?.id,
      seller_id: userToken?.remember_tokens
        ? userToken?.remember_tokens
        : registerData?.remember_tokens,
      buyer_id: profileLeadViewData?.id,

      type: null,
    };

    if (clickName === "mobile") {
      responseStatus.type = "mobile";
    } else if (clickName === "Whatsapp") {
      responseStatus.type = "Whatsapp";
    } else if (clickName === "email") {
      responseStatus.type = "email";
    } else if (clickName === "sms") {
      responseStatus.type = "sms";
    }

    dispatch(sellerResponseStatusApi(responseStatus)).then((result) => {
      if (result) {
        showToast("success", result?.message);
        const activityData = {
          buyer_id: profileLeadViewData?.id,
          user_id: userToken?.remember_tokens
            ? userToken?.remember_tokens
            : registerData?.remember_tokens,
          lead_id: profileLeadViewData?.leads?.id,
        };
        dispatch(getBuyerActivitiesApi(activityData));
      }
    });
  };
  useEffect(() => {
    if (getSellerNotes?.notes) {
      setNote(getSellerNotes.notes?.notes);
    }
  }, [getSellerNotes,activeTab]);
 

  const handleCancel = () => {
    // Reset back to original note
    setNote(getSellerNotes?.notes?.notes || "");
  };
  // useEffect(() => {

  //   const data = {
  //     customer_id: profileLeadViewData?.leads?.customer_id,
  //     lead_id: profileLeadViewData?.leads?.id,
  //     user_id: userToken?.remember_tokens
  //     ? userToken?.remember_tokens
  //     : registerData?.remember_tokens,
  //   };
  //   dispatch(getLeadProfileRequestList(data));
  // }, []);
  const handleSubmit = () => {

    const notesValue = getSellerNotes?.notes;

    const isNotesEmpty =
      notesValue === undefined ||
      notesValue === null ||
      (typeof notesValue === "string" && notesValue.trim() === "");

    const sellerNote = {
      lead_id: profileLeadViewData?.leads?.id,
      user_id: userToken?.remember_tokens
        ? userToken?.remember_tokens
        : registerData?.remember_tokens,
      buyer_id: profileLeadViewData?.id,
      note_id: isNotesEmpty ? 0 : getSellerNotes?.notes?.id || 0,
      notes:  note ??getSellerNotes?.notes?.notes ,
    };
    
    dispatch(addSellerNotesApi(sellerNote)).then((result) => {
      if (result.success) {
        
        showToast("success", result?.message);
        const sellerData = {
          lead_id: profileLeadViewData.leads.id,
          user_id: userToken?.remember_tokens || registerData?.remember_tokens,
          buyer_id: profileLeadViewData.id,
        };
  
        dispatch(getSellerNotesApi(sellerData))
      }
    });
  };

  useEffect(() => {
    if (
      profileLeadViewData?.leads?.id &&
      profileLeadViewData?.id &&
      (userToken?.remember_tokens || registerData?.remember_tokens) && activeTab === "notes"
    ) {
      const sellerData = {
        lead_id: profileLeadViewData.leads.id,
        user_id: userToken?.remember_tokens || registerData?.remember_tokens,
        buyer_id: profileLeadViewData.id,
      };

      dispatch(getSellerNotesApi(sellerData));
    }
  }, [profileLeadViewData]);

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value.toLowerCase(); // ensure lowercase
    setStatus(selectedStatus);

    const addHiredData = {
      lead_id: profileLeadViewData?.leads?.id,
      status_type: selectedStatus,
      user_id: userToken?.remember_tokens
        ? userToken?.remember_tokens
        : registerData?.remember_tokens,
    };

    if (addHiredData.lead_id) {
      dispatch(getAddHiredLeadDataApi(addHiredData)).then((result) => {
        if (result) {
          showToast("success", result?.message);
          const data = {
            // customer_id: profileLeadViewData?.leads?.customer_id,
            // lead_id: profileLeadViewData?.leads?.id,
            user_id: userToken?.remember_tokens
              ? userToken?.remember_tokens
              : registerData?.remember_tokens,
          };
          dispatch(getPendingLeadDataApi(data));
          onBack();
        }
      });
    }
  };
  const createdDate = moment(profileLeadViewData?.created_at);
  const today = moment();
  const daysAgo = today.diff(createdDate, "days");

  return (
    <>
      {leadListLoader ? (
        <Spin />
      ) : (
        <>
          <div className={styles.headerBox}>
            <div className={styles.lastActivityText}>
              Last activity {daysAgo} {daysAgo === 1 ? "day" : "days"} ago
            </div>
            {profileLeadViewData?.leads?.purchase_type && (
              <div className={styles.lastActivityText}>
                Purchase Type:{" "}
                <span>{profileLeadViewData?.leads?.purchase_type}</span>
              </div>
            )}
            <div>
              <span className={styles.currentStatusText}>Current Status</span>
              <select
                className={styles.selectBox}
                value={profileLeadViewData?.leads?.status || status}
                onChange={handleStatusChange}
                disabled={profileLeadViewData?.leads?.status === "hired"}
              >
                <option value="pending">Pending</option>
                <option value="hired">Hired</option>
                {/* <option value="rejected">Rejected</option> */}
              </select>
            </div>
          </div>
          <div className={styles.containers}>
            <div className={styles.ProfileImgBox}>
              <img src={ProfileImg} alt="Profile" />{" "}
              <span>{profileLeadViewData?.name}</span>
            </div>
            <div className={styles.serviceText}>
              {profileLeadViewData?.leads?.category?.name} |{" "}
              <span> {profileLeadViewData?.leads?.city}</span>
            </div>
            <div className={styles.phoneNumberText}>
              <span>
                <img src={PhoneImg} alt="phone" />
              </span>
              {profileLeadViewData?.phone}{" "}
              {profileLeadViewData?.leads?.is_phone_verified == 1 && (
                <sapn className={styles.verifiedText}>
                  <img src={HiredImg} alt="verified" />
                  Verified
                </sapn>
              )}
            </div>
            <div className={styles.phoneNumberText}>
              <span>
                <img src={MailImg} alt="mail" />
              </span>
              {profileLeadViewData?.email}
            </div>
            <div className={styles.btnBox}>
              <button
                className={styles.buttonSms}
                onClick={() => {
                  handleResponseChange("email");
                  window.location.href = `mailto:${user.email}`;
                }}
              >
                {" "}
                <img src={Mailbtn} alt="mail" /> Send Email
              </button>
              <button
                className={styles.buttonSms}
                onClick={() => {
                  handleResponseChange("sms");
                  window.location.href = `mailto:${user.email}`;
                }}
              >
                <img src={smsBtn} alt="sms" /> Send SMS
              </button>
              <button
                className={styles.buttonSms}
                onClick={() => {
                  handleResponseChange("mobile");
                  window.location.href = `tel:${user.phoneNumber}`;
                }}
              >
                <img src={phoneBtn} alt="phone" /> Phone Number
              </button>
              <button
                className={styles.buttonSms}
                onClick={() => {
                  handleResponseChange("Whatsapp");
                  window.open(`https://wa.me/${user.phoneNumber}`, "_blank");
                }}
              >
                <img src={whatsappBtn} alt="whatsapp" /> Send WhatsApp
              </button>
            </div>
            {profileLeadViewData?.leads?.is_urgent == 1 && (
              <div className={styles.contactBox}>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <img src={contact} alt="contact" />
                </span>{" "}
                Contact: <span className={styles.urgentText}>Urgently</span>
              </div>
            )}
            <div className={styles.locationTag}>
              <img src={locallistImgs} alt="credit icon" />
              <span className={styles.creditsAmount}>
                {profileLeadViewData?.leads?.credit_score} credits
              </span>
            </div>
            <div className={styles.tabSection}>
              <div className={styles.tabButtons}>
                <button
                  className={`${styles.tabButton} ${
                    activeTab === "activity" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("activity")}
                >
                  Activity
                </button>
                <button
                  className={`${styles.tabButton} ${
                    activeTab === "lead" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("lead")}
                >
                  Lead
                </button>
                <button
                  className={`${styles.tabButton} ${
                    activeTab === "notes" ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab("notes")}
                >
                  Notes
                </button>
              </div>

              <div className={styles.tabContent}>
                {activeTab === "activity" && (
                  <div className={styles.container}>
                    <div className={styles.date}>
                      {moment(profileLeadViewData?.created_at).format("MMM-DD")}
                    </div>
                    {getActivies?.map((item, index) => (
                      <TimelineItem
                        key={index}
                        icon={
                          item?.contact_type === "Manual Bid"
                            ? CallImage
                            : item?.contact_type === "email"
                            ? EmailImage
                            : item?.contact_type === "Whatsapp"
                            ? AddImage
                            : item?.contact_type === "mobile"
                            ? CallImage
                            : item?.contact_type === "Buttons"
                            ? PurchasedImage
                            : UserImage
                        }
                        title={item.activity_name}
                        description={item.description}
                        time={moment(item.updated_at).format("hh:mm A")}
                        isLast={index === getActivies.length - 1}
                        name={
                          profileLeadViewData?.id === item?.from_user_id
                            ? "You"
                            : profileLeadViewData?.name
                        }
                      >
                        {item.children}
                      </TimelineItem>
                    ))}
                  </div>
                )}

                {/* {activeTab === "lead" && (
              <div className={styles.leadContent}>
                <div>
                  {getPendingLeadList?.map((item, index) => {
                    const questionsArray = item?.questions
                      ? JSON.parse(item.questions)
                      : [];

                    return (
                      <div key={index} style={{ marginBottom: "1rem" }}>
                        {questionsArray.map((qna, qIndex) => (
                          <div key={qIndex} style={{ marginBottom: "0.5rem" }}>
                            <p style={{ fontWeight: 600 }}>{qna.ques}</p>
                            <hr />
                            <p>{qna.ans}</p>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
                <div>
                  <LeadMap getPendingLeadList={profileLeadViewData?.leads?.postcode} />
                </div>
              </div>
            )} */}
                {activeTab === "lead" && (
                  <div className={styles.leadContent}>
                    <div>
                      {(() => {
                        const uniqueQuestionsMap = new Map();

                        getPendingLeadList?.forEach((item) => {
                          const questionsArray = item?.questions
                            ? JSON.parse(item.questions)
                            : [];

                          questionsArray.forEach((qna) => {
                            if (!uniqueQuestionsMap.has(qna.ques)) {
                              uniqueQuestionsMap.set(qna.ques, qna.ans);
                            }
                          });
                        });

                        return Array.from(uniqueQuestionsMap.entries()).map(
                          ([question, answer], index) => (
                            <div key={index} style={{ marginBottom: "0.5rem" }}>
                              <li
                                style={{ fontWeight: 600, marginTop: "20px" }}
                              >
                                {question}
                              </li>
                              <hr />
                              <p style={{ marginLeft: "20px" }}>{answer}</p>
                            </div>
                          )
                        );
                      })()}
                    </div>

                    <div>
                      <LeadMap
                        getPendingLeadList={
                          profileLeadViewData?.leads?.postcode
                        }
                      />
                    </div>
                  </div>
                )}

                {activeTab === "notes" && (
                  <div className={styles.notesContent}>
                    <div className={styles.notesInner}>
                      <textarea
                        className={styles.textArea}
                        placeholder="Enter your notes here..."
                        onChange={(e) => setNote(e.target.value)}
                        value={note}
                      />
                      <div className={styles.buttonGroup}>
                        <button
                          className={styles.CancelBtn}
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                        <button
                          className={styles.UpdateBtn}
                          onClick={handleSubmit}
                        >
                          {sellerNotesLoader ? (
                            <Spin
                              indicator={
                                <LoadingOutlined
                                  spin
                                  style={{ color: "white" }}
                                />
                              }
                            />
                          ) : (
                            "Update"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* <div className={styles.container}>
          <div className={styles.date}>Mon 25, April</div>
          {activity.map((item, index) => (
            <TimelineItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              time={item.time}
              isLast={index === activity.length - 1}
            >
              {item.children}
            </TimelineItem>
          ))}
        </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default MyResponseAccordion;
