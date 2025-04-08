import React from "react";
import styles from "./BidsList.module.css";
import StarlinkImage from "../../../../../assets/Images/StarlinkImage.svg";
import GreenTickIcon from "../../../../../assets/Images/GreenTickIcon.svg";
import AutoBidLocationIcon from "../../../../../assets/Images/AutoBidLocationIcon.svg";
import QuickToRespond from "../../../../../assets/Images/QuickToRespond.svg";

const BidsList = ({ previousStep }) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <div className={styles.headingTabsWrapper}>
          <h1 className={styles.heading}>Web Designer</h1>

          <div className={styles.tabs}>
            <button className={styles.activeTab}>Your matches</button>
            <button className={styles.tab}>Replies</button>
          </div>
        </div>
        <div className={styles.backBtnWrapper}>
          <button className={styles.backBtn}>Back</button>
        </div>
      </div>

      <div className={styles.filters}>
        <select>
          <option>All ratings</option>
        </select>
        <select>
          <option>All locations</option>
        </select>
        <select>
          <option>All response times</option>
        </select>
        <span className={styles.matchCount}>245 matches</span>
        <select className={styles.sortDropdown}>
          <option>Sort by: best match</option>
        </select>
      </div>

      <div className={styles.recommendBar}>
        <span>Recommended:</span> Request replies from your{" "}
        <strong>top 5 matches</strong> to here back faster
      </div>

      <div className={styles.card}>
        <div className={styles.cardLeft}>
          <div className={styles.imageWrapper}>
            <img src={StarlinkImage} alt="Starlink" className={styles.image} />
          </div>
          <div className={styles.details}>
            <div className={styles.header}>
              <div>
                <h3>
                  <img src={GreenTickIcon} alt="" />
                  Starlink pvt. ltd
                </h3>
                <p>
                  <img src={AutoBidLocationIcon} alt="" />
                  8.6 miles away
                </p>
              </div>
              <div className={styles.sidebar}>
                <div className={styles.rating}>
                  <span className={styles.stars}>★★★★★</span>
                  <span className={styles.ratingCount}>125</span>
                </div>
              </div>
            </div>

            <div className={styles.badges}>
              <span>Full website design</span>
              <span>Banner design</span>
              <span>New pages</span>
            </div>

            <p className={styles.description}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <div className={styles.quickToRespondWrapper}>
              <a href="#" className={styles.profileLink}>
                View Profile →
              </a>

              <div className={styles.quickToRespond}>
                <img src={QuickToRespond} alt="" />
                Quick to respond
              </div>
            </div>
          </div>

          <div className={styles.replyBtnWrapper}>
            <button className={styles.replyBtn}>Request reply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidsList;
