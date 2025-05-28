// import React, { useEffect, useState } from "react";
// import styles from "./BidsList.module.css";
// import GreenTickIcon from "../../../../../assets/Images/GreenTickIcon.svg";
// import greenCheck from "../../../../../assets/Images/Leads/greenCheckbox.svg"
// import AutoBidLocationIcon from "../../../../../assets/Images/AutoBidLocationIcon.svg";
// import QuickToRespond from "../../../../../assets/Images/QuickToRespond.svg";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAddManualBidData,
//   getAddMultipleManualBidData,
//   getAutoBid,
// } from "../../../../../store/LeadSetting/leadSettingSlice";
// import { BASE_IMAGE_URL, showToast } from "../../../../../utils";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import DummyImage from "../../../../../assets/Images/DummyImage.svg";
// import { Spin } from "antd";
// import CustomModal from "../../../../Leads/LeadLists/ConfirmModal";

// const BidsList = ({ previousStep }) => {
//   const { requestId } = useParams();
//   const { autoBidList, bidListLoader, manualBidLoader } = useSelector(
//     (state) => state.leadSetting
//   );
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [visibleCount, setVisibleCount] = useState(5)
//   const { userToken } = useSelector((state) => state.auth);
//   const { createRequestToken } = useSelector((state) => state.buyer)
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const webdesignData = autoBidList?.map((item) => item?.service_name);
//   const bidCountList = autoBidList?.map((item) => item?.bidcount)
// console.log(bidCountList,"bidCountList")
//   useEffect(() => {
//     const data = {
//       user_id: userToken?.remember_tokens,
//       lead_id: requestId,
//     };
//     dispatch(getAutoBid(data));
//   }, [dispatch, userToken?.remember_tokens, requestId]);

//   const handleReply = () => {
//     navigate(`/bids-list/reply/${requestId}`);
//   };

//   const handleChangeMyRequest = () => {
//     navigate("/buyers/create");
//   };
//   const handleSeeMore = () => {
//     setVisibleCount((prevCount) => prevCount + 5);
//   };

//   const handleContinue = () => {
//     if (!selectedItem) return;
//     const formData = new FormData();
//     formData.append("user_id", userToken?.remember_tokens);
//     formData.append("seller_id", selectedItem?.id);
//     formData.append("bid", selectedItem?.credit_score);
//     formData.append("lead_id", requestId);
//     formData.append("bidtype", "reply");
//     formData.append("service_id", selectedItem?.service_id);
//     formData.append("distance", selectedItem?.distance);

//     dispatch(getAddManualBidData(formData)).then((result) => {
//       if (result) {
//         showToast("success", result?.message);
//         setModalOpen(false);
//         const data = {
//           user_id: userToken?.remember_tokens,
//           lead_id: requestId,
//         };
//         dispatch(getAutoBid(data))
//       }
//     });
//   };
//   // const handleMultple = () => {
//   //   const bidList=autoBidList?.[0]?.sellers ;

//   //   const multipleData = {
//   //     service_id:bidList.map(item=>item?.service_id
//   //     ),
//   //     seller_id:bidList.map(item=>item?.id
//   //     ),
//   //     bid:bidList.map(item=>item?.credit_score
//   //     ),
//   //     distance:bidList.map(item=>item?.distance
//   //     ),
//   //     // bidtype:"reply",
//   //     lead_id:requestId,
//   //     user_id: userToken?.remember_tokens
//   //   }
//   //   dispatch(getAddMultipleManualBidData(multipleData)).then((result) => {
//   //     if(result) {
//   //       showToast("success", result?.message);
//   //       const data = {
//   //         user_id: userToken?.remember_tokens,
//   //         lead_id: requestId,
//   //       };
//   //       dispatch(getAutoBid(data))

//   //     }
//   //   })
//   // }
//   const handleMultple = () => {
//     // Only include the first 5 sellers (those with green checkboxes)
//     const bidList = autoBidList?.[0]?.sellers?.slice(0, 5);

//     if (!bidList || bidList.length === 0) {
//       showToast("error", "No best matches available");
//       return;
//     }

//     const multipleData = {
//       service_id: bidList.map(item => item?.service_id),
//       seller_id: bidList.map(item => item?.id),
//       bid: bidList.map(item => item?.credit_score),
//       distance: bidList.map(item => item?.distance),
//       // bidtype:"reply",
//       lead_id: requestId,
//       user_id: userToken?.remember_tokens
//     }

