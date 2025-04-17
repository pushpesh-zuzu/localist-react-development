import React from "react";
import styles from "./PricingCards.module.css";
import creditsAtTheReady from "../../../assets/Images/Pricing/creditsAtTheReadyImg.svg";
import youareincontrol from "../../../assets/Images/Pricing/youAreInControlImg.svg";
import jobrelatedprice from "../../../assets/Images/Pricing/jobRelatedPricesImg.svg";
import newbusiness from "../../../assets/Images/Pricing/newBusinessImg.svg"

const cardData = [
  {
    title: "Credits at the ready",
    description:
      "We use a simple credit system. Buy a credit pack and simply use the credits to contact the customers you’re interested in. Or let your ideal customers reach out to you. ",
    linkText: "No commission, no hidden fees.",
    image: creditsAtTheReady,
  },
  {
    title: "You're in control",
    description:
      "You decide which leads you respond to and you’ll know the cost in credits upfront, or let your ideal customer contact you. That way, you always have control of what you’re spending.",
    image: youareincontrol,
  },
  {
    title: "Job-related prices",
    description:
      "We calculate the costs of contacting a customer based on the service, the value of the job, and the supply and demand in the area.",
    image:jobrelatedprice,
  },
  {
    title: "New business guaranteed",
    description:
      "We’re so confident you’ll win business with your first credit pack, we’ll return all your credits if you don’t. No questions asked.",
    image: newbusiness,
  },
];

const PricingCards = () => {
  return (
    <div className={styles.container}>
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`${styles.card} ${
            (index + 1) % 2 === 0 ? styles.reverse : ""
          }`}
        >
          <div className={styles.imageSection}>
            <img src={card.image} alt={card.title} />
          </div>
          <div className={styles.textSection}>
            <h3>{card.title}</h3>
            <p>
              {card.description}
              {card.linkText && (
                <>
                  {" "}
                  <a href="#">{card.linkText}</a>
                </>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;
