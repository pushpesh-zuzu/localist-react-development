import React, { useEffect } from "react";
import styles from "./BidsList.module.css";
import GreenTickIcon from "../../../../../assets/Images/GreenTickIcon.svg";
import AutoBidLocationIcon from "../../../../../assets/Images/AutoBidLocationIcon.svg";
import QuickToRespond from "../../../../../assets/Images/QuickToRespond.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAutoBid } from "../../../../../store/LeadSetting/leadSettingSlice";
import { BASE_IMAGE_URL } from "../../../../../utils";
import { Link, useParams } from "react-router-dom";
import DummyImage from "../../../../../assets/Images/DummyImage.svg";

const BidsList = ({ previousStep }) => {
  const { requestId } = useParams();
  const { autoBidList } = useSelector((state) => state.leadSetting);
  // const { requestId } = useSelector((state) => state?.buyer);
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      user_id: userToken?.rember_token,
      lead_id: requestId,
    };
    console.log("Calling getAutoBid with:", data);
    dispatch(getAutoBid(data));
  }, [dispatch, userToken?.rember_token, requestId]);

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
        <strong>top 5 matches</strong> to hear back faster
      </div>

      <div className={styles.card}>
        <div className={styles.cardLeft}>
          {autoBidList?.map((item) => (
            <div key={item?.sellers?.id} className={styles.cardItem}>
              <div className={styles.imageWrapper}>
                <img
                  src={
                    item?.sellers?.profile_image
                      ? `${BASE_IMAGE_URL}${item?.sellers?.profile_image}`
                      : DummyImage
                  }
                  alt="Profile"
                  className={styles.image}
                />
              </div>
              <div className={styles.details}>
                <div className={styles.header}>
                  <div>
                    <h3>
                      <img src={GreenTickIcon} alt="" />
                      {item?.sellers?.company_name}
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
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry...
                </p>

                <div className={styles.quickToRespondWrapper}>
                  <Link
                    to={`/view-profile/${item?.sellers?.id}?requestId=${requestId}`}
                    className={styles.profileLink}
                  >
                    View Profile →
                  </Link>

                  <div className={styles.quickToRespond}>
                    <img src={QuickToRespond} alt="" />
                    Quick to respond
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className={styles.replyBtnWrapper}>
            <button className={styles.replyBtn}>Request reply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidsList;
