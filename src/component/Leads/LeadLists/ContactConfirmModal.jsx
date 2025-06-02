import React, { useEffect } from 'react';
import styles from './ContactConfirmModal.module.css';
import { useNavigate } from "react-router-dom";
import { getCreditPlanList } from '../../../store/LeadSetting/leadSettingSlice';
import { useDispatch, useSelector } from 'react-redux';

const ContactConfirmModal = ({ onClose,enoughCredit, }) => {
 
  const navigate = useNavigate()
const dispatch = useDispatch()
const { creditPlanList } =useSelector((state)=> state.leadSetting)
  const handleNavigate = () => {
    navigate("/mycredits")
  }
  useEffect(()=>{
dispatch(getCreditPlanList())
  },[])
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
      
    }, []);
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
            <button className={styles.buyButton} onClick={handleNavigate}>Buy {item?.no_of_leads} credits</button>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Auto top-up next time
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
