import React from "react";
import styles from "./EmailNotification.module.css";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import blackArrow from "../../../assets/Images/Leads/blackArrowRight.svg"
import iIcon from "../../../assets/Images/iIcon.svg";
import { useSelector } from "react-redux";

const EmailNotification = () => {
  const navigate = useNavigate()
const { notificationList = [], notificationLoader } = useSelector((state) => state.seller);

  const allNotificationTypes = [
    {
      notiName: "buyer_browser_new_lead",
      label: "New leads I receive",
    },
    {
      notiName: "buyer_browser_customer_sending_message",
      label: "Customers sending me a message",
    },
    {
      notiName: "buyer_browser_new_review",
      label: "New reviews on my profile",
    },
  ];

   const handleBack = () => {
    navigate("/settings")
  }
  return (
    <div className={styles.container}>
       <div className={styles.backText} onClick={handleBack}><img src={blackArrow} alt="..." />  Setting</div>
      <h2 className={styles.heading}>Email Notifications</h2>
      <div className={styles.infoBox}>
        <span className={styles.infoIcon}>
          <img src={iIcon} alt="Info" />
        </span>
        <span>
          Please select what you would like to receive Notifications about
        </span>
      </div>
      <div className={styles.emailText}>Email me about:</div>

      {/* {notificationLoader ? (
        <div className={styles.loader}>
          <Spin />
        </div>
      ) : ( */}
        <div className={styles.notificationList}>
          {allNotificationTypes.map((type, index) => {
            // Find the existing notification or fallback to default (value = 0)
            const notification =
              notificationList.find((n) => n.noti_name === type.notiName) || {
                noti_name: type.notiName,
                noti_value: 0,
              };

            return (
              <div
                key={index}
                className={`${styles.notificationItem} ${styles[`item${index}`]} ${styles.shadow}`}
                style={{
                  backgroundColor: index%2==0 ? "#E3F6FC" :'#FFFFFF'
                }}
              >
                <span>{type.label}</span>
                {false === type.notiName ? (
                  <Spin size="small" />
                ) : (
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notification.noti_value === 1}
                      // onChange={handleSwitch(type.notiName)}
                    />
                    <span className={styles.slider}></span>
                    {/* <span>{type.notiName}</span> */}
                  </label>
                )}
              </div>
            );
          })}
        </div>
      {/* )} */}
    </div>
  );
}
export default EmailNotification;