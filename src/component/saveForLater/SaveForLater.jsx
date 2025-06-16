import React, { useEffect, useRef, useState } from "react";
import styles from "./SaveForLater.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddManualBidData,
  getLeadRequestList,
  getSaveLaterListData,
  totalCreditData,
} from "../../store/LeadSetting/leadSettingSlice";
import BlueSmsIcon from "../../assets/Images/Leads/BlueSmsIcon.svg";
import BluePhoneIcon from "../../assets/Images/Leads/BluePhoneIcon.svg";
import VerifiedPhoneIcon from "../../assets/Images/Leads/VerifiedPhoneIcon.svg";
import AdditionalDetailsIcon from "../../assets/Images/Leads/AdditionalDetailsIcon.svg";
import FrequentUserIcon from "../../assets/Images/Leads/FrequentUserIcon.svg";
import { showToast } from "../../utils";
import CustomModal from "../Leads/LeadLists/ConfirmModal";
import viewDetailsArrow from "../../assets/Images/Setting/viewDetailsArrow.svg";
import SavedViewDetails from "./SavedViewDetails/SaveViewDetails";
import FeelingStuckFooter from "../Leads/LeadLists/FeelingStuckFooter/FeelingStuckFooter";
import ContactSuccessModal from "../Leads/LeadLists/ContactSuccessModal";
import ContactConfirmModal from "../Leads/LeadLists/ContactConfirmModal";

