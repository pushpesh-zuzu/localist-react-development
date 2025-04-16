import React from "react";
import styles from "./CreditBuyingProcess.module.css";
import ChooseRightCreditIcon from "../../../assets/Images/Pricing/ChooseRightCreditIcon.svg";
import CompletePurchaseIcon from "../../../assets/Images/Pricing/CompletePurchaseIcon.svg";
import RedeemCreditsIcon from "../../../assets/Images/Pricing/RedeemCreditsIcon.svg";

const CreditBuyingProcess = () => {
  const HowItWorksData = [
    {
      id: 1,
      title: "ChooseRightCreditIcon",
      image: ChooseRightCreditIcon,
      description: "Choose the right credit package based on your needs.",
    },
    {
      id: 2,
      title: "CompletePurchaseIcon",
      image: CompletePurchaseIcon,
      description:
        "Complete the purchase securely using your preferred payment method.",
    },
    {
      id: 3,
      title: "RedeemCreditsIcon",
      image: RedeemCreditsIcon,
      description:
        "Redeem credits to access products, services, or subscriptions easily.",
    },
  ];
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Credit <span className={styles.highlight}>buying process</span>
      </h2>
      <div className={styles.stepsContainer}>
        {HowItWorksData.map((item, index) => (
          <div className={styles.step} key={index}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.title} className={styles.icon} />
            </div>
            <div className={styles.content}>
              <p className={styles.description}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditBuyingProcess;
