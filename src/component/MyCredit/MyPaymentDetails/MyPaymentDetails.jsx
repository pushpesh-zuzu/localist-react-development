import React, { useState } from "react";
import iIcon from "../../../assets/Images/Setting/paymentCard.svg";
import styles from "./MyPaymentDetails.module.css"
import AddCardModal from "./AddCardModal";

const MyPaymentDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const handleOpen = () => {
        setShowModal(true)
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.backText}>← Setting</div>
                <h1 className={styles.heading}>My Saved Card</h1>
                <div className={styles.manageWrapper}>
                    <span className={styles.infoIcon}>
                        <img src={iIcon} alt="iIcon" />
                    </span>
                    <p className={styles.description}>
                        We don't have any payment information for you yet

                    </p>
                </div>
<div className={styles.btnBox}>
    <button className={styles.addCardBtn} onClick={handleOpen}>Click here to add a card</button>
</div>
            </div>
            

{showModal && <AddCardModal onClose={() => setShowModal(false)} />}
        </>
    )
}
export default MyPaymentDetails