const SaveForLater = () => {
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);
  const { userToken } = useSelector((state) => state.auth);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isopen, setIsOpen] = useState(false);
  const [planpurcahse, setPlanPurchase] = useState("");
  const { registerData } = useSelector((state) => state.findJobs);
  const { saveForLaterDataList, manualBidLoader, totalCredit } = useSelector(
    (state) => state.leadSetting
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  console.log(saveForLaterDataList, "saveForLaterDataList");
  useEffect(() => {
    const data = {
      user_id: userToken?.remember_tokens
        ? userToken?.remember_tokens
        : registerData?.remember_tokens,
    };
    dispatch(getSaveLaterListData(data));
  }, []);
const addManualBidData = (item) => {
    console.log(item, "sel");
    const formData = new FormData();
    formData.append("buyer_id", item?.customer_id);
    formData.append(
      "user_id",
      userToken?.remember_tokens
        ? userToken?.remember_tokens
        : registerData?.remember_tokens
    );
    formData.append("bid", item?.credit_score);
    formData.append("lead_id", item?.id);
    formData.append("bidtype", "purchase_leads");
    formData.append("service_id", item?.service_id);
    formData.append("distance", "0");

    dispatch(getAddManualBidData(formData)).then((result) => {
      if (result) {
        showToast("success", result?.message);
        setModalOpen(true);
      }

      const data = {
        user_id: userToken?.remember_tokens
          ? userToken?.remember_tokens
          : registerData?.remember_tokens,
      };

      dispatch(totalCreditData(data));
      // dispatch(getLeadRequestList(data));
    dispatch(getSaveLaterListData(data));
    });
  };
const handleContinue = (item) => {
    if (!item) return;
    console.log(item?.credit_score, totalCredit?.total_credit, "item");
    setSelectedItem(item);
    setPlanPurchase(totalCredit?.plan_purchased);

    // Condition 1: Plan not purchased
    if (totalCredit?.plan_purchased === 0) {
      setIsOpen(true);
      return;
    }
    // Condition 2: Not enough credits
    if (Number(totalCredit?.total_credit) < Number(item?.credit_score)) {
      setIsOpen(true);
      return;
    }
    if (Number(totalCredit?.total_credit) > Number(item?.credit_score)) {
      addManualBidData(item);
      return;
    }

    
  };

  const [clikedDetails, setClickedDetails] = useState({});
  const [viewDetailsOpen, setViewDetaisOpen] = useState(null);

  const handleViewDetais = (item) => {
    setClickedDetails(item);
    if (viewDetailsOpen === item?.id) {
      setViewDetaisOpen(null);
    } else {
      setViewDetaisOpen(item?.id);
    }
  };
   const handleMouseEnter = () => {
    setVisibleCount((prev) => prev + 5);
  };
   const handleOpenClose = (e) => {
    setIsOpen(false);
    if (e) {
      setTimeout(() => {
        setModalOpen(true);
      }, 2000);
    }
  };
// useEffect(() => {
//   const scrollContainer = scrollContainerRef.current;
//   const handleScroll = () => {
//     const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
//     if (scrollTop + clientHeight >= scrollHeight - 100) {
//       setVisibleCount((prev) => prev + 5);
//     }
//   };

//   scrollContainer.addEventListener("scroll", handleScroll);

//   return () => {
//     scrollContainer.removeEventListener("scroll", handleScroll);
//   };
// }, []);
useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= fullHeight - 100) {
      setVisibleCount((prev) => prev + 5);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);



  return (
    <>
      <div className={styles.maincontainer}>
        <div className={styles.scrollContainer} ref={scrollContainerRef}>
          {saveForLaterDataList?.[0]?.savedLeads?.slice(0, visibleCount)?.map((item) => {
            return (
              <>
                <div className={styles.cardParent}>
                  <div className={styles.card}>
                    {/* Left Section - User Info */}
                    <div className={styles.infoContainer}>
                      <div className={styles.userInfo}>
                        <div className={styles.userDetails}>
                          <div className={styles.avatar}>
                            {" "}
                            {item?.customer?.name?.charAt(0).toUpperCase() ||
                              "U"}
                          </div>
                          <div className={styles.details}>
                            <h3>{item?.customer?.name}</h3>
                            <p>{item?.postcode}</p>
                          </div>
                        </div>
                        <span className={styles.category}>
                          {item?.category?.name}
                        </span>
                      </div>
                      <div className={styles.contactContainer}>
                        <div className={styles.contactItem}>
                          <img src={BluePhoneIcon} alt="" />
                          <span>
                            {item?.phone
                              ? `${item?.phone.substring(0, 2)}${"*".repeat(
                                item?.phone.length - 2
                              )}`
                              : "N/A"}
                          </span>
                        </div>
                        <div className={styles.contactItem}>
                          <img src={BlueSmsIcon} alt="" />
                          <span>
                            {item?.customer?.email
                              ? `${item?.customer?.email
                                .split("@")[0]
                                .substring(0, 8)}${"*".repeat(
                                  Math.max(
                                    0,
                                    item?.customer?.email.split("@")[0].length -
                                    8
                                  )
                                )}@${item?.customer?.email.split("@")[1]}`
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle Section - Job Details */}
                    <div className={styles.jobDetails}>
                      <div className={styles.badges}>
                        {item?.is_phone_verified == 1 && (
                          <span className={styles.verified}>
                            <img src={VerifiedPhoneIcon} alt="" />
                            Verified Phone
                          </span>
                        )}
                        {item?.has_additional_details == 1 && (
                          <span className={styles.additional}>
                            {" "}
                            <img src={AdditionalDetailsIcon} alt="" />
                            Additional details
                          </span>
                        )}
                        {item?.is_frequent_user == 1 && (
                          <span className={styles.frequent}>
                            {" "}
                            <img src={FrequentUserIcon} alt="" />
                            Frequent user
                          </span>
                        )}
                        {item?.is_urgent == 1 && (
                          <span className={styles.frequent}>
                            {" "}
                            <img src={FrequentUserIcon} alt="" />
                            Urgent
                          </span>
                        )}
                        {item?.is_high_hiring == 1 && (
                          <span className={styles.frequent}>
                            {" "}
                            <img src={FrequentUserIcon} alt="" />
                            High hiring
                          </span>
                        )}
                      </div>
                      <div className={styles.jobInfo}>
                        {console.log(item?.questions, "item?.questions")}
                        {item?.questions && (
                          <p>
                            {JSON.parse(item?.questions)
                              .map((qa) => qa?.ans)
                              .join("/")}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Section - Lead Purchase */}
                    <div className={styles.leadActions}>
                      <button
                        className={styles.purchaseButton}
                        onClick={() => handleContinue(item)}
                      >
                        Contact 
                        {/* {item?.customer?.name} */}
                      </button>
                      <span className={styles.credits}>
                        {item?.credit_score} Credits
                      </span>
                      <div className={styles.mainText}>
                        {" "}
                        <p>ACT FAST</p>{" "}
                        <span> 10 Professionals</span>{" "}
                        <br /> have viewed this lead
                      </div>
                    </div>
                  </div>
                  <div className={styles.viewDetailsBtnWrapper}>
                    <button
                      className={styles.viewDetailsBtn}
                      onClick={() => handleViewDetais(item)}
                    >
                      View Details{" "}
                      <img
                        src={viewDetailsArrow}
                        alt="..."
                        className={`${styles.arrowIcon} ${viewDetailsOpen == item?.id ? "" : styles.rotated
                          }`}
                      />
                    </button>
                  </div>
                </div>
                {viewDetailsOpen == item?.id && (
                  <SavedViewDetails saveForLaterDataList={item} />
                )}
              </>
            );
          })}
        </div>
         {saveForLaterDataList?.[0]?.savedLeads?.length > visibleCount && (
                    <div className={styles.viewMoreBtnWrapper}>
                      <button onMouseEnter={handleMouseEnter}>View More</button>
                    </div>
                  )}
        <FeelingStuckFooter />
      </div>
      <ContactSuccessModal
              onClose={() => setModalOpen(false)}
              isOpen={isModalOpen}
              details={selectedItem}
            />
            {isopen && (
              <ContactConfirmModal
                onClose={(e) => handleOpenClose(e)}
                enoughCredit={planpurcahse}
                confirmModal={isModalOpen}
                details={selectedItem}
              />
            )}
    </>
  );
};
export default SaveForLater;
