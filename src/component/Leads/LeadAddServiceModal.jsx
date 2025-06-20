import React, { useState } from "react";
import styles from "./AddServiceModal.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import iIcon from "../../assets/Images/iIcon.svg";
import { useSelector } from "react-redux";

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
  selectedServices,
  handleRemoveService,
}) => {
  const { popularList } = useSelector((state) => state.findJobs);

  if (!isModalOpen) return null;

  const handleSelect = (item) => {
    handleSelectService(item);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={() => setIsModalOpen(false)}
        >
          ×
        </button>

        <h2 className={styles.title}>Add service</h2>
        <p className={styles.subtitle}>
          <span className={styles.infoIcon}>
            <img src={iIcon} alt="" />
          </span>{" "}
          Type the name of your service to start searching our thousands of
          available services.
        </p>

        <label className={styles.label}>Service</label>
        <input
          type="text"
          placeholder="Start typing to find services..."
          className={styles.input}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsDropdownOpen(!!e.target.value);
          }}
        />

        {isDropdownOpen && service?.length > 0 && (
          <div className={styles.dropdown}>
            {searchServiceLoader ? (
              <Spin indicator={<LoadingOutlined spin />} />
            ) : (
              service.map((item) => (
                <p
                  key={item.id}
                  className={styles.dropdownItem}
                  onClick={() => handleSelect(item)}
                >
                  {item.name}
                </p>
              ))
            )}
          </div>
        )}
        <div className={styles.selectedTags}>
          {selectedServices.map((service) => (
            <div key={service.id} className={styles.selectedTag}>
              {service.name}
              <button
                className={styles.removeIcon}
                onClick={() => handleRemoveService(service.id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <div className={styles.suggestions}>
          <label className={styles.label}>Suggestions</label>
          <p className={styles.suggestionText}>
            We suggest the following services for you. Click to add:
          </p>
          <div className={styles.tags}>
            {popularList?.map((item, idx) => (
              <span
                key={idx}
                className={styles.tag}
                onClick={() => handleSelect(item)}
              >
                + {item.name}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button className={styles.submitButton} onClick={handleSubmitData}>
            Add Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
