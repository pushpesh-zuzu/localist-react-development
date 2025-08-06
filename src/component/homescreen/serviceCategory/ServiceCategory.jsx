import { useEffect, useState } from "react";
import { SERVICE_CATEGORIES } from "../../../constant/Homepage";
import styles from "./serviceCategory.module.css";
import SingleCategory from "./SingleCategory";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllServiceList,
  getCategoriesList,
} from "../../../store/FindJobs/findJobSlice";
import BuyerRegistration from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";
import { Spin } from "antd";

const ServiceCategory = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState({
    id: null,
    name: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const {
    CategoriesList,
    categoriesListLoader,
    allServiceList,
    popularLoader,
  } = useSelector((state) => state.findJobs);
  useEffect(() => {
    // dispatch (getCategoriesList())
    dispatch(getAllServiceList());
  }, []);
  console.log("allServiceList", allServiceList);

  const handleCategoryClick = (id, name) => {
    window.scrollTo(0, 0);
    setSelectedServiceId({ id, name }); // Save the selected category info
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setSelectedServiceId({ id: null, name: "" });
  };

  return (
    <div class="w-full mx-auto flex flex-col bg-[var(--primary-color)] text-center justify-center items-center">
      <div className={styles.servicesInnerContainer}>
        <h2
          className="text-[20px] leading-[30px] mb-4 font-normal text-[color:var(--text-color)]
                    md:text-[22px] md:leading-[33px] sm:mb-6
                    md:mb-[22px]
                    lg:text-[35px] lg:leading-[45px] lg:mb-10"
        >
          View Our{" "}
          <span className="font-bold text-white">Service Categories</span>
        </h2>
        {popularLoader ? (
          <Spin style={{ color: "white" }} />
        ) : (
          <div className={styles.ServiceCategory}>
            {allServiceList?.slice(0, 6)?.map((category, index) => (
              <SingleCategory
                key={index}
                category={category}
                onClick={() => handleCategoryClick(category.id, category.name)}
              />
            ))}
          </div>
        )}
      </div>
      {openModal && (userToken?.active_status == 2 || !userToken) && (
        <BuyerRegistration
          closeModal={handleClose}
          serviceId={selectedServiceId?.id}
          serviceName={selectedServiceId.name}
        />
      )}
    </div>
  );
};

export default ServiceCategory;
