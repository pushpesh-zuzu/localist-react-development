import React, { useEffect, useState } from 'react';
import styles from './ContactConfirmModal.module.css';
import { useNavigate } from "react-router-dom";
import { getCreditPlanList } from '../../../store/LeadSetting/leadSettingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addBuyCreditApi, getInvoiceBillingListApi } from '../../../store/MyProfile/MyCredit/MyCreditSlice';
import { showToast } from '../../../utils';
import arrowIcons from "../../../assets/Icons/arrow-down.svg"
const dummyCreditPlanList = [
  {
    description: 'Best Value!',
    no_of_leads: 50,
    price: 49.99,
    per_credit: 1.00,
  },
  // {
  //   description: 'Popular Choice',
  //   no_of_leads: 30,
  //   price: 34.99,
  //   per_credit: 1.16,
  // },
];

const ContactConfirmModal = ({ onClose,enoughCredit,confirmModal }) => {
 
  const navigate = useNavigate()
const dispatch = useDispatch()
const [activeLoaderId, setActiveLoaderId] = useState(null)
const [isChecked, setIsChecked] = useState(true)
const { creditPlanList } =useSelector((state)=> state.leadSetting)
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
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
    onClose(true)
    dispatch(getInvoiceBillingListApi());
  } else if (result?.success === false) {
    
    navigate("/payment-details");
  }
});
};

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={()=>onClose()}>×</button>
        <div className={styles.mainBox}>
        <h2>{enoughCredit != 0 ? "You need 6 credits to contact Lorna" : "You have not purchased any plan, Please buy credits"}</h2>
      
        <p className={styles.subText}>
          To get some credits, you need to buy a starter pack of credits (Enough for this lead + roughly another 9 leads)
        </p>
        </div>
        <div>

    <div className={styles.section}>
  <button className={styles.accordion} onClick={() => toggleAccordion(0)}>
    <div className={styles.accordionContent}>
      <span>What are credits?</span>
     <span className={`${styles.arrowIcon} ${activeIndex === 0 ? styles.rotate : ''}`}>
  <img src={arrowIcons} alt="arrow" width={16} height={16} />
</span>
    </div>
  </button>
  {activeIndex === 0 && (
    <div className={styles.panel}>
      <p>
        Credits are Bark’s online currency. If you see a job that you like and you want to get in contact with that
        customer, then you use credits to purchase their contact details...
      </p>
    </div>
  )}
</div>

<div className={styles.section}>
  <button className={styles.accordion} onClick={() => toggleAccordion(1)}>
    <div className={styles.accordionContent}>
      <span>What is the starter pack?</span>
     <span className={`${styles.arrowIcon} ${activeIndex === 1 ? styles.rotate : ''}`}>
  <img src={arrowIcons} alt="arrow" width={16} height={16} />
</span>
    </div>
  </button>
  {activeIndex === 1 && (
    <div className={styles.panel}>
      <p>The starter pack is a bundle of credits for new users to try out Bark’s service.</p>
    </div>
  )}
</div>

<div className={styles.section}>
  <button className={styles.accordion} onClick={() => toggleAccordion(2)}>
    <div className={styles.accordionContent}>
      <span>What is the Get Hired Guarantee?</span>
     <span className={`${styles.arrowIcon} ${activeIndex === 2 ? styles.rotate : ''}`}>
  <img src={arrowIcons} alt="arrow" width={16} height={16} />
</span>
    </div>
  </button>
  {activeIndex === 2 && (
    <div className={styles.panel}>
      <p>The Get Hired Guarantee ensures you get hired or receive credit refunds under certain conditions.</p>
    </div>
  )}
</div>


    </div>
{/* {(creditPlanList && creditPlanList.length > 0 ? creditPlanList : dummyCreditPlanList).map((item, index) => (
  <div key={index} className={styles.offerBox}>
    <div className={styles.offerHeader}>
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
      <button className={styles.buyButton} onClick={() => handleBuyNow(item)}>
        Buy {item?.no_of_leads} credits
      </button>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        /> Auto top-up next time
      </label>
    </div>
  </div>
))} */}
{creditPlanList && creditPlanList.length > 0 ? (
  creditPlanList.map((item, index) => (
    <div key={index} className={styles.offerBox}>
      <div className={styles.offerHeader}>
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
        <button className={styles.buyButton} onClick={() => handleBuyNow(item)}>
          Buy {item?.no_of_leads} credits
        </button>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          /> Auto top-up next time
        </label>
      </div>
    </div>
  ))
) : (
  <p className={styles.noPlanText}>No Plan Available</p>
)}

        

        <p className={styles.footerNote}>
          You will use 6 of your 70 purchased credits to contact Lorna
        </p>
      </div>
    </div>
  );
};

export default ContactConfirmModal;
