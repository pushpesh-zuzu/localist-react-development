import React, { useEffect, useState } from "react";
import styles from "./MyResponseAccordian.module.css";
import UserImage from "../../../assets/Icons/MyResponse/UserImage.svg";
import hirImg from "../../../assets/Images/MyResponse/hiringIcon.svg";
import CallImage from "../../../assets/Icons/MyResponse/CallImage.svg";
import EmailImage from "../../../assets/Icons/MyResponse/EmailImage.svg";
import PurchasedImage from "../../../assets/Icons/MyResponse/PurchasedImage.svg";
import AddImage from "../../../assets/Images/MyResponse/WhatsAppIcon.svg";
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
import pendingImg from "../../../assets/Images/MyResponse/PendingBtnImg.svg";
import SMSIcon from "../../../assets/Images/MyResponse/SMSIcon.svg";
import bidContactIcon from "../../../assets/Images/MyResponse/bidContactIcon.svg";
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
import { Spin, Select } from "antd";

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
        <span className={styles.title}>{title}</span>
        <span className={styles.time}>{time}</span>
      </div>
      {/* <div className={styles.title}>{title}</div> */}
      {description && <p className={styles.desc}>{description}</p>}
      {children}
    </div>
  </div>
);

const MyResponseAccordion = ({ lead, onBack, getPendingLeadList, item }) => {
  const { Option } = Select;
  const [note, setNote] = useState("");
  const [activeTab, setActiveTab] = useState("activity");
  const [status, setStatus] = useState("pending");
  const [editNoteId, setEditNoteId] = useState(null);
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
    phoneNumber: profileLeadViewData?.leads?.phone,
    email: profileLeadViewData?.leads?.customer?.email,
  };
  const userIdActivity = userToken?.id || registerData?.id;
  console.log(getSellerNotes, "profileLeadViewData");
  const handleResponseChange = (clickName) => {
    const responseStatus = {
      lead_id: profileLeadViewData?.leads?.id,
      seller_id: userToken?.id ? userToken?.id : registerData?.id,
      buyer_id: profileLeadViewData?.leads?.customer_id,
      response_type: "seller",
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
  }, [getSellerNotes, activeTab]);

  const handleCancel = () => {
    setNote("");
    setEditNoteId(null);
  };

  // const handleCancel = () => {
  //   // Reset back to original note
  //   setNote(getSellerNotes?.notes?.notes || "");
  // };
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
  // const handleSubmit = () => {

  //   const notesValue = getSellerNotes?.notes;

  //   const isNotesEmpty =
  //     notesValue === undefined ||
  //     notesValue === null ||
  //     (typeof notesValue === "string" && notesValue.trim() === "");

  //   const sellerNote = {
  //     lead_id: profileLeadViewData?.leads?.id,
  //     user_id: userToken?.remember_tokens
  //       ? userToken?.remember_tokens
  //       : registerData?.remember_tokens,
  //     buyer_id: profileLeadViewData?.id,
  //     note_id: isNotesEmpty ? 0 : getSellerNotes?.notes?.id || 0,
  //     notes: note ?? getSellerNotes?.notes?.notes,
  //   };

  //   dispatch(addSellerNotesApi(sellerNote)).then((result) => {
  //     if (result.success) {

  //       showToast("success", result?.message);
  //       setNote("")
  //       const sellerData = {
  //         lead_id: profileLeadViewData.leads.id,
  //         user_id: userToken?.remember_tokens || registerData?.remember_tokens,
  //         buyer_id: profileLeadViewData.id,
  //       };

  //       dispatch(getSellerNotesApi(sellerData))
  //     }
  //   });
  // };
  console.log(editNoteId, "editNoteId");
  const handleSubmit = (id) => {
    if (!note || note.trim() === "") {
      showToast("error", "Please give any note ");
      return; // stop execution if note is empty
    }
    const sellerNote = {
      lead_id: profileLeadViewData?.leads?.id,
      user_id: userToken?.remember_tokens || registerData?.remember_tokens,
      buyer_id: profileLeadViewData?.id,
      // note_id: editNoteId ?? 0, // 👈 use tracked note ID
      notes: note,
    };
    if (editNoteId) {
      sellerNote.note_id = editNoteId;
    }

    if (id) {
      sellerNote.delete_note_id = id;
    }

    dispatch(addSellerNotesApi(sellerNote)).then((result) => {
      if (result) {
        showToast("success", result?.message);
        setNote("");
        setEditNoteId(null); // 👈 clear edit state

        const sellerData = {
          lead_id: profileLeadViewData.leads.id,
          user_id: userToken?.remember_tokens || registerData?.remember_tokens,
          buyer_id: profileLeadViewData.id,
        };

        dispatch(getSellerNotesApi(sellerData));
      }
    });
  };

  const handleRemove = (id) => {
    const sellerNote = {
      lead_id: profileLeadViewData?.leads?.id,
      user_id: userToken?.remember_tokens || registerData?.remember_tokens,
      buyer_id: profileLeadViewData?.id,
      // note_id: editNoteId ?? 0, // 👈 use tracked note ID
      notes: note,
    };
    if (editNoteId) {
      sellerNote.note_id = editNoteId;
    }

    if (id) {
      sellerNote.delete_note_id = id;
    }

    dispatch(addSellerNotesApi(sellerNote)).then((result) => {
      if (result) {
        showToast("success", "Notes Removed Successfully");
        setNote("");
        setEditNoteId(null); // 👈 clear edit state

        const sellerData = {
          lead_id: profileLeadViewData.leads.id,
          user_id: userToken?.remember_tokens || registerData?.remember_tokens,
          buyer_id: profileLeadViewData.id,
        };

        dispatch(getSellerNotesApi(sellerData));
      }
    });

    // // implement your delete logic here, example:
    // dispatch(deleteNoteApi({ note_id: id })).then((res) => {
    //   if (res.success) {
    //     showToast("success", result?.message);
    //     const sellerData = {
    //       lead_id: profileLeadViewData.leads.id,
    //       user_id: userToken?.remember_tokens || registerData?.remember_tokens,
    //       buyer_id: profileLeadViewData.id,
    //     };

    //     dispatch(getSellerNotesApi(sellerData));
    //   }
    // });
  };

  useEffect(() => {
    if (
      profileLeadViewData?.leads?.id &&
      profileLeadViewData?.id &&
      (userToken?.remember_tokens || registerData?.remember_tokens) &&
      activeTab === "notes"
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
  const handlePhoneOpen = (item) => {
    const phoneNumber = item?.phone;
    if (phoneNumber) {
      const phoneUrl = `tel:${phoneNumber}`;
      window.open(phoneUrl, "_blank");
    } else {
      showToast("error", "Phone number is not available.");
    }
  };
  console.log(getSellerNotes?.notes?.notes, "getSellerNotes");
  return (
    <>
      {leadListLoader ? (
        <Spin />
      ) : (
        <>
          <div className={styles.headerBox}>
            <div className={styles.lastActivityTexts}>
              Last activity {daysAgo} {daysAgo === 1 ? "day" : "days"} ago
            </div>

            <div className={styles.dropdownMainBox}>
              {profileLeadViewData?.leads?.purchase_type && (
                <div className={styles.lastActivityText}>
                  Purchase Type{" "}
                  <span>{profileLeadViewData?.leads?.purchase_type}</span>
                </div>
              )}
            </div>
            <div>
              <span className={styles.currentStatusText}>Current Status</span>
              <Select
                value={profileLeadViewData?.leads?.status || status}
                onChange={(value) => handleStatusChange({ target: { value } })}
                className={styles.antSelect}
                disabled={profileLeadViewData?.leads?.status === "hired"}
                dropdownMatchSelectWidth={false}
              >
                <Option value="pending">Pending</Option>
                <Option value="hired">Hired</Option>
              </Select>
            </div>
          </div>

          <div className={styles.mobileresponseheadbox}>
            <div className={styles.lastActivityTexts}>
              Last activity {daysAgo} {daysAgo === 1 ? "day" : "days"} ago
            </div>
            <div className={styles.dropdownMoblieBox}>
              <div className={styles.dropdownMainBox}>
                {/* // <div className={styles.lastActivityText}>
                //   Purchase Type {" "}
                //   <span>{profileLeadViewData?.leads?.purchase_type}</span>
                // </div> */}
                {profileLeadViewData?.leads?.purchase_type && (
                  <>
                    <span className={styles.currentStatusText}>
                      Purchase Type :
                    </span>
                    <select
                      className={`${styles.selectBox} ${styles.customSelects}`}
                      value={profileLeadViewData?.leads?.purchase_type}
                      disabled // disable to make it readonly
                    >
                      <option value={profileLeadViewData?.leads?.purchase_type}>
                        {profileLeadViewData?.leads?.purchase_type}
                      </option>
                    </select>
                  </>
                )}
              </div>
              <div className={styles.currentStatusBox}>
                <span className={styles.currentStatusText}>
                  Current Status :
                </span>
                <Select
                  value={profileLeadViewData?.leads?.status || status}
                  onChange={(value) =>
                    handleStatusChange({ target: { value } })
                  }
                  className={styles.antSelect}
                  disabled={profileLeadViewData?.leads?.status === "hired"}
                  dropdownMatchSelectWidth={false}
                >
                  <Option value="pending">Pending</Option>
                  <Option value="hired">Hired</Option>
                </Select>
              </div>
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
            <div
              className={styles.phoneNumberText}
              onClick={() => handlePhoneOpen(profileLeadViewData)}
            >
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
            <a
              className={styles.phoneNumberTexts}
              href={`mailto:${profileLeadViewData?.email}`}
              target="_blank"
            >
              <span>
                <img src={MailImg} alt="mail" />
              </span>
              {profileLeadViewData?.email}
            </a>
            <div className={styles.btnBox}>
              <button
                className={styles.buttonSms}
                onClick={() => {
                  handleResponseChange("email");
                  window.location.href = `mailto:${user.email}`;
                }}
              >
                {" "}
                <img src={Mailbtn} alt="mail" /> Email
              </button>
              <button
                className={styles.buttonSms}
                onClick={() => {
                  handleResponseChange("sms");
                  window.location.href = `mailto:${user.email}`;
                }}
              >
                <img src={smsBtn} alt="sms" /> SMS
              </button>
              <button
                className={styles.buttonSms}
                onClick={() => {
                  handleResponseChange("mobile");
                  window.location.href = `tel:${user.phoneNumber}`;
                }}
              >
                <img src={phoneBtn} alt="phone" /> Call
              </button>
              <button
                className={styles.buttonSms}
                onClick={() => {
                  handleResponseChange("Whatsapp");
                  window.open(`https://wa.me/${user.phoneNumber}`, "_blank");
                }}
              >
                <img src={whatsappBtn} alt="whatsapp" /> WhatsApp
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
              {/* <img src={locallistImgs} alt="credit icon" /> */}
              <span className={styles.creditsAmount}>
                {profileLeadViewData?.leads?.credit_score} credits
              </span>
            </div>
            <div className={styles.tabSection}>
              {/* <div className={styles.tabButtons}>
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
              </div> */}
              <div className={styles.tabButtons}>
                <button
                  className={styles.tabButton}
                  onClick={() => setActiveTab("activity")}
                >
                  <span
                    className={`${styles.tabLabel} ${
                      activeTab === "activity" ? styles.activeTab : ""
                    }`}
                  >
                    Activity
                  </span>
                </button>

                <button
                  className={styles.tabButton}
                  onClick={() => setActiveTab("lead")}
                >
                  <span
                    className={`${styles.tabLabel} ${
                      activeTab === "lead" ? styles.activeTab : ""
                    }`}
                  >
                    Lead Details
                  </span>
                </button>

                <button
                  className={styles.tabButton}
                  onClick={() => setActiveTab("notes")}
                >
                  <span
                    className={`${styles.tabLabel} ${
                      activeTab === "notes" ? styles.activeTab : ""
                    }`}
                  >
                    My Notes
                  </span>
                </button>
              </div>

              <div className={styles.tabContent}>
                {activeTab === "activity" && (
                  <div className={styles.container}>
                    <div className={styles.date}>
                      {getActivies?.length > 0
                        ? moment(
                            getActivies[getActivies.length - 1]?.created_at
                          ).format("ddd D, MMMM")
                        : moment(profileLeadViewData?.created_at).format(
                            "ddd D, MMMM"
                          )}
                    </div>

                    {getActivies?.map((item, index) => (
                      <TimelineItem
                        key={index}
                        icon={
                          item?.contact_type === "Manual Bid"
                            ? bidContactIcon
                            : item?.contact_type === "email"
                            ? EmailImage
                            : item?.contact_type === "Whatsapp"
                            ? AddImage
                            : item?.contact_type === "mobile"
                            ? CallImage
                            : item?.contact_type === "Buttons"
                            ? PurchasedImage
                            : item?.contact_type === "sms"
                            ? SMSIcon
                            : item?.contact_type === "Auto Bid"
                            ? CallImage
                            : hirImg
                        }
                        title={item.activity_name}
                        description={item.description}
                        time={moment(item.updated_at).format("hh:mm")}
                        isLast={index === getActivies.length - 1}
                        // name={
                        //   profileLeadViewData?.id === item?.from_user_id
                        //     ? "You"
                        //     : profileLeadViewData?.name
                        // }
                      >
                        {item.children}
                      </TimelineItem>
                    ))}
                  </div>
                )}
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
                            <div
                              key={index}
                              style={{ marginBottom: "0.5rem" }}
                              className={styles.questionTextBox}
                            >
                              <div
                                style={{ display: "flex", alignItems: "start" }}
                              >
                                <div className={styles.bullet}>•</div>
                                <span
                                  className={styles.questionText}
                                  // style={{ fontWeight: 600, marginTop: "12px",marginLeft:"12px" }}
                                >
                                  {" "}
                                  {question}
                                </span>
                              </div>
                              <hr className={styles.hrline} />
                              <p
                                // style={{ marginLeft: "20px", fontSize: "16px", fontWeight: 600, color: "#828282" }}
                                className={styles.answerText}
                              >
                                {answer}
                              </p>
                            </div>
                          )
                        );
                      })()}
                    </div>
                    {/* {(() => {
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
            <div key={index} className={styles.questionBlock}>
              <div className={styles.questionRow}>
                <span className={styles.bullet}>•</span>
                <span className={styles.questionText}  style={{ fontWeight: 600, marginTop: "12px" }}>{question}</span>
              </div>
              <hr className={styles.hrline} />
              <p style={{ marginLeft: "20px",fontSize:"16px",fontWeight:600,color:"#828282" }}>{answer}</p>
            </div>
          )
        );
      })()} */}

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
                  // <div className={styles.notesContent}>
                  //   <div className={styles.mainNotesBox}>
                  //     {
                  //       getSellerNotes?.notes?.map((item, index) => {
                  //         return (
                  //           <>

                  //             <div
                  //               key={item?.id}
                  //               className={styles.notesCard}
                  //               onClick={() => {
                  //                 setNote(item?.notes);
                  //                 setEditNoteId(item?.id);
                  //               }}
                  //             >
                  //               {item.notes}
                  //             </div>
                  //           </>
                  //         )
                  //       })
                  //     }
                  //   </div>
                  //   <div className={styles.notesInner}>
                  //     <textarea
                  //       className={styles.textArea}
                  //       placeholder="Enter your notes here..."
                  //       onChange={(e) => setNote(e.target.value)}
                  //       value={note}
                  //     />
                  //     <div className={styles.buttonGroup}>
                  //       <button
                  //         className={styles.CancelBtn}
                  //         onClick={handleCancel}
                  //       >
                  //         Cancel
                  //       </button>
                  //       <button
                  //         className={styles.UpdateBtn}
                  //         onClick={handleSubmit}
                  //       >
                  //         {sellerNotesLoader ? (
                  //           <Spin
                  //             indicator={
                  //               <LoadingOutlined
                  //                 spin
                  //                 style={{ color: "white" }}
                  //               />
                  //             }
                  //           />
                  //         ) : (
                  //           "Update"
                  //         )}
                  //       </button>
                  //     </div>
                  //   </div>
                  // </div>
                  <div className={styles.notesContent}>
                    <div className={styles.mainNotesBox}>
                      {getSellerNotes?.notes?.map((item, index) => (
                        <div key={item?.id} className={styles.noteItem}>
                          <div className={styles.noteText}>{item.notes}</div>
                          <div className={styles.noteActions}>
                            <span>
                              {item?.created_at
                                ? (() => {
                                    const d = new Date(item.created_at);
                                    const year = d.getFullYear();
                                    const month = String(
                                      d.getMonth() + 1
                                    ).padStart(2, "0");
                                    const day = String(d.getDate()).padStart(
                                      2,
                                      "0"
                                    );

                                    let hours = d.getHours();
                                    const minutes = String(
                                      d.getMinutes()
                                    ).padStart(2, "0");
                                    const seconds = String(
                                      d.getSeconds()
                                    ).padStart(2, "0");
                                    const ampm = hours >= 12 ? "PM" : "AM";
                                    hours = hours % 12 || 12; // convert to 12-hour format

                                    return `${year}-${month}-${day} ${String(
                                      hours
                                    ).padStart(
                                      2,
                                      "0"
                                    )}:${minutes}:${seconds} ${ampm}`;
                                  })()
                                : ""}
                            </span>
                            |
                            <span
                              onClick={() => {
                                setNote(item?.notes);
                                setEditNoteId(item?.id);
                              }}
                            >
                              Edit
                            </span>
                            |
                            <span onClick={() => handleRemove(item?.id)}>
                              Remove
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.notesInner}>
                      <textarea
                        className={styles.textArea}
                        placeholder="Write a private note"
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
                          onClick={() => handleSubmit()}
                        >
                          {/* {sellerNotesLoader ? (
          <Spin indicator={<LoadingOutlined spin style={{ color: "white" }} />} />
        ) : (
          "Update"
        )} */}
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyResponseAccordion;
