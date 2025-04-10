import React from "react";
import { Modal, Button } from "antd";

const RemoveServiceModal = ({ open, onCancel, onConfirm }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <div style={{ textAlign: "start", padding: "20px 0" }}>
        <h3>Are you sure you want to remove this service?</h3>
        <div style={{ marginTop: 24, display: "flex", justifyContent: "end", gap: "12px" }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button danger type="primary" onClick={onConfirm}>
            Remove
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveServiceModal;
