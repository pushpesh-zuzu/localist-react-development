import React from "react";
import styles from "./Pricing.module.css";
import PricingSection from "./PricingSection/PricingSection";
import CreditBuyingProcess from "./CreditBuyingProcess/CreditBuyingProcess";
import PricingCards from "./PricingCards/PricingCards";
import PricingFAQ from "./PricingFAQ/PricingFAQ";
import StartWinning from "./StartWinning/StartWinning";

const Pricing = () => {
  return (
    <>
      <div className={styles.pricingContainer}>
        <PricingSection />
        <CreditBuyingProcess />
        <PricingCards />
      </div>
      <PricingFAQ />
      <StartWinning />
    </>
  );
};

export default Pricing;
