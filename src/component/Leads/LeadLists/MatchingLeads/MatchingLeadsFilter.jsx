import React, { useEffect, useState } from "react";
import styles from "./MatchingLeadsFilter.module.css";
import ArrowUpIcon from "../../../../assets/Icons/arrow-up.svg";
import { getPopularServiceList } from "../../../../store/FindJobs/findJobSlice";
import { useDispatch, useSelector } from "react-redux";
import { getLeadRequestList } from "../../../../store/LeadSetting/leadSettingSlice";
import { showToast } from "../../../../utils";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const AccordionSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={styles.accordion}>
      <div
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <img
          src={ArrowUpIcon}
          alt="Arrow Icon"
          className={`${styles.icon} ${isOpen ? styles.rotated : ""}`}
        />
      </div>
      {isOpen && <div className={styles.accordionBody}>{children}</div>}
    </div>
  );
};

const MatchingLeadsFilter = ({ onClose }) => {
  const dispatch = useDispatch();
  const { popularList } = useSelector((state) => state.findJobs);
  const { userToken } = useSelector((state) => state.auth);
  const { leadRequestLoader } = useSelector((state) => state.leadSetting)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    dispatch(getPopularServiceList());

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [dispatch]);

  // States to manage selected filters
  const [filters, setFilters] = useState({
    keyword: "",
    unread: false,
    leadSpotlights: [],
    buyerActions: [],
    submittedWhen: "",
    selectedServices: [],
    location: "",
    credits: [],
    contactPreferences: [],
  });

  const handleCheckboxChange = (key, value) => {
    setFilters((prev) => {
      const list = prev[key];
      return {
        ...prev,
        [key]: list.includes(value)
          ? list.filter((item) => item !== value)
          : [...list, value],
      };
    });
  };

  const handleRadioChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // const handleApply = () => {
  //   const filterData = {
  //     user_id:userToken?.remember_tokens,
  //     name:"",
  //     lead_time:"",
  //     service_id:"",
  //     distanceFilter:"",
  //     credits:"",
  //   }
  //   dispatch(getLeadRequestList(filterData))
  
  // };
  const handleApply = () => {
    const formData = new FormData();
  
    formData.append("user_id", userToken?.remember_tokens || "");
    formData.append("name", filters.keyword || "");
    formData.append("lead_time", filters.submittedWhen || "");
    formData.append("distanceFilter", filters.location || "");
  
  
    const selectedServiceIds = filters.selectedServices
      .map((serviceName) => {
        const match = popularList.find((s) => s.name === serviceName);
        return match?.id; 
      })
      .filter(Boolean); 
  
    formData.append("service_id", selectedServiceIds.join(","));
  
    
    formData.append("credits", filters.credits.join(","));
    // formData.append("contact_preferences", filters.contactPreferences.join(","));
    formData.append("lead_spotlights", filters.leadSpotlights.join(","));
    // formData.append("buyer_actions", filters.buyerActions.join(","));
    // formData.append("unread", filters.unread ? "true" : "false");
    dispatch(getLeadRequestList(formData)).then((result) => {
      if(result) {
        showToast("success",result?.message)
      }
      onClose()
      setFilters({
        keyword: "",
        submittedWhen: "",
        location: "",
        selectedServices: [],
        credits: [],
        contactPreferences: [],
        leadSpotlights: [],
        buyerActions: [],
        unread: false,
      })
    });
  };
  
  
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Filter</h3>
          <button onClick={onClose} className={styles.closeBtn} disabled={leadRequestLoader}>
            ×
          </button>
        </div>

        <div className={styles.scrollable}>
          {/* Keyword Search */}
          <AccordionSection title="Keyword search">
            <div className={styles.searchRow}>
              <input
                type="text"
                placeholder="Keyword (e.g. name)"
                value={filters.keyword}
                onChange={(e) => handleInputChange("keyword", e.target.value)}
              />
              <button className={styles.searchBtn}>Search</button>
            </div>
          </AccordionSection>

          {/* View */}
          <AccordionSection title="View">
            <label>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={filters.unread}
                onChange={() => handleInputChange("unread", !filters.unread)}
              />{" "}
              Unread (285)
            </label>
          </AccordionSection>

          {/* Lead spotlights */}
          <AccordionSection title="Lead spotlights (226)">
            {[
              // "Be first to respond",
              "Urgent requests",
              "Updated requests",
              "Has additional details",
            ].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={filters.leadSpotlights.includes(item)}
                  onChange={() => handleCheckboxChange("leadSpotlights", item)}
                />{" "}
                {item}
              </label>
            ))}
          </AccordionSection>

          {/* Actions buyer has taken */}
          {/* <AccordionSection title="Actions buyer has taken">
            {[
              "Buyer has re-entered info",
              "Buyer has been online",
              "Buyer has added images",
            ].map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={filters.buyerActions.includes(item)}
                  onChange={() => handleCheckboxChange("buyerActions", item)}
                />{" "}
                {item}
              </label>
            ))}
          </AccordionSection> */}

          {/* When the lead was submitted */}
          <AccordionSection title="When the lead was submitted">
            {[
              "Any time",
              "Today",
              "Yesterday",
              "Last 2-3 days",
              "Last 7 days",
              "Last 14+ days",
            ].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="time"
                  checked={filters.submittedWhen === option}
                  onChange={() => handleRadioChange("submittedWhen", option)}
                />{" "}
                {option}
              </label>
            ))}
          </AccordionSection>

          {/* Services */}
          <AccordionSection title="Services">
            {popularList?.map((service) => (
              <label key={service.name}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={filters.selectedServices.includes(service.name)}
                  onChange={() =>
                    handleCheckboxChange("selectedServices", service.name)
                  }
                />{" "}
                {service.name}
              </label>
            ))}
          </AccordionSection>

          {/* Locations */}
          <AccordionSection title="Locations">
  <label>
    <input
      type="radio"
      name="location"
      checked={filters.location === "All"}
      onChange={() => handleRadioChange("location", "All")}
    />{" "}
    All
  </label>
 
  <label>
    <input
      type="radio"
      name="location"
      checked={filters.location === "150 miles from 01201"}
      onChange={() =>
        handleRadioChange("location", "150 miles from 01201")
      }
    />{" "}
    150 miles from 01201
  </label>
</AccordionSection>

          {/* Credits */}
          <AccordionSection title="Credits">
  {[
    "1-5 Credits",
    "6-10 Credits",
    "11-15 Credits",
    "16-20 Credits",
    "21-25 Credits",
    "26-30 Credits",
  ].map((creditRange) => (
    <label key={creditRange}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        checked={filters.credits.includes(creditRange)}
        onChange={() => handleCheckboxChange("credits", creditRange)}
      />{" "}
      {creditRange}
    </label>
  ))}
</AccordionSection>

          {/* Contact Preferences */}
          {/* <AccordionSection title="Contact preferences">
            {["Email", "Text", "Phone"].map((pref) => (
              <label key={pref}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={filters.contactPreferences.includes(pref)}
                  onChange={() =>
                    handleCheckboxChange("contactPreferences", pref)
                  }
                />{" "}
                {pref}
              </label>
            ))}
          </AccordionSection> */}
        </div>

        {/* Buttons */}
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose} disabled={leadRequestLoader}>
            Cancel
          </button>
          <button className={styles.applyBtn} onClick={handleApply}>
            {leadRequestLoader ? <Spin
                indicator={<LoadingOutlined spin style={{ color: "white" }} />}
              /> : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchingLeadsFilter;
