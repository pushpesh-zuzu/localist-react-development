import React, { useEffect } from "react";
import styles from "./MatchingLeads.module.css";
import SettingIcon from "../../../../assets/Images/Leads/SettingIcon.svg";
import LocationIcon from "../../../../assets/Images/Leads/WhiteLocationIcon.svg";
import FilterIcon from "../../../../assets/Images/Leads/FilterIcon.svg";
import EditIcon from "../../../../assets/Images/Leads/EditIconWhite.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLeadRequestList } from "../../../../store/LeadSetting/leadSettingSlice";

const MatchingLeads = () => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/lead-settings");
  };
  const dispatch = useDispatch();
  const { leadRequestList } = useSelector(
    (state) => state.leadSetting
  );
  const data =  leadRequestList?.length
  const uniqueServiceNames = [...new Set(leadRequestList.map(item => item.category?.name))];
  console.log(leadRequestList,data,uniqueServiceNames?.length,"leadRequestList")
  

  // useEffect(() => {
  //   dispatch(getLeadRequestList());
  // }, []);
  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h2 className={styles.heading}>{data} matching leads</h2>
        <p className={styles.subText}>
          <span className={styles.subTextSpan}>
            <img src={SettingIcon} alt="" /> {uniqueServiceNames?.length} services{" "}
          </span>
          <span className={styles.subTextSpan}>
            <img src={LocationIcon} alt="" /> 1 Location
          </span>
        </p>
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.filterButton}>
          <img src={FilterIcon} alt="" /> Filter
        </button>
        <button className={styles.editButton} onClick={handleEdit}>
          Edit <img src={EditIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default MatchingLeads;
