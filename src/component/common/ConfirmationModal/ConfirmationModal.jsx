import React, { useEffect, useState } from "react";
import styles from "./ConfirmationModal.module.css";
import { useDispatch, useSelector } from "react-redux";
// import {
//   registerUserData,
//   searchService,
//   setselectedServices,
//   setService,
// } from "../../../../../store/FindJobs/findJobSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
// import { showToast } from "../../../../../utils";

const ConfirmationModal = ({ prevStep, handleInputChange, formData }) => {
  const [Input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const item = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { service, registerLoader, searchServiceLoader, selectedServices } =
    useSelector((state) => state.findJobs);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (Input.trim() !== "") {
        dispatch(
          searchService({
            search: Input,
            serviceid: formData?.service_id.toString(),
          })
        );
      }
    }, 500);

    return () => {
      clearTimeout(delayDebounce);
      //   dispatch(setService([]));
    };
  }, [Input, dispatch]);

  const handleSelectService = (item) => {
    if (!selectedServices?.some((service) => service.id === item.id)) {
      //   dispatch(setselectedServices([...selectedServices, item]));
    }
    setInput("");
    // dispatch(setService([]));
  };

  //   const handleRemoveService = (id) => {
  //     dispatch(
  //       setselectedServices(
  //         selectedServices?.filter((service) => service.id !== id)
  //       )
  //     );
  //   };
  const validateForm = () => {
    let newErrors = {};

    if (!formData.miles2) {
      newErrors.miles2 = "Please select a distance range.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (selectedServices.length > 0) {
      setErrors((prev) => ({ ...prev, service_id: undefined }));
    }
  }, [selectedServices]);

  useEffect(() => {
    if (show) {
      window.scroll(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  const handleSubmit = () => {
    // Ensure selectedServices is an array and map IDs
    const serviceIds = Array.isArray(selectedServices)
      ? selectedServices?.map((service) => service.id).filter(Boolean) // Remove empty values
      : [];

    // Ensure formData.service_id is an array and clean it
    const existingServiceIds = Array.isArray(formData?.service_id)
      ? formData.service_id.filter(Boolean) // Remove empty values
      : [];

    // Merge both arrays and remove duplicates
    const combinedServiceIds = [
      ...new Set([...existingServiceIds, ...serviceIds]),
    ];

    // Convert array to a comma-separated string
    const serviceCategoryData = combinedServiceIds.join(", ");

    // Create final payload
    const payload = {
      ...formData,
      service_id: serviceCategoryData,
      form_status: 1,
      user_type: 1,
      active_status: 1,
      loggedUser: 1,
      nation_wide: formData.nation_wide ? 1 : 0,
    };

    dispatch(registerUserData(payload)).then((result) => {
      if (result?.success) {
        showToast("success", result?.message || "Register successful!");
        navigate("/settings");
      }
    });
  };

  const handleOpenModal = () => {
    if (!validateForm()) return;
    setShow(true);
  };
  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.heading}>Are you sure that you want to leave?</h2>
        <p className={styles.description}>
          We're asking a few questions so we can find you the right pros, and
          send you quotes fast and free!
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.backButton} onClick={handleCloseModal}>
            Back
          </button>
          <button className={styles.continueButton} onClick={"handleSubmit"}>
            {registerLoader ? (
              <Spin
                indicator={<LoadingOutlined spin style={{ color: "white" }} />}
              />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
