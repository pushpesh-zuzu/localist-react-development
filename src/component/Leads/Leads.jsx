import React, { useState } from "react";
import styles from "./Leads.module.css";
import FeelingStuck from "./FeelingStuck/FeelingStuck";
import MatchingLeads from "./MatchingLeads/MatchingLeads";
import LeadSettings from "./LeadSettings/LeadSettings";
import CustomerQuestions from "./LeadSettings/CustomerQuestions";

const Leads = () => {
  const [selectedService, setSelectedService] = useState(null);
  return (
    <>
      <div className={styles.leadsOverlay}>
        <LeadSettings
          setSelectedService={setSelectedService}
          selectedService={selectedService}
        />
        {selectedService && <CustomerQuestions />}
        {/* <FeelingStuck />
        <MatchingLeads /> */}
      </div>
    </>
  );
};

export default Leads;
