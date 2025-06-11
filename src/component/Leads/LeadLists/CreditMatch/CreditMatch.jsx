import React, { useEffect, useState } from "react";
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
  const navigate = useNavigate()

  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const [isAddModalOpen,setIsAddModalOpen] = useState(false)
  const { creditPlanList, leadRequestList, totalCredit, } = useSelector(
    (state) => state.leadSetting
  );
  const handleBuyNow = (item) => {
    console.log(item,"item")
    // navigate("/payment-details")
      let credits = item.no_of_leads; 
    
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
        top_up: autoTopUp ? 1 : 0,
      };
    
      console.log(creditData, item?.no_of_leads, credits, vatTotal, 'creditData');
    
      dispatch(addBuyCreditApi(creditData)).then((result) => {
        
      if (result?.success) {
        showToast('success', result?.message);
       
      } else if (result?.success === false) {
        setIsAddModalOpen(true)
        // navigate("/payment-details");
      }
    });
  }
  const filterData = creditPlanList?.filter((item, index) => index === 0);
  const leadTotalCredit = leadRequestList?.filter((item, index) => index === 0);
  console.log(
    leadTotalCredit?.map((item) => item?.customer?.total_credit),
    "leadTotalCredit"
  );
  console.log(totalCredit, filterData,"leadRequestList");

  const handleAutoTopUpChange = () => {
    setAutoTopUp(!autoTopUp);
  };

  useEffect(() => {
    dispatch(getCreditPlanList());
   
    const data = {
      user_id: userToken?.remember_tokens ? userToken?.remember_tokens : registerData?.remember_tokens,
    };
    dispatch(totalCreditData(data));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 250) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
     {filterData?.length > 0  && <div className={styles.buyCreditsContainer}>
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
                  <span className={styles.usageText}>{item?.description ? item?.description : "20% OFF"}</span>
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
              <button className={styles.buyButton} onClick={() =>handleBuyNow(item)}>
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
      </div>}

      <div
        className={`${styles.creditsLeftContainer} ${
          isSticky ? styles.fixedTop : ""
        }`}
      >
        <button className={styles.creditsButton}>
          You have {totalCredit?.total_credit ? totalCredit?.total_credit : "0"} Credits Left
        </button>
      </div>
      {isAddModalOpen && <AddCardModal onClose={() => setIsAddModalOpen(false)}/>}
    </>
  );
};

export default CreditMatch;
