import React, { useEffect, useRef, useState } from "react";
import styles from "./MatchingLeadsFilter.module.css";
import ArrowUpIcon from "../../../../assets/Icons/arrow-up.svg";
import { useDispatch, useSelector } from "react-redux";
import { getfilterListData, getLeadRequestList, } from "../../../../store/LeadSetting/leadSettingSlice";
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
  const { leadRequestLoader, filterListData } = useSelector((state) => state.leadSetting)

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
      if (result) {
        showToast("success", result?.message);
      }
      onClose();
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
      });
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
          {/* <AccordionSection title="View">
            <label>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={filters.unread}
                onChange={() => handleInputChange("unread", !filters.unread)}
              />{" "}
              Unread (285)
            </label>
          </AccordionSection> */}
          <AccordionSection title={"Lead spotlights"}>
            {filterListData?.[0]?.leadSpotlights?.map((item) => (
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
          </AccordionSection>


          {/* Actions buyer has taken */}


          {/* When the lead was submitted */}
          <AccordionSection title="When the lead was submitted">
            {filterListData?.[0]?.leadTime?.map((item) => (
              <div key={item.time}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
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
