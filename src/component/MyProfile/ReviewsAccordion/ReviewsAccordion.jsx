// export default ReviewsAccordion;

import { useEffect, useRef, useState } from "react";
import styles from "./ReviewsAccordion.module.css";
import FacebookLogo from "../../../assets/Images/FacebookLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFacebookReviewStatus,
  getCustomerLinkApi,
  updateFacebookReviewLink,
  createUserTokenApiCall,
  getUserTokenApicall,
} from "../../../store/MyProfile/myProfileSlice";
import axiosInstance from "../../../Api/axiosInstance";
import { toast } from "react-toastify";
import { showToast } from "../../../utils";
import ReviewSection from "../../ViewProfile/Reviews/Reviews";
import { useNavigate, useParams } from "react-router-dom";
import facebookIcon from "../../../assets/Icons/facebook.svg";
import whatsUpIcon from "../../../assets/Icons/whatsup.svg";
import linkedInIcon from "../../../assets/Icons/linkedin.svg";
import twitterIcon from "../../../assets/Icons/twitter.svg";
import shareIcon from "../../../assets/Icons/share.svg";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import leftArrow from "../../../assets/Images/location/LeftArrow.svg";
import rightArrow from "../../../assets/Images/location/RightArrow.svg";
import { useKeenSlider } from "keen-slider/react";

