import React, { useEffect, useState } from "react";
import styles from "./MatchingLeads.module.css";
import SettingIcon from "../../../../assets/Images/Leads/SettingIcon.svg";
import LocationIcon from "../../../../assets/Images/Leads/WhiteLocationIcon.svg";
import FilterIcon from "../../../../assets/Images/Leads/FilterIcon.svg";
import EditIcon from "../../../../assets/Images/Leads/EditIconWhite.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLeadRequestList,
  getLocationLead,
} from "../../../../store/LeadSetting/leadSettingSlice";
import MatchingLeadsFilter from "./MatchingLeadsFilter";

const MatchingLeads = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/leads/settings");
  };
  const dispatch = useDispatch();
  const { leadRequestList, getlocationData } = useSelector(
    (state) => state.leadSetting
  );
  const { userToken } = useSelector((state) => state.auth);
  const data = leadRequestList?.length;

  const uniqueServiceNames = [
    ...new Set(leadRequestList.map((item) => item.category?.name)),
  ];
  console.log(
    leadRequestList,
    data,
    uniqueServiceNames?.length,
    "leadRequestList"
  );

  const locationLength = getlocationData?.length;
  useEffect(() => {
    const location = {
      user_id: userToken?.rember_token,
    };
    dispatch(getLocationLead(location));
  }, []);

  // useEffect(() => {
  //   dispatch(getLeadRequestList());
  // }, []);
  const handleFilterClick = () => {
    setIsFilterModalOpen(true); // 👉 Open modal
  };

  const handleCloseModal = () => {
    setIsFilterModalOpen(false); // 👉 Close modal
  };

  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h2 className={styles.heading}>{data} matching leads</h2>
        <p className={styles.subText}>
          <span className={styles.subTextSpan}>
            <img src={SettingIcon} alt="" /> {uniqueServiceNames?.length}{" "}
            services{" "}
          </span>
          <span className={styles.subTextSpan}>
            <img src={LocationIcon} alt="" /> {locationLength} Location
          </span>
        </p>
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.filterButton} onClick={handleFilterClick}>
          <img src={FilterIcon} alt="" /> Filter
        </button>
        <button className={styles.editButton} onClick={handleEdit}>
          Edit <img src={EditIcon} alt="" />
        </button>
      </div>
      {isFilterModalOpen && <MatchingLeadsFilter onClose={handleCloseModal} />}
    </div>
  );
};

export default MatchingLeads;
