import { useEffect, useState } from "react";
import styles from "./CreditCard.module.css";
import visaImg from "../../../assets/Images/Setting/Visa.svg";
import { useDispatch, useSelector } from "react-redux";
import { getSellerCardApi } from "../../../store/MyProfile/MyCredit/MyCreditSlice";
import AddCardModal from "../MyPaymentDetails/AddCardModal";

const CreditCard = () => {
  const [isopen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { getSellerCardData } = useSelector((state) => state.myCredit);

  useEffect(() => {
    dispatch(getSellerCardApi());
  }, []);

  const handleAddCard = () => {
    setIsOpen(true);
  };

  const handleChangeModal = () => {
    setIsOpen(true);
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
          <div className={styles.container}>
            <div className={styles.visaCard_wrapper}>
              <div className={styles.visaCard}>
                <img src={visaImg} alt="Visa" />
                <div>
                  We'll charge the card ending *
                  {String(getSellerCardData[0].card_number)?.slice(-4)} that we
                  have on file
                </div>
              </div>
              <div className={styles.rightText} onClick={handleChangeModal}>
                {" "}
                Change
              </div>
            </div>
          </div>
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
                Add Card
              </span>
            </div>
          </>
        )}
      </div>

      {isopen && <AddCardModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default CreditCard;
