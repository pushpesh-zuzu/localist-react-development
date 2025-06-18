import React, { useEffect, useRef } from "react";
import styles from "./LeadLists.module.css";
import FeelingStuck from "./FeelingStuck/FeelingStuck";
import MatchingLeads from "./MatchingLeads/MatchingLeads";
import LeadsCards from "./LeadsCards/LeadsCards";
import FeelingStuckFooter from "./FeelingStuckFooter/FeelingStuckFooter";
import CreditMatch from "./CreditMatch/CreditMatch";

const LeadLists = () => {
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      window.location.reload(); // Refresh the page after 1 minute of inactivity
    }, 60000); // 60,000 ms = 1 minute
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click'];

    // Attach event listeners
    events.forEach(event => window.addEventListener(event, resetTimer));

    // Set initial timer
    resetTimer();

    // Cleanup listeners on unmount
    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={styles.leadListsContainer}>
      {/* <FeelingStuck /> */}
      <CreditMatch />
      <MatchingLeads />
      <LeadsCards />
      <FeelingStuckFooter />
    </div>
  );
};

export default LeadLists;
