import React, { useState } from "react";
import styles from "./Leads.module.css";
import LeadLists from "./LeadLists/LeadLists";
import LeadSettings from "./LeadSettings/LeadSettings";
import CustomerQuestions from "./LeadSettings/CustomerQuestions";

const LeadSetting = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isRemoved, setIsRemoved] = useState(false); // ✅ NEW STATE
console.log(selectedService,"selectedService")
  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsRemoved(false); // ✅ RESET REMOVE FLAG
  };

  return (
    <>
      <div className={styles.leadsOverlay}>
        <>
          {!selectedService && (
            <div className={styles.leadSettingsTabView}>
              <LeadSettings
                setSelectedService={handleServiceClick} // ⬅️ use updated function
                selectedService={selectedService}
              />
            </div>
          )}
          <div className={styles.leadSettingsOverlay}>
            <LeadSettings
              setSelectedService={handleServiceClick} // ⬅️ use updated function
              selectedService={selectedService}
            />
          </div>

          {selectedService && !isRemoved && (
            <CustomerQuestions
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              setIsRemoved={setIsRemoved} // ✅ PASS PROP
            />
          )}
        </>
      </div>
    </>
  );
};

export default LeadSetting;
