import React from "react";
import styles from "./Pricing.module.css";
import PricingSection from "./PricingSection/PricingSection";
import CreditBuyingProcess from "./CreditBuyingProcess/CreditBuyingProcess";
import PricingCards from "./PricingCards/PricingCards";
import PricingFAQ from "./PricingFAQ/PricingFAQ";
import StartWinning from "./StartWinning/StartWinning";
import { Helmet } from "react-helmet-async";

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>How It Works for Professionals & Businesses - Localists</title>
        <meta
          name="description"
          content=" Learn how Localists connect you with ready-to-hire customers in your area. Get quality leads, grow your business, and boost your visibility online today."
        />
      </Helmet>

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
