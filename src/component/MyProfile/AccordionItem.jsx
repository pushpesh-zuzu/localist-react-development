import React, { useState } from "react";
import styles from "./AccordionItem.module.css";
import { UpOutlined, DownOutlined, CheckOutlined } from "@ant-design/icons";
import { Progress } from "antd";

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordionItem}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.title}>{title}</span>
        <div className={styles.rightSection}>
          <Progress
            type="circle"
            percent={25}
            width={24}
            strokeColor="#00b2ff"
            format={() => <CheckOutlined />}
          />
          <span className={styles.icon}>
            {isOpen ? <UpOutlined /> : <DownOutlined />}
          </span>
        </div>
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default AccordionItem;
