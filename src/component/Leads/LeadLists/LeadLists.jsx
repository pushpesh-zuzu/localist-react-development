import React from "react";
import styles from "./LeadLists.module.css";
import FeelingStuck from "./FeelingStuck/FeelingStuck";
import MatchingLeads from "./MatchingLeads/MatchingLeads";
import LeadsCards from "./LeadsCards/LeadsCards";

const LeadLists = () => {
  return (
    <>
      <div className={styles.leadListsContainer}>
        <FeelingStuck />
        <MatchingLeads />
        <LeadsCards />
      </div>
    </>
  );
};

export default LeadLists;