//     dispatch(getAddMultipleManualBidData(multipleData)).then((result) => {
//       if(result) {
//         showToast("success", result?.message);
//         const data = {
//           user_id: userToken?.remember_tokens,
//           lead_id: requestId,
//         };
//         dispatch(getAutoBid(data))
//       }
//     })
//   }

//   return (
//     <>
//     <div className={styles.container}>
//       {bidListLoader ? (
//         <div className={styles.loaderWrapper}>
//           <Spin
//             size="large"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               minHeight: "300px",
//             }}
//           />
//         </div>
//       ) : (
//         <>
//           <div className={styles.headerWrapper}>
//             <div className={styles.headingTabsWrapper}>
//               <h1 className={styles.heading}>
//                 {webdesignData && webdesignData?.length > 0
//                   ? webdesignData[0]
//                   : "No Service"}
//               </h1>
//               <div className={styles.tabs}>
//                 <button className={styles.activeTab}>Your matches</button>
//                 <button className={styles.tab} onClick={handleReply}>
//                   Replies
//                 </button>
//               </div>
//             </div>
//             <div className={styles.backBtnWrapper}>
//               <button className={styles.backBtn} onClick={handleChangeMyRequest}>
//                 Back
//               </button>
//             </div>
//           </div>

//           <div className={styles.filters}>
//             <select>
//               <option>All ratings</option>
//             </select>
//             <select>
//               <option>All locations</option>
//             </select>
//             <select>
//               <option>All response times</option>
//             </select>
//             <span className={styles.matchCount}>{autoBidList?.length} matches</span>
//             <select className={styles.sortDropdown}>
//               <option>Sort by: best match</option>
//             </select>
//           </div>
//           <div className={styles.recommendBar}>
// <div className={styles.recommendBox}>
//   <div>
//             <span>Recommended:</span> Request replies from your{" "}
//             <strong>top matches</strong> to hear back faster
//           </div>
//             <button className={styles.requestBtn} onClick={handleMultple}>Request your best matches here</button>
//           </div>
//           </div>
//           <div className={styles.requestMatchBox}>
//           <button className={styles.requestBtnMatchBox} onClick={handleMultple}>Request your best matches here</button>
//           </div>
//           {autoBidList?.length === 0 ? (
//             <div className={styles.noBidWrapper}>
//               <h1 className={styles.noBidText}>No seller available</h1>
//             </div>
//           ) : (
//             autoBidList?.map((item) =>
//               item?.sellers?.slice(0, visibleCount)?.map((seller,index) => (
//                 <div className={styles.card} key={seller?.id}>
//                   <div className={styles.cardLeft}>
//                     <div className={styles.imageWrapper}>
//                       <img
//                         src={
//                           seller?.profile_image
//                             ? `${BASE_IMAGE_URL}${seller?.profile_image}`
//                             : DummyImage
//                         }
//                         alt="Profile"
//                         className={styles.image}
//                       />
//                     </div>
//                     <div className={styles.details}>
//                       <div className={styles.header}>
//                         <div>
//                           <h3>
//                            {index < 5 && !bidCountList && <img src={GreenTickIcon} alt="" />}
//                             {seller?.name}
//                           </h3>
//                           <p>
//                             <img src={AutoBidLocationIcon} alt="" />
//                             {seller?.distance ? seller?.distance : "0"} miles away
//                           </p>
//                         </div>
//                         <div className={styles.sidebar}>
//                           <div className={styles.rating}>
//                             <span className={styles.stars}>★★★★★</span>
//                             <span className={styles.ratingCount}>125</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className={styles.badges}>
//                         <span>{seller?.service_name}</span>
//                       </div>

//                       <p className={styles.description}>
//                         Lorem Ipsum is simply dummy text of the printing and
//                         typesetting industry. Lorem Ipsum has been the industry's
//                         standard dummy text ever since the 1500s.
//                       </p>

//                       <div className={styles.quickToRespondWrapper}>
//                         <Link
//                           to={`/view-profile/${item?.sellers?.id}?requestId=${requestId}`}
//                           className={styles.profileLink}
//                         >
//                           View Profile →
//                         </Link>

