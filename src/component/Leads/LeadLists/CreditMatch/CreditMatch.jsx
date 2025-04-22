// import React from "react";
// import styles from "./CreditMatch.module.css";
// // import locallistImgs from "../../../../assets/Images/Leads/locallistImg.svg"
// import locallistImgs from "../../../../assets/Images/Leads/localistImg.svg"

// const CreditMatch = () => {
//   return (
//     // <div className={styles.container}>
//     //   {/* Left - Text */}
//     //   <div className={styles.textSection}>
//     //     <p>
//     //       Buy more <br />
//     //     credits now
//     //     </p>
//     //   </div>

//     //   {/* Middle - Credit Box */}
//     //   <div className={styles.creditSectionBox}>
//     //     <div className={styles.creditSection}>
//     //     <button className={styles.creditsBtn}><img src={locallistImgs} alt="image" /> 70 credits</button>
//     //     <p className={styles.subText}>Enough for about 10 leads</p>
//     //     </div>
//     //     <div className={styles.creditSection}>
//     //     <span className={styles.priceBox}>$123.20 (Excl. tax)</span>
//     //     <p className={styles.perCredit}>$1.76/credit</p>
//     //     </div>
//     //   </div>

//     //   {/* Right - Buy Button + Checkbox */}
//     //   <div className={styles.actionSection}>
//     //     <button className={styles.buyBtn}>Buy 70 credits</button>
//     //     <label className={styles.checkboxLabel}>
//     //       <input type="checkbox" />
//     //       Auto top-up next time
//     //     </label>
//     //   </div>
//     // </div>
//     <div className={styles.mainContainer}>
//     <div className={styles.leftContainer}>
//       <div className={styles.headingSection}>
//         <h2>Buy more <br /> credits now</h2>
//       </div>
//       <div className={styles.creditsSection}>
//         <div className={styles.creditsBox}>
//           <span className={styles.logo}><img src={locallistImgs} alt="image" /></span>
//           <span className={styles.credits}>70 credits</span>
//         </div>
//         <span className={styles.leadInfo}>Enough for about 10 leads</span>
//       </div>
//     </div>

//     <div className={styles.rightContainer}>
//       <div className={styles.priceSection}>
//         <span className={styles.totalPrice}>$123.20 <span className={styles.exclTax}>(Excl. tax)</span></span>
//         <span className={styles.perCredit}>$1.76/credit</span>
//       </div>
//       <div className={styles.buttonSection}>
//         <button className={styles.buyButton}>Buy 70 credits</button>
//         <div className={styles.checkboxContainer}>
//           <input type="checkbox" id="autoTopup" />
//           <label htmlFor="autoTopup">Auto top-up next time</label>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default CreditMatch;
// BuyCredits.jsx
import React, { useState } from 'react';

import styles from "./CreditMatch.module.css";
// import locallistImgs from "../../../../assets/Images/Leads/locallistImg.svg"
import locallistImgs from "../../../../assets/Images/Leads/localistImg.svg"
const CreditMatch = () => {
  const [autoTopUp, setAutoTopUp] = useState(false);
  
  const handleAutoTopUpChange = () => {
    setAutoTopUp(!autoTopUp);
  };

  return (
    <div className={styles.buyCreditsContainer}>
      <div className={styles.titleSection}>
        <h2 className={styles.title}>Buy more<br />credits now</h2>
      </div>
      
      <div className={styles.infoSection}>
        <div className={styles.creditsInfo}>
          <div className={styles.locationTag}>
          <img src={locallistImgs} alt="image" />
            <span className={styles.creditsAmount}>70 credits</span>
          </div>
          <div className={styles.usageInfo}>
            <span className={styles.usageText}>Enough for about 10 leads</span>
            {/* <div className={styles.availabilityBar}>
              <span className={styles.availabilityText}>182 ÷ 20</span>
            </div> */}
          </div>
        </div>
      </div>
      
      <div className={styles.priceSection}>
        <div className={styles.priceInfo}>
          <div className={styles.totalPrice}>$123.20 (Excl. tax)</div>
          <div className={styles.unitPrice}>$1.76/credit</div>
        </div>
      </div>
      
      <div className={styles.actionSection}>
        <button className={styles.buyButton}>Buy 70 credits</button>
        <div className={styles.autoTopUpContainer}>
          <input 
            type="checkbox" 
            id="autoTopUp" 
            className={styles.autoTopUpCheckbox}
            checked={autoTopUp}
            onChange={handleAutoTopUpChange}
          />
          <label htmlFor="autoTopUp" className={styles.autoTopUpLabel}>
            Auto top-up next time
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreditMatch;