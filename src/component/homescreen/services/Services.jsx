// Services.jsx

import styles from "./services.module.css";
import leftArrow from "../../../assets/Images/backwordArrow.svg";
import rightArrow from "../../../assets/Images/forwordArrow.svg";
import SpecificService from "./SpecificService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllServiceList } from "../../../store/FindJobs/findJobSlice";
import SliderComponent from "./SilderComponent";


const formatTitle = (title) => {
  if (!title || typeof title !== "string") return null; // 🛡️ Safety check

  const parts = title.split("&");
  const parts1 = title.split("and");

  if (parts.length > 1) {
    return (
      <h4 className={styles.categoryTitleText}>
        {parts[0]} <span className={styles.blackText}>&</span> {parts[1]}
      </h4>
    );
  }
    else if (parts1.length > 1) {
    return (
      <h4 className={styles.categoryTitleText}>
        {parts1[0]} <span className={styles.blackText}>and</span> {parts1[1]}
      </h4>
    );
  }
  
  else {
    return (
      <span className={styles.categoryTitleText}>{parts[0]}</span>
    );
  }
};

const Services = () => {
  const { allServiceList } = useSelector((state) => state.findJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllServiceList());
  }, [dispatch]);

  return (
    <>
      <div className={styles.container1}>
        {allServiceList?.map(
          (category, categoryIndex) =>
            category?.subcategory.length > 0 && (
              <div style={{paddingBottom:category?.subcategory.length-1 && '0px'}} key={categoryIndex} className={styles.container}>
                <h2 className={styles.heading}>{formatTitle(category.name)}</h2>
                <SliderComponent
                  subcategory={category?.subcategory}
                  categoryName={category.name}
                />
              </div>
            )
        )}
      </div>
    </>
  );
};

export default Services;