//                         <div className={styles.quickToRespond}>
//                           <img src={QuickToRespond} alt="" />
//                           Quick to respond
//                         </div>
//                       </div>
//                     </div>

//                     <div className={styles.replyBtnWrapper}>
//                     <div className={styles.replyCheckbox}>
//                     {/* <input type="checkbox" /> */}
//                     {index < 5 && !bidCountList && <input
//       type="checkbox"
//       checked={selectedSellers.includes(seller.id)}
//       onChange={() => handleCheckboxChange(seller.id)}
//     />
// }
//                     </div>
//                       <button
//                         className={styles.replyBtn}
//                         onClick={() => {
//                           setSelectedItem(seller);
//                           setModalOpen(true);
//                         }}
//                       >
//                         Request reply
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )
//           )}

//           <CustomModal
//             isOpen={isModalOpen}
//             onClose={() => setModalOpen(false)}
//             onContinue={handleContinue}
//             message="Are you sure you want to continue?"
//             loading={manualBidLoader}
//           />
//         </>
//       )}
//     {autoBidList?.[0]?.sellers?.length > visibleCount && <div className={styles.moreProfessionalBtnBox}>
//   <button className={styles.moreProfessionalBtn} onClick={handleSeeMore}>See More Professionals</button>
// </div>}
//     </div>

//    </>
//   );
// };

// export default BidsList;

// import React, { useEffect, useState } from "react";
// import styles from "./BidsList.module.css";
// import GreenTickIcon from "../../../../../assets/Images/GreenTickIcon.svg";
// import AutoBidLocationIcon from "../../../../../assets/Images/AutoBidLocationIcon.svg";
// import QuickToRespond from "../../../../../assets/Images/QuickToRespond.svg";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAddManualBidData,
//   getAddMultipleManualBidData,
//   getAutoBid,
// } from "../../../../../store/LeadSetting/leadSettingSlice";
// import { BASE_IMAGE_URL, showToast } from "../../../../../utils";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import DummyImage from "../../../../../assets/Images/DummyImage.svg";
// import { Spin } from "antd";
// import CustomModal from "../../../../Leads/LeadLists/ConfirmModal";

// const BidsList = ({ previousStep }) => {
//   const { requestId } = useParams();
//   const { autoBidList, bidListLoader, manualBidLoader } = useSelector(
//     (state) => state.leadSetting
//   );
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [visibleCount, setVisibleCount] = useState(5)
//   const { userToken } = useSelector((state) => state.auth);
//   const { createRequestToken } = useSelector((state) => state.buyer)
//    const { searchServiceLoader, service,registerData } = useSelector(
//       (state) => state.findJobs
//     );
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const webdesignData = autoBidList?.map((item) => item?.service_name);

//   // Get bidcount from API response (assuming it's in the autoBidList[0])
//   const bidCount = autoBidList?.[0]?.bidcount || 0;

//   // Check if we should show green tick and checkbox (only if bidCount is not 5)
//   const shouldShowGreenIcons = bidCount !== 5;

//   // State to track selected checkboxes
//   const [selectedSellers, setSelectedSellers] = useState([]);

//   // Handle checkbox change
//   const handleCheckboxChange = (sellerId) => {
//     if (selectedSellers.includes(sellerId)) {
//       setSelectedSellers(selectedSellers.filter(id => id !== sellerId));
//     } else {
//       setSelectedSellers([...selectedSellers, sellerId]);
//     }
//   };

//   useEffect(() => {
//     const data = {
//       user_id: userToken?.remember_tokens,
//       lead_id: requestId,
//     };
//     dispatch(getAutoBid(data));
//   }, [dispatch, userToken?.remember_tokens, requestId]);

//   // Pre-select first 5 sellers when data is loaded
//   useEffect(() => {
//     if (autoBidList?.length > 0 && shouldShowGreenIcons) {
//       const firstFiveSellers = autoBidList[0]?.sellers?.slice(0, 5)?.map(seller => seller.id) || [];
//       setSelectedSellers(firstFiveSellers);
//     } else {
//       setSelectedSellers([]);
//     }
//   }, [autoBidList, shouldShowGreenIcons]);

//   const handleReply = () => {
//     navigate(`/bids-list/reply/${requestId}`);
//   };

//   const handleChangeMyRequest = () => {
//     navigate("/buyers/create");
//   };
//   const handleSeeMore = () => {
//     setVisibleCount((prevCount) => prevCount + 5);
//   };

