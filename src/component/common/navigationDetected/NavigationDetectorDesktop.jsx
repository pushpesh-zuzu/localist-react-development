import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { extractAllParams } from "../../../utils/decodeURLParams";
import { useLocation } from "react-router";
import { registerQuoteCustomer } from "../../../store/Buyer/BuyerSlice";

const NavigationDetectorDesktop = () => {
  const dispatch = useDispatch();
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

  const latestData = useRef({ userToken, buyerRequest, citySerach });

  useEffect(() => {
    latestData.current = { userToken, buyerRequest, citySerach };
  }, [userToken, buyerRequest, citySerach]);

  const submitFormData = () => {
    const { userToken, buyerRequest, citySerach } = latestData.current;

    if (userToken) {
      console.log("🔴 User token exists, skipping");
      return;
    }

    const updatedAnswers = buyerRequest?.questions || [];

    // Check if form has any meaningful data
    const hasData =
      (buyerRequest?.name && buyerRequest.name.trim()) ||
      (buyerRequest?.email && buyerRequest.email.trim()) ||
      (buyerRequest?.phone && buyerRequest.phone.trim()) ||
      (buyerRequest?.postcode && buyerRequest.postcode.trim()) ||
      (buyerRequest?.questions && buyerRequest.questions.length > 0);

    if (!hasData) {
      console.log("🚫 No meaningful data found, skipping API call");
      return;
    }
    // Use beacon API for reliable sending during page unload
    const beaconData = new URLSearchParams();
    beaconData.append("name", buyerRequest?.name || "");
    beaconData.append("email", buyerRequest?.email || "");
    beaconData.append("phone", buyerRequest?.phone || "");
    beaconData.append("questions", JSON.stringify(updatedAnswers));
    beaconData.append("service_id", buyerRequest?.service_id || "");
    beaconData.append("city", citySerach || "");
    beaconData.append("postcode", buyerRequest?.postcode || "");
    beaconData.append("campaignid", campaignid || "");
    beaconData.append("gclid", gclid || "");
    beaconData.append("campaign", campaign || "");
    beaconData.append("adgroup", adGroup || "");
    beaconData.append("targetid", targetID || "");
    beaconData.append("msclickid", msclickid || "");
    beaconData.append("utm_source", utm_source || "");
    beaconData.append("keyword", keyword || "");
    beaconData.append("form_status", "0");

    const blob = new Blob([beaconData.toString()], {
      type: "application/x-www-form-urlencoded",
    });

    // Try beacon first, if not available use fetch with keepalive
    if (navigator.sendBeacon) {
      const success = navigator.sendBeacon(
        "https://dev.localists.com/admin/api/customer/register-quote-customer",
        blob
      );
      console.log("📡 Beacon API result:", success);

      if (success) {
        localStorage.removeItem("barkToken");
        localStorage.removeItem("barkUserToken");
        localStorage.removeItem("registerDataToken");
        localStorage.removeItem("registerTokens");
        localStorage.removeItem("createRequestToken");
      }
    } else {
      // Fallback to fetch with keepalive
      fetch(
        "https://dev.localists.com/admin/api/customer/register-quote-customer",
        {
          method: "POST",
          body: blob,
          keepalive: true,
        }
      ).then(() => {
        localStorage.removeItem("barkToken");
        localStorage.removeItem("barkUserToken");
        localStorage.removeItem("registerDataToken");
        localStorage.removeItem("registerTokens");
        localStorage.removeItem("createRequestToken");
      });
    }
  };

  useEffect(() => {
    console.log("🔵 NavigationDetector mounted");

    const handleBeforeUnload = (event) => {
      console.log("🟠 beforeunload event - showing dialog");

      // Show dialog every time by preventing default and setting returnValue
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to leave? Your data may be saved.";
    };

    const handleUnload = () => {
      console.log("🟠 unload event - making API call");
      submitFormData();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  return null;
};

export default NavigationDetectorDesktop;
