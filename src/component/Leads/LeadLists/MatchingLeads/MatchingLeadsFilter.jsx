import React, { useEffect, useState } from "react";
import styles from "./MatchingLeadsFilter.module.css";
import ArrowUpIcon from "../../../../assets/Icons/arrow-up.svg";

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
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
              <input type="text" placeholder="Keyword (e.g. name)" />
              <button className={styles.searchBtn}>Search</button>
            </div>
          </AccordionSection>

          {/* View */}
          <AccordionSection title="View">
            <label>
              <input type="checkbox" className={styles.checkboxInput} /> Unread
              (285)
            </label>
          </AccordionSection>

          {/* Lead spotlights */}
          <AccordionSection title="Lead spotlights (226)">
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkboxInput} /> All
              lead spotlights (226)
            </label>
            <div className={styles.subCheckboxes}>
              <label>
                <input type="checkbox" className={styles.checkboxInput} />
                Be first to respond (118)
              </label>
              <label>
                <input type="checkbox" className={styles.checkboxInput} />{" "}
                Urgent requests (129)
              </label>
              <label>
                <input type="checkbox" className={styles.checkboxInput} />{" "}
                Updated requests (3)
              </label>
              <label>
                <input type="checkbox" className={styles.checkboxInput} /> Has
                additional details (209)
              </label>
            </div>
          </AccordionSection>

          {/* Actions buyer has taken */}
          <AccordionSection title="Actions buyer has taken">
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkboxInput} /> Buyer
              has taken an action (0)
            </label>
            <div className={styles.subCheckboxes}>
              <label>
                <input type="checkbox" className={styles.checkboxInput} /> Buyer
                has re-entered info (6)
              </label>
              <label>
                <input type="checkbox" className={styles.checkboxInput} /> Buyer
                has been online (8)
              </label>
              <label>
                <input type="checkbox" className={styles.checkboxInput} /> Buyer
                has added images (2)
              </label>
            </div>
          </AccordionSection>

          {/* When the lead was submitted */}
          <AccordionSection title="When the lead was submitted">
            <label>
              <input type="radio" name="time" /> Any time
            </label>
            <label>
              <input type="radio" name="time" /> Today (2)
            </label>
            <label>
              <input type="radio" name="time" /> Yesterday (10)
            </label>
            <label>
              <input type="radio" name="time" /> Last 2-3 days (22)
            </label>
            <label>
              <input type="radio" name="time" /> Last 7 days (30)
            </label>
            <label>
              <input type="radio" name="time" /> Last 14+ days (204)
            </label>
          </AccordionSection>

          {/* Services */}
          <AccordionSection title="Services">
            <label>
              <input type="checkbox" className={styles.checkboxInput} /> House
              Cleaning (52)
            </label>
            <label>
              <input type="checkbox" className={styles.checkboxInput} /> Deep
              Cleaning Services (12)
            </label>
            <label>
              <input type="checkbox" className={styles.checkboxInput} />{" "}
              Post-Tenancy Cleaning (10)
            </label>
          </AccordionSection>

          {/* Locations */}
          <AccordionSection title="Locations">
            <label>
              <input type="radio" name="location" /> 10 miles from SS21
            </label>
          </AccordionSection>

          {/* Credits */}
          <AccordionSection title="Credits">
            {[...Array(12).keys()].map((i) => (
              <label key={i}>
                <input type="checkbox" className={styles.checkboxInput} />{" "}
                {i + 2} Credits ({Math.floor(Math.random() * 20)})
              </label>
            ))}
          </AccordionSection>

          {/* Contact Preferences */}
          <AccordionSection title="Contact preferences">
            <label>
              <input type="checkbox" className={styles.checkboxInput} /> Email
              (70)
            </label>
            <label>
              <input type="checkbox" className={styles.checkboxInput} /> Text
              (31)
            </label>
            <label>
              <input type="checkbox" className={styles.checkboxInput} /> Phone
              (21)
            </label>
          </AccordionSection>
        </div>

        {/* Buttons */}
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.applyBtn}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default MatchingLeadsFilter;
