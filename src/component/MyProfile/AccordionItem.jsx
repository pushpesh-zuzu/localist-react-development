import React, { useState } from "react";
import styles from "./AccordionItem.module.css";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordionItem}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.title}>{title}</span>
        <span className={styles.icon}>
          {isOpen ? <UpOutlined /> : <DownOutlined />}
        </span>
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default AccordionItem;
