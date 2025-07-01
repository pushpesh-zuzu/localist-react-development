import React, { useEffect, useState } from "react";
import styles from "./BrowserNotification.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";
import {
  addNotificationData,
  getNotificationData,
} from "../../../store/Seller/SellerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

const BrowserNotification = () => {
  const dispatch = useDispatch();
  const { notificationList, notificationLoader } = useSelector((state) => state.seller);
  const [loadingNoti, setLoadingNoti] = useState(""); 

    useEffect(() => {
      const data = {
        user_type: "buyer",
        noti_type: "browser",
      };
      dispatch(getNotificationData(data));
    }, [dispatch]);

    const handleSwitch = (notiName) => async (e) => {
      const isChecked = e.target.checked;
      setLoadingNoti(notiName); 
  
      const data = {
        user_type: "buyer",
        noti_name: notiName,
        noti_type: "browser",
        noti_value: isChecked ? 1 : 0,
      };
  
      await dispatch(addNotificationData(data));
      await dispatch(
        getNotificationData({
          user_type: "buyer",
          noti_type: "browser",
        })
      );
  
      setLoadingNoti(""); 
    };

  return (
    <div className={styles.container}>
          <h2 className={styles.heading}>Notifications</h2>
          <div className={styles.infoBox}>
            <span className={styles.infoIcon}>
              <img src={iIcon} alt="" />
            </span>
            <span>Please select what you would like to receive Notifications about </span>
          </div>

           {notificationLoader ? <Spin style={{ display: "flex", justifyContent: "center", alignItems: "center" }} /> :
        <div className={styles.notificationList}>
          {notificationList.map((notification, index) => {
            let notiName = "";
            if (index === 0) notiName = "buyer_browser_new_lead";
            else if (index === 1) notiName = "buyer_browser_customer_sending_message";
            else if (index === 2)
              notiName = "buyer_browser_new_review";

            return (
              <div
                key={index}
                // className={`${styles.notificationItem} ${index >= 0 ? styles.shadow : ""
                //   }`}
                className={`${styles.notificationItem} ${styles[`item${index}`]} ${index >= 0 ? styles.shadow : ""}`}
              >
                <span>
                  {notification?.noti_name === "buyer_browser_new_lead"
                    ? "New leads I receive"
                    : notification?.noti_name === "buyer_browser_customer_sending_message"
                      ? "Customers sending me a message"
                      : "New reviews on my profile"}
                </span>
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
      }
      {/* <p>This section will contain the browser notification settings.</p> */}
      {/* Add your browser notification settings components here */}
    </div>
  );
}   
export default BrowserNotification;