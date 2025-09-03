import React, { useEffect } from "react";
import styles from "./Reviews.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getReviewListApi } from "../../../store/MyProfile/myProfileSlice";
import moment from "moment";
import SubmitReviewModal from "../SubmitReviewModal";
import { useParams } from "react-router-dom";
import starImg from "../../../assets/Icons/MyResponse/StarImg.svg";
import blueStar from "../../../assets/Icons/MyResponse/blueStarImg.svg";
import greyStar from "../../../assets/Icons/MyResponse/grayStar.svg";
import blackStar from "../../../assets/Icons/MyResponse/blackStarImg.svg";
import webIconImg from "../../../assets/Images/Setting/weblogo.svg";
import halfStar from "../../../assets/Icons/MyResponse/halfStar.svg";
// import { addViewProfileList } from "../../store/LeadSetting/leadSettingSlice";
import { addViewProfileList } from "../../../store/LeadSetting/leadSettingSlice";

const ReviewSection = ({
  details,
  disableReviewButton = false,
  showSummary = true,
}) => {
  const [isopen, setIsOpen] = React.useState(false);
  const closeModal = () => setIsOpen(false);
  const profileId = useParams();
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { reviewListData } = useSelector((state) => state.myProfile);
  const { registerData } = useSelector((state) => state.findJobs);
  const data = details?.reviews;
  const userId = userToken?.id ? userToken?.id : registerData?.id;
  const UUIDs = profileId?.profileId ? profileId?.profileId : details?.uuid;
  // const reviewLength = data?.length || 0;
  const updatedReviews =
    reviewListData?.length > 0 ? reviewListData : details?.reviews;
  // const reviewLength = updatedReviews?.length || 0;
  const { viewProfileData, reviewProfileData } = useSelector(
    (state) => state.leadSetting
  );
  const datata = useSelector((state) => state.leadSetting);
  const reviewLength = reviewProfileData?.reviews_count || 0;
  // const detailsData = details?.reviews?.map((item) => item?.ratings);
  const detailsData = (details?.reviews || []).map((item) => item?.ratings);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const totalReviews = 5;
  console.log(reviewProfileData, "viewProfileData");

  const initialCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  const ratingCounts = detailsData?.reduce(
    (acc, rating) => {
      const num = parseInt(rating, 10);
      if (acc[num] !== undefined) {
        acc[num] += 1;
      }
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  const getPercentage = (count) => {
    return totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
  };

  // useEffect(()=> {

  //     dispatch(getReviewListApi(UUIDs))
  // },[UUIDs])
  const fetchReviews = () => {
    dispatch(getReviewListApi(UUIDs));
  };

  useEffect(() => {
    fetchReviews();
  }, [UUIDs]);

  return (
    <>
      <div className={styles.reviewList}>
        {showSummary && (
          <div className={styles.reviewHeader}>
            {/* <h2>Reviews ({reviewLength})</h2> */}
            <h2>Reviews{reviewLength > 0 && ` (${reviewLength})`}</h2>

            <div>
              <button
                className={styles.leaveBtn}
                onClick={handleOpen}
                disabled={disableReviewButton}
              >
                Leave a review
              </button>
            </div>
          </div>
        )}
        {showSummary && (
          <div className={styles.container}>
            <div className={styles.left}>
              <div className={styles.score}>
                {reviewProfileData?.avg_rating ?? 0}/5
              </div>

              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, index) => {
                  const rating = reviewProfileData?.avg_rating ?? 0;
                  if (index < Math.floor(rating)) {
                    return (
                      <img
                        key={index}
                        src={starImg}
                        alt="star"
                        width={19}
                        height={19}
                      />
                    );
                  } else if (index < rating) {
                    return (
                      <img
                        key={index}
                        src={halfStar}
                        alt="half-star"
                        width={21}
                        height={21}
                      />
                    );
                  } else {
                    return (
                      <img
                        key={index}
                        src={greyStar}
                        alt="empty-star"
                        width={19}
                        height={19}
                      />
                    );
                  }
                })}
              </div>
              <div className={styles.totalReviews}>
                {reviewLength} customer reviews1
              </div>
            </div>
            <div className={styles.middleBox}></div>

            <div className={styles.right}>
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingCounts[star] ?? 0;
                return (
                  <div key={star} className={styles.row}>
                    <label className={styles.ratingLabel}>
                      {/* <input type="radio" name="rating" disabled /> */}
                      <div className={styles.starText}>
                        <div style={{ width: "10px" }}>{star}</div>
                        <img
                          src={count > 0 ? blueStar : greyStar}
                          alt="star"
                          height={23}
                          width={23}
                        />
                      </div>
                    </label>

                    <div className={styles.barWrapper}>
                      <div
                        className={styles.bar}
                        style={{
                          width: `${getPercentage(count)}%`,
                          backgroundColor: count > 0 ? "#00aaff" : "#ccc",
                        }}
                      />
                    </div>

                    <span className={styles.percent}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {updatedReviews?.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.header}>
              <div className={styles.contentWrapper}>
                <div className={styles.avatarSection}>
                  {item?.profile_img ? (
                    <img
                      src={item?.profile_img}
                      alt={item?.name}
                      className={styles.avatarImage}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {item?.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </div>

                <div className={styles.rightContent}>
                  <div className={styles.nameDateRow}>
                    <h3 className={styles.username}>{item?.name}</h3>
                    <span className={styles.dateMobile}>
                      {moment(item.created_at).format("DD-MM-YYYY")}
                    </span>
                  </div>

                  <div className={styles.rating}>
                    {Array(5)
                      .fill(0)
                      .map((_, idx) => (
                        <img
                          key={idx}
                          src={idx < item.ratings ? starImg : greyStar}
                          alt="star"
                          height={20}
                        />
                      ))}
                    <span className={styles.count}>{item?.ratings}</span>
                    <span className={styles.verified}>Verified</span>
                  </div>

                  {item.review && (
                    <h4 className={styles.title}>{item.review}</h4>
                  )}

                  <p className={styles.content}>{item.content}</p>
                </div>
              </div>

              {/* 👇 This section for desktop only */}
              <div className={styles.dateSection}>
                <span className={styles.date}>
                  {moment(item.created_at).format("DD-MM-YYYY")}
                </span>
                {showSummary && (
                  <div className={styles.source}>
                    Source:
                    <img
                      src={webIconImg}
                      alt="source"
                      className={styles.sourceIcon}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {details?.reviews_count > 10 && (
        <div className={styles.pagination}>
          <button className={styles["page-btn"]}>&lt;</button>
          <button className={styles["page-btn"]}>1</button>
          <button className={`${styles["page-btn"]} ${styles.active}`}>
            2
          </button>
          <button className={styles["page-btn"]}>&gt;</button>
        </div>
      )}

      {isopen && (
        <SubmitReviewModal
          setOpen={isopen}
          closeModal={closeModal}
          ProfileIDs={profileId?.profileId}
          reviewsData={details}
          onReviewSubmit={fetchReviews}
          reviewProfileData={details}
        />
      )}
    </>
  );
};

export default ReviewSection;
