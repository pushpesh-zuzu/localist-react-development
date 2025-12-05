import React, { useEffect, useRef, useState } from "react";
import styles from "./ArchiveLeads.module.css";
import { useDispatch, useSelector } from "react-redux";

import BlueSmsIcon from "../../assets/Images/Leads/BlueSmsIcon.svg";
import BluePhoneIcon from "../../assets/Images/Leads/BluePhoneIcon.svg";
import VerifiedPhoneIcon from "../../assets/Images/Leads/VerifiedPhoneIcon.svg";
import AdditionalDetailsIcon from "../../assets/Images/Leads/AdditionalDetailsIcon.svg";
import FrequentUserIcon from "../../assets/Images/Leads/FrequentUserIcon.svg";
import viewDetailsArrow from "../../assets/Images/Setting/viewDetailsArrow.svg";
import { getArchivedLeads } from "../../store/LeadSetting/leadSettingSlice";
import SavedViewDetails from "../saveForLater/SavedViewDetails/SaveViewDetails";

const ArchiveLeads = () => {
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(5);

  const [viewDetailsOpen, setViewDetaisOpen] = useState(null);

  const { archivedLeads } = useSelector((state) => state?.leadSetting);
  console.log(archivedLeads, "item");

  useEffect(() => {
    dispatch(getArchivedLeads(archivedLeads));
  }, [dispatch]);

  const handleViewDetais = (item) => {
    if (viewDetailsOpen === item?.id) {
      setViewDetaisOpen(null);
    } else {
      setViewDetaisOpen(item?.id);
    }
  };

  const handleMouseEnter = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <>
      {/* {requestData?.length === 0 && (
        <div className={styles.noDataContainer}>
          <h2>No Archived Leads Available</h2>
        </div>
      )} */}

      {archivedLeads?.slice(0, visibleCount)?.map((item) => {
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
                        {item?.customer?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className={styles.details}>
                        <h3>
                          {item?.customer?.name
                            ? item.customer.name
                                .split(" ")[0]
                                .charAt(0)
                                .toUpperCase() +
                              item.customer.name
                                .split(" ")[0]
                                .slice(1)
                                .toLowerCase()
                            : ""}
                        </h3>

                        <p>{item?.postcode?.split(" ")[0]}</p>
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
                          ? `+44${item?.phone.substring(0, 2)}${"*".repeat(
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
                              .substring(0, 2)}${"*".repeat(
                              Math.max(
                                0,
                                item?.customer?.email.split("@")[0].length - 2
                              )
                            )}@${item?.customer?.email.split("@")[1]}`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle Section - Job Details */}
                <div className={styles.jobDetails}>
                  <div className={styles.highlightText}>Highlights :</div>
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
                  </button>
                  <span className={styles.credits}>
                    {item?.credit_score} Credits
                  </span>

                  <div className={styles.mainText}>
                    <div>ACT FAST</div>{" "}
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
                    className={`${styles.arrowIcon} ${
                      viewDetailsOpen == item?.id ? "" : styles.rotated
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

      {archivedLeads?.length > visibleCount && (
        <div className={styles.viewMoreBtnWrapper}>
          <button onMouseEnter={handleMouseEnter}>View More</button>
        </div>
      )}
    </>
  );
};

export default ArchiveLeads;
