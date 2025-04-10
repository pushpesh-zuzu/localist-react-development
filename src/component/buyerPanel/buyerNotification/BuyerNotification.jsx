import React, { useEffect, useState } from "react";
import styles from "./BuyerNotification.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";
import {
  addNotificationData,
  getNotificationData,
} from "../../../store/Buyer/BuyerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

const BuyerNotification = () => {
  const dispatch = useDispatch();
  const { notificationList } = useSelector((state) => state.buyer);
  const [loadingNoti, setLoadingNoti] = useState(""); // 👈 track loading switch

  useEffect(() => {
    const data = {
      user_type: "customer",
      noti_type: "email",
    };
    dispatch(getNotificationData(data));
  }, [dispatch]);

  const handleSwitch = (notiName) => async (e) => {
    const isChecked = e.target.checked;
    setLoadingNoti(notiName); // 👈 mark loading

    const data = {
      noti_name: notiName,
      noti_value: isChecked ? 1 : 0,
    };

    await dispatch(addNotificationData(data));
    await dispatch(
      getNotificationData({
        user_type: "customer",
        noti_type: "email",
      })
    );

    setLoadingNoti(""); // 👈 reset loader
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Notifications</h2>
      <div className={styles.infoBox}>
        <span className={styles.infoIcon}>
          <img src={iIcon} alt="" />
        </span>
        <span>Choose what you’d like to be emailed about</span>
      </div>
      <div className={styles.notificationList}>
        {notificationList.map((notification, index) => {
          let notiName = "";
          if (index === 0) notiName = "customer_email_change_in_request";
          else if (index === 1) notiName = "customer_email_reminder_to_reply";
          else if (index === 2)
            notiName = "customer_email_update_about_new_feature";

          return (
            <div
              key={index}
              className={`${styles.notificationItem} ${
                index >= 0 ? styles.shadow : ""
              }`}
            >
              <span>
  {notification?.noti_name === "customer_email_change_in_request"
    ? "Changes to my requests"
    : notification?.noti_name === "customer_email_reminder_to_reply"
    ? "Reminders to reply to Professionals"
    : "Updates about new features on Bark"}
</span>

              {/* <span>{notification?.noti_name === "customer_email_change_in_request" ? "Changes to my requests" ? notification?.noti_name ==  "customer_email_reminder_to_reply" ? "Reminders to reply to Professionals" : "Updates about new features on Bark"}</span> */}
              {loadingNoti === notiName ? (
                <Spin size="small" />
              ) : (
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={notification?.noti_value === 1}
                    onChange={handleSwitch(notiName)}
                  />
                  <span className={styles.slider}></span>
                </label>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuyerNotification;
