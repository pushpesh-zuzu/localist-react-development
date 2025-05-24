import React from "react";
import styles from "./InvoiceAndBilling.module.css";
import GreenTick from "../../../assets/Images/Setting/RightClick.svg"
import downloadIcon from "../../../assets/Images/Setting/DownloadIcon.svg"

const InvoiceTable = () => {
    return (
        <div className={styles.tableSection}>
        <h3 className={styles.subHeading}>Invoices</h3>
        <table className={styles.invoiceTable}>
          <thead>
            <tr>
              <th>Invoice#</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5484605</td>
              <td>10 April</td>
              <td>£405.55</td>
              <td>{<img src={GreenTick} alt="Green" />}</td>
              <td><img src={downloadIcon} alt="Download" className={styles.downloadIcon} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    }
export default InvoiceTable;