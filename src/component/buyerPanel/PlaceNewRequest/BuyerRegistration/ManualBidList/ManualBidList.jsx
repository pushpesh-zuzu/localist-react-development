import React from "react";
import styles from "./ManualBidsList.module.css";
import GreenTickIcon from "../../../../../assets/Images/GreenTickIcon.svg";
import AutoBidLocationIcon from "../../../../../assets/Images/AutoBidLocationIcon.svg";
import QuickToRespond from "../../../../../assets/Images/QuickToRespond.svg";
import DummyImage from "../../../../../assets/Images/DummyImage.svg";

const ManualBidList = () => {
  const staticBids = [
    {
      id: 1,
      name: "John Doe",
      distance: 5,
      profile_image: "",
      service_name: "Web Design",
    },
    {
      id: 2,
      name: "Jane Smith",
      distance: 12,
      profile_image: "",
      service_name: "Logo Design",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <div className={styles.headingTabsWrapper}>
          <h1 className={styles.heading}>
            {staticBids[0]?.service_name || "No Service"}
          </h1>
          {/* <div className={styles.tabs}>
            <button className={styles.activeTab}>Your matches</button>
            <button className={styles.tab}>Replies</button>
          </div> */}
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
        <span className={styles.matchCount}>{staticBids.length} matches</span>
        <select className={styles.sortDropdown}>
          <option>Sort by: best match</option>
        </select>
      </div>

      <div className={styles.recommendBar}>
        <span>Recommended:</span> Request replies from your{" "}
        <strong>top matches</strong> to hear back faster
      </div>

      {staticBids.map((item) => (
        <div className={styles.card} key={item.id}>
          <div className={styles.cardLeft}>
            <div className={styles.imageWrapper}>
              <img
                src={item.profile_image ? item.profile_image : DummyImage}
                alt="Profile"
                className={styles.image}
              />
            </div>
            <div className={styles.details}>
              <div className={styles.header}>
                <div>
                  <h3>
                    <img src={GreenTickIcon} alt="" />
                    {item.name}
                  </h3>
                  <p>
                    <img src={AutoBidLocationIcon} alt="" />
                    {item.distance} miles away
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
                <span>{item.service_name}</span>
              </div>

              <p className={styles.description}>
                This is a static description for demonstration purposes. It
                showcases how each bid card might look like in real data.
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
      ))}
    </div>
  );
};

export default ManualBidList;
