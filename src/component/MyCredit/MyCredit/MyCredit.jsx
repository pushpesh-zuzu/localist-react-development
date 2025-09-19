import React, { useEffect, useState } from "react";
import styles from "./MyCredit.module.css";
import iIcon from "../../../assets/Images/iIcon.svg";
import ActiveFreeTrial from "./ActiveFreeTrial";
import CreditCard from "./CreditCard";
import getHired from "../../../assets/Images/Setting/newLogoCredit.svg";
import TransgationLogTable from "./TransgationLogTable";
import CreditModal from "./CreditModal";
import { Link, useNavigate } from "react-router-dom";
import {
  getCreditPlanList,
  getswitchAutobidApi,
  switchAutobidApi,
} from "../../../store/LeadSetting/leadSettingSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addBuyCreditApi,
  AddCoupanApi,
  getInvoiceBillingListApi,
} from "../../../store/MyProfile/MyCredit/MyCreditSlice";
import { showToast } from "../../../utils";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import airoImg from "../../../assets/Images/Setting/airoplaneImg.svg";
import AddCardModal from "../MyPaymentDetails/AddCardModal";
import blackArrow from "../../../assets/Images/Leads/blackArrowRight.svg";
import { useUserGeo } from "../../../utils/geo";
import { setStarterPackPurchased } from "../../../store/MyProfile/MyCredit/MyCreditSlice";

const creditOptions = [
  {
    title: "20 % OFF Boost",
    credits: 400,
    price: "£580.00",
    discount: "1.45",
    autoTopUp: false,
    image: getHired,
    text: "We'll give you your credits back if you don't secure at least one job on Localists using these credits.",
  },
  {
    title: "120 % OFF Boost",
    credits: 550,
    price: "£797.50",
    discount: "1.45",
    autoTopUp: true,
    image: getHired,
    text: "We'll give you your credits back if you don't secure at least one job on Localists using these credits.",
  },
  {
    title: "180 % OFF Boost",
    credits: 700,
    price: "£1,015.00",
    discount: "1.45",
    autoTopUp: true,
    image: getHired,
    text: "We'll give you your credits back if you don't secure at least one job on Localists using these credits.",
  },
];

