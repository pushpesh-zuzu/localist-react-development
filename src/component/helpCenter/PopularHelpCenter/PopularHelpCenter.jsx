// import React from "react";
// import styles from "./PopularHelpCenter.module.css";

// const items = [
//   "What is Localists and how does it work?",
//   "What is a credit and how much does it cost?",
//   "What is the Get Hired Guarantee?",
//   "What is Elite Pro?",
//   "How can I submit a general press enquiry?",
//   "How does Localists screen leads I receive?",
//   "Where do I find my invoices?",
//   "India Market Exit",
//   "What is Enquiries?",
//   "How do I refer a friend?",
//   "What are Credit Pack Subscriptions?",
//   "What is Localists Verified?",
//   "How many responses can a customer receive?",
// ];

// const PopularHelpCenter = () => {
//   const columns = [items.slice(0, 5), items.slice(5, 9), items.slice(9)];

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Popular</h2>
//       <div className={styles.columns}>
//         {columns.map((col, colIndex) => (
//           <div key={colIndex} className={styles.column}>
//             {col.map((item, idx) => (
//               <div key={idx} className={styles.item}>
//                 {item}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PopularHelpCenter;


import React from "react";
import styles from "./PopularHelpCenter.module.css";

const items = [
  "What is Localists and how does it work?",
  "What is a credit and how much does it cost?",
  "What is the Get Hired Guarantee?",
  "What is Elite Pro?",
  "How can I submit a general press enquiry?",
  "How does Localists screen leads I receive?",
  "Where do I find my invoices?",
  "India Market Exit",
  "What is Enquiries?",
  "How do I refer a friend?",
  "What are Credit Pack Subscriptions?",
  "What is Localists Verified?",
  "How many responses can a customer receive?",
];

const PopularHelpCenter = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Popular</h2>
      <div className={styles.columns}>
        {items.map((item, idx) => (
          <div key={idx} className={styles.item}>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularHelpCenter;