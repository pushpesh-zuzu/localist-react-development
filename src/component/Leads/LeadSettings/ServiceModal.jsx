import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getleadPreferencesList } from "../../../store/LeadSetting/leadSettingSlice";
import styles from "./ServiceModal.module.css";

const ServiceSelectionModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedServices,
  setSelectedServices,
  isEditing
}) => {
  const dispatch = useDispatch();
  const [allSelectedService, setAllSelectedService] = useState([])
  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const { preferenceList } = useSelector((state) => state.leadSetting);
console.log(selectedServices,"selectedServices")
  useEffect(() => {
    const data = {
      user_id:
        userToken?.active_status === 1
          ? userToken?.remember_tokens
          : registerData?.remember_tokens,
    };
    dispatch(getleadPreferencesList(data));
    // if (isEditing) {
    handleCheckbox()

    // }
  }, []);

  const handleCheckbox = () => {
    const service = selectedServices
      ?.map((item) => item?.id)
      .filter((id) => id != undefined);
    setAllSelectedService(service)
    console.log(service, "-----------");

  }

  const services =
    preferenceList?.map((service) => ({
      label: service.name,
      value: service.id,
    })) || [];

  const handleToggle = (value) => {

    if (allSelectedService.includes((value))) {
      const updatedData = allSelectedService.filter((v) => v != value)
      setAllSelectedService(updatedData);
    } else {
      setAllSelectedService([...allSelectedService, (value)]);
    }
  };
  console.log(services, allSelectedService,"allSelectedService");
useEffect(()=>{
if(!isEditing){
  
  let val=services.map((item)=>{
return item?.value
  })
  setAllSelectedService(val)
}
if(isEditing){
    
  let val=selectedServices.map((item)=>{
    return Number(item?.id)
      })
      setAllSelectedService(val)
}
},[isEditing])
console.log(isEditing,'isEditing')
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Services</h2>
        <p className={styles.subtitle}>
          Select what services you provide in this location
        </p>
        <div className={styles.checkboxList}>
          {services.map((service) => (
            <label key={service.value} className={styles.checkboxItem}>
              <span className={styles.labelText}>{service.label}</span>
              <input
                type="checkbox"
                checked={allSelectedService.includes((service.value))}
                onChange={() => handleToggle(service.value)}
              />
              <span className={styles.customCheckbox}></span>
            </label>
          ))}
        </div>
        <div className={styles.buttonRow}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveBtn} onClick={()=>onConfirm(allSelectedService)}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelectionModal;
