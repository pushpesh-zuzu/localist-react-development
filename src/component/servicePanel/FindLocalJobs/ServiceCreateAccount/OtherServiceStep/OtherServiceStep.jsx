import React, { useEffect, useState } from "react";
import styles from "./OtherServiceStep.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUserData,
  searchService,
  setService,
} from "../../../../../store/FindJobs/findJobSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "../../../../../utils";

const OtherServiceStep = ({ handleInputChange, formData, setFormData }) => {
  const [Input, setInput] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const item = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { popularList, service, popularLoader, searchServiceLoader } =
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

  const handleSubmit = () => {
    const serviceIds = selectedServices
      .map((service) => service.banner_title)
      .join(", ");
    const payload = { ...formData, service_id: serviceIds, form_status: 1 };
    dispatch(registerUserData(payload))
      .then((result) => {
        if (result?.success) {
          showToast("info", result?.message || "Register successful!");
          navigate("/login");
        } else {
        }
      })
      .catch((error) => {
        console.log(error, "resu");
        showToast(
          "error",
          error?.response?.data?.message ||
            "An error occurred. Please try again."
        );
      });
  };
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h2 className={styles.heading}>Add other services you can provide</h2>
          <p className={styles.subHeading}>Maximise your leads</p>
        </div>

        <div className={styles.card}>
          <p className={styles.label}>
            You've asked for leads for:{" "}
            <div className={styles.serviceTag}>{item?.serviceTitle}</div>
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
          <div className={styles.leadInfo_wrapper}>
            <div className={styles.leadInfo}>
              <h1 className={styles.leadCount}>1060</h1>
              <p className={styles.leadText}>current available leads</p>
            </div>

            <button className={styles.nextBtn} onClick={handleSubmit}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherServiceStep;
