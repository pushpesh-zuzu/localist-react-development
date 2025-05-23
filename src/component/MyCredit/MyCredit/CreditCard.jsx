import React from "react";
import styles from "./CreditCard.module.css";
import visaImg from "../../../assets/Images/Setting/Visa.svg";


const  CreditCard = () => {
    return (
        <>
        <div className={styles.container}>
            <div className={styles.visaCard}>
                <img src={visaImg} alt="Visa" />
                
            <div>Buy more credits and get a bigger discount</div>
            </div>
            <div className={styles.rightText}>Add  |  Change  |  Remove</div>
        </div>
        </>
    )
}
export default CreditCard;