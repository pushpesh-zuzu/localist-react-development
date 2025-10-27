import React, { useEffect, useState } from "react";
import styles from "./CreditCard.module.css";
import visaImg from "../../../assets/Images/Setting/Visa.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerCardApi,
  removeCardDetailsApi,
  makePrimaryApi,
} from "../../../store/MyProfile/MyCredit/MyCreditSlice";
import AddCardModal from "../MyPaymentDetails/AddCardModal";

const CreditCard = () => {
  const [isopen, setIsOpen] = useState(false);
  const [primaryId, setPrimaryId] = useState(0);
  const dispatch = useDispatch();
  const { getSellerCardData } = useSelector((state) => state.myCredit);
  const cardNumber = getSellerCardData?.map((item) => item?.card_number);

  useEffect(() => {
    dispatch(getSellerCardApi());
  }, []);

  const handleAddCard = () => {
    setIsOpen(true);
  };

  const handleRemoveCard = (data) => {
    dispatch(removeCardDetailsApi({ card_id: data?.id }));
    dispatch(getSellerCardApi());
  };

  const handlePrimaryChange = (data) => {
    dispatch(makePrimaryApi({ card_id: data?.id, user_id: data?.user_id }));
  };

  return (
    <>
      <div
        className={
          !getSellerCardData || getSellerCardData.length < 1
            ? styles.parent_container
            : styles.container_wrapper
        }
      >
        {getSellerCardData && getSellerCardData.length > 0 ? (
          getSellerCardData.map((item, index) => (
            <div className={styles.container}>
              <div className={styles.visaCard_wrapper} key={index}>
                <div className={styles.visaCard}>
                  <img src={visaImg} alt="Visa" />
                  <div>
                    We'll charge the card ending *
                    {String(item.card_number)?.slice(-4)} that we have on file
                  </div>
                  {primaryId == index && <span>Primary</span>}
                </div>

                {/* Uncomment if needed */}

                <div className={styles.remove_actionButtons}>
                  <span
                    onClick={() => {
                      handleRemoveCard(item);
                    }}
                    className={styles.rightText}
                  >
                    Remove
                  </span>
                  {primaryId != index && (
                    <>
                      <span className={styles.separator}>|</span>
                      <span
                        onClick={() => {
                          setPrimaryId(index);
                          handlePrimaryChange(item);
                        }}
                        className={styles.rightText}
                      >
                        Make Primary
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className={styles.visaCard}>
              <img src={visaImg} alt="Visa" />
              <div className={styles.textRight}>
                Buy more credits and get a bigger discount
              </div>
            </div>

            <div className={styles.actionButtons}>
              <span onClick={handleAddCard} className={styles.actionText}>
                Add
              </span>
            </div>
          </>
        )}
      </div>
      <div className={styles.actionButtons}>
        <span onClick={handleAddCard} className={styles.rightText}>
          Add
        </span>
        <span className={styles.separator}>|</span>
        <span onClick={handleRemoveCard} className={styles.rightText}>
          Remove
        </span>
      </div>

      {isopen && <AddCardModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default CreditCard;
