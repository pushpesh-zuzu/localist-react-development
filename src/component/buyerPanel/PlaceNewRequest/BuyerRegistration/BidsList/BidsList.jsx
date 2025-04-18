import React, { useEffect, useState } from "react";
import styles from "./BidsList.module.css";
import GreenTickIcon from "../../../../../assets/Images/GreenTickIcon.svg";
import AutoBidLocationIcon from "../../../../../assets/Images/AutoBidLocationIcon.svg";
import QuickToRespond from "../../../../../assets/Images/QuickToRespond.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddManualBidData,
  getAutoBid,
  getLocationLead,
} from "../../../../../store/LeadSetting/leadSettingSlice";
import { BASE_IMAGE_URL, showToast } from "../../../../../utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import DummyImage from "../../../../../assets/Images/DummyImage.svg";
import { Spin } from "antd";
import CustomModal from "../../../../Leads/LeadLists/ConfirmModal";

const BidsList = ({ previousStep }) => {
  const { requestId } = useParams();
  const { autoBidList, bidListLoader, getlocationData, manualBidLoader } = useSelector(
    (state) => state.leadSetting
  );
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const { registerData } = useSelector((state) => state?.findJobs);
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const webdesignData = autoBidList?.map((item) => item?.service_name);

  useEffect(() => {
    const data = {
      user_id: userToken?.remember_tokens,
      lead_id: requestId,
    };
    dispatch(getAutoBid(data));
  }, [dispatch, userToken?.remember_tokens, requestId]);
  const handleReply = () => {
    navigate(`/bids-list/reply/${requestId}`)
  }
  const handleChangeMyRequest = () => {
    navigate("/buyers/create");
  };

  const handleContinue = () => {
    if (!selectedItem) return;
    const formData = new FormData();
    formData.append("user_id", userToken?.remember_tokens);
    formData.append("seller_id", selectedItem?.id);
    formData.append("bid", selectedItem?.credit_score);
    formData.append("lead_id", requestId);
    formData.append("bidtype", "reply");
    formData.append("service_id", selectedItem?.service_id);
    formData.append("distance", selectedItem?.distance);

    dispatch(getAddManualBidData(formData)).then((result) => {
      if (result) {
        showToast("success", result?.message)
        setModalOpen(false);
      }
    });;

  };


  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <div className={styles.headingTabsWrapper}>
          <h1 className={styles.heading}>
            {webdesignData && webdesignData?.length > 0
              ? webdesignData[0]
              : "No Service"}
          </h1>
          <div className={styles.tabs}>
            <button className={styles.activeTab}>Your matches</button>
            <button className={styles.tab} onClick={handleReply}>Replies</button>
          </div>
        </div>
        <div className={styles.backBtnWrapper}>
          <button className={styles.backBtn} onClick={handleChangeMyRequest}>
            Back
          </button>
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
        <span className={styles.matchCount}>{autoBidList?.length} matches</span>
        <select className={styles.sortDropdown}>
          <option>Sort by: best match</option>
        </select>
      </div>

      <div className={styles.recommendBar}>
        <span>Recommended:</span> Request replies from your{" "}
        <strong>top matches</strong> to hear back faster
      </div>

      {bidListLoader ? (
        <Spin
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "24px",
          }}
        />
      ) : (
        <>
          {" "}
          {autoBidList?.length === 0 ? (
            <div className={styles.noBidWrapper}>
              <h1 className={styles.noBidText}>No seller available</h1>
            </div>
          ) : (
            autoBidList?.map((item) => 
              item?.sellers?.map((seller) => (

              <div className={styles.card}>
                <div className={styles.cardLeft} key={seller?.id}>
                  {/* <div key={item?.sellers?.id} className={styles.cardItem}> */}
                  <div className={styles.imageWrapper}>
                    <img
                      src={
                        seller?.profile_image
                          ? `${BASE_IMAGE_URL}${seller?.profile_image}`
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
                          {seller?.name}
                        </h3>
                        <p>
                          <img src={AutoBidLocationIcon} alt="" />
                          {seller?.distance ? seller?.distance : "0"} miles away
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
                      <span>{seller?.service_name}</span>
                      {/* <span>Banner design</span>
                  <span>New pages</span> */}
                    </div>

                    <p className={styles.description}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
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
                  {/* </div> */}

                  <div className={styles.replyBtnWrapper}>
                    <button className={styles.replyBtn} onClick={() => {
                      setSelectedItem(seller);
                      setModalOpen(true);
                    }}>Request reply</button>
                  </div>
                </div>
              </div>
            ))
          ))}
        </>
      )}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onContinue={handleContinue}
        message="Are you sure you want to continue?"
        loading={manualBidLoader}
      />
    </div>
  );
};

export default BidsList;
