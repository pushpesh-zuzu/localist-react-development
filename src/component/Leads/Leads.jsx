import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./Leads.module.css";
import LeadSettings from "./LeadSettings/LeadSettings";
import CustomerQuestions from "./LeadSettings/CustomerQuestions";
import LeadLists from "./LeadLists/LeadLists";
import { setRegisterStep, clearServiceFormData } from "../../store/FindJobs/findJobSlice";

const Leads = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRegisterStep(0)); 
    dispatch(clearServiceFormData());
  }, []);

  // const [selectedService, setSelectedService] = useState(null);
  // const [LeadOpen,setLeadOpen] = useState(false)yy
  return (
    <>
      <div className={styles.leadsOverlay}>
        <LeadLists />
        {/* {LeadOpen && (
          <>
            <LeadSettings
              setSelectedService={setSelectedService}
              selectedService={selectedService}
            />
            {selectedService && (
              <CustomerQuestions setSelectedService={selectedService} />
            )}
          </>
        )} */}
      </div>
    </>
  );
};

export default Leads;
