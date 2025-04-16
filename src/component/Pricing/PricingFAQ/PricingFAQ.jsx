import React, { useState } from "react";
import styles from "./PricingFAQ.module.css";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const faqData = [
  {
    question: "Do I get the customer's phone number or email address?",
    answer:
      "Yes. When you pay to respond to a lead you'll get the customer's phone number and email. You can also contact them directly through your Bark account using Messenger.",
  },
  {
    question: "Are follow-up messages extra?",
    answer:
      "No, they’re free. We only charge a small one-off fee for you to respond to a lead. Any further messages or contact you have with the customer are completely free.",
  },
  {
    question: "Do Bark credits expire?",
    answer:
      "All Credits are valid for 12 months from the date of purchase. For more information please see our Terms and Conditions",
  },
  {
    question: "Are there any hidden costs?",
    answer:
      "No, we don’t believe in hidden costs. And we don’t charge commission either. You simply pay a one-off fee to respond to a lead. After that, 100% of the money you make from the job is yours to keep.",
  },
];

const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className={styles.faqWrapper}>
      <h2 className={styles.heading}>
        Frequently Asked <span>Questions</span>
      </h2>
      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <div
              className={
                openIndex === index ? styles.blueQuestion : styles.question
              }
              onClick={() => toggleFAQ(index)}
            >
              <strong>{item.question}</strong>
              {openIndex === index ? (
                <UpOutlined className={styles.icon} />
              ) : (
                <DownOutlined className={styles.icon} />
              )}
            </div>
            {openIndex === index && item.answer && (
              <p className={styles.answer}>{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingFAQ;
