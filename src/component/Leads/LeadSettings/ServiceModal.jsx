import React, { useEffect } from "react";
import { Modal, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getleadPreferencesList } from "../../../store/LeadSetting/leadSettingSlice";

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

  // 🔁 Convert preferenceList into [{ label, value }]
  const services = preferenceList?.map((service) => ({
    label: service.name,
    value: service.id,
  })) || [];

  const handleChange = (checkedValues) => {
    setSelectedServices(checkedValues);
  };
  
  return (
    <Modal title="Select Services" open={isOpen} onCancel={onClose} onOk={onConfirm}>
      <Checkbox.Group
        options={services}
        value={selectedServices}
        onChange={handleChange}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      />
    </Modal>
  );
};

export default ServiceSelectionModal;
