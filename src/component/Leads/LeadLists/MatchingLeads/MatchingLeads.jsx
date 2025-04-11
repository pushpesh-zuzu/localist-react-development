import React from "react";
import styles from "./MatchingLeads.module.css";
import SettingIcon from "../../../../assets/Images/Leads/SettingIcon.svg";
import LocationIcon from "../../../../assets/Images/Leads/WhiteLocationIcon.svg";
import FilterIcon from "../../../../assets/Images/Leads/FilterIcon.svg";
import EditIcon from "../../../../assets/Images/Leads/EditIconWhite.svg";
import { useNavigate } from "react-router-dom";

const MatchingLeads = () => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/leads/settings");
  };
  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h2 className={styles.heading}>1,074 matching leads</h2>
        <p className={styles.subText}>
          <span className={styles.subTextSpan}>
            <img src={SettingIcon} alt="" /> 3 services{" "}
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
