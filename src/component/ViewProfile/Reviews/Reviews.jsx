import React, { useEffect } from "react";
import styles from "./Reviews.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getReviewListApi } from "../../../store/MyProfile/myProfileSlice";
import moment from "moment";
import SubmitReviewModal from "../SubmitReviewModal";
import { useParams } from "react-router-dom";
import starImg from "../../../assets/Icons/MyResponse/StarImg.svg"
// import blueStar from "../../../assets/Icons/MyResponse/blueStar"

const ReviewSection = () => {
  const [isopen, setIsOpen] = React.useState(false);
  const closeModal = () => setIsOpen(false);
  const profileId = useParams()
  const { userToken } = useSelector((state)=> state.auth)
   const { registerData } = useSelector(
      (state) => state.findJobs
    );
    const userId = userToken?.id  ? userToken?.id  : registerData?.id
  console.log(profileId,"pro")
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
     
        dispatch(getReviewListApi(profileId?.profileId))
    },[])


  return (
    <>
    <div className={styles.reviewList}>
        <div className={styles.reviewHeader}>
            <h2>Reviews (5)</h2>
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
    <img key={index} src={starImg} alt="star" />
  ))}
</div>
        <div className={styles.totalReviews}>{totalReviews} customer reviews</div>
      </div>
<div className={styles.middleBox}></div>
      <div className={styles.right}>
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className={styles.row}>
            <label className={styles.ratingLabel}>
              <input type="radio" name="rating" disabled />
              <span className={styles.starText}>{star}
                 {/* <img src={blueStar} alt="image" /> */}
                 </span>
            </label>
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{ width: `${getPercentage(ratingCounts[star])}%`, backgroundColor: star === 5 ? "#00aaff" : "#ccc" }}
              />
            </div>
            <span className={styles.percent}>{getPercentage(ratingCounts[star])}%</span>
          </div>
        ))}
      </div>
    </div>
      {reviewListData?.map((item, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.header}>
            <div>
              <h3 className={styles.username}>{item?.name}</h3>
              <div className={styles.rating}>
                {"⭐".repeat(item.ratings)}
                <span className={styles.count}>{item?.ratings}</span>
                <span className={styles.verified}>Verified</span>
              </div>
            </div>
            <div className={styles.dateSection}>
              <span className={styles.date}>{moment(item.created_at).format("DD-MM")}</span>
              <div className={styles.source}>
                Source:
                <img src={"https://cdn-icons-png.flaticon.com/512/733/733547.png"} alt="source" className={styles.sourceIcon} />
              </div>
            </div>
          </div>

          <h4 className={styles.title}>{item.review}</h4>
          <p className={styles.content}>{item.content}</p>

          <div className={styles.commentBox}>
            <img src={"https://randomuser.me/api/portraits/women/45.jpg"} alt="avatar" className={styles.avatar} />
            <div>
              <p className={styles.comment}>
                Contrary to popular belief, Lorem Ipsum is not simply random text.
              </p>
              <strong className={styles.thankYou}>Thank You...</strong>
            </div>
          </div>
        </div>
      ))}
    
   

    </div>
     <div className={styles.pagination}>
     <button className={styles["page-btn"]}>&lt;</button>
     <button className={styles["page-btn"]}>1</button>
     <button className={`${styles["page-btn"]} ${styles.active}`}>2</button>
     <button className={styles["page-btn"]}>&gt;</button>
   </div>

   {isopen && <SubmitReviewModal setOpen={isopen} closeModal={closeModal} ProfileIDs={profileId?.profileId} />}
   </>
  );
};

export default ReviewSection;
