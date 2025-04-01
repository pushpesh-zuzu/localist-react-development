import React from "react";
import styles from "./Leads.module.css";
import FeelingStuck from "./FeelingStuck/FeelingStuck";
import MatchingLeads from "./MatchingLeads/MatchingLeads";

const Leads = () => {
  return (
    <>
      <div className={styles.leadsOverlay}>
        <FeelingStuck />
        <MatchingLeads />
      </div>
    </>
  );
};

export default Leads;
