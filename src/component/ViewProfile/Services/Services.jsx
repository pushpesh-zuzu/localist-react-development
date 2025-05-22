
import React, { useState } from 'react';
import styles from './Services.module.css';
import ProfileArrowUp from "../../../assets/Icons/ProfileArrow.svg"

const service = [
  {
    title: 'Corporate Tax',
    content: 'Reference site about Lorem Ipsum, giving information on its origins...'
  },
  { title: 'Construction Accounting', content: '...' },
  { title: 'Accounts Production', content: '...' },
  { title: 'Tax Planning', content: '...' },
  { title: 'Overdue Accounts and Tax', content: '...' },
  { title: 'Management Accounts', content: '...' },
];

const Services = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.section}>
      <h2>Services</h2>
      <div className={styles.accordion}>
        {service.map((item, index) => (
          <div key={index}>
            <div
              className={styles.accordionHeader}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {item.title}
              <img src={ProfileArrowUp} alt="arrow" className={`${styles.arrow} ${openIndex === index ? styles.up : styles.down}`} />
            </div>
            {openIndex === index && (
              <div className={styles.accordionContent}>{item.content}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
