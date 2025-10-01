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
import { Navigate, useNavigate, useParams } from "react-router-dom";
import facebookIcon from "../../../assets/Icons/facebook.svg";
import whatsUpIcon from "../../../assets/Icons/whatsup.svg";
import linkedInIcon from "../../../assets/Icons/linkedin.svg";
import twitterIcon from "../../../assets/Icons/twitter.svg";
import shareIcon from "../../../assets/Icons/share.svg";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwt_decode } from "jwt-decode";
import jwt_decode from "jwt-decode";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const ReviewsAccordion = ({ details }) => {
  const [fbLink, setFbLink] = useState("");
  const [googleLink, setGoogleLink] = useState("");
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

  // const handleLogin = (credentialResponse) => {
  //   const token = credentialResponse.credential;
  //   const decoded = jwt_decode(token);
  //   console.log("Google User:", decoded);

  //   // Send token to backend for exchange with access token
  //   fetch("http://localhost:5100/auth/callback", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ token }),
  //   });
  // };

  // const login = useGoogleLogin({
  //   // flow: "auth-code", //  important
  //   scope:
  //     "openid email profile https://www.googleapis.com/auth/business.manage",
  //   onSuccess: async (response) => {
  //     console.log("Auth code:", response.code);

  //     // Send auth code to backend
  //     //   await axiosInstance.post("/auth/callback", {
  //     //     code: response.code,
  //     //   });
  //     // },
  //     // onError: () => {
  //     //   console.log("Login Failed");
  //     // },
  //     try {
  //       const res = await axiosInstance.post("/auth/callback", {
  //         code: response.code,
  //       });
  //       console.log("Reviews from backend:", res.data.reviews);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   },
  //   onError: () => console.log("Login failed"),
  // });

  const login = useGoogleLogin({
    scope: "openid email profile https://www.googleapis.com/auth/business.manage",
    onSuccess: async (response) => {
      console.log("Login Success:", response);

      // You get access_token directly here
      const accessToken = response.access_token;

      try {
        // Example: Call Google My Business API directly from frontend
        const res = await fetch(
          `https://mybusiness.googleapis.com/v4/accounts`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await res.json();
        console.log("Google My Business Accounts:", data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    },
    onError: () => console.log("Login failed"),
  });

  const handleSuccess = async (response) => {
    try {
      // response.credential contains the JWT token
      const decoded = jwt_decode(response.credential);
      console.log("Decoded JWT:", decoded);

      // Save token locally
      localStorage.setItem("google_access_token", response.credential);

      // Send token to backend to fetch Google Reviews
      const res = await axiosInstance.post("/auth/callback", {
        token: response.credential,
      });

      console.log("Reviews from backend:", res.data);
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  };

  const handleError = () => {
    console.error("Google login failed");
  };

  const handleGoogleLogin = async () => {
    try {
      const client = google.accounts.oauth2.initTokenClient({
        client_id:
          "http://1090455090567-4tao1nnrogtke2fgf4ad00p17en31pfc.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/business.manage",
        callback: async (tokenResponse) => {
          // 👉 Send tokenResponse.access_token to backend
          // backend will call Google My Business API to fetch reviews
          console.log("Access Token:", tokenResponse.access_token);

          // Send token to backend
          await axios.post("http://localhost:5000/api/google-reviews", {
            access_token: tokenResponse.access_token,
          });
        },
      });

      client.requestAccessToken();
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  // const handleLogin = (credentialResponse) => {
  //   // const token = credentialResponse.credential;
  //   // const decoded = jwt_decode(token);
  //   // console.log("Google User:", decoded);
  //   // // Send token to backend for exchange with access token
  //   // fetch("http://localhost:5100/auth/callback", {
  //   //   method: "POST",
  //   //   headers: { "Content-Type": "application/json" },
  //   //   body: JSON.stringify({ token }),
  //   // });
  //   // window.location.href = "http://localhost:5100/auth/google";
  //   const popup = window.open(
  //     "http://localhost:5100/auth/google",
  //     "GoogleLogin",
  //     "width=500,height=600"
  //   );

  //   // navigate("/sellers/leads");

  //   // Optional: listen for message from backend if you postMessage later
  //   window.addEventListener("message", (event) => {
  //     console.log("Received data from popup:", event.data);
  //     if (event.origin !== "http://localhost:5100") return;
  //     // You can now update your UI with reviews
  //   });
  // };

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
          <button onClick={() => login()}>Login with Google</button>
          {/* <button className={styles.importBtn} onClick={handleGoogleLogin}>
            Import Reviews
          </button> */}
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
