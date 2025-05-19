import React, { useEffect, useRef, useState } from "react";
import styles from "./MatchingLeadsFilter.module.css";
import ArrowUpIcon from "../../../../assets/Icons/arrow-up.svg";
import { useDispatch, useSelector } from "react-redux";
import { getfilterListData, getLeadRequestList, setFilters, } from "../../../../store/LeadSetting/leadSettingSlice";
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
  const { leadRequestLoader, filterListData,filters } = useSelector((state) => state.leadSetting)
  const unReadData = filterListData?.map((item)=> item?.unread)
console.log(filterListData?.map((item)=> item?.unread),"filterListData")
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const data = {
      user_id: userToken?.remember_tokens
    }

    dispatch(getfilterListData(data))

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [dispatch]);

  // const handleCheckboxChange = (key, value) => {
  //   // Create a copy of the current filters
  //   const updatedFilters = { ...filters };
    
  //   // If the array doesn't exist yet, initialize it
  //   if (!Array.isArray(updatedFilters[key])) {
  //     updatedFilters[key] = [];
  //   }
    
  //   // Toggle the value in the array
  //   if (updatedFilters[key].includes(value)) {
  //     updatedFilters[key] = updatedFilters[key].filter(item => item !== value);
  //   } else {
  //     updatedFilters[key] = [...updatedFilters[key], value];
  //   }
    
  //   // Update the filters
  //   dispatch(setFilters(updatedFilters));
  // };
  const handleCheckboxChange = (key, value) => {
    // Create a copy of the current filters
    const updatedFilters = { ...filters };
    
    // If the array doesn't exist yet, initialize it
    if (!Array.isArray(updatedFilters[key])) {
      updatedFilters[key] = [];
    }
    
    // Special handling for "All lead spotlights"
    if (key === "leadSpotlights" && value === "All lead spotlights") {
      if (updatedFilters[key].includes(value)) {
        // If "All lead spotlights" is already selected, deselect everything
        updatedFilters[key] = [];
      } else {
        // If "All lead spotlights" is not selected, select everything
        updatedFilters[key] = filterListData[0]?.leadSpotlights?.map(item => item.spotlight) || [];
      }
    } else if (key === "leadSpotlights") {
      // For individual spotlight items
      if (updatedFilters[key].includes(value)) {
        // Remove this value from selection
        updatedFilters[key] = updatedFilters[key].filter(item => item !== value);
        
        // Also remove "All lead spotlights" if it's selected
        updatedFilters[key] = updatedFilters[key].filter(item => item !== "All lead spotlights");
      } else {
        // Add this value to selection
        updatedFilters[key] = [...updatedFilters[key], value];
        
        // Check if all individual spotlights are now selected
        const allSpotlightsExceptAll = filterListData[0]?.leadSpotlights
          ?.filter(item => item.spotlight !== "All lead spotlights")
          ?.map(item => item.spotlight) || [];
        
        const allSelected = allSpotlightsExceptAll.every(spotlight => 
          updatedFilters[key].includes(spotlight) || spotlight === value
        );
        
        // If all individual spotlights are selected, also select "All lead spotlights"
        if (allSelected && !updatedFilters[key].includes("All lead spotlights")) {
          updatedFilters[key].push("All lead spotlights");
        }
      }
    } else {
      // Original logic for other filter types
      if (updatedFilters[key].includes(value)) {
        updatedFilters[key] = updatedFilters[key].filter(item => item !== value);
      } else {
        updatedFilters[key] = [...updatedFilters[key], value];
      }
    }
    
    // Update the filters
    dispatch(setFilters(updatedFilters));
  };
  
  const handleRadioChange = (key, value) => {
    dispatch(setFilters({
      ...filters,
      [key]: value
    }));
  };
  
  const handleInputChange = (key, value) => {
    dispatch(setFilters({
      ...filters,
      [key]: value
    }));
  };
  const handleApply = () => {
    const formData = new FormData();

    formData.append("user_id", userToken?.remember_tokens || "");
    formData.append("name", filters.keyword || "");
    formData.append("lead_time", filters.submittedWhen || "");
    formData.append("distance_filter", filters.location || "");

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
    formData.append("unread", filters.unread ? 1 : 0);

    dispatch(getLeadRequestList(formData)).then((result) => {
      if (result) {
        showToast("success", result?.message);
      }
      onClose();
     
    });
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.header}>
          <h3>Filter</h3>
          <button
            onClick={onClose}
            className={styles.closeBtn}
            disabled={leadRequestLoader}
          >
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
        
