import React, { useEffect } from "react"
import styles from "./ContactSuccessModal.module.css"
import EstimateIcon from "../../../assets/Images/MyResponse/lucideCalculator.png";

import Mailbtn from "../../../assets/Images/MyResponse/mail-02.svg";
import smsBtn from "../../../assets/Images/MyResponse/annotation.svg";
import phoneBtn from "../../../assets/Images/MyResponse/phone.svg";
import whatsappBtn from "../../../assets/Images/MyResponse/WhatsappBtn.svg";
import locallistImgs from "../../../assets/Images/Leads/localistImg.svg";
import { showToast } from "../../../utils";
import { sellerResponseStatusApi } from "../../../store/LeadSetting/leadSettingSlice";
import { useDispatch, useSelector } from "react-redux";

const ContactSuccessModal = ({ isOpen, onClose,details,repliesBtn }) => {
    const dispatch =useDispatch()
    
     const { registerData } = useSelector((state) => state.findJobs);
  const { userToken } = useSelector((state) => state.auth)
    console.log(details,repliesBtn,"details")
    if (!isOpen) return null;
   
       const handleResponseChange = (clickName) => {
        console.log(clickName,"click")
          const responseStatus = {
            lead_id: details?.id,
            seller_id: userToken?.remember_tokens
              ? userToken?.remember_tokens
              : registerData?.remember_tokens,
            buyer_id: details?.customer_id,
      
            type: null,
          };
      
          if (clickName?.name === "mobile") {
            responseStatus.type = "mobile";
          } else if (clickName?.name === "Whatsapp") {
            responseStatus.type = "Whatsapp";
          } else if (clickName?.name === "email") {
            responseStatus.type = "email";
          } else if (clickName?.name === "sms") {
            responseStatus.type = "sms";
          }
      
          dispatch(sellerResponseStatusApi(responseStatus)).then((result) => {
            if (result) {
              showToast("success", result?.message)
            onClose()
        }}) }
        
    return(
        <>
          <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        <h2 className={styles.title}>
          Great! Now Contact Isabella
        </h2>
        <p className={styles.description}>
          Reference site about Lorem Ipsum, giving information on its <br/> origins, as well as a random Lipsum generator.
        </p>

        <div className={styles.actions}>
          {[
            { label: "Give them a call",name:"mobile", btn: "Phone Number",icon:phoneBtn },
            { label: "Send WhatsApp",name:"Whatsapp", btn: "Send WhatsApp", icon:whatsappBtn },
            { label: "Send an Email", name:"email", btn: "Send Email",icon:Mailbtn },
            { label: "Send an SMS",name:"sms", btn: "Send SMS",icon:smsBtn },
            { label: "Send an estimate",name:"", btn: "Send Estimate",icon:EstimateIcon },
          ].map((item, idx) => (
            <div key={idx} className={styles.actionItem}>
              <div className={styles.actionText}>
                <strong>{item.label}</strong>
                <p>Reference site about Lorem Ipsum, giving information on its origins.</p>
              </div>
              <button className={styles.actionBtn} onClick={()=> handleResponseChange(item)}>{<img src={item?.icon} alt="..." width={18} height={18}/>} {item.btn}</button>
            </div>
          ))}
        </div>

        <p className={styles.skipLink} onClick={onClose}>Skip, I will contact them later</p>

        {!repliesBtn && <div className={styles.footer}>
          <div className={styles.creditsBox}>
            <img src={locallistImgs} alt="..." /> <strong>70 credits</strong>
          </div>
          <div className={styles.guarantee}>
            Covered by our <strong>Get Hired Guarantee</strong><br />
            If you're not hired during the starter pack, we'll return all the credits.
          </div>
        </div>}
      </div>
    </div>
        </>
    )
}
export default ContactSuccessModal