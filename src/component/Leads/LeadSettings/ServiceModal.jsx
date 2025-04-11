import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getleadPreferencesList } from "../../../store/LeadSetting/leadSettingSlice";
import styles from "./ServiceModal.module.css";

const ServiceSelectionModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedServices,
  setSelectedServices,
}) => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const { preferenceList } = useSelector((state) => state.leadSetting);

  useEffect(() => {
    const data = {
      user_id:
        userToken?.active_status === 1
          ? userToken?.remember_tokens
          : registerData?.remember_tokens,
    };
    dispatch(getleadPreferencesList(data));
  }, []);

  const services =
    preferenceList?.map((service) => ({
      label: service.name,
      value: service.id,
    })) || [];

  const handleToggle = (value) => {
    if (selectedServices.includes(value)) {
      setSelectedServices(selectedServices.filter((v) => v !== value));
    } else {
      setSelectedServices([...selectedServices, value]);
    }
  };

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
                checked={selectedServices.includes(service.value)}
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
          <button className={styles.saveBtn} onClick={onConfirm}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelectionModal;
