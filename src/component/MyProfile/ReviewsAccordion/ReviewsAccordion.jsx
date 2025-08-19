// export default ReviewsAccordion;

import { useEffect, useState } from "react";
import styles from "./ReviewsAccordion.module.css";
import FacebookLogo from "../../../assets/Images/FacebookLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFacebookReviewStatus,
  getCustomerLinkApi,
  updateFacebookReviewLink,
} from "../../../store/MyProfile/myProfileSlice";
import { addViewProfileList } from "../../../store/LeadSetting/leadSettingSlice";
import axiosInstance from "../../../Api/axiosInstance";
import { toast } from "react-toastify";
import { showToast } from "../../../utils";
import ReviewSection from "../../ViewProfile/Reviews/Reviews";
import { useParams } from "react-router-dom";

const ReviewsAccordion = ({ details }) => {
  const [fbLink, setFbLink] = useState("");
  const onCopyUrl = () => {
    navigator.clipboard.writeText(customerLinkData);
    showToast("success", "Link copied to clipboard!");
  };
  const { viewProfileData } = useSelector((state) => state.leadSetting);
  const requestId = useParams();
  const shouldDisableActions = requestId?.requestId;

  const dispatch = useDispatch();
  const {
    customerLinkData,
    facebookReviewUpdateSuccess,
    facebookReviewUpdateError,
    sellerLoader,
  } = useSelector((state) => state.myProfile);

  const handleSubmit = () => {
    dispatch(updateFacebookReviewLink(fbLink));
  };
  useEffect(() => {
    dispatch(getCustomerLinkApi());
  }, []);

  useEffect(() => {
    if (facebookReviewUpdateSuccess) {
      toast.success("Facebook review link saved successfully!");
      dispatch(clearFacebookReviewStatus());
    } else if (facebookReviewUpdateError) {
      toast.error(`Error: ${facebookReviewUpdateError}`);
      dispatch(clearFacebookReviewStatus());
    }
  }, [facebookReviewUpdateSuccess, facebookReviewUpdateError, dispatch]);

  return (
    <div className={styles.wrapper}>
      {/* <p className={styles.overAllText}>Your Review Rating</p> */}
      {/* <div className={styles.alertBox}>
        <span>
          you don’t have a rating because you haven’t collected any customer reviews. Start collecting or uploading reviews to improve your score.
        </span>
        <p>
          studies show 90% of customers trust online feedback as much as personal recommendations.
        </p>
      </div> */}

      <h3 className={styles.sectionTitle}>Collect More Reviews</h3>

      <div className={styles.fieldGroup}>
        <label className={styles.reviewsLabel}>
          Invite your customers to leave a review
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
        <label className={styles.reviewsLabel}>Share your review link</label>
        <div className={styles.row}>
          <input
            type="text"
            className={styles.input}
            value={customerLinkData}
            readOnly
          />
          <button className={styles.secondaryBtn} onClick={onCopyUrl}>
            Copy Link
          </button>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fbLabel}>
          <img src={FacebookLogo} alt="Facebook" className={styles.fbIcon} />
          Import Facebook & Instagram Reviews
        </label>
        <p className={styles.subtext}>
          Import reviews from your business Facebook page.
        </p>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="e.g. https://www.facebook.com/en/..."
            className={styles.input}
            value={fbLink}
            onChange={(e) => setFbLink(e.target.value)}
          />
          <button className={styles.importBtn} onClick={handleSubmit}>
            Import Reviews
          </button>
        </div>
      </div>

      <label className={styles.reviewsLabel}>Localists.com Reviews</label>
      {/* <div className={styles.localistBox}>
        <strong>You don’t have any reviews yet on Localists.com</strong>
        <p>
          Your reviews can come from any of your customers — not just those found through Localists.com. Add them today add improve new business wins!
        </p>
        <ReviewSection details={viewProfileData} showSummary={false} />
      </div> */}
      <div className={styles.localistBox}>
        {viewProfileData?.reviews_count > 0 ? (
          <ReviewSection details={viewProfileData} showSummary={false} />
        ) : (
          <>
            <strong>You don’t have any reviews yet on Localists.com</strong>
            <p>
              Your reviews can come from any of your customers — not just those
              found through Localists.com. Add them today and improve new
              business wins!
            </p>
          </>
        )}
      </div>

      {/* <div className={styles.buttonRow}>
        <button className={styles.cancelBtn}>Cancel</button>
        <button className={styles.saveBtn} onClick={handleSubmit}>
          Save
        </button>
      </div> */}
    </div>
  );
};

export default ReviewsAccordion;