//   const handleContinue = () => {
//     if (!selectedItem) return;
//     const formData = new FormData();
//     formData.append("user_id", userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens);
//     formData.append("seller_id", selectedItem?.id);
//     formData.append("bid", selectedItem?.credit_score);
//     formData.append("lead_id", requestId);
//     formData.append("bidtype", "reply");
//     formData.append("service_id", selectedItem?.service_id);
//     formData.append("distance", selectedItem?.distance);

//     dispatch(getAddManualBidData(formData)).then((result) => {
//       if (result) {
//         showToast("success", result?.message);
//         setModalOpen(false);
//         const data = {
//           user_id: userToken?.remember_tokens,
//           lead_id: requestId,
//         };
//         dispatch(getAutoBid(data))
//       }
//     });
//   };

//   const handleMultple = () => {
//     // Use the selected checkboxes instead of just the first 5
//     const bidList = autoBidList?.[0]?.sellers?.filter(seller => selectedSellers.includes(seller.id));

//     if (!bidList || bidList.length === 0) {
//       showToast("error", "No best matches selected");
//       return;
//     }

//     const multipleData = {
//       service_id: bidList.map(item => item?.service_id),
//       seller_id: bidList.map(item => item?.id),
//       bid: bidList.map(item => item?.credit_score),
//       distance: bidList.map(item => item?.distance),
//       lead_id: requestId,
//       user_id: userToken?.remember_tokens
//     }

//     dispatch(getAddMultipleManualBidData(multipleData)).then((result) => {
//       if(result) {
//         showToast("success", result?.message);
//         const data = {
//           user_id: userToken?.remember_tokens,
//           lead_id: requestId,
//         };
//         dispatch(getAutoBid(data))
//       }
//     })
//   }

//   return (
//     <>
//     <div className={styles.container}>
//       {bidListLoader ? (
//         <div className={styles.loaderWrapper}>
//           <Spin
//             size="large"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               minHeight: "300px",
//             }}
//           />
//         </div>
//       ) : (
//         <>
//           <div className={styles.headerWrapper}>
//             <div className={styles.headingTabsWrapper}>
//               <h1 className={styles.heading}>
//                 {webdesignData && webdesignData?.length > 0
//                   ? webdesignData[0]
//                   : "No Service"}
//               </h1>
//               <div className={styles.tabs}>
//                 <button className={styles.activeTab}>Your matches</button>
//                 <button className={styles.tab} onClick={handleReply}>
//                   Replies
//                 </button>
//               </div>
//             </div>
//             <div className={styles.backBtnWrapper}>
//               <button className={styles.backBtn} onClick={handleChangeMyRequest}>
//                 Back
//               </button>
//             </div>
//           </div>

//           <div className={styles.filters}>
//             <select>
//               <option>All ratings</option>
//             </select>
//             <select>
//               <option>All locations</option>
//             </select>
//             <select>
//               <option>All response times</option>
//             </select>
//             <span className={styles.matchCount}>{autoBidList?.length} matches</span>
//             <select className={styles.sortDropdown}>
//               <option>Sort by: best match</option>
//             </select>
//           </div>
//           <div className={styles.recommendBar}>
//             <div className={styles.recommendBox}>
//               <div>
//                 <span>Recommended:</span> Request replies from your{" "}
//                 <strong>top matches</strong> to hear back faster
//               </div>
//               <button className={styles.requestBtn} onClick={handleMultple}>Request your best matches here</button>
//             </div>
//           </div>
//           <div className={styles.requestMatchBox}>
//             <button className={styles.requestBtnMatchBox} onClick={handleMultple}>Request your best matches here</button>
//           </div>
//           {autoBidList?.length === 0 ? (
//             <div className={styles.noBidWrapper}>
//               <h1 className={styles.noBidText}>No seller available</h1>
//             </div>
//           ) : (
//             autoBidList?.map((item) =>
//               item?.sellers?.slice(0, visibleCount)?.map((seller, index) => (
//                 <div className={styles.card} key={seller?.id}>
//                   <div className={styles.cardLeft}>
//                     <div className={styles.imageWrapper}>
//                       <img
//                         src={
//                           seller?.profile_image
//                             ? `${BASE_IMAGE_URL}${seller?.profile_image}`
//                             : DummyImage
//                         }
//                         alt="Profile"
//                         className={styles.image}
//                       />
//                     </div>
//                     <div className={styles.details}>
//                       <div className={styles.header}>
//                         <div>
//                           <h3>
//                            {shouldShowGreenIcons && index < 5 && <img src={GreenTickIcon} alt="" />}
//                             {seller?.name}
//                           </h3>
//                           <p>
//                             <img src={AutoBidLocationIcon} alt="" />
//                             {seller?.distance ? seller?.distance : "0"} miles away
//                           </p>
//                         </div>
//                         <div className={styles.sidebar}>
//                           <div className={styles.rating}>
//                             <span className={styles.stars}>★★★★★</span>
//                             <span className={styles.ratingCount}>125</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className={styles.badges}>
//                         <span>{seller?.service_name}</span>
//                       </div>

