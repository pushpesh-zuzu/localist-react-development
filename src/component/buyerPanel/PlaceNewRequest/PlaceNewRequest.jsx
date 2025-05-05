import React, { useEffect, useState } from "react";
import styles from "./PlaceNewRequest.module.css";
import BuyerRegistration from "./BuyerRegistration/BuyerRegistration";
import { useDispatch, useSelector } from "react-redux";
import { getbuyerrequestList } from "../../../store/Buyer/BuyerSlice";
import moment from "moment";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import HiredProfessional from "./BuyerRegistration/HiredProfessional/HiredProfessional";

const PlaceNewRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHiredModalOpen, setIsHiredModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const navigate = useNavigate();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const dispatch = useDispatch();
  const { buyerRequestList, buyerrequestListLoader } = useSelector(
    (state) => state.buyer
  );
console.log("buyerRequestList",buyerRequestList)
  useEffect(() => {
    dispatch(getbuyerrequestList());
  }, []);

  const onViewRequest = (id) => {
    navigate(`/bids-list/${id}`);
  };
  const openHiredModal = (serviceId) => {
    setSelectedServiceId(serviceId);
    setIsHiredModalOpen(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Your <span className={styles.highlight}>requests</span>
        </h2>
        <button className={styles.topButton} onClick={openModal}>
          Place new request
        </button>
      </div>

      {buyerrequestListLoader ? (
        <Spin />
      ) : buyerRequestList?.length > 0 ? (
        <div className={styles.cardsContainer}>
          {[...buyerRequestList]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((req, index) => (
              <div key={index} className={styles.requestcard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{req.category?.name}</h3>
                  <span className={styles.timeAgo}>
                    {moment(req.created_at).fromNow()}
                  </span>
                </div>
                <div
                  className={`${styles.messageBox} ${
                    req.status === "rejected"
                      ? styles.lightRedBox
                      : req.status === "pending"
                      ? styles.lightBlueBox
                      : ""
                  }`}
                >
                  <p>
                    {req.details}{" "}
                    <a href={`mailto:${req.email}`}>{"team@locallists.com"}</a>{" "}
                    for more information.
                  </p>
                </div>
                <div>
                  <button
                    className={styles.viewButton}
                    onClick={() => onViewRequest(req.id)}
                  >
                    View Request
                  </button>
                </div>
              {req?.status === "hired" ? "" :  <div
                  className={styles.tags}
                  onClick={() => openHiredModal(req.id)}
                >
                  Choose Request | I Hired Professional
                </div>}
              </div>
            ))}
        </div>
      ) : (
        <div className={styles.card}>
          <h3 className={styles.heading}>
            Find services for your business on Localists
          </h3>
          <p className={styles.text}>
            Most business could be getting a better deal on the services they
            use day to day <br />
            We got thousands of suppliers ready and waiting to quote.
          </p>
          <p className={styles.text}>
            Find everything from web designers to bookkeepers and telephone
            systems to office stationary
          </p>
          <button className={styles.bottomButton} onClick={openModal}>
            Place new request
          </button>
        </div>
      )}

      {isModalOpen && <BuyerRegistration closeModal={closeModal} />}

      {isHiredModalOpen && (
        <HiredProfessional closeModal={() => setIsHiredModalOpen(false)} serviceId={selectedServiceId}/>
      )}
    </div>
  );
};

export default PlaceNewRequest;
