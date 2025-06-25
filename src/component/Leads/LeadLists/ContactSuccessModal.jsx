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

const ContactSuccessModal = ({ isOpen, onClose, details, repliesBtn,detail,requestId }) => {
  const dispatch = useDispatch()

  const { registerData } = useSelector((state) => state.findJobs);
  const { userToken } = useSelector((state) => state.auth)
  const userData = userToken?.user_id ? userToken?.user_id : registerData?.id
  console.log(details,"details")
  if (!isOpen) return null;

//   const handleResponseChange = (clickName) => {
//     console.log(clickName, "click")
//     if(requestId) {
//  const responseStatus = {
//     lead_id: repliesBtn?.lead_id,
//       seller_id: repliesBtn?.id,
//       buyer_id: userToken?.id
//         ? userToken?.id
//         : registerData?.id,

//       type: null,
//     };
//     } else {
//        const responseStatus = {
//     lead_id: details?.id ? details?.id : detail?.id ? detail?.id : repliesBtn?.lead_id,
//       seller_id:  userData ? userData : repliesBtn?.id,
//       buyer_id: details?.customer_id ? details?.customer_id : detail?.customer_id ? detail?.customer_id : repliesBtn ? userToken?.id
//         ? userToken?.id
//         : registerData?.id :null,

//       type: null,
//     };
//     }
   

//     // if (clickName?.name === "mobile") {
//     //   responseStatus.type = "mobile";
//     // } else if (clickName?.name === "Whatsapp") {
//     //   responseStatus.type = "Whatsapp";
//     // } else if (clickName?.name === "email") {
//     //   responseStatus.type = "email";
//     // } else if (clickName?.name === "sms") {
//     //   responseStatus.type = "sms";
//     // }
//     let url = null;
//     if (clickName?.name === "mobile") {
//       responseStatus.type = "mobile";
//       // const phoneNumber = details?.mobile || detail?.mobile || "";
//       const phoneNumber = details?.phone ? details?.phone : detail?.phone || repliesBtn?.phone;
//       console.log(phoneNumber, "phoneNumber")
//       url = `tel:${phoneNumber}`;
//     } else if (clickName?.name === "Whatsapp") {
//       responseStatus.type = "Whatsapp";
//      const phoneNumber = details?.phone ? details?.phone : detail?.phone || repliesBtn?.phone
//       url = `https://wa.me/${phoneNumber}`;
//     } else if (clickName?.name === "email") {
//       responseStatus.type = "email";
//       const email = details?.email ? details?.email : detail?.email || repliesBtn?.email;
//       url = `mailto:${email}`;
//     } else if (clickName?.name === "sms") {
//       responseStatus.type = "sms";
//        const phoneNumber = details?.phone ? details?.phone : detail?.phone || repliesBtn?.phone
//       url = `sms:${phoneNumber}`;
//     }

//     dispatch(sellerResponseStatusApi(responseStatus)).then((result) => {
//       if (result) {
//         showToast("success", result?.message)
//         if (url) {
//           window.open(url, "_blank");
//         }
//         onClose()
//       }
//     })
//   }
const handleResponseChange = (clickName) => {
  console.log(clickName, "click");

  let responseStatus = {
    lead_id: null,
    seller_id: null,
    buyer_id: null,
    type: null,
    response_type:null
  };

  if (requestId) {
    responseStatus = {
      lead_id: repliesBtn?.lead_id,
      seller_id: repliesBtn?.id,
      buyer_id: userData,
      type: null,
      response_type:"buyer"
    };
  } else {
    responseStatus = {
      lead_id:
        details?.id ||
        detail?.id ||
        repliesBtn?.lead_id,
      seller_id: userData || repliesBtn?.id,
      buyer_id:
        details?.customer_id ||
        detail?.customer_id ||
        (repliesBtn ? (userToken?.id || registerData?.id) : null),
      type: null,
      response_type:"seller"
    };
  }

  let url = null;
  const phoneNumber =
    details?.phone || detail?.phone || repliesBtn?.phone || "";
  const email =
    details?.email || detail?.email || repliesBtn?.email || "";

  if (clickName?.name === "mobile") {
    responseStatus.type = "mobile";
    url = `tel:${phoneNumber}`;
  } else if (clickName?.name === "Whatsapp") {
    responseStatus.type = "Whatsapp";
    url = `https://wa.me/${phoneNumber}`;
  } else if (clickName?.name === "email") {
    responseStatus.type = "email";
    url = `mailto:${email}`;
  } else if (clickName?.name === "sms") {
    responseStatus.type = "sms";
    url = `sms:${phoneNumber}`;
  }

  dispatch(sellerResponseStatusApi(responseStatus)).then((result) => {
    if (result) {
      showToast("success", result?.message);
      if (url) {
        window.open(url, "_blank");
      }
      onClose();
    }
  });
};


  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={onClose}>×</button>

          {/* <h2 className={styles.title}>
            {`Great! Now Contact ${repliesBtn ? repliesBtn?.name : details?.customer?.name}`}
          </h2> */}
                 <h2 className={styles.title}>
  {repliesBtn
    ? `Contact ${repliesBtn?.name ? repliesBtn?.name : detail?.name}`
    : `Great! Now Contact ${details?.customer?.name ? details?.customer?.name : detail?.name}`}
</h2>
          <p className={styles.description}>
            Reference site about Lorem Ipsum, giving information on its <br /> origins, as well as a random Lipsum generator.
          </p>

          <div className={styles.actions}>
            {[
              { label: "Give them a call", name: "mobile", btn: "Phone Number", icon: phoneBtn },
              { label: "Send WhatsApp", name: "Whatsapp", btn: "Send WhatsApp", icon: whatsappBtn },
              { label: "Send an Email", name: "email", btn: "Send Email", icon: Mailbtn },
              { label: "Send an SMS", name: "sms", btn: "Send SMS", icon: smsBtn },
              { label: "Send an estimate", name: "", btn: "Send Estimate", icon: EstimateIcon },
            ]
              .filter(item => !(repliesBtn && item.btn === "Send Estimate"))
              .map((item, idx) => (
                <div key={idx} className={styles.actionItem}>
                  <div className={styles.actionText}>
                    <strong>{item.label}</strong>
                    <p>Reference site about Lorem Ipsum, giving information on its origins.</p>
                  </div>
                  <button className={styles.actionBtn} onClick={() => handleResponseChange(item)}>
                    <img src={item?.icon} alt="..." width={18} height={18} /> {item.btn}
                  </button>
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

// import React, { useRef } from "react";
// import styles from "./ContactSuccessModal.module.css";
// import EstimateIcon from "../../../assets/Images/MyResponse/lucideCalculator.png";

// import Mailbtn from "../../../assets/Images/MyResponse/mail-02.svg";
// import smsBtn from "../../../assets/Images/MyResponse/annotation.svg";
// import phoneBtn from "../../../assets/Images/MyResponse/phone.svg";
// import whatsappBtn from "../../../assets/Images/MyResponse/WhatsappBtn.svg";
// import locallistImgs from "../../../assets/Images/Leads/localistImg.svg";
// import { showToast } from "../../../utils";
// import { sellerResponseStatusApi } from "../../../store/LeadSetting/leadSettingSlice";
// import { useDispatch, useSelector } from "react-redux";

// const ContactSuccessModal = ({ isOpen, onClose, details, repliesBtn, detail }) => {
//   const dispatch = useDispatch();
//   const linkRef = useRef(null); // Hidden link for native actions

//   const { registerData } = useSelector((state) => state.findJobs);
//   const { userToken } = useSelector((state) => state.auth);

//   if (!isOpen) return null;

//   const handleResponseChange = (clickName) => {
//     const phoneNumber = details?.mobile || detail?.mobile || "";
//     const email = details?.email || detail?.email || "example@example.com";

//     let url = null;
//     let type = clickName?.name;

//     if (type === "mobile") url = `tel:${phoneNumber}`;
//     else if (type === "Whatsapp") url = `https://wa.me/${phoneNumber}`;
//     else if (type === "email") url = `mailto:${email}`;
//     else if (type === "sms") url = `sms:${phoneNumber}`;

//     const responseStatus = {
//       lead_id: repliesBtn?.id || detail?.id || details?.id,
//       seller_id: userToken?.remember_tokens || registerData?.remember_tokens,
//       buyer_id: repliesBtn ? (userToken?.id || registerData?.id) : details?.customer_id,
//       type,
//     };

//     dispatch(sellerResponseStatusApi(responseStatus)).then((result) => {
//       if (result) {
//         showToast("success", result?.message);

//         if (linkRef.current && type !== "Whatsapp") {
//           linkRef.current.setAttribute("href", url);
//           linkRef.current.click();

//           // Give user time to cancel, then close modal anyway
//           setTimeout(() => {
//             onClose();
//           }, 1000);
//         } else {
//           // WhatsApp should open in new tab
//           if (url) window.open(url, "_blank");
//           onClose();
//         }
//       }
//     });
//   };

//   return (
//     <>
//       <a ref={linkRef} style={{ display: "none" }} />
//       <div className={styles.overlay}>
//         <div className={styles.modal}>
//           <button className={styles.closeBtn} onClick={onClose}>×</button>

//           <h2 className={styles.title}>
//             {repliesBtn
//               ? `Contact ${repliesBtn?.name ? repliesBtn?.name : detail?.name}`
//               : `Great! Now Contact ${details?.customer?.name ? details?.customer?.name : detail?.name}`}
//           </h2>

//           <p className={styles.description}>
//             Reference site about Lorem Ipsum, giving information on its <br /> origins, as well as a random Lipsum generator.
//           </p>

//           <div className={styles.actions}>
//             {[
//               { label: "Give them a call", name: "mobile", btn: "Phone Number", icon: phoneBtn },
//               { label: "Send WhatsApp", name: "Whatsapp", btn: "Send WhatsApp", icon: whatsappBtn },
//               { label: "Send an Email", name: "email", btn: "Send Email", icon: Mailbtn },
//               { label: "Send an SMS", name: "sms", btn: "Send SMS", icon: smsBtn },
//               { label: "Send an estimate", name: "", btn: "Send Estimate", icon: EstimateIcon },
//             ]
//               .filter(item => !(repliesBtn && item.btn === "Send Estimate"))
//               .map((item, idx) => (
//                 <div key={idx} className={styles.actionItem}>
//                   <div className={styles.actionText}>
//                     <strong>{item.label}</strong>
//                     <p>Reference site about Lorem Ipsum, giving information on its origins.</p>
//                   </div>
//                   <button className={styles.actionBtn} onClick={() => handleResponseChange(item)}>
//                     <img src={item?.icon} alt="..." width={18} height={18} /> {item.btn}
//                   </button>
//                 </div>
//               ))}
//           </div>

//           <p className={styles.skipLink} onClick={onClose}>Skip, I will contact them later</p>

//           {!repliesBtn && (
//             <div className={styles.footer}>
//               <div className={styles.creditsBox}>
//                 <img src={locallistImgs} alt="..." /> <strong>70 credits</strong>
//               </div>
//               <div className={styles.guarantee}>
//                 Covered by our <strong>Get Hired Guarantee</strong><br />
//                 If you're not hired during the starter pack, we'll return all the credits.
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactSuccessModal;
