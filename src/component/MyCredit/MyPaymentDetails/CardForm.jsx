
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
import { addBuyCreditApi, AddSellerCardDetailsApi, getInvoiceBillingListApi, getSellerCardApi } from "../../../store/MyProfile/MyCredit/MyCreditSlice";
import { showToast } from "../../../utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import CVVImg from "../../../assets/Images/Setting/CVVImg.svg";
import { getAddManualBidData, getLeadRequestList, totalCreditData } from "../../../store/LeadSetting/leadSettingSlice";

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

const
  CardPaymentForm = ({ onPaymentMethodCreated, onClose, data, topup, closeModal, details,newLeadApi }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { registerData } = useSelector((state) => state.findJobs);
    const { userToken } = useSelector((state) => state.auth)
    const { sellerBillingLoader } = useSelector((state) => state.myCredit);
    console.log(data, "data")
    const item = data?.map((item) => item)[0] || {};
    console.log(item, "ll")

    const addManualBidData = () => {
      console.log(details, "sel")
      const formData = new FormData();
      formData.append("buyer_id", details?.customer_id);
      formData.append("user_id", userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens);
      formData.append("bid", details?.credit_score);
      formData.append("lead_id", details?.id);
      formData.append("bidtype", "purchase_leads");
      formData.append("service_id", details?.service_id);
      formData.append("distance", "0");

      dispatch(getAddManualBidData(formData)).then((result) => {
        if (result) {
          showToast("success", result?.message);
          // onClose(true)
        }

        const data = {
          user_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens,
        };

        dispatch(totalCreditData(data));
        dispatch(getLeadRequestList(data));
      });
    }

    const handleBuyNow = () => {
      console.log(item, "item")


      let credits = item.no_of_leads;

      const vatTotal =
        item?.billing_vat_register === 0
          ? 0
          : Math.floor((item?.price * 20) / 100);

      // ✅ If coupon exists and is percentage-based
      if (typeof addcoupanList === 'string' && addcoupanList.includes('%')) {
        const discountPercent = parseFloat(addcoupanList.replace('%', ''));
        const discountAmount = Math.floor((item.no_of_leads * discountPercent) / 100);

        credits = item.no_of_leads + discountAmount;
      }

      const creditData = {
        amount: item?.price,
        credits: credits,
        details: item?.name,
        total_amount: (item?.price + vatTotal) * 100,
        vat: vatTotal,
        top_up: topup ? 1 : 0,
      };

      console.log(creditData, item?.no_of_leads, credits, vatTotal, 'creditData');
      dispatch(addBuyCreditApi(creditData)).then((result) => {

        if (result?.success) {
          showToast('success', result?.message);
          // setActiveLoaderId(null);
          addManualBidData()
          // onClose(false)
          closeModal()
          dispatch(getInvoiceBillingListApi());
          const data = {
            user_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens,
          };

          dispatch(totalCreditData(data));

        } else if (result?.success === false) {

          // navigate("/payment-details");
          setCreditModal(true)
        }
      });
    };


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
            if(newLeadApi) {

              handleBuyNow()
            }
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
            <div className={styles.cvvInputWrapper}> 
            <CardCvcElement options={ELEMENT_OPTIONS} className={styles.cardInput} />
            <img src={CVVImg} alt="CVV" className={styles.cvvIcon} />
            </div>
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

