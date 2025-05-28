import React, { useState } from "react";
import styles from "./TransgationLogTable.module.css";
import CreditModal from "./CreditModal";



const TransgationLogTable = ({data}) => {
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
            {data?.map((tx, index) => (
              <tr key={index}>
                <td className={styles.bold}>{tx.id}</td>
                <td>{tx.details}</td>
                <td className={styles.negative}>{Math.abs(tx.credits)}</td>
                <td>{tx.purchase_date}</td>
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
