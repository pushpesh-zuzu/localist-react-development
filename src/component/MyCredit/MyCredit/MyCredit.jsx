
import React, { useState } from "react";
import styles from "./MyCredit.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";
import ActiveFreeTrial from "./ActiveFreeTrial";
import CreditCard from "./CreditCard";
import getHired from "../../../assets/Images/Setting/Gethired.svg";
import TransgationLogTable from "./TransgationLogTable";
import CreditModal from "./CreditModal";

const creditOptions = [
  {
    title: "Win 60% more business",
    credits: 400,
    price: "£580.00",
    discount: "1.45",
    autoTopUp: false,
    image: getHired,
    text: "We'll give you your credits back if you don't secure at least one job on Bark using these credits."
  },
  {
    title: "Win 120% more business",
    credits: 550,
    price: "£797.50",
    discount: "1.45",
    autoTopUp: true,
    image: getHired,
    text: "We'll give you your credits back if you don't secure at least one job on Bark using these credits."
  },
  {
    title: "Win 180% more business",
    credits: 700,
    price: "£1,015.00",
    discount: "1.45",
    autoTopUp: true,
    image: getHired,
    text: "We'll give you your credits back if you don't secure at least one job on Bark using these credits."
  },
];

const MyCredits = () => {
  const [automation, setAutomation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {  
    setIsOpen(true);
  };
  const handleToggle = () => {
    const newValue = !automation;
    setAutomation(newValue);


  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.backText}>← Setting</div>
        <h1 className={styles.heading}>My credits</h1>

        <div className={styles.manageWrapper}>
          <span className={styles.infoIcon}>
            <img src={iIcon} alt="iIcon" />
          </span>
          <p className={styles.description}>
            Credits are used to contact customers on Bark. You can find out more
            about credits and how we charge for our service in the{" "}
            <a href="#" className={styles.link}>
              Help Center
            </a>
            .
          </p>
        </div>

        <p className={styles.note}>
          We charge a small fee for each customer you contact on Bark. Buy a pack
          of<span> 70 credits </span>and get <span>20% OFF</span>
        </p>

        <div className={styles.cardList}>
          {creditOptions.map((item, index) => (
            <div className={styles.card} key={index}>
              {/* <span className={styles.badge}>{item.title}</span> */}
              <div className={styles.titleBar}>

                <button className={styles.response}>About 5-10 responses</button>
                <div className={styles.creditsBox}>{item.credits} credits</div>

                <div className={styles.priceInfo}>
                  <strong>{item.price} (Excl. tax)</strong>
                  <div className={styles.perCredit}>
                    £{item.discount}/credit
                  </div>
                </div>

                <div className={styles.buttonWrap}>
                  <button className={styles.buyButton} onClick={handleOpen}>Buy Now</button>
                  <div className={styles.checkboxWrap}>
                    <input
                      type="checkbox"
                      checked={item.autoTopUp}
                      readOnly
                    />
                    <label>Auto top-up next time</label>
                  </div>
                </div>
              </div>
              {item.autoTopUp !== true && <div className={styles.getHired}>
                <img src={item.image} alt="getHired" className={styles.getHiredImage} />
                <div className={styles.gethiredText}>{item.text}</div>
              </div>}

            </div>
          ))}
        </div>

        <div className={styles.bottomText}>
          <span>Buy higher plan and get more credits</span>
        </div>

        <ActiveFreeTrial />
        <div className={styles.VisaCard}>
          <CreditCard />
        </div>
        <div className={styles.redeemText}>
          <label>Redeem coupon</label>
          <input type="text" placeholder="Redeem a code" />
          <button className={styles.redeemButton}>Apply</button>
        </div>
        <div className={styles.couponsText}>Coupons can't be combined. The higher discount applies.</div>
        <div className={styles.toggle}>
          <span>Auto bid</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={automation}
              onChange={handleToggle}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
    
          <TransgationLogTable/>
        
      </div>
      {isOpen && (
        <CreditModal onClose={()=>setIsOpen(false)}/>
      )}
    </>
  );
};

export default MyCredits;
