import React, { useState } from "react";
import styles from "./Leads.module.css";
import LeadSettings from "./LeadSettings/LeadSettings";
import CustomerQuestions from "./LeadSettings/CustomerQuestions";
import LeadLists from "./LeadLists/LeadLists";

const Leads = () => {
  const [selectedService, setSelectedService] = useState(null);
  return (
    <>
      <div className={styles.leadsOverlay}>
        {/* <LeadSettings
          setSelectedService={setSelectedService}
          selectedService={selectedService}
        />
        {selectedService && <CustomerQuestions setSelectedService={selectedService} />} */}
        <LeadLists />
      </div>
    </>
  );
};

export default Leads;