<AccordionSection title={"Lead spotlights"}>
  {/* Make sure the first item is "All lead spotlights" */}
  {filterListData?.[0]?.leadSpotlights?.length > 0 && (
    <>
      {/* Display "All lead spotlights" option first */}
      <div>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold", color: "#000000" }}>
          <input
            type="checkbox"
            checked={filters.leadSpotlights.includes("All lead spotlights")}
            onChange={() => handleCheckboxChange("leadSpotlights", "All lead spotlights")}
          />
          All lead spotlights ({filterListData[0]?.leadSpotlights?.reduce((total, item) => 
            item.spotlight !== "All lead spotlights" ? total + item.count : total, 0)})
        </label>
      </div>
      
      {/* Display all other spotlight options */}
      <div style={{ marginLeft: "32px", marginTop: "4px" }}>
        {filterListData?.[0]?.leadSpotlights
          ?.filter(item => item.spotlight !== "All lead spotlights")
          ?.map((item) => (
            <div key={item.spotlight}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={filters.leadSpotlights.includes(item.spotlight)}
                  onChange={() => handleCheckboxChange("leadSpotlights", item.spotlight)}
                />
                {item.spotlight} ({item.count})
              </label>
            </div>
          ))}
      </div>
    </>
  )}
</AccordionSection>


          {/* Actions buyer has taken */}


          {/* When the lead was submitted */}
          <AccordionSection title="When the lead was submitted">
            {filterListData?.[0]?.leadTime?.map((item) => (
              <div key={item.time}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                  style={{marginTop: "0px" }}
                    type="radio"
                    name="submittedWhen" // radio buttons ko group karne ke liye
                    checked={filters.submittedWhen === item.time}
                    onChange={() => handleRadioChange("submittedWhen", item.time)}
                  />
                  {item.time} ({item.count})
                </label>
              </div>
            ))}
          </AccordionSection>

          {/* Services */}
          <AccordionSection title="Services">
            {filterListData?.[0]?.services
              ?.map((item) => (
                <div key={item.name}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <input
                      type="checkbox"
                      name="submittedWhen" // radio buttons ko group karne ke liye
                      checked={filters.selectedServices.includes(item.name)}
                      onChange={() => handleCheckboxChange("selectedServices", item.name)}
                    />
                    {item.name} ({item.leadcount})
                  </label>
                </div>
              ))}
          </AccordionSection>

          {/* Locations */}
          <AccordionSection title="Locations">
            {/* All Option */}
            <label>
              <input
                  style={{marginTop: "0px" }}
                type="radio"
                name="location"
                checked={filters.location === "All"}
                onChange={() => handleRadioChange("location", "All")}
              />
              All
            </label>

            {/* Dynamic Options from getlocationData */}

            {filterListData?.[0]?.location?.map((item) => (
              <div key={item.time}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                  style={{marginTop: "0px" }}
                    type="radio"
                    name="location" // radio buttons ko group karne ke liye
                    checked={filters.location === `${item.miles} miles from ${item.postcode}`}
                    onChange={() => handleRadioChange("location", `${item.miles} miles from ${item.postcode}`)}
                  />
                  {`${item.miles} miles from ${item.postcode} (${item.leadcount})`}
                </label>
              </div>
            ))}
          </AccordionSection>


          {/* Credits */}
          <AccordionSection title="Credits">
            {filterListData?.[0]?.credits?.map((creditItem) => (
              <label key={creditItem.id}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={filters.credits.includes(creditItem.credits)}
                  onChange={() => handleCheckboxChange("credits", creditItem.credits)}
                />
                {creditItem.credits} ({creditItem?.leadcount})
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
          <button
            className={styles.cancelBtn}
            onClick={onClose}
            disabled={leadRequestLoader}
          >
            Cancel
          </button>
          <button className={styles.applyBtn} onClick={handleApply}>
            {leadRequestLoader ? (
              <Spin
                indicator={<LoadingOutlined spin style={{ color: "white" }} />}
              />
            ) : (
              "Apply"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchingLeadsFilter;
