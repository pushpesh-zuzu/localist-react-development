// import React, { useEffect, useState } from "react";
// import styles from "./CreditModal.module.css";
// import HiredImg from "../../../assets/Images/MyResponse/HiredBtnImg.svg";
// import useWindowHeight from "../../../utils/customHeigth";

// const CreditModal = ({ onClose }) => {
//   const [creditValue, setCreditValue] = useState(400);

//   const handleSliderChange = (e) => {
//     setCreditValue(Number(e.target.value));
//   };
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);
//   const customHeigth = useWindowHeight();
//   const responseEstimate = Math.floor(creditValue / 8); // Example logic
//   const price = (creditValue * 4.4625).toFixed(2); // Example: £1785 for 400 credits
//   // const getSliderBackground = (value, min, max) => {
//   //   const percentage = ((value - min) / (max - min)) * 100;
//   //   return `linear-gradient(to right, #007bff 0%, #007bff ${percentage}%, #e4e4e4 ${percentage}%, #e4e4e4 100%)`;
//   // };
//   const getSliderBackground = (value, min, max) => {
//     const percentage = ((value - min) / (max - min)) * 100;
//     return `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, #e4e4e4 ${percentage}%, #e4e4e4 100%)`;
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div
//         className={styles.modalContent}
//         style={{ height: customHeigth <= 820 ? customHeigth - 20 : "auto" }}
//       >
//         <button className={styles.closeButton} onClick={onClose}>
//           ×
//         </button>
//         <div className={styles.title}>
//           <h2>Flexible Pricing to Grow Your Business</h2>
//           <p className={styles.subtitle}>
//             Choose a credit pack that fits your goals and budget
//           </p>
//         </div>

//         <div className={styles.infoBar}>
//           <span className={styles.credits}>Credits: {creditValue}</span>
//           <span className={styles.responses}>
//             Responses: Approximately {responseEstimate}{" "}
//           </span>
//           <span className={styles.cost}>Cost: £{price} (ex VAT)</span>
//         </div>
//         <div className={styles.adjustText}>
//           Adjust the slider to select the right number of credits for your needs
//         </div>

//         <div className={styles.sliderWrapper}>
//           <input
//             type="range"
//             min="0"
//             max="800"
//             step="200"
//             value={creditValue}
//             onChange={handleSliderChange}
//             className={styles.slider}
//             style={{
//               background: getSliderBackground(creditValue, 0, 800),
//             }}
//           />
//           <div className={styles.sliderMarkers}>
//             <span style={{ left: "3%" }}></span>
//             <span style={{ left: "25%" }}></span>
//             <span style={{ left: "50%" }}></span>
//             <span style={{ left: "75%" }}></span>
//             <span style={{ left: "98%" }}></span>
//           </div>
//         </div>

//         <div className={styles.rangeLabels}>
//           <span>0</span>
//           <span>50</span>
//           <span>100</span>
//           <span>150</span>
//           <span>200</span>
//         </div>

//         <div className={styles.centerBtn}>
//           <button className={styles.buyBtn}>Buy credits</button>
//         </div>
//         <div className={styles.btnbelowText}>
//           Use your credits to connect with high-quality, verified leads in your
//           service area. The more credits you buy, the more targeted
//           opportunities you can unlock.
//         </div>

//         <div className={styles.partnerSection}>
//           <div>
//             <h4>You have been selected for our Partnership Pricing</h4>
//             <p>
//               Speak to our partner success team today to get even more <br />{" "}
//               from your Localists.com membership:
//             </p>
//             <ul>
//               <li>
//                 <img src={HiredImg} alt="hire" /> Win more business
//               </li>
//               <li>
//                 <img src={HiredImg} alt="hire" /> Enjoy priority support and
//                 expert growth advice
//               </li>
//               <li>
//                 <img src={HiredImg} alt="hire" /> Access account optimisation
//                 insights from our team
//               </li>
//             </ul>
//           </div>
//           <button className={styles.callbackBtn}>Request callback</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreditModal;

