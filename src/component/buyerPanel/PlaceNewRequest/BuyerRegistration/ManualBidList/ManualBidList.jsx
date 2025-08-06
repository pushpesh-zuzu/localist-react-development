import React, { useEffect, useState } from "react";
import styles from "./ManualBidsList.module.css";
import GreenTickIcon from "../../../../../assets/Images/GreenTickIcon.svg";
import AutoBidLocationIcon from "../../../../../assets/Images/AutoBidLocationIcon.svg";
// import AutoBidLocationIcon from "../../../../../assets/Images/HowItWorks/locationImg.svg";
import QuickToRespond from "../../../../../assets/Images/QuickToRespond.svg";
import starImg from "../../../../../assets/Icons/MyResponse/StarImg.svg"
import grayStar from "../../../../../assets/Icons/MyResponse/grayStar.svg"
import DummyImage from "../../../../../assets/Images/DummyImage.svg";
import {
  getAutoBidData,
  getBuyerViewProfieApi,
} from "../../../../../store/LeadSetting/leadSettingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import { BASE_IMAGE, BASE_IMAGE_URL, DEFAULT_PROFILE_IMAGE, showToast } from "../../../../../utils";
import ContactSuccessModal from "../../../../Leads/LeadLists/ContactSuccessModal";

const ManualBidList = () => {
  const dispatch = useDispatch();
  const { requestId } = useParams();
  const { autoBidListData, autobidLoader } = useSelector(
    (state) => state.leadSetting
  );
  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const navigate = useNavigate();
  const [isopen,setIsOpen] = useState(false)
  const [autobidDatas,setAutoBidDatas] = useState("")
  const webData = autoBidListData?.map((item) => item?.service_name) || [];
  console.log(userToken, "autoBidListData");
  const handleBack = () => {
    navigate(`/bids-list/${requestId}`);
  };
  useEffect(() => {
    const data = {
      user_id: userToken?.remember_tokens,
      lead_id: requestId,
    };
    dispatch(getAutoBidData(data));
  }, []);
  const handleReply = (item) => {
    console.log(item, "item");
    navigate(`/view-profile/${item.id}/${requestId}`)
    // const viewProfileData = {
    //   user_id: userToken?.remember_tokens
    //     ? userToken?.remember_tokens
    //     : registerData?.remember_tokens,
    //   seller_id: item?.id,
    //   lead_id: requestId,
    // };
    // dispatch(getBuyerViewProfieApi(viewProfileData)).then((result) => {
    //   if (result) {
    //     showToast("success", result?.message);
    //   }
    // });
  };
  const handleConatct = (item) => {
    setAutoBidDatas(item)
setIsOpen(true)
  }
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <div className={styles.headingTabsWrapper}>
          
          <h1 className={styles.heading}>{webData[0] || "Your Service"}</h1>
          <div className={styles.middleText}>Your Top 5 local professional matches are below. You can contact any of the <br/> professionals to get more information using the contact button.</div>
          <div className={styles.tabs}>
            <button className={styles.activeTab} onClick={handleBack} >
              Your matches
            </button>
            <button className={styles.tab}>Replies</button>
          </div>
        </div>
        <div className={styles.backBtnWrapper}>
          <button className={styles.backBtn} onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
      {autobidLoader ? (
        <Spin
          style={{ color: "blue", display: "flex", justifyContent: "center" }}
        />
      ) : (
        <>
          {autoBidListData?.map((item) => (
            <div className={styles.card} key={item.id}>
              <div className={styles.cardLeft}>
                <div className={styles.imageWrapper}>
                  <img
                    // src={item.profile_image ? item.profile_image : DummyImage}
                    src={
                      item?.profile_image
                        ? `${BASE_IMAGE}/users/${item?.profile_image}`
                        : DEFAULT_PROFILE_IMAGE
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
                        {item.name}
                      </h3>
                      <p>
                        <img src={AutoBidLocationIcon} alt="" />
                        {item.distance} miles away
                      </p>
                    </div>
                    <div className={styles.sidebar}>
                      <div className={styles.rating}>
                        {/* <span className={styles.stars}>★★★★★</span>
                      <span className={styles.ratingCount}>125</span> */}
                        {(() => {
                          const rating = item?.avg_rating || 0;

                          return (
                            <>
                              <span className={styles.stars}>
                                {[...Array(5)].map((_, index) => {
                                  if (rating >= index + 1) {
                                    return <span key={index}><img src={starImg} alt="..." width={29} height={27}/></span>; // Full star
                                  } else if (rating >= index + 0.5) {
                                    return <span key={index}>★</span>; // Half star (or use icon)
                                  } else {
                                    return <span key={index}><img src={grayStar} alt="..." /></span>; // Empty star
                                  }
                                })}
                              </span>
                              <span className={styles.ratingCount}>
                                {rating}
                              </span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  <div className={styles.badges}>
                    <span>{item.service_name}</span>
                  </div>

                   <div className={styles.mobileImageWrapper}>
                                            <div className={styles.imageWrapper}>
                                              <img
                                                src={
                                                  item?.profile_image
                                                    ? `${BASE_IMAGE}/users/${item?.profile_image}`
                                                    : DEFAULT_PROFILE_IMAGE
                                                }
                                                alt="Profile"
                                                className={styles.images}
                                              />
                                            </div>
                                            <div className={styles.mobileHeader}>
                                              <h3>
                        <img src={GreenTickIcon} alt="" />
                        {item.name}
                      </h3>
                                              <p>
                                                <img src={AutoBidLocationIcon} alt="" />
                                                {item?.distance ? item?.distance : "0"} miles
                                                away
                                              </p>
                                            </div>
                  
                                          </div>
                  <div className={styles.mobileBadge}>
                      <div className={styles.sidebar}>
                      <div className={styles.badge}>
                    <span>{item.service_name}</span>
                  </div>
                  <div>
                    
                      <div className={styles.ratings}>
                        {/* <span className={styles.stars}>★★★★★</span>
                      <span className={styles.ratingCount}>125</span> */}
                        {(() => {
                          const rating = item?.avg_rating || 0;

                          return (
                            <>
                              <span className={styles.stars}>
                                {[...Array(5)].map((_, index) => {
                                  if (rating >= index + 1) {
                                    return <span key={index}><img src={starImg} alt="..." /></span>; // Full star
                                  } else if (rating >= index + 0.5) {
                                    return <span key={index}>★</span>; // Half star (or use icon)
                                  } else {
                                    return <span key={index} className={styles.grayImg}><img src={grayStar} alt="..." /></span>; // Empty star
                                  }
                                })}
                              </span>
                              <span className={styles.ratingCount}>
                                {rating}
                              </span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                  </div>

                  {/* <p className={styles.description}>
                    This is a static description for demonstration purposes. It
                    showcases how each bid card might look like in real data.
                  </p> */}
                  {/* <div className={styles.description}>

                  </div> */}
                  <div className={styles.messageRow}>
  <div className={styles.description}>
    <div className={styles.messageText}>
      <div className={styles.meName}></div>
      <div className={styles.meName}>{item?.activty_log?.log}</div>
    </div>
    <div className={styles.timestamp}>{item?.activty_log?.date_time}</div>
  </div>
</div>


                  <div className={styles.quickToRespondWrapper}>
                    <a
                      href="#"
                      className={styles.profileLink}
                      onClick={() => handleReply(item)}
                    >
                      View Profile →
                    </a>

                    {item?.quicktorespond == 1 && (
                      <div className={styles.quickToRespond}>
                        <img src={QuickToRespond} alt="" />
                        Quick to respond
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.replyBtnWrapper}>
              <button className={styles.replyBtn} onClick={() => handleConatct(item)}>Contact the Professional Now</button>
            </div>
              </div>
            </div>
          ))}
        </>
      )}
       { isopen &&<ContactSuccessModal
              onClose={() => setIsOpen(false)}
              isOpen={isopen}
              repliesBtn={autobidDatas}
              requestId={"contact"}
            />
            }
    </div>
  );
};

export default ManualBidList;
