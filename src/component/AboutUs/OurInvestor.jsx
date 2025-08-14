import React from "react";
import styles from './ourinvestor.module.css';
import WithBlueTextBlack from "../common/headings/WithBlueTextBlack";

const OurInvestor = () => {
  // Sample investor data (replace with your actual data)
  const investors = [
    { id: 1, name: "Logos", logo: "/sequoia-logo.png" },
    { id: 2, name: "Logos", logo: "/tiger-global-logo.png" },
    { id: 3, name: "Logos", logo: "/softbank-logo.png" },
    { id: 4, name: "Logos", logo: "/accel-logo.png" },
    { id: 5, name: "Logos", logo: "/lightspeed-logo.png" },
    { id: 6, name: "Logos", logo: "/yc-logo.png" },
  ];

  return (
    <section className={styles.investorsSection}>
      {/* Heading with specified typography */}
      <div style={{marginBottom:'32px'}}>
        <WithBlueTextBlack firstblueText="Our" secondText="investors"/>
      </div>
      
      {/* Investors grid */}
      <div className={styles.investorsGrid}>
        {investors.map(investor => (
          <div key={investor.id} className={styles.investorCard}>
            {/* <img 
              src={investor.logo} 
              alt={investor.name} 
              className={styles.investorLogo}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "/default-logo.png";
              }}
            /> */}
            <p className={styles.investorName}>{investor.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurInvestor;