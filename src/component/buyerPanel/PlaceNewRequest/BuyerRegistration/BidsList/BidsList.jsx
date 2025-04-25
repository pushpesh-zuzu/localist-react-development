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
} from "../../../../../store/LeadSetting/leadSettingSlice";
import { BASE_IMAGE_URL, showToast } from "../../../../../utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import DummyImage from "../../../../../assets/Images/DummyImage.svg";
import { Spin } from "antd";
import CustomModal from "../../../../Leads/LeadLists/ConfirmModal";

const BidsList = ({ previousStep }) => {
  const { requestId } = useParams();
  const { autoBidList, bidListLoader, manualBidLoader } = useSelector(
    (state) => state.leadSetting
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5)
  const { userToken } = useSelector((state) => state.auth);
  const { createRequestToken } = useSelector((state) => state.buyer)
   const { searchServiceLoader, service,registerData } = useSelector(
      (state) => state.findJobs
    );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const webdesignData = autoBidList?.map((item) => item?.service_name);
  
  // Get bidcount from API response (assuming it's in the autoBidList[0])
  const bidCount = autoBidList?.[0]?.bidcount || 0;
  
  // Check if we should show green tick and checkbox (only if bidCount is not 5)
  const shouldShowGreenIcons = bidCount !== 5;
  
  // State to track selected checkboxes
  const [selectedSellers, setSelectedSellers] = useState([]);

  // Handle checkbox change
  const handleCheckboxChange = (sellerId) => {
    if (selectedSellers.includes(sellerId)) {
      setSelectedSellers(selectedSellers.filter(id => id !== sellerId));
    } else {
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

  // Pre-select first 5 sellers when data is loaded
  useEffect(() => {
    if (autoBidList?.length > 0 && shouldShowGreenIcons) {
      const firstFiveSellers = autoBidList[0]?.sellers?.slice(0, 5)?.map(seller => seller.id) || [];
      setSelectedSellers(firstFiveSellers);
    } else {
      setSelectedSellers([]);
    }
  }, [autoBidList, shouldShowGreenIcons]);

  const handleReply = () => {
    navigate(`/bids-list/reply/${requestId}`);
  };

  const handleChangeMyRequest = () => {
    navigate("/buyers/create");
  };
  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };
  
  const handleContinue = () => {
    if (!selectedItem) return;
    const formData = new FormData();
    formData.append("user_id", userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens);
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
        dispatch(getAutoBid(data))
      }
    });
  };

  const handleMultple = () => {
    // Use the selected checkboxes instead of just the first 5
    const bidList = autoBidList?.[0]?.sellers?.filter(seller => selectedSellers.includes(seller.id));
    
    if (!bidList || bidList.length === 0) {
      showToast("error", "No best matches selected");
      return;
    }
    
    const multipleData = {
      service_id: bidList.map(item => item?.service_id),
      seller_id: bidList.map(item => item?.id),
      bid: bidList.map(item => item?.credit_score),
      distance: bidList.map(item => item?.distance),
      lead_id: requestId,
      user_id: userToken?.remember_tokens
    }
    
    dispatch(getAddMultipleManualBidData(multipleData)).then((result) => {
      if(result) {
        showToast("success", result?.message);
        const data = {
          user_id: userToken?.remember_tokens,
          lead_id: requestId,
        };
        dispatch(getAutoBid(data))
      }
    })
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
            <div className={styles.recommendBox}>
              <div>
                <span>Recommended:</span> Request replies from your{" "}
                <strong>top matches</strong> to hear back faster
              </div>
              <button className={styles.requestBtn} onClick={handleMultple}>Request your best matches here</button>
            </div> 
          </div>
          <div className={styles.requestMatchBox}>
            <button className={styles.requestBtnMatchBox} onClick={handleMultple}>Request your best matches here</button>
          </div>
          {autoBidList?.length === 0 ? (
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
                           {shouldShowGreenIcons && index < 5 && <img src={GreenTickIcon} alt="" />}
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
                      </div>

                      <p className={styles.description}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry's
                        standard dummy text ever since the 1500s.
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

                    <div className={styles.replyBtnWrapper}>
                      <div className={styles.replyCheckbox}>
                        {shouldShowGreenIcons && index < 5 && (
                          <input 
                            type="checkbox"
                            checked={selectedSellers.includes(seller.id)}
                            onChange={() => handleCheckboxChange(seller.id)}
                            className={styles.checkbox}
                            // Auto-check first 5 items
                            defaultChecked={true}
                          />
                        )}
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
    {autoBidList?.[0]?.sellers?.length > visibleCount && <div className={styles.moreProfessionalBtnBox}>
  <button className={styles.moreProfessionalBtn} onClick={handleSeeMore}>See More Professionals</button>
</div>}
    </div>
     
   </>
  );
};

export default BidsList;