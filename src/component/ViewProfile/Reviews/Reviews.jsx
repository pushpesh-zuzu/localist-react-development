import React, { useEffect } from "react";
import styles from "./Reviews.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getReviewListApi } from "../../../store/MyProfile/myProfileSlice";
import moment from "moment";
import SubmitReviewModal from "../SubmitReviewModal";
import { useParams } from "react-router-dom";
import starImg from "../../../assets/Icons/MyResponse/StarImg.svg"
import blueStar from "../../../assets/Icons/MyResponse/blueStarImg.svg"
import blackStar from "../../../assets/Icons/MyResponse/blackStarImg.svg"

const ReviewSection = ({details}) => {
  const [isopen, setIsOpen] = React.useState(false);
  const closeModal = () => setIsOpen(false);
  const profileId = useParams()
  const { userToken } = useSelector((state)=> state.auth)
   const { registerData } = useSelector(
      (state) => state.findJobs
    );
    const data = details?.reviews
    const userId = userToken?.id  ? userToken?.id  : registerData?.id
  const UUIDs = profileId?.profileId ? profileId?.profileId : details?.uuid
  const reviewLength = data?.length || 0;
  const handleOpen = () => {
    setIsOpen(true);
  };
    const totalReviews = 5;
    const ratingCounts = {
      5: 5,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };
  
    const getPercentage = (count) => {
      return totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    };
    const dispatch = useDispatch();
const { reviewListData } = useSelector((state) => state.myProfile); 

    useEffect(()=> {
     
        dispatch(getReviewListApi(UUIDs))
    },[])


  return (
    <>
    <div className={styles.reviewList}>
        <div className={styles.reviewHeader}>
            <h2>Reviews ({reviewLength})</h2>
            <div>
                <button className={styles.leaveBtn} onClick={handleOpen}>Leave a review</button>
            </div>
        </div>
        <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.score}>5/5</div>
        {/* <div className={styles.stars}>{<img src={starImg} alt="image" /> .repeat(5)}</div> */}
        <div className={styles.stars}>
  {Array.from({ length: 5 }).map((_, index) => (
    <img key={index} src={starImg} alt="star" width={19} height={19} />
  ))}
</div>
        <div className={styles.totalReviews}>{reviewLength} customer reviews</div>
      </div>
<div className={styles.middleBox}></div>
      <div className={styles.right}>
        {[5, 4, 3, 2, 1].map((star, index) => (
  <div key={star} className={styles.row}>
    <label className={styles.ratingLabel}>
      <input type="radio" name="rating" disabled />
      <div className={styles.starText}>
        <div style={{width:"10px"}}>{star}</div>
        <img
          src={star === 5 ? blueStar : blackStar}
          alt="star"
        />
      </div>
    </label>
    <div className={styles.barWrapper}>
      <div
        className={styles.bar}
        style={{
          width: `${getPercentage(ratingCounts[star])}%`,
          backgroundColor: star === 5 ? "#00aaff" : "#ccc",
        }}
      />
    </div>
    <span className={styles.percent}>
      {getPercentage(ratingCounts[star])}%
    </span>
  </div>
))}

      </div>
    </div>
    {(profileId?.profileId ? reviewListData : data)?.map((item, index) => (
  <div key={index} className={styles.card}>
    <div className={styles.header}>
      <div>
        <h3 className={styles.username}>{item?.name}</h3>
       
     <div className={styles.rating}>
  {Array(5).fill(0).map((_, idx) => (
    <img
      key={idx}
      src={idx < item.ratings ? starImg : blackStar}
      alt="star"
    />
  ))}
  <span className={styles.count}>{item?.ratings}</span>
  <span className={styles.verified}>Verified</span>
</div>
      </div>
      <div className={styles.dateSection}>
        <span className={styles.date}>
          {moment(item.created_at).format("DD-MM-YYYY")}
        </span>
        <div className={styles.source}>
          Source:
          <img
            src={"https://cdn-icons-png.flaticon.com/512/733/733547.png"}
            alt="source"
            className={styles.sourceIcon}
          />
        </div>
      </div>
    </div>

    <h4 className={styles.title}>{item.review}</h4>
    <p className={styles.content}>{item.content}</p>

    {/* <div className={styles.commentBox}>
      <img
        src={"https://randomuser.me/api/portraits/women/45.jpg"}
        alt="avatar"
        className={styles.avatar}
      />
      <div>
        <p className={styles.comment}>
          Contrary to popular belief, Lorem Ipsum is not simply random text.
        </p>
        <strong className={styles.thankYou}>Thank You...</strong>
      </div>
    </div> */}
  </div>
))}

    </div>
     <div className={styles.pagination}>
     <button className={styles["page-btn"]}>&lt;</button>
     <button className={styles["page-btn"]}>1</button>
     <button className={`${styles["page-btn"]} ${styles.active}`}>2</button>
     <button className={styles["page-btn"]}>&gt;</button>
   </div>

   {isopen && <SubmitReviewModal setOpen={isopen} closeModal={closeModal} ProfileIDs={profileId?.profileId} reviewsData={details} />}
   </>
  );
};

export default ReviewSection;
