import { useState } from "react";
import { SERVICE_CATEGORIES } from "../../../constant/Homepage";
import styles from "./serviceCategory.module.css";
import SingleCategory from "./SingleCategory";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const ServiceCategory = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate("/sellers/create/")
    window.scrollTo(0, 0);
    // if (categoryName === "Home & Garden") {
    //   setOpenModal(true);
    // }
  };

  return (
    <div className={styles.ServiceCategoryContainer}>
      <div className={styles.servicesInnerContainer}>
        <h2 className={styles.ServiceCategoryheading}>
          View Our <span>Service Categories</span>
        </h2>
        <div className={styles.ServiceCategory}>
          {SERVICE_CATEGORIES.map((category, index) => (
            <SingleCategory
              key={index}
              category={category}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
      </div>

      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <h2>Home & Garden Services</h2>
          <p>Here you can explore all home and garden services.</p>
        </Modal>
      )}
    </div>
  );
};

export default ServiceCategory;