const MyCredits = () => {
  const [automation, setAutomation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [activeLoaderId, setActiveLoaderId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { creditPlanList } = useSelector((state) => state.leadSetting);
  const { registerData } = useSelector((state) => state.findJobs);
  const { userToken } = useSelector((state) => state.auth);
  const { country, lang } = useUserGeo();

  const {
    buyCreditLoader,
    addCouanLoader,
    addcoupanList,
    getInoviceBillingList,
  } = useSelector((state) => state.myCredit);
  const { getSwitcgAutoBidData } = useSelector((state) => state.leadSetting);
  const [isChecked, setIsChecked] = useState(true);
  const [checkedPlans, setCheckedPlans] = useState({});

  const [isAddCardModal, setIsAddCardModal] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleCheckboxChange = (planId) => {
    // setIsChecked(e.target.checked);
    setCheckedPlans((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  const userId = userToken?.remember_tokens ?? registerData?.remember_tokens;

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
    setCouponCode(e.target.value);
  };
  const handleBack = () => {
    navigate("/settings");
  };
  useEffect(() => {
    dispatch(getCreditPlanList());
    dispatch(getInvoiceBillingListApi());
  }, []);
  console.log(getInoviceBillingList, "item");

  const handleBuyNow = (item) => {
    setActiveLoaderId(item?.id);

    let credits = item.no_of_leads;

    const vatTotal =
      item?.billing_vat_register === 0
        ? 0
        : Math.floor((item?.price * 20) / 100);

    // ✅ If coupon exists and is percentage-based
    if (typeof addcoupanList === "string" && addcoupanList.includes("%")) {
      const discountPercent = parseFloat(addcoupanList.replace("%", ""));
      const discountAmount = Math.floor(
        (item.no_of_leads * discountPercent) / 100
      );

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

    dispatch(addBuyCreditApi(creditData)).then((result) => {
      if (result?.success) {
        showToast("success", result?.message);
        setActiveLoaderId(null);
        dispatch(getInvoiceBillingListApi());

        if (item?.plan_type === "starter") {
          dispatch(setStarterPackPurchased(true));
        }

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else if (result?.success === false) {
        setIsAddCardModal(true);
        // navigate("/payment-details");
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
  const priceCreditPercentage = creditPlanList?.map(
    (item) => item?.no_of_leads
  );
  console.log(addcoupanList, priceCreditPercentage, "addcoupanList");
  return (
    <>
      <div className={styles.container}>
        <div className={styles.backText} onClick={handleBack}>
          {" "}
          <img src={blackArrow} alt="..." /> Settings
        </div>
        <h1 className={styles.heading}>My credits</h1>

        <div className={styles.manageWrapper}>
          <span className={styles.infoIcon}>
            <img src={iIcon} alt="iIcon" />
          </span>
          <p className={styles.description}>
            Credits are used to connect with potential customers on
            Localists.com. They let you respond to high-quality, high intent,
            local leads in your area. Learn more about how credits work and our
            pricing in the{" "}
            {/* <a href="#" className={styles.link}>
             
            </a> */}
            <Link to={`/${lang}/${country}/contact-us`} className={styles.link}>
              Help Center
            </Link>
            .
          </p>
        </div>

        <p className={styles.note}>
          We apply a small fee for each new customer you choose to contact.
        </p>

        <div className={styles.pickYourCredit}>
          <p>
            <span>Pick Your Credit Plan </span> & Access New Business Today
          </p>
        </div>

        <div className={styles.cardList}>
          {creditPlanList?.length === 0 ? (
            <div className={styles.noPlanText}></div>
          ) : (
            // creditPlanList?.map((item, index) => (
            [...creditPlanList]
              .sort((a, b) => a.price - b.price)
              .map((item, index) => (
                <div className={styles.card} key={index}>
                  {/* Title */}
                  <div className={styles.cardHeader}>
                    <h3>{item?.name}</h3>
                    <span className={styles.creditTag}>
                      {item?.no_of_leads} Credits
                    </span>
                  </div>

                  {/* Responses */}
                  <p className={styles.responses}>
                    About {item?.no_of_responses} Responses
                  </p>

                  {/* Price */}
                  <div className={styles.price}>
                    £{item?.price}
                    <small>(Excl. tax)</small>
                  </div>

                  {/* Buy Button */}
                  <button
                    className={styles.buyButton}
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy Now
                  </button>

                  {/* Checkbox */}
                  <div className={styles.checkboxWrap}>
                    <input
                      type="checkbox"
                      // checked={isChecked}
                      checked={!!checkedPlans[item.id]}
                      // onChange={handleCheckboxChange}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    <label>Auto top-up next time</label>
                  </div>
                </div>
              ))
          )}
        </div>

        {/* <div className={styles.cardList}>
          {creditPlanList?.length === 0 ? (
            <div className={styles.noPlanText}> {""} </div>
          ) : (
            creditPlanList?.map((item, index) => (
              <div className={styles.card} key={index}>
                {item?.plan_type !== "normal" ? (
                  <button className={styles.badge}>
                    {item?.description && item?.description.trim() !== ""
                      ? item.description
                      : item.name}
                    <img src={airoImg} alt="..." />
                  </button>
                ) : (
                  <button className={styles.badge}>
                    {item?.description && item?.description.trim() !== ""
                      ? item.description
                      : item.name}
                  </button>
                )}
                <div className={styles.titleBar}>
                  <div className={styles.btnBox}>
                    <button className={styles.response}>
                      {item?.no_of_responses} Responses
                    </button>
                    <div className={styles.creditsBox}>
                      {item?.no_of_leads} credits
                    </div>
                  </div>
                  <div className={styles.priceInfo}>
                    <strong>£{item?.price} (Excl. tax)</strong>
                    <div className={styles.perCredit}>
                      £{item?.per_credit}/credit
                    </div>
                  </div>

                  <div className={styles.buttonWrap}>
                    <button
                      className={styles.buyButton}
                      onClick={() => handleBuyNow(item)}
                    >
                      Buy Now
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
                {item?.plan_type !== "normal" && (
                  <div className={styles.getHired}>
                    <img
                      src={getHired}
                      alt="getHired"
                      className={styles.getHiredImage}
                    />
                    {
                      <div className={styles.gethiredText}>
                        We'll give you your credits back if you don't secure at
                        least one job on Localists using these credits.
                      </div>
                    }
                  </div>
                )}
              </div>
            ))
          )}
        </div> */}

        <div className={styles.parentBanner}>
          <div className={styles.banner}>
            {/* Title */}
            <h2 className={styles.bannertitle}>Build Your Own Credit Plan</h2>

            {/* Subtitle */}
            <p className={styles.subtitle}>
              If our standard Credit Packs don’t meet your growth needs, you can
              build your own here
            </p>

            {/* Button */}
            <button className={styles.bannerbutton} onClick={handleOpen}>
              Build Your Credit Pack
            </button>
          </div>
        </div>

        {/* <div className={styles.bottomText} onClick={handleOpen}>
          <span>BUY MORE CREDITS</span>
        </div> */}

        {/* <ActiveFreeTrial /> */}
        <div className={styles.VisaCard}>
          <CreditCard />
        </div>
        <div className={styles.redeemText}>
          <label>Redeem coupon</label>
          <input
            type="text"
            placeholder="Redeem a code"
            onChange={handleRedeem}
          />
          <button className={styles.redeemButton} onClick={handleApply}>
            {addCouanLoader ? (
              <Spin
                indicator={<LoadingOutlined spin style={{ color: "white" }} />}
              />
            ) : (
              "Apply"
            )}
          </button>
        </div>
        <div className={styles.couponsText}>
          Coupons can't be combined. The higher discount applies.
        </div>
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
      {isOpen && <CreditModal onClose={() => setIsOpen(false)} />}

      {isAddCardModal && (
        <AddCardModal onClose={() => setIsAddCardModal(false)} />
      )}
    </>
  );
};

export default MyCredits;
