import React from "react";
import styles from "./Leads.module.css";
import FeelingStuck from "./FeelingStuck/FeelingStuck";
import MatchingLeads from "./MatchingLeads/MatchingLeads";
import LeadSettings from "./LeadSettings/LeadSettings";

const Leads = () => {
  return (
    <>
      <div className={styles.leadsOverlay}>
        <LeadSettings />
        {/* <FeelingStuck />
        <MatchingLeads /> */}
      </div>
    </>
  );
};

export default Leads;