// import React, { useEffect, useState } from "react";
// import styles from "./CreditModal.module.css";
// import HiredImg from "../../../assets/Images/MyResponse/HiredBtnImg.svg";
// import useWindowHeight from "../../../utils/customHeigth";
// import { addBuyCreditApi } from "../../../store/MyProfile/MyCredit/MyCreditSlice";
// import { totalCreditData } from "../../../store/LeadSetting/leadSettingSlice";
// import { showToast } from "../../../utils";
// import { useSelector } from "react-redux";

// const CreditModal = ({ onClose }) => {
//   const [creditValue, setCreditValue] = useState(50);
//   const { userToken } = useSelector((state) => state.auth);
//   const { registerData } = useSelector((state) => state.findJobs);
//   // Mapping of credits → responses
//   const creditToResponseMap = {
//     50: 950,
//     60: 1140,
//     70: 1330,
//     80: 1520,
//     90: 1710,
//     100: 1900,
//     110: 2090,
//     120: 2280,
//     130: 2470,
//     140: 2660,
//     150: 2850,
//     160: 3040,
//     170: 3230,
//     180: 3420,
//     190: 3610,
//     200: 3800,
//   };

//   const handleSliderChange = (e) => {
//     const value = Number(e.target.value);
//     if (value < 50) {
//       value = 50;
//     }
//     setCreditValue(value);
//   };

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const customHeigth = useWindowHeight();
//   const responseEstimate = creditToResponseMap[creditValue] || 0;
//   const price = Math.trunc(creditValue * 1.45); // Take only integer part

//   const getSliderBackground = (value, min, max) => {
//     const percentage = ((value - min) / (max - min)) * 100;
//     return `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, #e4e4e4 ${percentage}%, #e4e4e4 100%)`;
//   };

//   const handleBuyNow = (item) => {
//     console.log(item, "item");
//     let credits = item.no_of_leads;

//     const vatTotal =
//       item?.billing_vat_register === 0
//         ? 0
//         : Math.floor((item?.price * 20) / 100);

//     // ✅ If coupon exists and is percentage-based
//     if (typeof addcoupanList === "string" && addcoupanList.includes("%")) {
//       const discountPercent = parseFloat(addcoupanList.replace("%", ""));
//       const discountAmount = Math.floor(
//         (item.no_of_leads * discountPercent) / 100
//       );

//       credits = item.no_of_leads + discountAmount;
//     }

//     const creditData = {
//       amount: item?.price,
//       credits: credits,
//       details: item?.name,
//       total_amount: (item?.price + vatTotal) * 100,
//       vat: vatTotal,
//       top_up: autoTopUp ? 1 : 0,
//     };

//     dispatch(addBuyCreditApi(creditData)).then((result) => {
//       if (result?.success) {
//         showToast("success", result?.message);
//         const data = {
//           user_id: userToken?.remember_tokens
//             ? userToken?.remember_tokens
//             : registerData?.remember_tokens,
//         };
//         dispatch(totalCreditData(data));
//       } else if (result?.success === false) {
//         setIsAddModalOpen(true);
//         // navigate("/payment-details");
//       }
//     });
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div
//         className={styles.modalContent}
//         style={{ height: customHeigth <= 820 ? customHeigth - 20 : "auto" }}
//       >
//         <button className={styles.closeButton} onClick={onClose}>
//           ×
//         </button>
//         <div className={styles.title}>
//           <h2>Flexible Pricing to Grow Your Business</h2>
//           <p className={styles.subtitle}>
//             Choose a credit pack that fits your goals and budget
//           </p>
//         </div>

//         <div className={styles.infoBar}>
//           <span className={styles.credits}>Credits: {creditValue}</span>
//           <span className={styles.responses}>
//             Responses: Approximately {responseEstimate}
//           </span>
//           <span className={styles.cost}>Cost: £{price} (ex VAT)</span>
//         </div>

//         <div className={styles.adjustText}>
//           Adjust the slider to select the right number of credits for your needs
//         </div>

