
import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import styles from "../MyCredit.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AddSellerCardDetailsApi, getSellerCardApi } from "../../../store/MyProfile/MyCredit/MyCreditSlice";
import { showToast } from "../../../utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import CVVImg from "../../../assets/Images/Setting/CVVImg.svg";

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      "::placeholder": { color: "#aab7c4" },
    },
    invalid: { color: "#fa755a" },
  },
};

const CardPaymentForm = ({ onPaymentMethodCreated, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { sellerBillingLoader } = useSelector((state) => state.myCredit);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      const card = paymentMethod.card;

      const data = {
        card_number: card?.last4,
        expiry_date: `${card?.exp_month}/${card?.exp_year}`,
        cvc: "xxx", 
        stripe_payment_method_id: paymentMethod?.id

      };

      dispatch(AddSellerCardDetailsApi(data)).then((result) => {
        if (result) {
          showToast("success", result?.message);
          onClose();
          dispatch(getSellerCardApi());
        }
      });

      onPaymentMethodCreated(paymentMethod.id);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Add card details</h2>

      <div className={styles.field}>
        <label className={styles.label}>Card Number</label>
        <CardNumberElement options={ELEMENT_OPTIONS} className={styles.cardInput} />
      </div>

      <div className={styles.row}>
        <div className={styles.halfField}>
          <label className={styles.label}>Expiry Date</label>
          <CardExpiryElement options={ELEMENT_OPTIONS} className={styles.cardInput} />
        </div>
        <div className={styles.halfField}>
          <label className={styles.label}>CVC</label>
          <img src={CVVImg} alt="CVV" className={styles.cvvIcon} />
          <CardCvcElement options={ELEMENT_OPTIONS} className={styles.cardInput} />
        </div>
      </div>
<div>
      {error && <div className={styles.error}>{error}</div>}
</div>
      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={onClose}>
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!stripe || loading}
        >
          {sellerBillingLoader ? <Spin
                                indicator={<LoadingOutlined spin style={{ color: "white" }} />}
                            /> : "Add card details"}
        </button>
      </div>
    </form>
  );
};

export default CardPaymentForm;

