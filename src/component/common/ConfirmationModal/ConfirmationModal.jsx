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
import { createRequestData } from "../../../store/Buyer/BuyerSlice";
import { showToast } from "../../../utils";
// import { showToast } from "../../../../../utils";

const ConfirmationModal = ({ onCancel, handleInputChange, formData,setShowConfirmModal,confirmClose,onConfirm}) => {
  const [Input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const item = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { buyerRequest, requestLoader } = useSelector((state) => state.buyer)
  const { userToken } = useSelector((state)=> state.auth)
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
console.log(buyerRequest,formData,"buyerRequest")
  const handleSubmit = () => {
if (!userToken) {
        const formData = new FormData();
        formData.append("email", buyerRequest?.email);
        formData.append("name", buyerRequest?.name);
        formData.append("phone", buyerRequest?.phone);
        formData.append("service_id", buyerRequest?.service_id);
        formData.append("postcode", buyerRequest?.postcode);
        // formData.append("questions", JSON.stringify(buyerRequest?.questions));
        formData.append("form_status", 0);
        // form_status: 1,
        // formData.append("recevive_online", consent ? 1 : 0);

        dispatch(createRequestData(formData)).then((result) => {
          if (result?.success) {
            showToast("succes", result?.success);
            // setShowConfirmModal(false)
            localStorage.removeItem("barkToken");
        localStorage.removeItem("barkUserToken");
        localStorage.removeItem("registerDataToken");
        localStorage.removeItem("registerTokens");
        localStorage.removeItem("createRequestToken")
            onConfirm()
          }
          // nextStep();
        });
      } else {
        // nextStep();
      }
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
          <button
            className={styles.backButton}
            onClick={onCancel}
            disabled={requestLoader}
          >
            Back
          </button>
          <button className={styles.continueButton} onClick={handleSubmit}>
            {requestLoader ? (
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
