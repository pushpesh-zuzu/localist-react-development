import React, { useState } from "react";
import styles from "./Leads.module.css";

import LeadLists from "./LeadLists/LeadLists";
import LeadSettings from "./LeadSettings/LeadSettings";
import CustomerQuestions from "./LeadSettings/CustomerQuestions";

const LeadSetting = () => {
  const [selectedService, setSelectedService] = useState(null);
 
  return (
    <>
      <div className={styles.leadsOverlay}>
          <>
            <LeadSettings
              setSelectedService={setSelectedService}
              selectedService={selectedService}
            />
            {selectedService && (
              <CustomerQuestions setSelectedService={selectedService} />
            )}
          </>
      
      </div>
    </>
  );
};

export default LeadSetting;
