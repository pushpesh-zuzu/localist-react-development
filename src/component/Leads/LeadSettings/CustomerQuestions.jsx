import React, { useEffect, useState } from "react";
import styles from "./CustomerQuestions.module.css";

import CustomerQuestionsImg from "../../../assets/Images/Leads/CustomerQuestionsImg.svg";
import UpArrowIcon from "../../../assets/Images/Leads/UpArrowIcon.svg";
import DownArrowIcon from "../../../assets/Images/Leads/DownArrowIcon.svg";
import LocationIcon from "../../../assets/Images/Leads/LocationIcon.svg";
import TickIcon from "../../../assets/Images/Leads/TickIcon.svg";
import TrashIcon from "../../../assets/Images/Leads/TrashIcon.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  addLocationLead,
  getleadPreferencesList,
  getLocationLead,
  leadPreferences,
  leadPreferencesData,
  removeItemData,
} from "../../../store/LeadSetting/leadSettingSlice";
import { showToast } from "../../../utils";
import { Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import RemoveServiceModal from "../RemoveModal";

const CustomerQuestions = ({ selectedService }) => {
  const dispatch = useDispatch();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setIsRemoved(false);
    }
  }, [selectedService]);

  const {
    leadPreferenceData,
    leadPreferenceLoader,
    getlocationData,
    removeLoader,
  } = useSelector((state) => state.leadSetting);
  const { registerData } = useSelector((state) => state.findJobs);
  const { userToken } = useSelector((state) => state.auth);

  const [locationData, setLocationData] = useState({
    miles1: "",
    postcode: "",
  });

  useEffect(() => {
    if (leadPreferenceData?.length) {
      const initialAnswers = {};
      leadPreferenceData.forEach((item) => {
        if (item.answers) {
          initialAnswers[item.id] = item.answers;
        }
      });
      setSelectedAnswers(initialAnswers);
    }
  }, [leadPreferenceData]);

  const handleSubmitData = () => {
    const questionIds = Object.keys(selectedAnswers);
    const answers = Object.values(selectedAnswers);

    const data = {
      user_id: userToken?.remember_tokens,
      service_id: selectedService?.id,
      question_id: questionIds,
      answers: answers,
    };

    dispatch(leadPreferencesData(data)).then((result) => {
      if (result?.success) {
        showToast("success", result?.message || "Data submitted successfully");
        dispatch(
          leadPreferences({
            user_id: userToken?.remember_tokens,
            service_id: selectedService?.id,
          })
        );
      }
      setSelectedAnswers({});
    });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationSubmit = () => {
    const data = {
      user_id: userToken?.remember_tokens,
      miles: locationData.miles1,
      postcode: locationData.postcode,
      service_id: selectedService?.id,
    };

    dispatch(addLocationLead(data)).then((result) => {
      if (result?.success) {
        dispatch(getLocationLead({ user_id: userToken?.remember_tokens }));
        setIsLocationModalOpen(false);
      }
    });
  };

  const handleRemove = () => {
    const user_id =
      userToken?.active_status === 1
        ? userToken?.remember_tokens
        : registerData?.active_status === 1
        ? registerData?.remember_tokens
        : null;

    if (user_id && selectedService?.id) {
      dispatch(
        removeItemData({ user_id, service_id: selectedService?.id })
      ).then((result) => {
        if (result?.success) {
          showToast(
            "success",
            result?.message || "Service removed successfully"
          );
          setShow(false);
          dispatch(
            getleadPreferencesList({ user_id: userToken?.remember_tokens })
          );
          setIsRemoved(true);
        }
      });
    }
  };

  if (isRemoved) return null;
  const handleRemoveModal = () => {
    setShow(true);
  };
  const onHandleCancel = () => {
    setShow(false);
  };
  return (
    <>
      <div className={styles.modal}>
        <div>
          <div className={styles.header}>
            <h1 className={styles.title}>{selectedService?.name}</h1>
          </div>

          <div className={styles.subHeader}>
            <span className={styles.icon}>
              <img src={CustomerQuestionsImg} alt="" />
            </span>
            Customer questions
          </div>

          <p className={styles.description}>
            Every customer answers this series of questions, allowing you to
            define exactly which type of leads you see.
          </p>

          {leadPreferenceData?.map((item) => {
            const options = item.answer?.split(",") || [];
            const isOpen = openQuestionId === item.id;

            return (
              <div key={item.id} className={styles.questionBox}>
                <p
                  className={styles.questionTitle}
                  onClick={() =>
                    setOpenQuestionId((prev) =>
                      prev === item.id ? null : item.id
                    )
                  }
                >
                  {item.questions}
                  <img
                    src={isOpen ? UpArrowIcon : DownArrowIcon}
                    alt="Toggle Icon"
                    className={styles.arrowIcon}
                  />
                </p>

                <div
                  className={`${styles.options} ${
                    isOpen ? styles.showOptions : ""
                  }`}
                >
                  {options.map((opt) => (
                    <label key={opt} className={styles.option}>
                      <input
                        type="radio"
                        name={`question-${item.id}`}
                        value={opt}
                        checked={selectedAnswers[item.id] === opt}
                        onChange={() =>
                          setSelectedAnswers((prev) => ({
                            ...prev,
                            [item.id]: opt,
                          }))
                        }
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}

          <div className={styles.suggestion}>
            <span>Something missing?</span>
            <a href="#" className={styles.suggestLink}>
              Suggest a question
            </a>
          </div>

          <div
            className={styles.locations}
            onClick={() => setIsLocationModalOpen(true)}
          >
            <span className={styles.locationIcon}>
              <img src={LocationIcon} alt="" /> Your locations
            </span>
            <a href="#" className={styles.addLocation}>
              + Add a location
            </a>
          </div>

          <div className={styles.ranger}>
            {getlocationData?.map((item, idx) => (
              <div className={styles.range} key={idx}>
                <span>
                  <img src={TickIcon} alt="" /> Within
                </span>
                <strong>{item?.miles} miles</strong> of{" "}
                <strong>{item?.postcode}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.removeService} onClick={handleRemoveModal}>
            <img src={TrashIcon} alt="" /> Remove this service
          </button>
          <button className={styles.saveButton} onClick={handleSubmitData}>
            {leadPreferenceLoader ? (
              <Spin
                indicator={<LoadingOutlined spin style={{ color: "white" }} />}
              />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>

      <Modal
        title="Add a New Location"
        open={isLocationModalOpen}
        Handle={() => setIsLocationModalOpen(false)}
        onOk={handleLocationSubmit}
      >
        <div className={styles.formGroup}>
          <div
            className={styles.inputGroup}
            style={{ display: "flex", gap: "10px" }}
          >
            <div style={{ flex: 1 }}>
              <span className={styles.fromText}>Miles</span>
              <select
                name="miles1"
                value={locationData.miles1}
                onChange={handleLocationChange}
                style={{ width: "100%", padding: "8px" }}
              >
                {[1, 2, 5, 10, 30, 50, 100].map((mile) => (
                  <option key={mile} value={mile}>
                    {mile}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <span className={styles.fromText}>ZIP Code</span>
              <input
                type="text"
                placeholder="Enter your postcode"
                name="postcode"
                value={locationData.postcode}
                onChange={handleLocationChange}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
          </div>
        </div>
      </Modal>
      {show && (
        <RemoveServiceModal
          open={show}
          onCancel={onHandleCancel}
          onConfirm={handleRemove}
        />
      )}
    </>
  );
};

export default CustomerQuestions;