//                       <p className={styles.description}>
//                         Lorem Ipsum is simply dummy text of the printing and
//                         typesetting industry. Lorem Ipsum has been the industry's
//                         standard dummy text ever since the 1500s.
//                       </p>

//                       <div className={styles.quickToRespondWrapper}>
//                         <Link
//                           to={`/view-profile/${item?.sellers?.id}?requestId=${requestId}`}
//                           className={styles.profileLink}
//                         >
//                           View Profile →
//                         </Link>

//                         <div className={styles.quickToRespond}>
//                           <img src={QuickToRespond} alt="" />
//                           Quick to respond
//                         </div>
//                       </div>
//                     </div>

//                     <div className={styles.replyBtnWrapper}>
//                       <div className={styles.replyCheckbox}>
//                         {shouldShowGreenIcons && index < 5 && (
//                           <input
//                             type="checkbox"
//                             checked={selectedSellers.includes(seller.id)}
//                             onChange={() => handleCheckboxChange(seller.id)}
//                             className={styles.checkbox}
//                             // Auto-check first 5 items
//                             defaultChecked={true}
//                           />
//                         )}
//                       </div>
//                       <button
//                         className={styles.replyBtn}
//                         onClick={() => {
//                           setSelectedItem(seller);
//                           setModalOpen(true);
//                         }}
//                       >
//                         Request reply
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )
//           )}

//           <CustomModal
//             isOpen={isModalOpen}
//             onClose={() => setModalOpen(false)}
//             onContinue={handleContinue}
//             message="Are you sure you want to continue?"
//             loading={manualBidLoader}
//           />
//         </>
//       )}
//     {autoBidList?.[0]?.sellers?.length > visibleCount && <div className={styles.moreProfessionalBtnBox}>
//   <button className={styles.moreProfessionalBtn} onClick={handleSeeMore}>See More Professionals</button>
// </div>}
//     </div>

//    </>
//   );
// };

// export default BidsList;

import React, { useEffect, useState } from "react";
import styles from "./BidsList.module.css";
import GreenTickIcon from "../../../../../assets/Images/GreenTickIcon.svg";
import AutoBidLocationIcon from "../../../../../assets/Images/AutoBidLocationIcon.svg";
import QuickToRespond from "../../../../../assets/Images/QuickToRespond.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddManualBidData,
  getAddMultipleManualBidData,
  getAutoBid,
  getBuyerSortByLocationApi,
  getBuyerSortByResponseApi,
  getBuyerViewProfieApi,
  getRatingFilterApi,
  ratingFilterApi,
} from "../../../../../store/LeadSetting/leadSettingSlice";
import { BASE_IMAGE_URL, showToast } from "../../../../../utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import DummyImage from "../../../../../assets/Images/DummyImage.svg";
import { Spin } from "antd";
import CustomModal from "../../../../Leads/LeadLists/ConfirmModal";

