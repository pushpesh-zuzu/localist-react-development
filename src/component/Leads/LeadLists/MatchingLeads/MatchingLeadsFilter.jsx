import React, { useEffect, useState } from "react";
import styles from "./MatchingLeadsFilter.module.css";
import ArrowUpIcon from "../../../../assets/Icons/arrow-up.svg";
import { getPopularServiceList } from "../../../../store/FindJobs/findJobSlice";
import { useDispatch, useSelector } from "react-redux";

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

  const handleApply = () => {
    console.log("Filters to send to API:", filters);
    // yahan API call kar sakte ho
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Filter</h3>
          <button onClick={onClose} className={styles.closeBtn}>
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
              "Be first to respond",
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
          <AccordionSection title="Actions buyer has taken">
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
          </AccordionSection>

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
                checked={filters.location === "10 miles from SS21"}
                onChange={() =>
                  handleRadioChange("location", "10 miles from SS21")
                }
              />{" "}
              10 miles from SS21
            </label>
          </AccordionSection>

          {/* Credits */}
          <AccordionSection title="Credits">
            {[...Array(12).keys()].map((i) => {
              const credit = `${i + 2} Credits`;
              return (
                <label key={credit}>
                  <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    checked={filters.credits.includes(credit)}
                    onChange={() => handleCheckboxChange("credits", credit)}
                  />{" "}
                  {credit}
                </label>
              );
            })}
          </AccordionSection>

          {/* Contact Preferences */}
          <AccordionSection title="Contact preferences">
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
          </AccordionSection>
        </div>

        {/* Buttons */}
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.applyBtn} onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchingLeadsFilter;
