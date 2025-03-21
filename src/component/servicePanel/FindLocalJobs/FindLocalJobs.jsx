import React, { useEffect, useState } from "react";
import styles from "./FindLocalJobs.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getPopularServiceList,
  searchService,
  setSelectedServiceId,
  setService,
} from "../../../store/FindJobs/findJobSlice";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { generateSlug } from "../../../utils";
import { Spin } from "antd";

const FindLocalJobs = () => {
  const [Input, setInput] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const dispatch = useDispatch();
  const { popularList, service, popularLoader, searchServiceLoader } =
    useSelector((state) => state.findJobs);
  const navigate = useNavigate();
  const handleServiceClick = (service) => {
    const slug = generateSlug(service.banner_title);
    dispatch(setSelectedServiceId(service.id));
    navigate(`/sellers/create-account/${slug}`);
  };
  useEffect(() => {
    dispatch(getPopularServiceList());
    return () => dispatch(setService([]));
  }, []);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (Input.trim() !== "") {
        dispatch(searchService({ search: Input }));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [Input, dispatch]);
  const handleSelectService = (item) => {
    setInput(item.banner_title);
    setSelectedService(item);
  };
  const handleGetStarted = () => {
    if (selectedService) {
      const slug = generateSlug(selectedService.banner_title);
      dispatch(setSelectedServiceId(selectedService.id));
      navigate(`/sellers/create-account/${slug}`);
    }
  };
  return (
    <div className={styles.container}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <h1>
          Find Local Jobs For <br />
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
              if (!e.target.value) {
                dispatch(setService([]));
              }
              setSelectedService(null);
            }}
            value={Input}
          />

          {service?.length > 0 && (
            <div className={styles.searchResults}>
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
                      {item.banner_title}
                    </p>
                  ))}
                </>
              )}
            </div>
          )}

          <button onClick={handleGetStarted}>Get started</button>
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <h3>Popular services</h3>
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
                  src={`${service?.baseurl}/${service?.category_icon}`}
                  alt={service.title}
                />
                <span>{service.banner_title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindLocalJobs;