const BidsList = ({ previousStep }) => {
  const { requestId } = useParams();
  const { autoBidList, bidListLoader, manualBidLoader, ratingFilterData } = useSelector(
    (state) => state.leadSetting
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [ratingList,setRatingList] = useState("")
  const [locationSort, setLocationSort] = useState("");
  const [responseSort, setResponseSort] = useState("");
  const { userToken } = useSelector((state) => state.auth);
  const { createRequestToken } = useSelector((state) => state.buyer);
  const { searchServiceLoader, service, registerData } = useSelector(
    (state) => state.findJobs
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const webdesignData = autoBidList?.map((item) => item?.service_name);
  const matchingLength = autoBidList?.map((item) => item?.sellers?.length)
  const [selectedSellers, setSelectedSellers] = useState([]);
  console.log(autoBidList?.map((item) => item?.sellers?.length), "autoBidList")
  // Get bidcount from API response
  const bidCount = autoBidList?.[0]?.bidcount || 0;
  const bidTotal = autoBidList?.[0]?.totalbid || 0;
  const isButtonDisabled = bidCount === bidTotal
  console.log(ratingFilterData, "prem")

  // Hide checkboxes if bidCount is 5 (API has been hit)
  // const showCheckboxes = bidCount !== 5;
  const showCheckboxes = selectedSellers.length < bidTotal - bidCount;
  const shouldShowGreenIcons = bidCount !== bidTotal;

  const handleCheckboxChange = (sellerId) => {
    if (selectedSellers.includes(sellerId)) {
      // If checkbox is being unchecked, just remove it from the array
      setSelectedSellers(selectedSellers.filter((id) => id !== sellerId));
    } else {
      // If checkbox is being checked, check if we've reached the limit
      const maxAllowed = bidTotal - bidCount;

      if (selectedSellers.length >= maxAllowed) {
        // Show error toast if trying to select more than allowed
        const remainingMessage =
          bidCount === 1
            ? `1 bid already applied. You can select only ${maxAllowed} more.`
            : `${bidCount} bids already applied. You can select only ${maxAllowed} more.`;

        showToast("error", remainingMessage);
        return; // Exit the function to prevent adding more sellers
      }
      // If less than the limit are selected, add the new one
      setSelectedSellers([...selectedSellers, sellerId]);
    }
  };
  useEffect(() => {
    const data = {
      user_id: userToken?.remember_tokens,
      lead_id: requestId,
    };
    dispatch(getAutoBid(data));
  }, [dispatch, userToken?.remember_tokens, requestId]);

  useEffect(() => {
    if (autoBidList?.length > 0 && autoBidList[0]?.sellers?.length > 0) {
      // Only select the allowed number based on bidCount
      const allowedSelections = bidTotal - (autoBidList?.[0]?.bidcount || 0);
      const allowedSellers =
        autoBidList[0]?.sellers
          ?.slice(0, allowedSelections)
          ?.map((seller) => seller.id) || [];
      setSelectedSellers(allowedSellers);
    }
  }, [autoBidList]);

  const handleReply = () => {
    navigate(`/bids-list/reply/${requestId}`);
  };

  const handleChangeMyRequest = () => {
    navigate("/buyers/create");
  };

  const hanleViewProfile = (seller) => {

    navigate(`/view-profile`)
    const data = {
      user_id: userToken?.remember_tokens
        ? userToken?.remember_tokens
        : registerData?.remember_tokens,
      seller_id: seller?.id,
      lead_id: requestId
    }
    dispatch(getBuyerViewProfieApi(data)).then((result) => {
      if (result) {
        showToast("success", result?.message)
      }
    })
  }

  useEffect(() => {
    const data = {
      user_id: userToken?.remember_tokens
        ? userToken?.remember_tokens
        : registerData?.remember_tokens,
    }
    dispatch(getRatingFilterApi(data))
  }, [])

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleContinue = () => {
    if (!selectedItem) return;
    const formData = new FormData();
    formData.append(
      "user_id",
      userToken?.remember_tokens
        ? userToken?.remember_tokens
        : registerData?.remember_tokens
    );
    formData.append("seller_id", selectedItem?.id);
    formData.append("bid", selectedItem?.credit_score);
    formData.append("lead_id", requestId);
    formData.append("bidtype", "reply");
    formData.append("service_id", selectedItem?.service_id);
    formData.append("distance", selectedItem?.distance);

    dispatch(getAddManualBidData(formData)).then((result) => {
      if (result) {
        showToast("success", result?.message);
        setModalOpen(false);
        const data = {
          user_id: userToken?.remember_tokens,
          lead_id: requestId,
        };
        dispatch(getAutoBid(data));
      }
    });
  };

  const handleMultple = () => {
    // Use the selected checkboxes
    const bidList = autoBidList?.[0]?.sellers?.filter((seller) =>
      selectedSellers.includes(seller.id)
    );

    if (!bidList || bidList.length === 0) {
      showToast("error", "No best matches selected");
      return;
    }

    const multipleData = {
      service_id: bidList.map((item) => item?.service_id),
      seller_id: bidList.map((item) => item?.id),
      bid: bidList.map((item) => item?.credit_score),
      distance: bidList.map((item) => item?.distance),
      lead_id: requestId,
      user_id: userToken?.remember_tokens,
    };

    dispatch(getAddMultipleManualBidData(multipleData)).then((result) => {
      if (result) {
        showToast("success", result?.message);
        const data = {
          user_id: userToken?.remember_tokens,
          lead_id: requestId,
        };
        dispatch(getAutoBid(data));
      }
    });
  };
  const handelChangeSort = (e) => {
    const selectedOption = e.target.value
    setLocationSort(selectedOption)
    const sortData = {
      lead_id: requestId,
      distance_order: selectedOption
    }
    dispatch(getBuyerSortByLocationApi(sortData))
  }
  const handelresponseChangeSort = (e) => {
    const selectedResponse = e.target.value
    setResponseSort(selectedResponse)
    const responseData = {
      lead_id: requestId,
      response_time: selectedResponse
    }
    dispatch(getBuyerSortByResponseApi(responseData))
  }
  const handleSortRating = (e) => {
    const selectedRating = e.target.value
    console.log(selectedRating,"oo")
    setRatingList(selectedRating)
    const ratingData = {
      lead_id:requestId,
      rating: selectedRating
    }
    dispatch(ratingFilterApi(ratingData))
  }

  return (
    <>
      <div className={styles.container}>
        {bidListLoader ? (
          <div className={styles.loaderWrapper}>
            <Spin
              size="large"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "300px",
              }}
            />
          </div>
        ) : (
          <>
            <div className={styles.headerWrapper}>
              <div className={styles.headingTabsWrapper}>
                <h1 className={styles.heading}>
                  {webdesignData && webdesignData?.length > 0
                    ? webdesignData[0]
                    : "No Service"}
                </h1>
                <div className={styles.tabs}>
                  <button className={styles.activeTab}>Your matches</button>
                  <button className={styles.tab} onClick={handleReply}>
                    Replies
                  </button>
                </div>
              </div>
              <div className={styles.backBtnWrapper}>
                <button
                  className={styles.backBtn}
                  onClick={handleChangeMyRequest}
                >
                  Back
                </button>
              </div>
            </div>

            <div className={styles.filters}>
              <select className={styles.customSelect} onChange={handleSortRating} value={ratingList} defaultValue={""}>
                <option value="" disabled>All ratings</option>
                {ratingFilterData[0]?.map((item) => (
                  <option key={item.value} value={item.value}>
                    {"⭐".repeat(item.value)} {item.label} ({item.count})
                  </option>
                ))}
              </select>
              <select onChange={handelChangeSort} defaultValue={""} value={locationSort} className={styles.customSelect}>
                <option value="" disabled>Sort by Location</option>

                <option value="farthest to nearest">Farthest to Nearest</option>
                <option value="nearest to farthest">Nearest to Farthest </option>

              </select>
              <select onChange={handelresponseChangeSort} defaultValue={""} value={responseSort} className={styles.customSelect}>
                {/* <option>All response times</option> */}
                <option value="" disabled>All response times</option>
                <option value="Responds within 10 mins">Responds within 10 mins</option>
                <option value="Responds within 1 hour">Responds within 1 hour</option>
                <option value="Responds within 6 hours">Responds within 6 hours</option>
                <option value="Responds within 24 hours">Responds within 24 hours</option>
              </select>
              <span className={styles.matchCount}>
                {matchingLength} matches
              </span>
              <select className={`${styles.sortDropdown} ${styles.customSelect}`}>
                <option>Sort by: best match</option>
              </select>
            </div>
            <div className={styles.recommendBar}>
              <div className={styles.recommendBox}>
                <div>
                  <span>Recommended:</span> Request replies from your{" "}
                  <strong>top matches</strong> to hear back faster
                </div>
                <button className={styles.requestBtn} onClick={handleMultple} disabled={isButtonDisabled}>
                  Request your best matches here
                </button>
              </div>
            </div>
            <div className={styles.requestMatchBox}>
              <button
                className={styles.requestBtnMatchBox}
                onClick={handleMultple}
                disabled={isButtonDisabled}
              >
                Request your best matches here
              </button>
            </div>
            {/* {bidListLoader ? <Spin size="small"/> :  <> */}
            {autoBidList?.every(item => item?.sellers?.length === 0) ? (
              <div className={styles.noBidWrapper}>
                <h1 className={styles.noBidText}>No seller available</h1>
              </div>
            ) : (
              autoBidList?.map((item) =>
                item?.sellers?.slice(0, visibleCount)?.map((seller, index) => (
                  <div className={styles.card} key={seller?.id}>
                    <div className={styles.cardLeft}>
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
                              {shouldShowGreenIcons && index < bidTotal && (
                                <img src={GreenTickIcon} alt="" />
                              )}
                              {seller?.name}
                            </h3>
                            <p>
                              <img src={AutoBidLocationIcon} alt="" />
                              {seller?.distance ? seller?.distance : "0"} miles
                              away
                            </p>
                          </div>
                          {/* <div className={styles.sidebar}>
                            <div className={styles.rating}>
                              <span className={styles.stars}>★★★★★</span>
                              <span className={styles.ratingCount}>{seller?.avg_rating}</span>
                            </div>
                          </div> */}
                          <div className={styles.sidebar}>
                            <div className={styles.rating}>

                              {(() => {
                                const rating = seller?.avg_rating || 0;

                                return (
                                  <>
                                    <span className={styles.stars}>
                                      {[...Array(5)].map((_, index) => {
                                        if (rating >= index + 1) {
                                          return <span key={index}>★</span>; // Full star
                                        } else if (rating >= index + 0.5) {
                                          return <span key={index}>★</span>; // Half star (or use icon)
                                        } else {
                                          return <span key={index}>☆</span>; // Empty star
                                        }
                                      })}
                                    </span>
                                    <span className={styles.ratingCount}>{rating}</span>
                                  </>
                                );
                              })()}
                            </div>
                          </div>


                        </div>

                        <div className={styles.badges}>
                          <span>{seller?.service_name}</span>
                        </div>

                        <p className={styles.description}>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </p>

                        <div className={styles.quickToRespondWrapper}>
                          <Link
                            // to={`/view-profile/${item?.sellers?.id}?requestId=${requestId}`}
                            className={styles.profileLink}
                            onClick={() => hanleViewProfile(seller)}
                          >
                            View Profile →
                          </Link>

                          {seller?.quicktorespond == 1 && <div className={styles.quickToRespond}>
                            <img src={QuickToRespond} alt="" />
                            Quick to respond
                          </div>}
                        </div>
                      </div>

                      <div className={styles.replyBtnWrapper}>
                        {/* <div className={styles.replyCheckbox}>
                        {showCheckboxes && (
                          <input 
                            type="checkbox"
                            checked={selectedSellers.includes(seller.id)}
                            onChange={() => handleCheckboxChange(seller.id)}
                            className={styles.checkbox}
                          />
                        )}
                      </div> */}
                        {/* <div className={styles.replyCheckbox}>
  <input 
    type="checkbox"
    checked={selectedSellers.includes(seller.id)}
    onChange={() => handleCheckboxChange(seller.id)}
    className={styles.checkbox}
    disabled={!selectedSellers.includes(seller.id) && selectedSellers.length >= (5 - bidCount)}
  />
</div> */}
                        <div className={styles.replyCheckbox}>
                          <input
                            type="checkbox"
                            checked={selectedSellers.includes(seller.id)}
                            onChange={() => handleCheckboxChange(seller.id)}
                            className={styles.checkbox}
                            disabled={
                              !selectedSellers.includes(seller.id) &&
                              selectedSellers.length >= bidTotal - bidCount
                            }
                          />
                        </div>
                        <button
                          className={styles.replyBtn}
                          onClick={() => {
                            setSelectedItem(seller);
                            setModalOpen(true);
                          }}
                        >
                          Request reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )
            )}



            <CustomModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              onContinue={handleContinue}
              message="Are you sure you want to continue?"
              loading={manualBidLoader}
            />
          </>
        )}
        {autoBidList?.[0]?.sellers?.length > visibleCount && (
          <div className={styles.moreProfessionalBtnBox}>
            <button
              className={styles.moreProfessionalBtn}
              onClick={handleSeeMore}
            >
              See More Professionals
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BidsList;
