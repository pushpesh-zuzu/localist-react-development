
import React, { useEffect, useState } from "react";
import styles from "./MyCredit.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";
import ActiveFreeTrial from "./ActiveFreeTrial";
import CreditCard from "./CreditCard";
import getHired from "../../../assets/Images/Setting/HiredNewImg.svg";
import TransgationLogTable from "./TransgationLogTable";
import CreditModal from "./CreditModal";
import { useNavigate } from "react-router-dom";
import { getCreditPlanList, getswitchAutobidApi, switchAutobidApi } from "../../../store/LeadSetting/leadSettingSlice";
import { useDispatch, useSelector } from "react-redux";
import { addBuyCreditApi, AddCoupanApi, getInvoiceBillingListApi } from "../../../store/MyProfile/MyCredit/MyCreditSlice";
import { showToast } from "../../../utils";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import airoImg from "../../../assets/Images/Setting/airoplaneImg.svg";

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
  const { buyCreditLoader, addCouanLoader,addcoupanList ,getInoviceBillingList} = useSelector((state) => state.myCredit);
  const { getSwitcgAutoBidData } = useSelector((state) => state.leadSetting);
  const [isChecked, setIsChecked] = useState(false)
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const userId =
    userToken?.remember_tokens ?? registerData?.remember_tokens;

  // API se data aane ke baad automation state update karo
  useEffect(() => {
    if (getSwitcgAutoBidData?.isautobid !== undefined) {
      setAutomation(getSwitcgAutoBidData.isautobid === 1);
    }
  }, [getSwitcgAutoBidData]);

  // Initial API call
  useEffect(() => {
    if (userId) {
      dispatch(getswitchAutobidApi({ user_id: userId }));
    }
  }, [userId, dispatch]);
  const handleToggle = () => {
    const newValue = !automation;
    setAutomation(newValue);

    dispatch(
      switchAutobidApi({
        is_autobid: Number(newValue),
        user_id: userId,
      })
    );
  };
  const handleRedeem = (e) => {
    setCouponCode(e.target.value)
  }
  const handleBack = () => {
    navigate("/settings");
  }
  useEffect(() => {
    dispatch(getCreditPlanList())
    dispatch(getInvoiceBillingListApi())
  }, [])
  console.log(getInoviceBillingList, "item");
  
  // const handleBuyNow = (item) => {
  //   setActiveLoaderId(item?.id);
  //   let finalPrice = item.no_of_leads;
  // const vatTotal = item?.billing_vat_register === 0
  // ? 0
  // : Math.floor((item?.price * 20) / 100)
  
  //   // ✅ Only apply discount if selectedCoupon is a string and contains '%'
  //   if (typeof addcoupanList === 'string' && addcoupanList.includes("%")) {
  //     const discountPercent = parseFloat(addcoupanList.replace("%", ""));
  //     const discountAmount = (item.no_of_leads * discountPercent) / 100;
  //     finalPrice = Math.floor(item.no_of_leads - discountAmount);
  //   }
   
  
  //   const creditData = {
  //     amount: item?.price, 
  //     credits: item?.no_of_leads + finalPrice,
  //     details: item?.name,
  //     // discount:finalPrice - item?.price,
  //     // sub_total:finalPrice,
  //     total_amount:finalPrice + vatTotal * 100,
  //     vat:vatTotal,
  //     top_up: isChecked ? 1 : 0
  //   };
  //   console.log(creditData,finalPrice,vatTotal,"creditData")
  //   // dispatch(addBuyCreditApi(creditData)).then((result) => {
  //   //   if (result) {
  //   //     showToast("success", result?.message);
  //   //     setActiveLoaderId(null);
  //   //     dispatch(getInvoiceBillingListApi())
  //   //   }
  //   // });
  // };

  
//   const handleBuyNow = (item) => {
//   setActiveLoaderId(item?.id);

//   let finalPrice = item.no_of_leads;

//   const vatTotal =
//     item?.billing_vat_register === 0
//       ? 0
//       : Math.floor((item?.price * 20) / 100);

//   let credits = item.no_of_leads; // default

//   // ✅ Apply coupon logic
//   if (typeof addcoupanList === 'string' && addcoupanList.includes('%')) {
//     const discountPercent = parseFloat(addcoupanList.replace('%', ''));
//     const discountAmount = (item.no_of_leads * discountPercent) / 100;
//     finalPrice = Math.floor(item.no_of_leads - discountAmount);

//     credits = item.no_of_leads + finalPrice;
//   }

//   const creditData = {
//     amount: item?.price,
//     credits: credits,
//     details: item?.name,
//     total_amount:  (item?.price + vatTotal) * 100,
//     vat: vatTotal,
//     top_up: isChecked ? 1 : 0,
//   };

//   console.log(creditData, finalPrice,item?.price, vatTotal, 'creditData');

//   // dispatch(addBuyCreditApi(creditData)).then((result) => {
//   //   if (result) {
//   //     showToast('success', result?.message);
//   //     setActiveLoaderId(null);
//   //     dispatch(getInvoiceBillingListApi());
//   //   }
//   // });
// };

const handleBuyNow = (item) => {
  setActiveLoaderId(item?.id);

  let credits = item.no_of_leads; // Default credits without coupon

  const vatTotal =
    item?.billing_vat_register === 0
      ? 0
      : Math.floor((item?.price * 20) / 100);

  // ✅ If coupon exists and is percentage-based
  if (typeof addcoupanList === 'string' && addcoupanList.includes('%')) {
    const discountPercent = parseFloat(addcoupanList.replace('%', ''));
    const discountAmount = Math.floor((item.no_of_leads * discountPercent) / 100);

    credits = item.no_of_leads + discountAmount; 
  }

  const creditData = {
    amount: item?.price,
    credits: credits,
    details: item?.name,
    total_amount: (item?.price + vatTotal) * 100,
    vat: vatTotal,
    top_up: isChecked ? 1 : 0,
  };

  console.log(creditData, item?.no_of_leads, credits, vatTotal, 'creditData');

  dispatch(addBuyCreditApi(creditData)).then((result) => {
    if (result) {
      showToast('success', result?.message);
      setActiveLoaderId(null);
      dispatch(getInvoiceBillingListApi());
    }
  });
};

  
  

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
  const priceCreditPercentage = creditPlanList?.map((item) => item?.no_of_leads)
console.log(addcoupanList,priceCreditPercentage,"addcoupanList")
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
              {item?.plan_type !== "normal" ? <button className={styles.badge}>{item.description}<img src={airoImg} alt="..." /> </button> : <button className={styles.badge}>{item.description}</button>}
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
                     checked={isChecked}
          onChange={handleCheckboxChange}
                    />
                    <label>Auto top-up next time</label>
                  </div>
                </div>
              </div>
              {item?.plan_type !== "normal" && <div className={styles.getHired}>
                <img src={getHired} alt="getHired" className={styles.getHiredImage} />
                {


                  <div className={styles.gethiredText}>We'll give you your credits back if you don't secure at least one job on Bark using these credits.</div>
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
          <input type="text" placeholder="Redeem a code" onChange={handleRedeem} />
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

        <TransgationLogTable data={getInoviceBillingList} />

      </div>
      {/* {isOpen && (
        <CreditModal onClose={()=>setIsOpen(false)}/>
      )} */}
    </>
  );
};

export default MyCredits;
