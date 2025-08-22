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
  const handleClose = (id) => {
    navigate(`/buyer-close/${id}`)
  }
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
              {req?.status === "hired" ? "" : <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}> <div style={{marginTop:"16px",marginRight:"4px",cursor:"pointer"}} onClick={() => handleClose(req.id)}> Close Request</div> <div
                  className={styles.tags}
                  onClick={() => openHiredModal(req.id)}
                >
                  | Hired Professional
                </div></div>}
              </div>
            ))}
        </div>
      ) : (
        <div className={styles.card}>
          <h3 className={styles.heading}>
         Find Local Services Professionals with Localists
          </h3>
          <p className={styles.text}>Need a better deal on local professional services?</p>
          <p className={styles.text}>
         Localists connect you with trusted local professionals who are specialists in their field —
         <br/> ready to help you and ready to quote.
          </p>
          <p className={styles.text}>
          From landscapers and gardeners to cleaners and builders,
          we find the right expert <br/> for your needs in just a few clicks. 
          </p>
          <p className={styles.lastText}>Get up to 5 quotes from trusted professionals and get the peace of mind you’ve found the best price and professional for your needs - and we’re fast! On average our customers receive 5 quotes from reputable local professionals within 5 days.</p>
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
