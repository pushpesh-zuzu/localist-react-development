import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { extractAllParams } from "../../../utils/decodeURLParams";
import { useLocation } from "react-router";

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
<<<<<<< HEAD

    if (userToken) {
      return;
    }
=======
    if (hasSent.current || userToken) return;
    hasSent.current = true;
>>>>>>> 2ea0b020843e2730ffc2629097d440d8ad15502c

    const updatedAnswers = buyerRequest?.questions || [];
    const formData = new FormData();
    //  console.log("📡 API Call being made once with form_status: 0");
    const isEverythingEmpty =
      !buyerRequest?.name?.trim() &&
      !buyerRequest?.email?.trim() &&
      !buyerRequest?.phone?.trim() &&
      !buyerRequest?.postcode?.trim() &&
      buyerRequest.questions.length === 0;

<<<<<<< HEAD
    const hasData =
      (buyerRequest?.name && buyerRequest.name.trim()) ||
      (buyerRequest?.email && buyerRequest.email.trim()) ||
      (buyerRequest?.phone && buyerRequest.phone.trim()) ||
      (buyerRequest?.postcode && buyerRequest.postcode.trim()) ||
      (buyerRequest?.questions && buyerRequest.questions.length > 0);

    if (!hasData) {
      return;
    }
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
=======
    if (isEverythingEmpty) {
      console.log("🚫 Skipping API call - all fields are empty");
      return;
    }
    console.log("🔍 Empty Check Details:", {
      name: !!buyerRequest?.name?.trim(),
      email: !!buyerRequest?.email?.trim(),
      phone: !!buyerRequest?.phone?.trim(),
      postcode: !!buyerRequest?.postcode?.trim(),
      questions: buyerRequest?.questions?.length > 0,
      city: !!citySerach?.trim(), // Just for info
      isEverythingEmpty: isEverythingEmpty,
>>>>>>> 2ea0b020843e2730ffc2629097d440d8ad15502c
    });
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

<<<<<<< HEAD
    if (navigator.sendBeacon) {
      const success = navigator.sendBeacon(
        "https://dev.localists.com/admin/api/customer/register-quote-customer",
        blob
      );

      if (success) {
        localStorage.removeItem("barkToken");
        localStorage.removeItem("barkUserToken");
        localStorage.removeItem("registerDataToken");
        localStorage.removeItem("registerTokens");
        localStorage.removeItem("createRequestToken");
      }
    } else {
      fetch(
        "https://dev.localists.com/admin/api/customer/register-quote-customer",
        {
          method: "POST",
          body: blob,
          keepalive: true,
        }
      ).then(() => {
=======
    dispatch(registerQuoteCustomer(formData))
      .then(() => {
        // console.log("✅ API Call successful - Data saved");
>>>>>>> 2ea0b020843e2730ffc2629097d440d8ad15502c
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
<<<<<<< HEAD
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to leave? Your data may be saved.";
    };

    const handleUnload = () => {
=======
    console.log("🔵 NavigationDetector mounted once");

    const handleBeforeUnload = (event) => {
      if (hasSent.current) return; // ✅ already sent, ignore
      // console.log("🟡 Browser/Tab close detected - sending data once");
>>>>>>> 2ea0b020843e2730ffc2629097d440d8ad15502c
      submitFormData();
      hasSent.current = true;
      event.preventDefault();
      event.returnValue = "";
    };

    // ✅ Add listener once
    window.addEventListener("beforeunload", handleBeforeUnload);
    // ✅ Cleanup once
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      // console.log("🧹 Cleanup complete");
    };
  }, []); // 🚀 NO DEPENDENCIES

  return null;
};

export default NavigationDetectorDesktop;
