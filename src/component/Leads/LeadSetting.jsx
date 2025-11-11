import { useState } from "react";
import styles from "./Leads.module.css";
import LeadSettings from "./LeadSettings/LeadSettings";
import CustomerQuestions from "./LeadSettings/CustomerQuestions";

const LeadSetting = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isRemoved, setIsRemoved] = useState(false);
  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsRemoved(false);
  };

  return (
    <>
      <div className={styles.leadsOverlay}>
        <>
          {/* {!selectedService && (
            <div className={styles.leadSettingsTabView}>
              <LeadSettings
                setSelectedService={handleServiceClick}
                selectedService={selectedService}
              />
            </div>
          )} */}
          <div className={styles.leadSettingsOverlay}>
            <LeadSettings
              setSelectedService={handleServiceClick}
              selectedService={selectedService}
            />
          </div>

          {selectedService && !isRemoved && (
            <CustomerQuestions
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              setIsRemoved={setIsRemoved}
            />
          )}
        </>
      </div>
    </>
  );
};

export default LeadSetting;
