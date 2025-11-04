import { useEffect, useState } from "react";
import styles from "./serviceCategory.module.css";
import SingleCategory from "./SingleCategory";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllServiceList } from "../../../store/FindJobs/findJobSlice";
import BuyerRegistration from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";
import { Spin } from "antd";

const ServiceCategory = () => {
  const [openModal, setOpenModal] = useState(false);
  const [initialLoader, setInitialLoader] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState({
    id: null,
    name: "",
  });
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const { allServiceList, popularLoader } = useSelector(
    (state) => state.findJobs
  );

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (!allServiceList || allServiceList.length === 0)
    ) {
      dispatch(getAllServiceList());
    } else {
      setInitialLoader(false);
    }
  }, []);

  const handleCategoryClick = (id, name) => {
    window.scrollTo(0, 0);
    setSelectedServiceId({ id, name });
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setSelectedServiceId({ id: null, name: "" });
  };

  return (
    <div className={styles.ServiceCategoryContainer}>
      <div className={styles.servicesInnerContainer}>
        <h2 className={styles.ServiceCategoryheading}>
          View Our <span>Service Categories</span>
        </h2>
        {popularLoader ? (
          <Spin style={{ color: "white" }} />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              maxWidth: "fit-content",
              margin: "auto",
            }}
          >
            {allServiceList?.slice(0, 1)?.map((category, index) => (
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
