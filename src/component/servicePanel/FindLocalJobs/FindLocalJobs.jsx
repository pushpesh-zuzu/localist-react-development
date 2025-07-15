import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./FindLocalJobs.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularServiceList,
  searchService,
  setRegisterStep,
  setSelectedServiceId,
  setService,
} from "../../../store/FindJobs/findJobSlice";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { generateSlug } from "../../../utils";
import { Spin } from "antd";
import hiring from "../../../assets/Images/ServicePanel/hiring.svg";
import rightArrow from "../../../assets/Images/ServicePanel/rightArrow.svg"
const FindLocalJobs = () => {
  const [Input, setInput] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const { popularList, service, popularLoader, searchServiceLoader } =
    useSelector((state) => state.findJobs);
  const navigate = useNavigate();
  const handleServiceClick = (service) => {
    const slug = generateSlug(service.name);
    dispatch(setSelectedServiceId(service.id));
    navigate(`/sellers/create-account/${slug}`);
  };
  useEffect(() => {
    dispatch(getPopularServiceList());
    return () => {
      dispatch(setService([]));
    };
  }, []);
  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (isDropdownOpen && Input.trim() !== "") {
        dispatch(searchService({ search: Input }));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [Input, dispatch, isDropdownOpen]);
  const isMobile = window.innerWidth <= 480;
  const handleSelectService = useCallback(
    (item) => {
      setInput(item.name);
      setSelectedService(item);
      setIsDropdownOpen(false);
      setTimeout(() => dispatch(setService([])), 100);
    },
    [dispatch]
  );
    useEffect(() => {
      function handleClickOutside(event) {
        if (divRef.current && !divRef.current.contains(event.target)) {
          setIsDropdownOpen(false); // Close the div
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  const handleGetStarted = () => {
    if (selectedService) {
      const slug = generateSlug(selectedService.name);
      dispatch(setSelectedServiceId(selectedService.id));
      navigate(`/sellers/create-account/${slug}`);
    }
  };
  return (
    <div className={styles.container}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <h1>
          Find Local Jobs For 
          Your Business Now
        </h1>
        <p>
          1000’s of local and remote clients are already waiting for your
          services
        </p>
        <div className={styles.searchInputContainer}>
          <input
            className={styles.searchInput}
            placeholder="What service do you provide?"
            onChange={(e) => {
              setInput(e.target.value);
              setIsDropdownOpen(!!e.target.value);
              setSelectedService(null);
            }}
            value={Input}
          />

          {isDropdownOpen && service?.length > 0 && (
            <>
            {/* <div className={styles.hrtop}></div> */}
            <div className={styles.searchResults} ref={divRef}>
              {searchServiceLoader ? (
                <Spin indicator={<LoadingOutlined spin />} />
              ) : (
                <>
                  {" "}
                  {service?.map((item) => (
                    <p
                      key={item.id}
                      className={styles.searchItem}
                      onClick={() => handleSelectService(item)}
                    >
                      {item.name}
                    </p>
                  ))}
                </>
              )}
            </div>
            </>
          )}

          {/* <button onClick={handleGetStarted}>Get started</button> 
          <img src={rightArrow} alt="arrow" /> */}
          <div className={styles.responsiveBtnWrapper}>
  <button
    onClick={handleGetStarted}
    className={styles.getStartedBtn}
  >
    Get started
  </button>

  <img
    src={rightArrow}
    alt="arrow"
    onClick={handleGetStarted}
    className={styles.getStartedArrow}
  />
</div>
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <h2>Popular services</h2>
        {popularLoader ? (
          <Spin
            indicator={<LoadingOutlined spin style={{ color: "primary" }} />}
            className={styles?.loaderDesign}
          />
        ) : (
          <div className={styles.servicesList}>
            {popularList?.map((service, index) => (
              <div
                key={service.id}
                className={styles.serviceItem}
                onClick={() => handleServiceClick(service)}
              >
                <img
                  src={
                    service?.category_icon
                      ? `${service?.baseurl}/${service?.category_icon}`
                      : hiring
                  }
                  alt={service.title}
                />
                <span>{service.name}</span>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindLocalJobs;
