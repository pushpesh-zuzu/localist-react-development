import React, { useEffect, useState } from 'react';
import styles from './ContactConfirmModal.module.css';
import { useNavigate } from "react-router-dom";
import { getCreditPlanList } from '../../../store/LeadSetting/leadSettingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addBuyCreditApi, getInvoiceBillingListApi } from '../../../store/MyProfile/MyCredit/MyCreditSlice';
import { showToast } from '../../../utils';

const ContactConfirmModal = ({ onClose,enoughCredit, }) => {
 
  const navigate = useNavigate()
const dispatch = useDispatch()
const [activeLoaderId, setActiveLoaderId] = useState(null)
const [isChecked, setIsChecked] = useState(false)
const { creditPlanList } =useSelector((state)=> state.leadSetting)
  const handleNavigate = () => {
    navigate("/mycredits")
  }
    const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  useEffect(()=>{
dispatch(getCreditPlanList())
  },[])
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
      
    }, []);


const handleBuyNow = (item) => {
  setActiveLoaderId(item?.id);

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
    top_up: isChecked ? 1 : 0,
  };

  console.log(creditData, item?.no_of_leads, credits, vatTotal, 'creditData');

  dispatch(addBuyCreditApi(creditData)).then((result) => {
    
  if (result?.success) {
    showToast('success', result?.message);
    setActiveLoaderId(null);
    dispatch(getInvoiceBillingListApi());
  } else if (result?.success === false) {
    
    navigate("/payment-details");
  }
});
};

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>{enoughCredit != 0 ? "You need 6 credits to contact Lorna" : "You have not purchased any plan, Please buy credits"}</h2>
      
        <p className={styles.subText}>
          To get some credits, you need to buy a starter pack of credits (Enough for this lead + roughly another 9 leads)
        </p>

        <div className={styles.section}>
          <button className={styles.accordion}>What are credits?</button>
          <div className={styles.panel}>
            <p>
              Credits are Bark’s online currency. If you see a job that you like and you want to get in contact with that
              customer, then you use credits to purchase their contact details (you will receive their personal phone
              number and email address)...
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <button className={styles.accordion}>What is the starter pack?</button>
        </div>

        <div className={styles.section}>
          <button className={styles.accordion}>What is the Get Hired Guarantee?</button>
        </div>
{
  creditPlanList?.map((item) => {
    return(<>
    <div className={styles.offerBox}>
          <div className={styles.offerHeader}>
            {/* <span className={styles.offerBadge}>EXCLUSIVE ONE-TIME OFFER</span> */}
            <span className={styles.discountBadge}>{item?.description}</span>
          </div>

          <div className={styles.creditDetails}>
            <div>
            <p><strong>🔹 {item?.no_of_leads} credits</strong></p>
            <p>Enough for about 10 leads</p>
            </div>
            <div>
            <p><strong>${item?.price}</strong> (Excl. tax)</p>
            <p>${item?.per_credit}/credit</p>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.buyButton} onClick={() => handleBuyNow(item)}>Buy {item?.no_of_leads} credits</button>
            <label className={styles.checkboxLabel}>
               <input
                      type="checkbox"
                     checked={isChecked}
          onChange={handleCheckboxChange} ></input> Auto top-up next time
            </label>
          </div>
        </div>
    </>)
  })
}
        

        <p className={styles.footerNote}>
          You will use 6 of your 70 purchased credits to contact Lorna
        </p>
      </div>
    </div>
  );
};

export default ContactConfirmModal;