//         <div className={styles.sliderWrapper}>
//           <input
//             type="range"
//             min="50" // 50 is minimum selectable value
//             max="200"
//             step="10"
//             value={creditValue}
//             onChange={handleSliderChange}
//             className={styles.slider}
//             style={{
//               background: getSliderBackground(creditValue, 50, 200),
//             }}
//           />
//           <div className={styles.sliderMarkers}>
//             <span style={{ left: "0%" }}></span>
//             <span style={{ left: "25%" }}></span>
//             <span style={{ left: "50%" }}></span>
//             <span style={{ left: "75%" }}></span>
//             <span style={{ left: "100%" }}></span>
//           </div>
//         </div>

//         <div className={styles.rangeLabels}>
//           <span>0</span>
//           <span>50</span>
//           <span>100</span>
//           <span>150</span>
//           <span>200</span>{" "}
//         </div>

//         <div className={styles.centerBtn}>
//           <button
//             className={styles.buyBtn}
//             onClick={(item) => handleBuyNow(item)}
//           >
//             Buy credits
//           </button>
//         </div>
//         <div className={styles.btnbelowText}>
//           Use your credits to connect with high-quality, verified leads in your
//           service area. The more credits you buy, the more targeted
//           opportunities you can unlock.
//         </div>

//         <div className={styles.partnerSection}>
//           <div>
//             <h4>You have been selected for our Partnership Pricing</h4>
//             <p>
//               Speak to our partner success team today to get even more <br />
//               from your Localists.com membership:
//             </p>
//             <ul>
//               <li>
//                 <img src={HiredImg} alt="hire" /> Win more business
//               </li>
//               <li>
//                 <img src={HiredImg} alt="hire" /> Enjoy priority support and
//                 expert growth advice
//               </li>
//               <li>
//                 <img src={HiredImg} alt="hire" /> Access account optimisation
//                 insights from our team
//               </li>
//             </ul>
//           </div>
//           <button className={styles.callbackBtn}>Request callback</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreditModal;

import React, { useEffect, useState } from "react";
import styles from "./CreditModal.module.css";
import HiredImg from "../../../assets/Images/MyResponse/HiredBtnImg.svg";
import useWindowHeight from "../../../utils/customHeigth";
import { addBuyCreditApi } from "../../../store/MyProfile/MyCredit/MyCreditSlice";
import { totalCreditData } from "../../../store/LeadSetting/leadSettingSlice";
import { showToast } from "../../../utils";
import { useSelector, useDispatch } from "react-redux";
import AddCardModal from "../../MyCredit/MyPaymentDetails/AddCardModal";

