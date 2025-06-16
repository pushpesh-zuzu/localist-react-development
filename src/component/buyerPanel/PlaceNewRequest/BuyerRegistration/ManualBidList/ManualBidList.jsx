import React, { useEffect, useState } from "react";
import styles from "./ManualBidsList.module.css";
import GreenTickIcon from "../../../../../assets/Images/GreenTickIcon.svg";
// import AutoBidLocationIcon from "../../../../../assets/Images/AutoBidLocationIcon.svg";
import AutoBidLocationIcon from "../../../../../assets/Images/HowItWorks/locationImg.svg";
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
import { BASE_IMAGE_URL, showToast } from "../../../../../utils";
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
  const webData = autoBidListData?.map((item) => item?.service_name) || [];
  console.log(autoBidListData, "autoBidListData");
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
    const viewProfileData = {
      user_id: userToken?.remember_tokens
        ? userToken?.remember_tokens
        : registerData?.remember_tokens,
      seller_id: item?.id,
      lead_id: requestId,
    };
    dispatch(getBuyerViewProfieApi(viewProfileData)).then((result) => {
      if (result) {
        showToast("success", result?.message);
      }
    });
  };
  const handleConatct = () => {
setIsOpen(true)
  }
  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <div className={styles.headingTabsWrapper}>
          {/* NSai */}
          <h1 className={styles.heading}>{webData[0] || "Your Service"}</h1>
          <div className={styles.tabs}>
            <button className={styles.activeTab} onClick={handleBack}>
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
                        ? `${BASE_IMAGE_URL}${item?.profile_image}`
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

                  {/* <p className={styles.description}>
                    This is a static description for demonstration purposes. It
                    showcases how each bid card might look like in real data.
                  </p> */}
                  {/* <div className={styles.description}>

                  </div> */}
                  <div className={styles.messageRow}>
  <div className={styles.description}>
    <div className={styles.messageText}>
      <div className={styles.meName}>Me,</div>
      <div className={styles.meName}>You Requested a Quote</div>
    </div>
    <div className={styles.timestamp}>5 May 2025, 15:51</div>
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
              <button className={styles.replyBtn} onClick={handleConatct}>Contact</button>
            </div>
              </div>
            </div>
          ))}
        </>
      )}
       { isopen &&<ContactSuccessModal
              onClose={() => setIsOpen(false)}
              isOpen={isopen}
              repliesBtn={autoBidListData}
            />}
    </div>
  );
};

export default ManualBidList;
