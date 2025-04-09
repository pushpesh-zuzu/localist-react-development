import { useEffect, useState } from "react";
import { SERVICE_CATEGORIES } from "../../../constant/Homepage";
import styles from "./serviceCategory.module.css";
import SingleCategory from "./SingleCategory";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesList } from "../../../store/FindJobs/findJobSlice";
import BuyerRegistration from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";
import { Spin } from "antd";

const ServiceCategory = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState({ id: null, name: "" })
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userToken } = useSelector((state)=> state.auth)
  const { CategoriesList,categoriesListLoader } = useSelector((state) => state.findJobs);
  useEffect(()=>{
dispatch (getCategoriesList())
  },[])

  const handleCategoryClick = (id, name) => {
    window.scrollTo(0, 0);
    setSelectedServiceId({ id, name }); // Save the selected category info
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setSelectedServiceId({ id: null, name: "" });
  }

  return (
    <div className={styles.ServiceCategoryContainer}>
      <div className={styles.servicesInnerContainer}>
        <h2 className={styles.ServiceCategoryheading}>
          View Our <span>Service Categories</span>
        </h2>
      { categoriesListLoader ? <Spin style={{color:"white"}}/> : <div className={styles.ServiceCategory}>
          {CategoriesList?.slice(0, 6)?.map((category, index) => (
            <SingleCategory
              key={index}
              category={category}
              onClick={() => handleCategoryClick(category.id, category.name)}
            />
          ))}
        </div>}
      </div>

      {openModal && (userToken?.active_status == 2 || !userToken )  && (
          <BuyerRegistration closeModal={handleClose} serviceId={selectedServiceId?.id} serviceName={selectedServiceId.name} />
      )}
    </div>
  );
};

export default ServiceCategory;