const CreditModal = ({ onClose }) => {
  const [creditValue, setCreditValue] = useState(50);
  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCreditData, setSelectedCreditData] = useState(null);
  const dispatch = useDispatch();

  // Mapping of credits → responses
  const creditToResponseMap = {
    50: 950,
    60: 1140,
    70: 1330,
    80: 1520,
    90: 1710,
    100: 1900,
    110: 2090,
    120: 2280,
    130: 2470,
    140: 2660,
    150: 2850,
    160: 3040,
    170: 3230,
    180: 3420,
    190: 3610,
    200: 3800,
  };

  // Always reset credit value when modal opens
  useEffect(() => {
    setCreditValue(50); // ✅ Default value = 50 when modal opens
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ✅ Restrict slider from going below 50
  const handleSliderChange = (e) => {
    let value = Number(e.target.value);

    // Agar 50 se neeche jata hai toh 50 pe lock kar do
    if (value < 50) {
      value = 50;
    }
    setCreditValue(value);
  };

  const customHeigth = useWindowHeight();
  const responseEstimate = creditToResponseMap[creditValue] || 0;
  const price = Math.trunc(creditValue * 1.45);

  const getSliderBackground = (value, min, max) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, #e4e4e4 ${percentage}%, #e4e4e4 100%)`;
  };

  const handleBuyNow = (item) => {
    console.log(item, "item");
    let credits = item.no_of_leads;

    const vatTotal = Math.floor((price * 20) / 100);

    if (typeof addcoupanList === "string" && addcoupanList.includes("%")) {
      const discountPercent = parseFloat(addcoupanList.replace("%", ""));
      const discountAmount = Math.floor(
        (item.no_of_leads * discountPercent) / 100
      );
      credits = item.no_of_leads + discountAmount;
    }

    const creditData = {
      amount: price,
      credits: creditValue,
      details: `Purchase ${creditValue} credits`,
      total_amount: (price + vatTotal) * 100,
      vat: vatTotal,
      top_up: 1,
    };

    setSelectedCreditData(creditData);

    dispatch(addBuyCreditApi(creditData)).then((result) => {
      if (result?.success) {
        showToast("success", result?.message);
        const data = {
          user_id: userToken?.remember_tokens
            ? userToken?.remember_tokens
            : registerData?.remember_tokens,
        };
        dispatch(totalCreditData(data));
        onClose();
      } else if (result?.success === false) {
        setIsAddModalOpen(true);
      }
    });
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div
          className={styles.modalContent}
          style={{ height: customHeigth <= 820 ? customHeigth - 20 : "auto" }}
        >
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
          <div className={styles.title}>
            <h2>Flexible Pricing to Grow Your Business</h2>
            <p className={styles.subtitle}>
              Choose a credit pack that fits your goals and budget
            </p>
          </div>

          <div className={styles.infoBar}>
            <span className={styles.credits}>Credits: {creditValue}</span>
            <span className={styles.responses}>
              Responses: Approximately {responseEstimate}
            </span>
            <span className={styles.cost}>Cost: £{price} (ex VAT)</span>
          </div>

          <div className={styles.adjustText}>
            Adjust the slider to select the right number of credits for your
            needs
          </div>

          <div className={styles.sliderWrapper}>
            <input
              type="range"
              min="0" // ✅ 0 is visible on slider
              max="200"
              step="10"
              value={creditValue}
              onChange={handleSliderChange}
              className={styles.slider}
              style={{
                background: getSliderBackground(creditValue, 0, 200),
              }}
            />
            <div className={styles.sliderMarkers}>
              <span style={{ left: "0%" }}></span>
              <span style={{ left: "25%" }}></span>
              <span style={{ left: "50%" }}></span>
              <span style={{ left: "75%" }}></span>
              <span style={{ left: "100%" }}></span>
            </div>
          </div>

          {/* ✅ Labels show 0 but slider can't go below 50 */}
          <div className={styles.rangeLabels}>
            <span>0</span>
            <span>50</span>
            <span>100</span>
            <span>150</span>
            <span>200</span>
          </div>

          <div className={styles.centerBtn}>
            <button className={styles.buyBtn} onClick={handleBuyNow}>
              Buy credits
            </button>
          </div>
          <div className={styles.btnbelowText}>
            Use your credits to connect with high-quality, verified leads in
            your service area. The more credits you buy, the more targeted
            opportunities you can unlock.
          </div>

          <div className={styles.partnerSection}>
            <div>
              <h4>You have been selected for our Partnership Pricing</h4>
              <p>
                Speak to our partner success team today to get even more <br />
                from your Localists.com membership:
              </p>
              <ul>
                <li>
                  <img src={HiredImg} alt="hire" /> Win more business
                </li>
                <li>
                  <img src={HiredImg} alt="hire" /> Enjoy priority support and
                  expert growth advice
                </li>
                <li>
                  <img src={HiredImg} alt="hire" /> Access account optimisation
                  insights from our team
                </li>
              </ul>
            </div>
            <button className={styles.callbackBtn}>Request callback</button>
          </div>
        </div>
      </div>

      {isAddModalOpen && selectedCreditData && (
        <AddCardModal
          onClose={() => setIsAddModalOpen(false)}
          newLeadApi={true}
          newLeadData={selectedCreditData}
          noLeadApiCall={true}
        />
      )}
    </>
  );
};

export default CreditModal;
