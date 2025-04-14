import React from "react";
import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./AddServiceModal.module.css"; // Make sure this file exists or create it

const AddServiceModal = ({
  isModalOpen,
  setIsModalOpen,
  input,
  setInput,
  isDropdownOpen,
  setIsDropdownOpen,
  service = [],
  searchServiceLoader = false,
  handleSelectService,
  handleSubmitData,
}) => {
  return (
    <Modal
      title="Add a New Service"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleSubmitData}
    >
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="e.g. Personal Trainers, House Cleaning"
          className={styles.fullWidthInput}
          onChange={(e) => {
            setInput(e.target.value);
            setIsDropdownOpen(!!e.target.value);
          }}
          value={input}
        />

        {isDropdownOpen && service?.length > 0 && (
          <div className={styles.searchResults}>
            {searchServiceLoader ? (
              <Spin indicator={<LoadingOutlined spin />} />
            ) : (
              service.map((item) => (
                <p
                  key={item.id}
                  className={styles.searchItem}
                  onClick={() => handleSelectService(item)}
                >
                  {item.name}
                </p>
              ))
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddServiceModal;
