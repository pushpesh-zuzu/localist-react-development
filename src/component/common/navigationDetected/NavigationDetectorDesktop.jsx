import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { extractAllParams } from "../../../utils/decodeURLParams";
import { useLocation } from "react-router";
import useUserInfo from "../../../utils/getUserIp";
import { baseURL } from "../../../Api/axiosInstance";

const NavigationDetectorDesktop = () => {
  const userToken = useSelector((state) => state.auth.userToken);
  const { buyerRequest, citySerach } = useSelector((state) => state.buyer);
  const { search } = useLocation();
  const allParams = extractAllParams(search || window.location.search);

  const campaignid = allParams.gad_campaignid || "";
  const keyword = allParams.keyword || "";
  const gclid = allParams.gclid || "";
  const campaign = allParams.utm_campaign || "";
  const adGroup = allParams.AgId || "";
  const targetID = allParams.utm_term || "";
  const msclickid = allParams.utm_msclkid || "";
  const utm_source = allParams.utm_source || "";
  const { ip, url } = useUserInfo();

  // 🧠 Ref to store latest data safely
  const latestData = useRef({
    userToken,
    buyerRequest,
    citySerach,
  });

  // Keep ref updated (no re-renders)
  useEffect(() => {
    latestData.current = { userToken, buyerRequest, citySerach };
  }, [userToken, buyerRequest, citySerach]);

  // Prevent multiple API calls
  const hasSent = useRef(false);

  const sendBeaconData = () => {
    const { userToken, buyerRequest, citySerach } = latestData.current;

    // ✅ Already sent or user is logged in
    if (hasSent.current || userToken) {
      console.log("🚫 Skipping - already sent or user logged in");
      return;
    }

    // ✅ Check if all fields are empty
    const isEverythingEmpty =
      !buyerRequest?.name?.trim() &&
      !buyerRequest?.email?.trim() &&
      !buyerRequest?.phone?.trim() &&
      !buyerRequest?.postcode?.trim() &&
      (!buyerRequest?.questions || buyerRequest.questions.length === 0);

    if (isEverythingEmpty) {
      console.log("🚫 Skipping - all fields empty");
      return;
    }

    hasSent.current = true;

    const updatedAnswers = buyerRequest?.questions || [];

    // ✅ Prepare data as JSON (sendBeacon works better with Blob)
    const payload = {
      name: buyerRequest?.name || "",
      email: buyerRequest?.email || "",
      phone: buyerRequest?.phone || "",
      questions: JSON.stringify(updatedAnswers),
      service_id: buyerRequest?.service_id || "",
      city: citySerach || "",
      postcode: buyerRequest?.postcode || "",
      campaignid: campaignid,
      gclid: gclid,
      campaign: campaign,
      adgroup: adGroup,
      targetid: targetID,
      msclickid: msclickid,
      utm_source: utm_source,
      keyword: keyword,
      form_status: 0,
      entry_url: url,
      user_ip_address: ip,
    };
    const isDevEnvironment =
      typeof window !== "undefined" &&
      window.location.hostname === "dev.localists.com";
    const isProduction =
      typeof window !== "undefined" &&
      window.location.hostname === "localists.com";

    // ✅ Convert to FormData
    const formData = new FormData();
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    // ✅ Get your API endpoint (replace with actual endpoint)
    // const API_ENDPOINT = `${baseURL}/customer/register-quote-customer`; // 👈 Update this
    const API_ENDPOINT = isDevEnvironment
      ? "https://dev.localists.com/admin/api/customer/register-quote-customer"
      : isProduction
      ? "https://localists.com/admin/api/customer/register-quote-customer"
      : "https://dev.localists.com/admin/api/customer/register-quote-customer"; // 👈 Update this

    try {
      // ✅ sendBeacon returns true if queued successfully
      const success = navigator.sendBeacon(API_ENDPOINT, formData);

      if (success) {
        console.log("✅ Beacon sent successfully");
        // Clear localStorage
        localStorage.removeItem("barkToken");
        localStorage.removeItem("barkUserToken");
        localStorage.removeItem("registerDataToken");
        localStorage.removeItem("registerTokens");
        localStorage.removeItem("createRequestToken");
      } else {
        console.warn("⚠️ Beacon failed to queue");
      }
    } catch (error) {
      console.error("❌ Beacon error:", error);
    }
  };

  useEffect(() => {
    console.log("🔵 NavigationDetector mounted");

    const handleBeforeUnload = (event) => {
      console.log("🟡 beforeunload triggered - sending beacon");
      sendBeaconData();
      // Note: Don't use event.preventDefault() or returnValue unless you want confirmation dialog
    };

    const handleVisibilityChange = () => {
      // ✅ Extra safety: send when tab becomes hidden (works on mobile too)
      if (document.visibilityState === "hidden") {
        console.log("👁️ Tab hidden - sending beacon");
        sendBeaconData();
      }
    };

    // ✅ Add listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // ✅ Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      console.log("🧹 Cleanup complete");
    };
  }, []); // 🚀 NO DEPENDENCIES

  return null;
};

export default NavigationDetectorDesktop;
