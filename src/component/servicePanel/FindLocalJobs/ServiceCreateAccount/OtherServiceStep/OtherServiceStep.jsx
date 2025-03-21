import React, { useEffect, useState } from "react";
import styles from "./OtherServiceStep.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserData,
  searchService,
  setRegisterStep,
  setService,
} from "../../../../../store/FindJobs/findJobSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "../../../../../utils";



const OtherServiceStep = ({
  nextStep,
  prevStep,
  handleInputChange,
  formData,
  setFormData,
  
}) => {
  const [Input, setInput] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const item = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { popularList, service, registerLoader, searchServiceLoader } =
    useSelector((state) => state.findJobs);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (Input.trim() !== "") {
        dispatch(searchService({ search: Input }));
      }
    }, 500);

    return () => {
      clearTimeout(delayDebounce);
      dispatch(setService([]));
    };
  }, [Input, dispatch]);

  const handleSelectService = (item) => {
    if (!selectedServices.some((service) => service.id === item.id)) {
      setSelectedServices((prev) => [...prev, item]);
    }
    setInput("");
    dispatch(setService([]));
  };

  const handleRemoveService = (id) => {
    setSelectedServices((prev) => prev.filter((service) => service.id !== id));
  };
  const validateForm = () => {
    let newErrors = {};

    if (selectedServices.length === 0) {
      newErrors.service_id = "Please select at least one service.";
    }

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

  const handleSubmit = () => {
   
    const serviceIds = selectedServices
      .map((service) => service.banner_title)
      .join(", ");
    const payload = {
      ...formData,
      service_id: serviceIds,
      form_status: 1,
      nation_wide: formData.nation_wide ? 1 : 0,
    };
    dispatch(registerUserData(payload))
      .then((result) => {
        if (result?.success) {
          showToast("info", result?.message || "Register successful!");
          navigate("/dashboard");
        } else {
        }
      })
      .catch((error) => {
        // showToast(
        //   "error",
        //   error?.response?.data?.message ||
        //     "An error occurred. Please try again."
        // );
      });
  };
 
  const handleOpenModal = () => {
    if (!validateForm()) return;
    setShow(true);
  };
  const handleCloseModal = () => {
    setShow(false);

    dispatch(setRegisterStep(3));
  };
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h2 className={styles.otherService_heading}>Add other services you can provide</h2>
          <p className={styles.subHeading}>Maximise your leads</p>
        </div>

        <div className={styles.card}>
          <p className={styles.label}>
            You've asked for leads for:{" "}
            <div className={styles.serviceTag}>{item?.serviceTitle
                ?.replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}</div>
          </p>

          <p className={styles.secondaryLabel}>
            We will also show you leads from
          </p>
          <div className={styles.selectedServices}>
            {selectedServices.map((service) => (
              <span key={service.id} className={styles.selectedTag}>
                {service.banner_title}
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemoveService(service.id)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          {/* <div className={styles.searchInputContainer}>
            <input
              className={styles.searchInput}
              placeholder="What service do you provide?"
              onChange={(e) => {
                setInput(e.target.value);
                if (!e.target.value) {
                  dispatch(setService([]));
                }
              }}
              value={Input}
            />

            {service?.length > 0 && (
              <div className={styles.searchResults}>
                {searchServiceLoader ? (
                  <Spin indicator={<LoadingOutlined spin />} />
                ) : (
                  <>
                    {service.map((item) => (
                      <p
                        key={item.id}
                        className={styles.searchItem}
                        onClick={() => handleSelectService(item)}
                      >
                        {item.banner_title}
                      </p>
                    ))}
                  </>
                )}
              </div>
            )}
          </div> */}
          <div className={styles.searchInputContainer}>
            <input
              className={styles.searchInput}
              placeholder="Search for more services..."
              onChange={(e) => {
                setInput(e.target.value);
                if (!e.target.value) {
                  dispatch(setService([]));
                }
              }}
              value={Input}
            />

            {service?.length > 0 && (
              <div className={styles.searchResults}>
                {searchServiceLoader ? (
                  <Spin />
                ) : (
                  <>
                    {service.map((item) => (
                      <p
                        key={item.id}
                        className={styles.searchItem}
                        onClick={() => handleSelectService(item)}
                      >
                        {item.banner_title}
                      </p>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
          {errors.service_id && (
            <p className={styles.errorText}>{errors.service_id}</p>
          )}
          <label className={styles.checkboxContainer}>
            <input
              type="checkbox"
              className={styles.checkbox}
              name="auto_bid"
              checked={formData?.auto_bid === 1}
              onChange={(e) => handleInputChange(e)}
            />
            <span className={styles.labelText}>Auto Bid</span>
          </label>

          <div className={styles.dropdownWrapper}>
            <select
              className={styles.dropdown}
              name="miles2"
              value={formData?.miles2}
              onChange={handleInputChange}
            >
              <option>1 miles</option>
              <option>2 miles</option>
              <option>5 miles</option>
              <option>10 miles</option>
              <option>30 miles</option>
              <option>50 miles</option>
              <option>100 miles</option>
            </select>
            <button className={styles.expandBtn}>Expand Radius</button>
          </div>
          {errors.miles2 && <p className={styles.errorText}>{errors.miles2}</p>}
          <div className={styles.leadInfo_wrapper}>
            <div className={styles.leadInfo}>
              <h1 className={styles.leadCount}>1060</h1>
              <p className={styles.leadText}>current available leads</p>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.backButton}
              onClick={prevStep}
            >
              Back
            </button>
            <button
              type="button"
              className={styles.nextButton}
              onClick={handleOpenModal}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {show && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.heading}>
              Are you sure that you want to leave?
            </h2>
            <p className={styles.description}>
              We're asking a few questions so we can find you the right pros,
              and send you quotes fast and free!
            </p>
            <div className={styles.buttonGroup}>
              <button className={styles.backButton} onClick={handleCloseModal}>
                Back
              </button>
              <button className={styles.continueButton} onClick={handleSubmit}>
                {registerLoader ?  <Spin indicator={<LoadingOutlined spin style={{ color: "primary" }} />} /> :"Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherServiceStep;
