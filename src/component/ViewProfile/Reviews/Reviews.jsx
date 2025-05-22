import React, { useEffect } from "react";
import styles from "./Reviews.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getReviewListApi } from "../../../store/MyProfile/myProfileSlice";
import moment from "moment";

const ReviewSection = () => {
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
        dispatch(getReviewListApi())
    },[])
//   const dummyData = [
//     {
//       user: "Chander",
//       date: "5 May 2025",
//       sourceIcon: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
//       rating: 5,
//       title: "Web designing",
//       content:
//         "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC...",
//       avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     },
//     {
//       user: "Chander",
//       date: "5 May 2025",
//       sourceIcon: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
//       rating: 5,
//       title: "Web designing",
//       content:
//         "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC...",
//       avatar: "https://randomuser.me/api/portraits/women/45.jpg",
//     },
//   ];

  return (
    <>
    <div className={styles.reviewList}>
        <div className={styles.reviewHeader}>
            <h2>Reviews (5)</h2>
            <div>
                <button className={styles.leaveBtn}>Leave a review</button>
            </div>
        </div>
        <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.score}>5/5</div>
        <div className={styles.stars}>{"⭐".repeat(5)}</div>
        <div className={styles.totalReviews}>{totalReviews} customer reviews</div>
      </div>

      <div className={styles.right}>
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className={styles.row}>
            <label className={styles.ratingLabel}>
              <input type="radio" name="rating" disabled />
              <span className={styles.starText}>{star} ⭐</span>
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
   </>
  );
};

export default ReviewSection;