const ReviewsAccordion = ({ details }) => {
  const [fbLink, setFbLink] = useState("");
  const [isFbSdkReady, setIsFbSdkReady] = useState(false);
  const [googleLink, setGoogleLink] = useState("");

  const [fbReviews, setFbReviews] = useState([]);
  const navigate = useNavigate();

  const [isShareOpen, setIsShareOpen] = useState(false);
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

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `Check my review link: ${customerLinkData}`
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      customerLinkData
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      customerLinkData
    )}&text=${encodeURIComponent("Check my review link!")}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      customerLinkData
    )}`,
  };

  useEffect(() => {
    const checkSdk = () => {
      // Check the custom flag set in index.html
      if (window.isFacebookSdkReady) {
        setIsFbSdkReady(true);
      } else {
        const timer = setTimeout(checkSdk, 200);
        return () => clearTimeout(timer); // Cleanup
      }
    };

    checkSdk();
  }, []);

  const handleFacebookLogin = async () => {
    const review = await dispatch(getUserTokenApicall());

    if ((review.status = true)) {
      const reviewsResponse = await fetch(
        `https://graph.facebook.com/v20.0/${review.message.page_id}/ratings?access_token=${review.message.page_access_token}`
      );

      const reviewsData = await reviewsResponse.json();

      if (reviewsData && reviewsData.data && reviewsData.data.length > 0) {
        setFbReviews(reviewsData.data);
        console.log("Reviews:", reviewsData.data);
      }
    }
    if (
      review?.status === false ||
      (review?.status === true && review?.message?.expired === "yes")
    ) {
      if (window.FB) {
        const requiredScopes = [
          "public_profile",
          "pages_show_list",
          "pages_read_user_content",
        ].join(",");

        window.FB.login(
          function (response) {
            if (response.authResponse) {
              console.log("Facebook Login Successful. User authorized app!");

              (async () => {
                try {
                  const userAccessToken = response.authResponse.accessToken;

                  const accessToken = await dispatch(
                    createUserTokenApiCall(userAccessToken)
                  );

                  if (accessToken) {
                    const updatedReview = await dispatch(getUserTokenApicall());
                    console.log("Fetched updated review:", updatedReview);
                  }

                  showToast(
                    "success",
                    "Successfully logged into Facebook. Fetching pages..."
                  );
                } catch (err) {
                  console.error("Error in API call:", err);
                  showToast(
                    "error",
                    "Error while fetching user token from backend."
                  );
                }
              })();
            } else {
              console.error("Facebook Login Failed or Cancelled.");
              showToast("error", "Facebook login was cancelled or denied.");
            }
          },
          { scope: requiredScopes }
        );
      }
    } else {
      showToast("error", "Facebook SDK is still loading. Please try again.");
    }
  };

  const sendTokenToBackend = async (userAccessToken) => {
    try {
      // Step 1: Get the pages connected to user
      // const accountsResponse = await fetch(
      //   `https://graph.facebook.com/v20.0/me/accounts?access_token=${userAccessToken}`
      // );

      const accountsData = await accountsResponse.json();

      if (accountsData && accountsData.data && accountsData.data.length > 0) {
        const page = accountsData.data[0]; // Take first page (or loop through if multiple)
        const pageId = page.id;
        const pageAccessToken = page.access_token;

        console.log("Fetched page:", page.name, pageId);

        // Step 2: Get reviews from that page
        const reviewsResponse = await fetch(
          `https://graph.facebook.com/v20.0/${pageId}/ratings?fields=reviewer{id,name},rating,review_text,recommendation_type,created_time&access_token=${pageAccessToken}`
        );

        const reviewsData = await reviewsResponse.json();

        if (reviewsData && reviewsData.data && reviewsData.data.length > 0) {
          setFbReviews(reviewsData.data);
          console.log("Reviews:", reviewsData.data);
          showToast("success", "Facebook reviews fetched successfully!");
          // You can store reviewsData.data in state or send to backend here
        } else {
          showToast("info", "No reviews found on this page.");
        }
      } else {
        showToast("error", "No Facebook pages found or invalid access token.");
      }
    } catch (error) {
      console.error("Error fetching Facebook data:", error);
      showToast("error", "Failed to fetch Facebook data.");
    }
  };

  const login = useGoogleLogin({
    flow: "auth-code",
    scope:
      "openid email profile https://www.googleapis.com/auth/business.manage",
    onSuccess: async (response) => {
      console.log("Auth code:", response.code);

      try {
        // Step 1: Get access token from your backend
        const tokenRes = await axiosInstance.post("/google/get-auth-token", {
          code: response.code,
        });

        console.log("Token response:", tokenRes.data);

        const accessToken = tokenRes.data.data.access_token;
        const refreshToken = tokenRes.data.data.refresh_token;

        // Step 2: Use the same access token to get reviews from YOUR backend
        // const reviewsRes = await axiosInstance.post("/google/get-reviews", {
        //   access_token: accessToken,
        // });

        // const reviewsRes = await axios.post(
        //   "http://localhost:5100/api/admin/google/get-reviews",
        //   {
        //     access_token: accessToken,
        //   }
        // );

        const reviewsRes = await axios.post(
          "https://dev.localists.com/google/get-reviews",
          {
            access_token: accessToken,
            refresh_token: refreshToken,
          }
        );

        console.log("Reviews from backend:", reviewsRes.data);

        // Store token for future use
        localStorage.setItem("google_access_token", accessToken);
        localStorage.setItem(
          "google_refresh_token",
          tokenRes.data.data.refreshToken
        );
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
      }
    },
    onError: (error) => console.log("Login failed:", error),
  });

  const sliderRef = useRef(null);
  const [sliderInstanceRef, slider] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 15 },
  });

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

      <p className={styles.sectionTitle}>Collect More Reviews</p>

      {/* <div className={styles.fieldGroup}>
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
      </div> */}

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
          {customerLinkData && (
            <button
              className={styles.secondaryBtn}
              onClick={() => setIsShareOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px", // space between text and icon
                justifyContent: "center",
              }}
            >
              <span>Share</span>
              <img
                src={shareIcon}
                alt="Share"
                style={{ height: "18px", width: "18px" }}
              />
            </button>
          )}
        </div>
      </div>

      {isShareOpen && (
        <div className={styles.shareOverlay}>
          <div className={styles.shareBox}>
            <h3>Share via</h3>
            <div className={styles.iconRow}>
              <a href={shareLinks.whatsapp} target="_blank" rel="noreferrer">
                <img
                  src={whatsUpIcon}
                  alt="WhatsApp"
                  style={{ height: "36px", width: "36px" }}
                />
              </a>
              <a href={shareLinks.facebook} target="_blank" rel="noreferrer">
                <img
                  src={facebookIcon}
                  alt="Facebook"
                  style={{ height: "36px", width: "36px" }}
                />
              </a>
              <a href={shareLinks.twitter} target="_blank" rel="noreferrer">
                <img
                  src={twitterIcon}
                  alt="Twitter"
                  style={{ height: "36px", width: "36px" }}
                />
              </a>
              <a href={shareLinks.linkedin} target="_blank" rel="noreferrer">
                <img
                  src={linkedInIcon}
                  alt="LinkedIn"
                  style={{ height: "36px", width: "36px" }}
                />
              </a>
            </div>
            <button
              onClick={() => setIsShareOpen(false)}
              className={styles.secondaryBtn}
              style={{ marginTop: "15px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className={styles.fieldGroup}>
        <label className={styles.fbLabel}>
          <img src={FacebookLogo} alt="Facebook" className={styles.fbIcon} />
          Import Google Reviews
        </label>
        <p className={styles.subtext}>
          Import reviews from your business Google page.
        </p>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="e.g. https://www.google.com/en/..."
            className={styles.input}
            value={googleLink}
            onChange={(e) => setGoogleLink(e.target.value)}
          />
          {/* <button className={styles.importBtn} onClick={handleLogin}>
            Import Reviews
          </button> */}
          {/* <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          /> */}
          <button className={styles.importBtn} onClick={() => login()}>
            Login with Google
          </button>
          {/* <button className={styles.importBtn} onClick={handleGoogleLogin}>
            Import Reviews
          </button> */}
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
      <div
        className={`${styles.localistBox} ${
          (viewProfileData?.reviews_count ?? 0) > 5 ? styles.scrollBox : ""
        }`}
      >
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
          <button
            className={styles.importBtn}
            onClick={handleFacebookLogin}
            // disabled={!isFbSdkReady}
          >
            Import Reviews
          </button>
        </div>
      </div>
      <div className={styles.reviewsContainer}>
        <div className={styles.arrowIconsWrapper}>
          <span className={styles.leftArrowWrapper}>
            <img
              src={leftArrow}
              alt="Left"
              className={styles.arrowIcon}
              // onClick={() => slider.current?.prev()}
              onClick={() => {
                slider.current?.prev();
              }}
            />
          </span>

          <span className={styles.rightArrowWrapper}>
            <img
              src={rightArrow}
              alt="Right"
              className={styles.arrowIcon}
              onClick={() => slider.current?.next()}
            />
          </span>
        </div>
        <div ref={sliderInstanceRef} className={styles.reviewSlider}>
          {fbReviews.map((rev, idx) => (
            <div
              key={idx}
              className={`${styles.reviewCard} ${
                idx === 0 ? styles.activeCard : ""
              }`}
            >
              <div className={styles.reviewHeader}>
                <div className={styles.avatarSection}>
                  <div className={styles.avatar}>
                    {rev.reviewer?.name?.[0] || "?"}
                  </div>
                  <div className={styles.reviewerName}>
                    {rev.reviewer?.name || "Test User"}
                  </div>
                </div>

                <div className={styles.reviewDate}>
                  {new Date(rev.created_time).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>

              <div className={styles.reviewStars}>
                {Array.from({ length: rev.rating }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>

              <p className={styles.reviewText}>
                {rev.review_text || "No text provided."}
              </p>
            </div>
          ))}
        </div>
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
