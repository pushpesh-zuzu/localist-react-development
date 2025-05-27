
import React, { useEffect, useState } from "react";
import styles from "./MyCredit.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";
import ActiveFreeTrial from "./ActiveFreeTrial";
import CreditCard from "./CreditCard";
import getHired from "../../../assets/Images/Setting/HiredNewImg.svg";
import TransgationLogTable from "./TransgationLogTable";
import CreditModal from "./CreditModal";
import { useNavigate } from "react-router-dom";
import { getCreditPlanList } from "../../../store/LeadSetting/leadSettingSlice";
import { useDispatch, useSelector } from "react-redux";
import { addBuyCreditApi, AddCoupanApi } from "../../../store/MyProfile/MyCredit/MyCreditSlice";
import { showToast } from "../../../utils";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const creditOptions = [
  {
    title: "20 % OFF Boost",
    credits: 400,
    price: "£580.00",
    discount: "1.45",
    autoTopUp: false,
    image: getHired,
    text: "We'll give you your credits back if you don't secure at least one job on Bark using these credits."
  },
  {
    title: "120 % OFF Boost",
    credits: 550,
    price: "£797.50",
    discount: "1.45",
    autoTopUp: true,
    image: getHired,
    text: "We'll give you your credits back if you don't secure at least one job on Bark using these credits."
  },
  {
    title: "180 % OFF Boost",
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
  const [couponCode, setCouponCode] = useState("");
  const [activeLoaderId, setActiveLoaderId] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { creditPlanList } = useSelector((state) => state.leadSetting);
const { registerData } = useSelector((state) => state.findJobs);
  const { userToken } = useSelector((state) => state.auth)
  const { buyCreditLoader,addCouanLoader } = useSelector((state) => state.myCredit);
   const handleOpen = () => {  
    setIsOpen(true);
  };
  const handleToggle = () => {
    const newValue = !automation;
    setAutomation(newValue);


  };
  const handleRedeem = (e) => {
    setCouponCode(e.target.value)
  }
  const handleBack = () => {
    navigate("/settings");
  }
useEffect(()=>{
dispatch(getCreditPlanList())
},[])
const handleBuyNow = (item) => {
  setActiveLoaderId(item?.id);
  const creditData = {
      user_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens,
      
    plan_id: item?.id,   
  }
  dispatch(addBuyCreditApi(creditData)).then((result) => {
    if(result){
      showToast("success",result?.message)
      setActiveLoaderId(null);
    }
  })
}

const handleApply = () => {
  if (!couponCode.trim()) {
    showToast("error", "Please enter a valid coupon code.");
    return;
  }

  const payload = {
    coupon_code: couponCode.trim(),
  };

  dispatch(AddCoupanApi(payload)).then((result) => {
    if (result) {
      showToast("success", result?.message);
      setCouponCode(""); 
    }
  });
};
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.backText} onClick={handleBack}>← Setting</div>
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
          {creditPlanList?.map((item, index) => (
            <div className={styles.card} key={index}>
              {/* <button className={styles.badge}>{item.title}</button> */}
              <div className={styles.titleBar}>

                <button className={styles.response}>{item?.slug}</button>
                <div className={styles.creditsBox}>{item?.no_of_leads} credits</div>

                <div className={styles.priceInfo}>
                  <strong>{item?.price} (Excl. tax)</strong>
                  <div className={styles.perCredit}>
                    £{item?.per_credit}/credit
                  </div>
                </div>

                <div className={styles.buttonWrap}>
                  {/* <button className={styles.buyButton} onClick={() =>handleBuyNow(item)} >{buyCreditLoader ?  <Spin
                         indicator={<LoadingOutlined spin style={{ color: "white" }} />}
                       />  : "Buy Now"}</button> */}
                       <button
  className={styles.buyButton}
  onClick={() => handleBuyNow(item)}
>
  {activeLoaderId === item.id ? (
    <Spin
      indicator={<LoadingOutlined spin style={{ color: "white" }} />}
    />
  ) : (
    "Buy Now"
  )}
</button>
                  <div className={styles.checkboxWrap}>
                    <input
                      type="checkbox"
                      checked={item.status}
                      readOnly
                    />
                    <label>Auto top-up next time</label>
                  </div>
                </div>
              </div>
              {item.status &&  <div className={styles.getHired}>
                <img src={getHired} alt="getHired" className={styles.getHiredImage} />
                {
                  item?.description &&
                
                <div className={styles.gethiredText}>{item?.description}</div>
}
              </div>}

            </div>
          ))}
        </div>

        <div className={styles.bottomText} onClick={handleOpen}>
          <span>Buy higher plan and get more credits</span>
        </div>

        <ActiveFreeTrial />
        <div className={styles.VisaCard}>
          <CreditCard />
        </div>
        <div className={styles.redeemText}>
          <label>Redeem coupon</label>
          <input type="text" placeholder="Redeem a code" onChange={handleRedeem}/>
          <button className={styles.redeemButton} onClick={handleApply}>{addCouanLoader ? <Spin
                         indicator={<LoadingOutlined spin style={{ color: "white" }} />}
                       /> : "Apply"}</button>
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
      {/* {isOpen && (
        <CreditModal onClose={()=>setIsOpen(false)}/>
      )} */}
    </>
  );
};

export default MyCredits;
