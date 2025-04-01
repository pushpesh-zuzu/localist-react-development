import React from "react";
import styles from "./MatchingLeads.module.css";
import { FilterOutlined, EditOutlined } from "@ant-design/icons";

const MatchingLeads = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h2 className={styles.heading}>1,074 matching leads</h2>
        <p className={styles.subText}>⚬ 3 services ⚬ 1 Location</p>
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.filterButton}>
          <FilterOutlined className={styles.icon} /> Filter
        </button>
        <button className={styles.editButton}>
          Edit <EditOutlined className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default MatchingLeads;
