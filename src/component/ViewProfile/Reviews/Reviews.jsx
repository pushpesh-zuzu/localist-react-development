// import React, { useEffect } from "react";
// import styles from "./Reviews.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { getReviewListApi } from "../../../store/MyProfile/myProfileSlice";
// import moment from "moment";
// import SubmitReviewModal from "../SubmitReviewModal";
// import { useParams } from "react-router-dom";
// import starImg from "../../../assets/Icons/MyResponse/StarImg.svg";
// import blueStar from "../../../assets/Icons/MyResponse/blueStarImg.svg";
// import blackStar from "../../../assets/Icons/MyResponse/blackStarImg.svg";
// import webIconImg from "../../../assets/Images/Setting/weblogo.svg";
// import { addViewProfileList } from "../../../store/LeadSetting/leadSettingSlice";

// const ReviewSection = ({ details, disableReviewButton = false }) => {
//   const [isopen, setIsOpen] = React.useState(false);
//   const closeModal = () => setIsOpen(false);
//   const profileId = useParams();
//   const { userToken } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const { reviewListData } = useSelector((state) => state.myProfile);
//   const { registerData } = useSelector((state) => state.findJobs);
//   const data = details?.reviews;
//   const userId = userToken?.id ? userToken?.id : registerData?.id;
//   const UUIDs = profileId?.profileId ? profileId?.profileId : details?.uuid;
//   // const reviewLength = data?.length || 0;
//   const updatedReviews =
//     reviewListData?.length > 0 ? reviewListData : details?.reviews;
//   const reviewLength = updatedReviews?.length || 0;
//   const { viewProfileData } = useSelector((state) => state.leadSetting);

//   const handleOpen = () => {
//     setIsOpen(true);
//   };
//   const totalReviews = 5;
//   const ratingCounts = {
//     5: 27,
//     4: 14,
//     3: 8,
//     2: 3,
//     1: 5,
//   };

//   const getPercentage = (count) => {
//     return totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
//   };

//   // useEffect(()=> {

//   //     dispatch(getReviewListApi(UUIDs))
//   // },[UUIDs])
//   const fetchReviews = () => {
//     dispatch(getReviewListApi(UUIDs));
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [UUIDs]);

//   return (
//     <>
//       <div className={styles.reviewList}>
//         <div className={styles.reviewHeader}>
//           <h2>Reviews ({reviewLength})</h2>
//           <div>
//             <button
//               className={styles.leaveBtn}
//               onClick={handleOpen}
//               disabled={disableReviewButton}
//             >
//               Leave a review
//             </button>
//           </div>
//         </div>
//         <div className={styles.container}>
//           <div className={styles.left}>
//             <div className={styles.score}>5/5</div>
//             <div className={styles.stars}>
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <img
//                   key={index}
//                   src={starImg}
//                   alt="star"
//                   width={19}
//                   height={19}
//                 />
//               ))}
//             </div>
//             <div className={styles.totalReviews}>
//               {reviewLength} customer reviews
//             </div>
//           </div>
//           <div className={styles.middleBox}></div>
//           <div className={styles.right}>
//             {[5, 4, 3, 2, 1].map((star, index) => (
//               // <div key={star} className={styles.row}>
//               //   <label className={styles.ratingLabel}>
//               //     <input type="radio" name="rating" disabled />
//               //     <div className={styles.starText}>
//               //       <div style={{ width: "10px" }}>{star}</div>
//               //       <img src={star === 5 ? blueStar : blackStar} alt="star" />
//               //     </div>
//               //   </label>
//               //   <div className={styles.barWrapper}>
//               //     <div
//               //       className={styles.bar}
//               //       style={{
//               //         width: `${getPercentage(ratingCounts[star])}%`,
//               //         backgroundColor: star === 5 ? "#00aaff" : "#ccc",
//               //       }}
//               //     />
//               //   </div>
//               //   <span className={styles.percent}>
//               //     {getPercentage(ratingCounts[star])}%
//               //   </span>
//               // </div>

//               <div key={star} className={styles.row}>
//                 <label className={styles.ratingLabel}>
//                   <input type="radio" name="rating" disabled />
//                   <div className={styles.starText}>
//                     <div style={{ width: "10px" }}>{star}</div>
//                     <img
//                       src={ratingCounts[star] > 0 ? blueStar : blackStar}
//                       alt="star"
//                     />
//                   </div>
//                 </label>
//                 <div className={styles.barWrapper}>
//                   <div
//                     className={styles.bar}
//                     style={{
//                       width: `${getPercentage(ratingCounts[star])}%`,
//                       backgroundColor:
//                         ratingCounts[star] > 0 ? "#00aaff" : "#ccc",
//                     }}
//                   />
//                 </div>
//                 <span className={styles.percent}>
//                   {ratingCounts[star] ?? 0} {/* <-- count of users */}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//         {updatedReviews?.map((item, index) => (
//           <div key={index} className={styles.card}>
//             <div className={styles.header}>
//               <div>
//                 <h3 className={styles.username}>{item?.name}</h3>

//                 <div className={styles.rating}>
//                   {Array(5)
//                     .fill(0)
//                     .map((_, idx) => (
//                       <img
//                         key={idx}
//                         src={idx < item.ratings ? starImg : blackStar}
//                         alt="star"
//                       />
//                     ))}
//                   <span className={styles.count}>{item?.ratings}</span>
//                   <span className={styles.verified}>Verified</span>
//                 </div>
//               </div>
//               <div className={styles.dateSection}>
//                 <span className={styles.date}>
//                   {moment(item.created_at).format("DD-MM-YYYY")}
//                 </span>
//                 <div className={styles.source}>
//                   Source:
//                   <img
//                     src={webIconImg}
//                     alt="source"
//                     className={styles.sourceIcon}
//                   />
//                 </div>
//               </div>
//             </div>

