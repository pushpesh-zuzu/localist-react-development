import React, { useEffect } from "react";
import styles from "./ReviewsAccordion.module.css";
import FacebookLogo from "../../../assets/Images/FacebookLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerLinkApi } from "../../../store/MyProfile/myProfileSlice";

const ReviewsAccordion = () => {
  const dispatch = useDispatch();
  const  { customerLinkData } = useSelector((state) => state.myProfile )

  useEffect(() => {
   
    dispatch(getCustomerLinkApi()); 
  }, []);
  const onCopyUrl = () => {
    navigator.clipboard.writeText(customerLinkData);
    
  }
   return (
    <>
   { <div className={styles.wrapper}>
      <div className={styles.alertBox} >
        <span>
          You don’t have a rating because you don’t have any customer reviews.
        </span>
        <p>
          For nearly 9 in 10 consumers, an online review is as important as a
          personal recommendation.
        </p>
      </div>

      <h3 className={styles.sectionTitle}>Get more reviews</h3>

      <div className={styles.fieldGroup}>
        <label className={styles.reviewsLabel}>
          Invite your customers to leave reviews
        </label>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="Separate email addresses using commas"
            className={styles.input}
          />
          <button className={styles.primaryBtn}>Invite</button>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.reviewsLabel}>
          Share this link with your customers
        </label>
        <div className={styles.row}>
          <input
            type="text"
            className={styles.input}
            value={customerLinkData}
            readOnly
          />
          <button className={styles.secondaryBtn} onClick={onCopyUrl}>Copy Link</button>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fbLabel}>
          <img src={FacebookLogo} alt="Facebook" className={styles.fbIcon} />
          Facebook reviews
        </label>
        <p className={styles.subtext}>
          Import customer reviews from your company’s Facebook page.
        </p>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="e.g. https://www.facebook.com/en/..."
            className={styles.input}
          />
          <button className={styles.importBtn}>Import Reviews</button>
        </div>
      </div>

      <label className={styles.reviewsLabel}>Localist reviews </label>
      <div className={styles.localistBox}>
        <strong>You have no reviews on bark yet</strong>
        <p>
          Your reviews don’t have to just come from customers you found on Bark,
          they can also be from your existing customers.
        </p>
      </div>

      <div className={styles.buttonRow}>
        <button className={styles.cancelBtn}>Cancel</button>
        <button className={styles.saveBtn}>Save</button>
      </div>
    </div>}
    </>
  );
};

export default ReviewsAccordion;
