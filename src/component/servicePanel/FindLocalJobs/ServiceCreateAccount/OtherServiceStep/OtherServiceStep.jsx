import React, { useEffect, useState } from "react";
import styles from "./OtherServiceStep.module.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUserData, searchService, setService } from "../../../../../store/FindJobs/findJobSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const OtherServiceStep = ({handleInputChange,formData,setFormData }) => {
  const [Input, setInput] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const item = useParams()

  const dispatch = useDispatch();
  const { popularList, service, popularLoader, searchServiceLoader } = useSelector((state) => state.findJobs);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (Input.trim() !== "") {
        dispatch(searchService({ search: Input }));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [Input, dispatch]);

  const handleSelectService = (item) => {
  
    if (!selectedServices.some((service) => service.id === item.id)) {
      setSelectedServices((prev) => [...prev, item]);
    }
    setInput(""); // ✅ Input clear kar de
    dispatch(setService([])); // ✅ Search result ko clear karein
  };

  const handleRemoveService = (id) => {
    setSelectedServices((prev) => prev.filter((service) => service.id !== id));
  };
 

  const handleSubmit = () => {
    const serviceIds = selectedServices.map(service => service.banner_title).join(", ");
    const payload = { ...formData,service_id: serviceIds }
    dispatch(registerUserData(payload))
  }
  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Add other services you can provide</h2>
        <p className={styles.subtitle}>Maximise your leads</p>

        <div className={styles.card}>
          <p className={styles.label}>
            You've asked for leads for:{" "}
            <span className={styles.serviceTag}>{item?.serviceTitle}</span>
          </p>

          <p className={styles.secondaryLabel}>We will also show you leads from</p>
          <div className={styles.selectedServices}>
            {selectedServices.map((service) => (
              <span key={service.id} className={styles.selectedTag}>
                {service.banner_title}
                <button className={styles.removeBtn} onClick={() => handleRemoveService(service.id)}>✕</button>
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
            Auto Bid
          </label>

          <div className={styles.dropdownWrapper}>
             <select className={styles.dropdown}   name="miles2"
                          value={formData?.miles2}
                          onChange={handleInputChange}>
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

          <div className={styles.leadInfo}>
            <span className={styles.leadCount}>1060</span>
            <span className={styles.leadText}>current available leads</span>
          </div>

          <button className={styles.nextBtn} onClick={handleSubmit}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default OtherServiceStep;
