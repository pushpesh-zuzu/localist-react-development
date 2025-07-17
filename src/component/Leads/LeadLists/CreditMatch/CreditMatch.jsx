import React, { useEffect, useRef, useState } from "react";
import styles from "./CreditMatch.module.css";
import locallistImgs from "../../../../assets/Images/Leads/localistImg.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreditPlanList,
  totalCreditData,
} from "../../../../store/LeadSetting/leadSettingSlice";
import { useNavigate } from "react-router-dom";
import { addBuyCreditApi } from "../../../../store/MyProfile/MyCredit/MyCreditSlice";
import { showToast } from "../../../../utils";
import AddCardModal from "../../../MyCredit/MyPaymentDetails/AddCardModal";


const CreditMatch = () => {
  const [autoTopUp, setAutoTopUp] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const buyCreditLoader = useSelector((state) => state.myCredit.buyCreditLoader);
  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { creditPlanList, leadRequestList, totalCredit } = useSelector(
    (state) => state.leadSetting
  );
  const handleBuyNow = (item) => {
    console.log(item, "item");
    // navigate("/payment-details")
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
      top_up: autoTopUp ? 1 : 0,
    };

    console.log(creditData, item?.no_of_leads, credits, vatTotal, "creditData");

    dispatch(addBuyCreditApi(creditData)).then((result) => {
      if (result?.success) {
        showToast("success", result?.message);
        const data = {
      user_id: userToken?.remember_tokens
        ? userToken?.remember_tokens
        : registerData?.remember_tokens,
    };
    dispatch(totalCreditData(data))
      } else if (result?.success === false) {
        setIsAddModalOpen(true);
        // navigate("/payment-details");
      }
    });
  };
  const filterData = creditPlanList?.filter((item, index) => index === 0);
  const leadTotalCredit = leadRequestList?.filter((item, index) => index === 0);
  console.log(
    leadTotalCredit?.map((item) => item?.customer?.total_credit),
    "leadTotalCredit"
  );
  console.log(totalCredit, filterData, "leadRequestList");

  const handleAutoTopUpChange = () => {
    setAutoTopUp(!autoTopUp);
  };

  useEffect(() => {
    dispatch(getCreditPlanList());

    const data = {
      user_id: userToken?.remember_tokens
        ? userToken?.remember_tokens
        : registerData?.remember_tokens,
    };
    dispatch(totalCreditData(data));
  }, [dispatch]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY;
  //     if (scrollTop > 170) {
  //       setIsSticky(true);
  //     } else {
  //       setIsSticky(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  const triggerRef = useRef(null);
  const stickyRef = useRef(null);

 useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.top <= 0) {
          stickyRef.current.classList.add(styles.fixedTop);
        } else {
          stickyRef.current.classList.remove(styles.fixedTop);
        }
      },
      {
        root: null,
        threshold: 0,
      }
    );

    const trigger = triggerRef.current;
    if (trigger) observer.observe(trigger);

    return () => {
      if (trigger) observer.unobserve(trigger);
    };
  }, []);

  return (
    <>
      {filterData?.length > 0 && (
        <div className={styles.buyCreditsContainer}>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>Buy more credits now</h2>
          </div>

          {filterData?.map((item, index) => (
            <div key={item?.id || index} className={styles.creditsSection}>
              <div className={styles.infoSection}>
                <div className={styles.creditsInfo}>
                  <div className={styles.locationTag}>
                    {/* <img src={locallistImgs} alt="credit icon" /> */}
                    <span className={styles.creditsAmount}>
                      {item?.no_of_leads ? item?.no_of_leads : 0} credits
                    </span>
                  </div>
                  <div className={styles.usageInfo}>
                    <span className={styles.usageText}>
                      {item?.description ? item?.description : "20% OFF"}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.priceSection}>
                <div className={styles.priceInfo}>
                  <div className={styles.totalPrice}>
                    ${item?.price ? item?.price : 0} (Excl. tax)
                  </div>
                  {/* <div className={styles.unitPrice}>
                    ${item?.per_credit ? item?.per_credit : 0}/credit
                  </div> */}
                </div>
              </div>

              <div className={styles.actionSection}>
                <button
                  className={styles.buyButton}
                  onClick={() => handleBuyNow(item)}
                >
                  Buy {item?.no_of_leads ? item?.no_of_leads : 0} credits
                </button>
                <div className={styles.autoTopUpContainer}>
                  <input
                    type="checkbox"
                    id={`autoTopUp-${index}`}
                    className={styles.autoTopUpCheckbox}
                    checked={autoTopUp}
                    onChange={handleAutoTopUpChange}
                  />
                  <label
                    htmlFor={`autoTopUp-${index}`}
                    className={styles.autoTopUpLabel}
                  >
                    Auto top-up next time
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* <div
        className={`${styles.creditsLeftContainer} ${
          isSticky ? styles.fixedTop : ""
        }`}
      >
        <button className={styles.creditsButton}>
          You have {totalCredit?.total_credit ? totalCredit?.total_credit : "0"}{" "}
          Credits Left
        </button>
      </div> */}
        <div>
      {/* Invisible spacer that acts as a scroll trigger */}
      <div ref={triggerRef} style={{ height: '1px' }}></div>

      <div ref={stickyRef} className={styles.creditsLeftContainer}>
        <button className={styles.creditsButton}>
          You have {totalCredit?.total_credit ?? '0'} Credits Left
        </button>
      </div>
    </div>
   
    {buyCreditLoader && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      color: "#fff",
      fontSize: "1.2rem",
    }}
  >

   <div style={{ marginTop: "25vh", textAlign: "center" }}>
    <svg
    className={styles.gearSpinner}
    xmlns="http://www.w3.org/2000/svg"
    width="40" 
    height="40"
    viewBox="0 0 100 100"
    fill="white" 
  >
    <path
      d="M94 56.5v-13l-10.6-2.3c-.8-2.7-2-5.2-3.5-7.6l5.8-9.3-9.2-9.2-9.3 5.8c-2.4-1.5-5-2.7-7.6-3.5L56.5 6h-13l-2.3 10.6c-2.7.8-5.2 2-7.6 3.5l-9.3-5.8-9.2 9.2 5.8 9.3c-1.5 2.4-2.7 5-3.5 7.6L6 43.5v13l10.6 2.3c.8 2.7 2 5.2 3.5 7.6l-5.8 9.3 9.2 9.2 9.3-5.8c2.4 1.5 5 2.7 7.6 3.5L43.5 94h13l2.3-10.6c2.7-.8 5.2-2 7.6-3.5l9.3 5.8 9.2-9.2-5.8-9.3c1.5-2.4 2.7-5 3.5-7.6L94 56.5zM50 65a15 15 0 1 1 0-30 15 15 0 0 1 0 30z"
    />
  </svg>

  <p>Processing Payment...</p>
</div>
  </div>
)}

      {isAddModalOpen && (
        <AddCardModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </>
  );
};

export default CreditMatch;