//             <h4 className={styles.title}>{item.review}</h4>
//             <p className={styles.content}>{item.content}</p>
//           </div>
//         ))}
//       </div>
//       {details?.reviews_count > 10 && (
//         <div className={styles.pagination}>
//           <button className={styles["page-btn"]}>&lt;</button>
//           <button className={styles["page-btn"]}>1</button>
//           <button className={`${styles["page-btn"]} ${styles.active}`}>
//             2
//           </button>
//           <button className={styles["page-btn"]}>&gt;</button>
//         </div>
//       )}

//       {isopen && (
//         <SubmitReviewModal
//           setOpen={isopen}
//           closeModal={closeModal}
//           ProfileIDs={profileId?.profileId}
//           reviewsData={details}
//           onReviewSubmit={fetchReviews}
//         />
//       )}
//     </>
//   );
// };

// export default ReviewSection;

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
  const { viewProfileData } = useSelector((state) => state.leadSetting);
  const reviewLength = viewProfileData?.reviews_count || 0;
  // const detailsData = details?.reviews?.map((item) => item?.ratings);
  const detailsData = (details?.reviews || []).map((item) => item?.ratings);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const totalReviews = 5;
  // const ratingCounts = {
  //   5: 27,
  //   4: 14,
  //   3: 8,
  //   2: 3,
  //   1: 5,
  // };

  // const ratingCounts = detailsData?.reduce(
  //   (acc, rating) => {
  //     acc[rating] = (acc[rating] || 0) + 1;
  //     return acc;
  //   },
  //   { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 } // initialize with all 0
  // );
  const initialCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  // detailsData se counts nikalna
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
            <h2>Reviews ({reviewLength})</h2>
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
                {viewProfileData?.avg_rating ?? 0}/5
              </div>
              {/* <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, index) => (
                <img
                  key={index}
                  src={starImg}
                  alt="star"
                  width={19}
                  height={19}
                />
              ))}
            </div> */}
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, index) => {
                  const rating = viewProfileData?.avg_rating ?? 0;
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
                {reviewLength} customer reviews
              </div>
            </div>
            <div className={styles.middleBox}></div>
            {/* <div className={styles.right}>
            {[5, 4, 3, 2, 1].map((star, index) => (
              <div key={star} className={styles.row}>
                <label className={styles.ratingLabel}>
                  <input type="radio" name="rating" disabled />
                  <div className={styles.starText}>
                    <div style={{ width: "10px" }}>{star}</div>
                    <img
                      src={ratingCounts[star] > 0 ? blueStar : blackStar}
                      alt="star"
                    />
                  </div>
                </label>
                <div className={styles.barWrapper}>
                  <div
                    className={styles.bar}
                    style={{
                      width: `${getPercentage(ratingCounts[star])}%`,
                      backgroundColor:
                        ratingCounts[star] > 0 ? "#00aaff" : "#ccc",
                    }}
                  />
                </div>
                <span className={styles.percent}>
                  {ratingCounts[star] ?? 0}
                </span>
              </div>
            ))}
          </div> */}

            <div className={styles.right}>
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingCounts[star] ?? 0; // ✅ safe
                return (
                  <div key={star} className={styles.row}>
                    <label className={styles.ratingLabel}>
                      {/* <input type="radio" name="rating" disabled /> */}
                      <div className={styles.starText}>
                        <div style={{ width: "10px" }}>{star}</div>
                        <img src={count > 0 ? blueStar : greyStar} alt="star" />
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
          // <div key={index} className={styles.card}>
          //   <div className={styles.header}>
          //     <div>
          //       <h3 className={styles.username}>{item?.name}</h3>

          //       <div className={styles.rating}>
          //         {Array(5)
          //           .fill(0)
          //           .map((_, idx) => (
          //             <img
          //               key={idx}
          //               src={idx < item.ratings ? starImg : blackStar}
          //               alt="star"
          //             />
          //           ))}
          //         <span className={styles.count}>{item?.ratings}</span>
          //         <span className={styles.verified}>Verified</span>
          //       </div>
          //     </div>
          //     <div className={styles.dateSection}>
          //       <span className={styles.date}>
          //         {moment(item.created_at).format("DD-MM-YYYY")}
          //       </span>
          //       {showSummary && (
          //         <div className={styles.source}>
          //           Source:
          //           <img
          //             src={webIconImg}
          //             alt="source"
          //             className={styles.sourceIcon}
          //           />
          //         </div>
          //       )}
          //     </div>
          //   </div>

          //   <h4 className={styles.title}>{item.review}</h4>
          //   <p className={styles.content}>{item.content}</p>
          // </div>
          <div key={index} className={styles.card}>
            <div className={styles.header}>
              <div>
                <h3 className={styles.username}>{item?.name}</h3>

                <div className={styles.rating}>
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <img
                        key={idx}
                        src={idx < item.ratings ? starImg : greyStar}
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

            {item.review && <h4 className={styles.title}>{item.review}</h4>}
            <p className={styles.content}>{item.content}</p>
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
        />
      )}
    </>
  );
};

export default ReviewSection;
