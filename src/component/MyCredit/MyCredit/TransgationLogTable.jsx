import React, { useState } from "react";
import styles from "./TransgationLogTable.module.css";
import CreditModal from "./CreditModal";

const transactions = [
  {
    id: "42476919",
    description: "15 credits used to reply to customer",
    credits: -15,
    date: "9 April 2025",
  },
  {
    id: "42476912",
    description: "20 credits used to reply to customer",
    credits: -20,
    date: "6 April 2025",
  },
  {
    id: "42476917",
    description: "30 credits used to reply to customer",
    credits: -30,
    date: "3 April 2025",
  },
  {
    id: "42476910",
    description: "30 credits used to reply to customer",
    credits: -30,
    date: "1 April 2025",
  },
];

const TransgationLogTable = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
    setIsOpen(true);
    }
  return (
    <div className={styles.container}>
      <h2 onClick={handleOpen}>Credit transaction log</h2>
      <div className={styles.scrollTable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Credits</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td className={styles.bold}>{tx.id}</td>
                <td>{tx.description}</td>
                <td className={styles.negative}>-{Math.abs(tx.credits)}</td>
                <td>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {isOpen && (
              <CreditModal onClose={()=>setIsOpen(false)}/>
            )}
    </div>
  );
};

export default TransgationLogTable;
