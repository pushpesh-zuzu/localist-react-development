import React from "react";
import styles from "./Leads.module.css";
import FeelingStuck from "./FeelingStuck/FeelingStuck";
import MatchingLeads from "./MatchingLeads/MatchingLeads";
import LeadSettings from "./LeadSettings/LeadSettings";
import CustomerQuestions from "./LeadSettings/CustomerQuestions";

const Leads = () => {
  return (
    <>
      <div className={styles.leadsOverlay}>
        <LeadSettings />
        <CustomerQuestions />
        {/* <FeelingStuck />
        <MatchingLeads /> */}
      </div>
    </>
  );
};

export default Leads;
