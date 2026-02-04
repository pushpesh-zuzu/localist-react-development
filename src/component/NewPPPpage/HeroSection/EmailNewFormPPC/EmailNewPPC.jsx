import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./EmailNewPPC.module.css";
import { checkEmailIdApi } from "../../../../store/FindJobs/findJobSlice";
import {
  registerQuoteCustomer,
  setbuyerRequestData,
} from "../../../../store/Buyer/BuyerSlice";
import { validateEmail } from "../../../../utils/validateEmail";
import { useEmailCheck } from "../../../../utils/emailExist";
import CardLayoutWrapper from "../../../MultiStepForm/steps/CardLayoutWrapper/CardLayoutWrapper";
import { useLocation } from "react-router";
import { extractAllParams } from "../../../../utils/decodeURLParams";
import useUserInfo from "../../../../utils/getUserIp";

const EmailNewPPC = ({ nextStep, onBack, isPPCPages = false }) => {
  const { search } = useLocation();
  const allParams =
    typeof window !== "undefined" &&
    extractAllParams(search || window.location.search);

    const campaignid = allParams.campaign_id || "";
  const keyword = allParams.keyword || "";
  const gclid = allParams.gclid || "";
  const msclkid = allParams.msclkid || "";
  const adgroup_id = allParams.adgroup_id;
  const platform_source = allParams.source || "";
  const campaign = allParams.campaign || "";
  const adgroup = allParams.adgroup || "";
  const matchtype = allParams.matchtype || "";
  const device = allParams.device || "";
  const loc_physical_ms = allParams.loc_physical_ms || "";
  const utm_search_term = allParams.utm_search_term || "";
  const { ip, url } = useUserInfo();
  const dispatch = useDispatch();
  const { searchServiceLoader, citySerach } = useSelector(
    (state) => state.findJobs,
  );
  const { buyerRequest } = useSelector((state) => state.buyer);
  const [email, setEmail] = useState(buyerRequest?.email);
  const [isBannerText, setIsBannerText] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const { isEmailAvailable } = useEmailCheck(email);
  const [inputType, setInputType] = useState("text");

  const [errors, setErrors] = useState({
    email: false,
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: false }));
    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        email: e.target.value,
      }),
    );
  };

  const handleEmailFocus = () => {
    setInputType("email");
  };
  const handleEmailBlur = () => {
    if (!email) {
      setInputType("text");
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      email: !isPPCPages && (!email || !validateEmail(email)),
    };

    if (!isPPCPages && newErrors.email && !emailErrorMessage) {
      setEmailErrorMessage("Please enter a valid email address.");
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError) return;

    const finalEmail = isPPCPages ? buyerRequest?.email || "" : email;
    const res = await dispatch(checkEmailIdApi({ email }));
    if (res.success) {
      dispatch(setbuyerRequestData({ email: finalEmail }));
      const hasQuestionNo = buyerRequest.questions.some(
        (q) => q && typeof q === "object" && "question_no" in q,
      );
      const answersToSend = hasQuestionNo
        ? buyerRequest.questions.map((q) => {
            if (!q || typeof q !== "object") return q;
            const { question_no, ...rest } = q;
            return rest;
          })
        : buyerRequest.questions;
      const formData = new FormData();
      formData.append("name", buyerRequest?.name);
      formData.append("email", finalEmail);
      formData.append("phone", buyerRequest?.phone);
      formData.append("questions", JSON.stringify(answersToSend));
      formData.append("service_id", buyerRequest?.service_id);
      formData?.append("city", buyerRequest?.city);
      formData.append("postcode", buyerRequest?.postcode);
      formData.append("form_status", 1);
      formData.append("campaignid", campaignid || "");
      formData.append("gclid", gclid || "");
      formData.append("campaign", campaign || "");
      formData.append("adgroup", adgroup || "");
      formData.append("msclickid", msclkid || "");
      formData.append("adgroup_id", adgroup_id || "");
      formData.append("matchtype", matchtype || "");
      formData.append("device", device || "");
      formData.append("loc_physical_ms", loc_physical_ms || "");
      formData.append("utm_search_term", utm_search_term || "");
      formData.append("platform_source", platform_source);
      formData.append("keyword", keyword || "");
      formData.append("entry_url", url);
      formData.append("user_ip_address ", ip);

      dispatch(registerQuoteCustomer(formData)).then((result) => {
        if (result) {
          nextStep();
        }
      });
    } else {
      return;
    }
  };

  const handleBackClick = () => {
    onBack();
  };
  const handleBannerText = () => {
    setIsBannerText(false);
  };

  useEffect(() => {
    console.log(isEmailAvailable, "sss");
    if (!isEmailAvailable) {
      setEmail("");
      dispatch(
        setbuyerRequestData({
          ...buyerRequest,
          email: "",
        }),
      );
    }
  }, [isEmailAvailable]);
  return (
    <div style={{ maxWidth: "592px", marginLeft: "auto", marginRight: "auto" }}>
      <CardLayoutWrapper
        title={`You're nearly done! Just enter a few details to get your custom quotes.`}
        onButtonClick={handleSubmit}
        onBackClick={handleBackClick}
        buttonText="Next"
        showBackButton={true}
        disableNextButton={searchServiceLoader}
        loader={searchServiceLoader}
      >
        <div className={styles.infoWrapper}>
          {/* Hidden trap fields for auto-fill prevention */}
          <input
            type="text"
            name="username"
            style={{ display: "none", position: "absolute", left: "-9999px" }}
            autoComplete="new-password"
            tabIndex="-1"
          />

          <div style={{ marginBottom: "10px" }}>
            <input
              type={inputType}
              placeholder="Email"
              className={`${styles.input} ${
                errors?.email ? styles.inputError : ""
              }`}
              value={email}
              onChange={handleEmailChange}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              autoComplete="new-password"
              name="user_email_address"
              id="user_email_address"
            />
            {errors?.email && (
              <span style={{ color: "red" }} className={styles.errorMessage}>
                Please enter a valid email address.
              </span>
            )}
          </div>

          <p className={styles.subText}>
            We only use this to match you with trusted professionals.
          </p>
        </div>
        {/* // )} */}
      </CardLayoutWrapper>
    </div>
  );
};

export default EmailNewPPC;
