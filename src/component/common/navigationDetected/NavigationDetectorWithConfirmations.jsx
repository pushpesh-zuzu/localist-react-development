import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { extractAllParams } from "../../../utils/decodeURLParams";
import { useLocation } from "react-router";
import { registerQuoteCustomer } from "../../../store/Buyer/BuyerSlice";

const NavigationDetectorWithConfirmations = () => {
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

  const submitFormData = () => {
    const { userToken, buyerRequest, citySerach } = latestData.current;
    if (hasSent.current || userToken) return;
    hasSent.current = true;

    const updatedAnswers = buyerRequest?.questions || [];
    const formData = new FormData();

    formData.append("name", buyerRequest?.name);
    formData.append("email", buyerRequest?.email);
    formData.append("phone", buyerRequest?.phone);
    formData.append("questions", JSON.stringify(updatedAnswers));
    formData.append("service_id", buyerRequest?.service_id || "");
    formData.append("city", citySerach || "");
    formData.append("postcode", buyerRequest?.postcode || "");
    formData.append("campaignid", campaignid || "");
    formData.append("gclid", gclid || "");
    formData.append("campaign", campaign || "");
    formData.append("adgroup", adGroup || "");
    formData.append("targetid", targetID || "");
    formData.append("msclickid", msclickid || "");
    formData.append("utm_source", utm_source || "");
    formData.append("keyword", keyword || "");
    formData.append("form_status", 0);

    console.log("📡 API Call being made once with form_status: 0");

    dispatch(registerQuoteCustomer(formData))
      .then(() => {
        console.log("✅ API Call successful - Data saved");
        localStorage.removeItem("barkToken");
        localStorage.removeItem("barkUserToken");
        localStorage.removeItem("registerDataToken");
        localStorage.removeItem("registerTokens");
        localStorage.removeItem("createRequestToken");
      })
      .catch((error) => {
        console.error("❌ API Call failed:", error);
      });
  };

  useEffect(() => {
    console.log("🔵 NavigationDetector mounted once");

    const handleBeforeUnload = (event) => {
      if (hasSent.current) return; // ✅ already sent, ignore
      console.log("🟡 Browser/Tab close detected - sending data once");
      submitFormData();
      hasSent.current = true;
      event.preventDefault();
      event.returnValue = "";
    };

    // ✅ Add listener once
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleBeforeUnload); // Mobile Android/iOS
    window.addEventListener("blur", handleBeforeUnload);

    // ✅ Cleanup once
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handleBeforeUnload);
      window.removeEventListener("visibilitychange", handleBeforeUnload);
      window.removeEventListener("blur", handleBeforeUnload);

      console.log("🧹 Cleanup complete");
    };
  }, []); // 🚀 NO DEPENDENCIES

  return null;
};

export default NavigationDetectorWithConfirmations;
