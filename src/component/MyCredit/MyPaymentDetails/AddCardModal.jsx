// import React, { useEffect, useState } from "react";
// import styles from "./AddCardModal.module.css";
// import VisaImg from "../../../assets/Images/Setting/VisaImg.svg"
// import MasterImg from "../../../assets/Images/Setting/masterCard.svg"
// import Amex from "../../../assets/Images/Setting/AmericanImg.svg"
// import CVVImg from "../../../assets/Images/Setting/CVVImg.svg"
// import { AddSellerCardDetailsApi } from "../../../store/MyProfile/MyCredit/MyCreditSlice";
// import { useDispatch } from "react-redux";

// const AddCardModal = ({ onClose }) => {
//     const [formData, setFormData] = useState({
//         cardNumber: "",
//         expiryDate: "",
//         cvc: "",
//     });
//     const dispatch = useDispatch();

//     useEffect(() => {
//         document.body.style.overflow = "hidden";
//         return () => {
//             document.body.style.overflow = "auto";
//         };
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = () => {
//         // e.preventDefault();

//         // // Handle submission logic here
//         // console.log(formData);
//         const data = {
//             card_number: formData.cardNumber,
//             expiry_date: formData.expiryDate,
//             cvc: formData.cvc,
//         }
//         dispatch(AddSellerCardDetailsApi(data))


//     };

//     return (
//         <div className={styles.modalOverlay}>
//             <div className={styles.modalContent}>
//                 <button className={styles.closeButton} onClick={onClose}>×</button>
//                 <h2 className={styles.heading}>Add card details</h2>

//                 <div className={styles.form}>
//                     <label className={styles.label}>Card number</label>
//                     <input
//                         type="text"
//                         name="cardNumber"
//                         placeholder="XXXX XXXX XXXX XXXX"
//                         value={formData.cardNumber}
//                         onChange={handleChange}
//                         className={styles.input}
//                     />

//                     <div className={styles.row}>
//                         <div className={styles.inputGroup}>
//                             <label className={styles.label}>Expiry date</label>
//                             <input
//                                 type="text"
//                                 name="expiryDate"
//                                 placeholder="MM / YY"
//                                 value={formData.expiryDate}
//                                 onChange={handleChange}
//                                 className={styles.input}
//                             />
//                         </div>
//                         <div className={styles.inputGroup}>
//                             <label className={styles.label}>CVC</label>
//                             <img src={CVVImg} alt="CVV" className={styles.cvvIcon} />
//                             <input
//                                 type="text"
//                                 name="cvc"
//                                 placeholder="CVC"
//                                 value={formData.cvc}
//                                 onChange={handleChange}
//                                 className={styles.input}
//                             />
//                         </div>
//                     </div>


//                 </div>
//                 <div className={styles.actions}>
//                     <button type="button" className={styles.cancelBtn} onClick={onClose}>
//                         Cancel
//                     </button>
//                     <button type="submit" className={styles.submitBtn} onClick={handleSubmit} >
//                         Add card details
//                     </button>
//                 </div>

//                 <div className={styles.footerNote}>
//                     <div>
//                     <p>
//                         🔒 Your payment is secure <br /> </p>
//                     <span> Your card will be securely stored for future purchases. You can update it in settings at any time.</span>
//                     </div>
//                     <div className={styles.cards}>
//                         <img src={VisaImg} alt="Visa" />
//                         <img src={MasterImg} alt="Mastercard" />
//                         <img src={Amex} alt="Amex" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddCardModal;

import React, { useEffect, useState } from "react";
import styles from "./AddCardModal.module.css";
import VisaImg from "../../../assets/Images/Setting/VisaImg.svg";
import MasterImg from "../../../assets/Images/Setting/masterCard.svg";
import Amex from "../../../assets/Images/Setting/AmericanImg.svg";
import CVVImg from "../../../assets/Images/Setting/CVVImg.svg";
import { AddSellerCardDetailsApi, getSellerCardApi } from "../../../store/MyProfile/MyCredit/MyCreditSlice";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";


import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeProvider from "./StripeProvider";
import CardPaymentForm from "./CardForm";

const AddCardModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        cardNumber: "",
        expiryDate: "",
        cvc: "",
    });

    const dispatch = useDispatch();
    const { sellerBillingLoader } = useSelector((state) => state.myCredit);
//    const stripe = useStripe()

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const stripePromise = loadStripe("pk_test_51RTKiSHBbc2ftHcbzkhVXdd7qUBSYhGTzPUNRxKOgFpV4W4y4tjGN68aBCVRqlD15cokCSL2m4iL9wA0Y16tCLCD00f82XQLrk");
    const options = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        // Fully customizable with appearance API.
        appearance: {
        
        },
      };

const handleSubmit = async(e) => {
   
    e.preventDefault();
}
    // const handleSubmit = (e) => {

    //     const { cardNumber, expiryDate, cvc } = formData;

    //     if (!cardNumber || !expiryDate || !cvc) {
    //         alert("Please fill in all fields.");
    //         return;
    //     }

    //     const data = {
    //         card_number: cardNumber,
    //         expiry_date: expiryDate,
    //         cvc: cvc,
    //     };

    //     dispatch(AddSellerCardDetailsApi(data)).then((result) => {
    //         if (result) {
    //             showToast("success", result?.message);
    //             onClose();
    //             dispatch(getSellerCardApi());
    //         }
    //     })


    // };
    const getPaymentId = async(Id) => {
console.log(Id,"Id")
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                {/* <h2 className={styles.heading}>Add card details</h2> */}

                {/* <form className={styles.form} onSubmit={handleSubmit}> */}
                    {/* <label className={styles.label}>Card number</label>
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className={styles.input}
                    /> */}

                    {/* <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Expiry date</label>
                            <input
                                type="text"
                                name="expiryDate"
                                placeholder="MM / YY"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>CVC</label>
                            <img src={CVVImg} alt="CVV" className={styles.cvvIcon} />
                            <input
                                type="text"
                                name="cvc"
                                placeholder="CVC"
                                value={formData.cvc}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                    </div>  */}
                    {/* <StripeProvider>
                     <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
                     </StripeProvider>*/}
                    {/* <Elements stripe={stripePromise} options={options}>
                 <AddCardWrapper /> 
                 </Elements> */}
                 <StripeProvider>
                    <CardPaymentForm onPaymentMethodCreated={getPaymentId} onClose={onClose}/>
                 </StripeProvider>
                    {/* <div className={styles.actions}>
                        <button type="button" className={styles.cancelBtn} onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.submitBtn}>
                            {sellerBillingLoader ? <Spin
                                indicator={<LoadingOutlined spin style={{ color: "white" }} />}
                            /> : "Add card details"}
                        </button>
                    </div>
                </form> */}

                <div className={styles.footerNote}>
                    <div>
                        <p>🔒 Your payment is secure</p>
                        <span>Your card will be securely stored for future purchases. You can update it in settings at any time.</span>
                    </div>
                    <div className={styles.cards}>
                        <img src={VisaImg} alt="Visa" />
                        <img src={MasterImg} alt="Mastercard" />
                        <img src={Amex} alt="Amex" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCardModal;
