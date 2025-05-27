import React, { useEffect, useState } from "react";
import iIcon from "../../../assets/Images/Setting/paymentCard.svg";
import styles from "./MyPaymentDetails.module.css"
import AddCardModal from "./AddCardModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSellerCardApi } from "../../../store/MyProfile/MyCredit/MyCreditSlice";

const MyPaymentDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getSellerCardData } = useSelector((state) => state.myCredit)

    useEffect(() => {
        // if (getSellerCardData?.length) {
            dispatch(getSellerCardApi())
        // }
    }, [])
    const handleOpen = () => {
        setShowModal(true)
    }
    const handleBack = () => {
        navigate("/settings");
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.backText} onClick={handleBack}>← Setting</div>
                <h1 className={styles.heading}>My Saved Card</h1>
                <div className={styles.manageWrapper}>
                    <span className={styles.infoIcon}>
                        <img src={iIcon} alt="iIcon" />
                    </span>
                    <p className={styles.description}>
                        We don't have any payment information for you yet

                    </p>
                </div>
                {getSellerCardData?.map((item, index) => {
                    const maskedCardNumber = `•••• •••• •••• ${item?.card_number?.slice(-4)}`;
                    const expiryRaw = item?.expiry_date || "";
                    const formattedExpiry = expiryRaw.length === 4
                        ? `${expiryRaw.slice(0, 2)}/${expiryRaw.slice(2)}`
                        : "";

                    return (
                        <div key={index} className={styles.cardWrapper}>
                            <div className={styles.card}>
                                <div className={styles.cardTop}>
                                    <span className={styles.cardBrand}>VISA</span>
                                    <span className={styles.cardChange} onClick={handleOpen}>Change</span>
                                </div>
                                <div className={styles.cardNumber}>
                                    {maskedCardNumber}
                                </div>
                                <div className={styles.cardExpiry}>{formattedExpiry}</div>
                            </div>
                        </div>
                    );
                })}


                {getSellerCardData?.length === 0 && <div className={styles.btnBox}>
                    <button className={styles.addCardBtn} onClick={handleOpen}>Click here to add a card</button>
                </div>}
            </div>


            {showModal && <AddCardModal onClose={() => setShowModal(false)} />}
        </>
    )
}
export default MyPaymentDetails