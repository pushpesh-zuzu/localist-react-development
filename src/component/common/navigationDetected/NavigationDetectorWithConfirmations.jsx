// NavigationDetectorWithConfirmations.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { extractAllParams } from '../../../utils/decodeURLParams';
import { useLocation } from 'react-router';
import {
  registerQuoteCustomer,
} from "../../../store/Buyer/BuyerSlice";
const NavigationDetectorWithConfirmations = () => {
  const dispatch = useDispatch();
  
  // Yeh values aapke actual state se le aao
  const userToken = useSelector(state => state.auth.userToken);
 const { buyerRequest, requestLoader, citySerach, questionanswerData } =
    useSelector((state) => state.buyer); 
  // ... other state variables
  const { search } = useLocation();
  const allParams = extractAllParams(search || window.location.search);

  // ✅ Ab saare parameters mil jayenge
  const campaignid = allParams.gad_campaignid || "";
  const keyword = allParams.keyword || "";
  const gclid = allParams.gclid || "";
  const campaign = allParams.utm_campaign || "";
  const adGroup = allParams.AgId || "";
  const targetID = allParams.utm_term || "";
  const msclickid = allParams.utm_msclkid || "";
  const utm_source = allParams.utm_source || "";

  const submitFormData = () => {
    if (!userToken) {
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

      console.log('📡 API Call being made with form_status: 0');
      
      // API call karo - yeh aapka actual dispatch action hai
      dispatch(registerQuoteCustomer(formData)).then((result) => {
        if (result) {
          console.log('✅ API Call successful - Data saved');
          // Cleanup karo agar needed hai
          localStorage.removeItem("barkToken");
          localStorage.removeItem("barkUserToken");
          localStorage.removeItem("registerDataToken");
          localStorage.removeItem("registerTokens");
          localStorage.removeItem("createRequestToken");
        }
      }).catch((error) => {
        console.error('❌ API Call failed:', error);
      });
    }
  };

  useEffect(() => {
    console.log('🔵 Component mounted - Setting up event listeners');

    // Back button detection with API call
    // const handlePopState = (event) => {
    //   console.log('🔴 BACK BUTTON DETECTED!');
      
    //   // Confirmation dialog show karo
    //   const shouldPrevent = window.confirm(
    //     'Kya aap sachme back jana chahte hain? Unsaved changes lost ho jayenge.'
    //   );
      
    //   if (shouldPrevent) {
    //     console.log('⛔ User ne back cancel kardia');
    //     // Wapas same page pe set karo
    //     window.history.pushState(null, '', window.location.href);
    //   } else {
    //     console.log('✅ User ne back confirm kardia - API Call starting');
    //     // API call karo before allowing navigation
    //     submitFormData();
    //     // Navigation allow karo - API call async hai but navigation nahi rukega
    //   }
    // };

    // BROWSER CLOSE DETECTION with API call
    const handleBeforeUnload = (event) => {
      console.log('🟡 BROWSER/TAB CLOSE DETECTED - Making API Call');
      
      // API call karo browser close par
      // IMPORTANT: Ye sync way mein karna hoga kyunki page close ho raha hai
      submitFormData();
      
      // Browser ka default confirmation dialog
      event.preventDefault();
      // event.returnValue = 'Kya aap sachme page leave karna chahte hain? Unsaved changes lost ho jayenge.';
    };

    // IMPORTANT: Pehle history state set karo
    window.history.pushState(null, '', window.location.href);
    console.log('📝 History state set successfully');

    // Add event listeners
    // window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);
    console.log('✅ Event listeners added for back button AND browser close');

    // Cleanup function
    return () => {
      // window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      console.log('🔄 Cleanup done');
    };
  }, [dispatch, userToken, buyerRequest, citySerach]);

  return null
};

export default NavigationDetectorWithConfirmations;