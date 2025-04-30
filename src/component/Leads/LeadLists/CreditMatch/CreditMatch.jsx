import React, { useEffect, useState } from "react";
import styles from "./CreditMatch.module.css";
import locallistImgs from "../../../../assets/Images/Leads/localistImg.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreditPlanList,
  totalCreditData,
} from "../../../../store/LeadSetting/leadSettingSlice";

const CreditMatch = () => {
  const [autoTopUp, setAutoTopUp] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch();

  const { userToken } = useSelector((state) => state.auth);
  const { registerData } = useSelector((state) => state.findJobs);
  const { creditPlanList, leadRequestList, totalCredit } = useSelector(
    (state) => state.leadSetting
  );
  console.log(totalCredit, "leadRequestList");

  const filterData = creditPlanList?.filter((item, index) => index === 0);
  const leadTotalCredit = leadRequestList?.filter((item, index) => index === 0);
  console.log(
    leadTotalCredit?.map((item) => item?.customer?.total_credit),
    "leadTotalCredit"
  );

  const handleAutoTopUpChange = () => {
    setAutoTopUp(!autoTopUp);
  };

  useEffect(() => {
    dispatch(getCreditPlanList());
    const data = {
      user_id: userToken?.remember_tokens,
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
      <div className={styles.buyCreditsContainer}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Buy more credits now</h2>
        </div>

        {filterData?.map((item, index) => (
          <div key={item?.id || index} className={styles.creditsSection}>
            <div className={styles.infoSection}>
              <div className={styles.creditsInfo}>
                <div className={styles.locationTag}>
                  <img src={locallistImgs} alt="credit icon" />
                  <span className={styles.creditsAmount}>
                    {item?.no_of_leads} credits
                  </span>
                </div>
                <div className={styles.usageInfo}>
                  <span className={styles.usageText}>{item?.description}</span>
                </div>
              </div>
            </div>

            <div className={styles.priceSection}>
              <div className={styles.priceInfo}>
                <div className={styles.totalPrice}>
                  ${item?.price} (Excl. tax)
                </div>
                <div className={styles.unitPrice}>
                  ${item?.per_credit}/credit
                </div>
              </div>
            </div>

            <div className={styles.actionSection}>
              <button className={styles.buyButton}>
                Buy {item?.no_of_leads} credits
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

      <div
        className={`${styles.creditsLeftContainer} ${
          isSticky ? styles.fixedTop : ""
        }`}
      >
        <button className={styles.creditsButton}>
          You have {totalCredit ? totalCredit : "0"} Credits Left
        </button>
      </div>
    </>
  );
};

export default CreditMatch;
