import React, { useEffect, useState } from "react";
import styles from "./CreditCard.module.css";
import visaImg from "../../../assets/Images/Setting/Visa.svg";
import { useDispatch, useSelector } from "react-redux";
import { getSellerCardApi } from "../../../store/MyProfile/MyCredit/MyCreditSlice";
import AddCardModal from "../MyPaymentDetails/AddCardModal";


const CreditCard = () => {
    const [isopen,setIsOpen] = useState(false) 
    const dispatch = useDispatch()
    const { getSellerCardData } = useSelector((state) => state.myCredit)
    const cardNumber = getSellerCardData?.map((item) => item?.card_number)
    
    useEffect(() => {
        dispatch(getSellerCardApi())
    }, [])
    const handleChangeModal = () => {
        setIsOpen(true)
    }
    return (
        <>
            <div className={styles.container}>
                {getSellerCardData?.length ? <>  <div className={styles.visaCard}>
                    <img src={visaImg} alt="Visa" />

                    <div>
                        We'll Change The Card Ending *{cardNumber?.[0]?.slice(-4)} That We Have On File
                    </div>
                </div>
                    <div className={styles.rightText} onClick={handleChangeModal}> Change</div></> :
                    <>
                        <div className={styles.visaCard}>
                            <img src={visaImg} alt="Visa" />

                            <div>Buy more credits and get a bigger discount</div>
                        </div>
                        <div className={styles.rightText}> Add  |   Change  |   Remove</div></>}
            </div>
            {isopen && <AddCardModal onClose={() => setIsOpen(false)} />}
        </>
    )
}
export default CreditCard;