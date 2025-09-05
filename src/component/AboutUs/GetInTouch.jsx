import React from "react";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import styles from "./getintouch.module.css";
import WithBlueTextBlack from "../common/headings/WithBlueTextBlack";

const contactMethods = [
  {
    id: 1,
    icon: <MailOutlined  style={{fontSize:'32px', color: "#00AFE3" }} className={styles.icon} />,
    text: "contact@localists.com",
    onClick: () => window.location.href = "mailto:contact@localists.com"
  },
  // {
  //   id: 2,
  //   icon: <PhoneOutlined rotate={90} style={{fontSize:'32px', color: "#00AFE3" }} className={styles.icon} />,
  //   text: "+1 (555) 123-4567",
  //   onClick: () => window.location.href = "tel:+15551234567"
  // }
];

const GetInTouchButton = () => {
  return (
    <div className={styles.container}>
      <WithBlueTextBlack
        secondText="Get"
        firstblue={false}
        firstblueText="in touch"
      />
      
      <div className={styles.buttonsContainer}>
        {contactMethods.map((method) => (
          <button 
            key={method.id} 
            className={styles.button} 
            // onClick={method.onClick}
          >
            {method.icon}
            <span>{method.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GetInTouchButton;