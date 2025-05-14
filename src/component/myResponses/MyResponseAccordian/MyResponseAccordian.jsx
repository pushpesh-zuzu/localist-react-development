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
import {
  addSellerNotesApi,
  getAddHiredLeadDataApi,
  getBuyerActivitiesApi,
  getLeadProfileRequestList,
  getSellerNotesApi,
  sellerResponseStatusApi,
} from "../../../store/LeadSetting/leadSettingSlice";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../utils";
import moment from "moment";
import LeadMap from "../LeadMap/LeadMap";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const TimelineItem = ({ icon, title, description, time, children, isLast }) => (
  <div className={styles.timelineItem}>
    <div className={styles.iconWrapper}>
      <img className={styles.icon} src={icon} alt={title} />
      {!isLast && <div className={styles.verticalLine}></div>}
    </div>
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>Isabella</span>
        <span className={styles.time}>{time}</span>
      </div>
      <div className={styles.title}>{title}</div>
      {description && <p className={styles.desc}>{description}</p>}
      {children}
    </div>
  </div>
);

const MyResponseAccordion = ({ lead, onBack, getPendingLeadList }) => {
  const [activeTab, setActiveTab] = useState("activity");
  const [status, setStatus] = useState("pending");
  const [note, setNote] = useState("");
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const {
    profileLeadViewData,
    autobidLoader,
    getActivies,
    getSellerNotes,
    sellerNotesLoader,
  } = useSelector((state) => state.leadSetting);
  console.log(profileLeadViewData, "profileLeadViewData");
  const user = {
    phoneNumber: "918123456789",
    email: "test@example.com",
  };

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
      }
    });
  };
  useEffect(() => {
    if (getSellerNotes?.notes) {
      setNote(getSellerNotes.notes);
    }
  }, [getSellerNotes]);

  const handleCancel = () => {
    // Reset back to original note
    setNote(getSellerNotes?.notes || "");
  };
  useEffect(() => {
    const data = {
      customer_id: profileLeadViewData?.leads?.customer_id,
      lead_id: profileLeadViewData?.leads?.id,
    };
    dispatch(getLeadProfileRequestList(data));
  }, []);
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
      notes: note,
    };
    dispatch(addSellerNotesApi(sellerNote)).then((result) => {
      if (result) {
        showToast("success", result?.message);
      }
    });
  };

  useEffect(() => {
    if (
      profileLeadViewData?.leads?.id &&
      profileLeadViewData?.id &&
      (userToken?.remember_tokens || registerData?.remember_tokens)
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
      user_id: userToken?.remember_tokens,
    };

    if (addHiredData.lead_id) {
      dispatch(getAddHiredLeadDataApi(addHiredData)).then((result) => {
        if (result) {
          showToast("success", result?.message);
          const data = {
            customer_id: profileLeadViewData?.leads?.customer_id,
            lead_id: profileLeadViewData?.leads?.id,
          };
          dispatch(getLeadProfileRequestList(data));
        }
      });
    }
  };

  // const activity = [
  //   {
  //     icon: UserImage,
  //     title: "Viewed your profile",
  //     time: "19:10",
  //   },
  //   {
  //     icon: CallImage,
  //     title: "Requested a callback",
  //     description: "Please call me ASAP on 0000000000",
  //     time: "19:10",
  //   },
  //   {
  //     icon: EmailImage,
  //     title: "Sent you an email",
  //     time: "19:10",
  //     children: (
  //       <>
  //         <p className={styles.desc}>
  //           Hi, I'm Chander and looking for a job. I'm very hardworking and
  //           honest with my work.
  //           <br />
  //           Regards,
  //         </p>
  //         <a href="#" className={styles.link}>
  //           See More
  //         </a>
  //       </>
  //     ),
  //   },
  //   {
  //     icon: PurchasedImage,
  //     title: "Purchased the lead",
  //     time: "19:10",
  //   },
  //   {
  //     icon: AddImage,
  //     title: "Looking for a Home Care Specialist",
  //     time: "12:10",
  //     children: (
  //       <a href="#" className={styles.link}>
  //         View details
  //       </a>
  //     ),
  //   },
  // ];

  return (
    <>
      <div className={styles.headerBox}>
        <div className={styles.lastActivityText}>Last activity 3 days ago</div>
        <div className={styles.lastActivityText}>
          Purchase Type: <span>Manual Bid</span>
        </div>
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
            <option value="rejected">Rejected</option>
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
          {profileLeadViewData?.phone}
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
        <div className={styles.contactBox}>
          <span>
            <img src={contact} alt="contact" />
          </span>{" "}
          Contact: Urgently
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
                <div className={styles.date}>Mon 25, April</div>
                {getActivies.map((item, index) => (
                  <TimelineItem
                    key={index}
                    icon={
                      item?.contact_type === "Manual Bid"
                        ? CallImage
                        : item?.contact_type === "Buttons"
                        ? EmailImage
                        : item?.contact_type === "Buttons"
                        ? PurchasedImage
                        : UserImage
                    }
                    title={item.activity_name}
                    description={item.description}
                    time={moment(item.updated_at).format("hh:ss A")}
                    isLast={index === getActivies.length - 1}
                  >
                    {item.children}
                  </TimelineItem>
                ))}
              </div>
            )}

            {activeTab === "lead" && (
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
                            <p style={{ fontWeight: "bold" }}>{qna.ques}</p>
                            <hr />
                            <p>{qna.ans}</p>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
                <div>
                  {/* <LeadMap getPendingLeadList={getPendingLeadList}/> */}
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
                    value={note?.notes}
                  />
                  <div className={styles.buttonGroup}>
                    <button className={styles.CancelBtn} onClick={handleCancel}>
                      Cancel
                    </button>
                    <button className={styles.UpdateBtn} onClick={handleSubmit}>
                      {sellerNotesLoader ? (
                        <Spin
                          indicator={
                            <LoadingOutlined spin style={{ color: "white" }} />
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
  );
};

export default MyResponseAccordion;
