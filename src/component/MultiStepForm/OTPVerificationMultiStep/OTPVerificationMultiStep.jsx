import React, { useEffect, useRef, useState } from "react";
import styles from "./OTPVerificationMultiStep.module.css";
import {
  createRequestData,
  resendOtp,
  setBuyerStep,
  verifyPhoneNumberData,
} from "../../../store/Buyer/BuyerSlice";
import { showToast } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";


const OTPVerificationMultiStep = ({
  open,
  nextStep,
  isThankuPageOnlyShow = false,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);

  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const {
    buyerRequest,
    requestDataList,
    citySerach,
    createRequestToken,
    requestId,
    requestUserPhone,
    resendOtpLoader,
  } = useSelector((state) => state.buyer);

  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const { requestUserId, verifyPhoneNumberLoader } = useSelector(
    (state) => state.buyer
  );
  if (!open) return null;

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input if current input is filled
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, 4);
    const newOtp = [...otp];

    pasteData.split("").forEach((char, i) => {
      if (i < 4) {
        newOtp[i] = char;
      }
    });

    setOtp(newOtp);

    // Focus on the last filled input
    const lastFilledIndex = pasteData.length - 1;
    if (lastFilledIndex < 3) {
      inputRefs.current[lastFilledIndex + 1].focus();
    } else {
      inputRefs.current[3].focus();
    }
  };
  const handleSubmit = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 4) {
      showToast("error", "Please enter a valid 4-digit OTP.");
      return;
    }

    const data = {
      user_id: requestUserId,
      otp: enteredOtp,
      request_id: requestId,
    };

    dispatch(verifyPhoneNumberData(data)).then((result) => {
      if (result?.success) {
        showToast("success", result?.message);

        // ✅ createRequestData call after OTP successfully verified
        const formData = new FormData();
        formData.append("service_id", buyerRequest?.service_id || 43); // later remove this static service id 
        formData.append("postcode", buyerRequest?.postal_code || "");
        formData.append("city", citySerach || "");
        formData.append("phone", buyerRequest?.phone);

        formData.append(
          "questions",
          JSON.stringify(buyerRequest?.questions || [])
        );
        formData.append("form_status", 1);
        formData.append("request_id", requestId);
        formData.append("user_id", requestUserId);

        dispatch(createRequestData(formData)).then((res) => {
          if (res?.success) {
            showToast("success", res?.message);

            if (isThankuPageOnlyShow) {
              const modalData = {
                shouldOpen: true,
                step: 7,
                buyerRequest: buyerRequest,
                city: citySerach,
                serviceId: buyerRequest?.service_id,
                baseRedirectPath: lastSegment ? lastSegment : "root",
                // serviceName: "" // temporarily skip
              };
              localStorage.setItem(
                "pendingBuyerModal",
                JSON.stringify(modalData)
              );
              navigate(`/thank-you`);
            } else {
              nextStep();
            }
          } else {
            showToast("error", res?.message || "Failed to create request");
          }
        });
      } else {
        showToast("error", result?.message || "OTP verification failed");
      }
    });
  };
  
  const handleResendOtp = () => {
    const data = {
      user_id: requestUserId,
      phone: requestUserPhone,
    };
    dispatch(resendOtp(data)).then((res) => {
      if (res?.success) {
        showToast("success", res?.message || "OTP resent successfully!");
        setOtp(["", "", "", ""]);
        setTimer(60);
        inputRefs.current[0]?.focus();
      } else {
        showToast("error", res?.message || "Failed to resend OTP");
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* <div className={styles.modalContent}> */}
      <h2 className={styles.title}>We just sent an SMS</h2>
      <div className={styles.VerifyText}>Enter the security code we sent to</div>
        <p style={{marginBottom:'24px'}}>{requestUserPhone}</p>

      <div className={styles.otpInputs}>
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className={styles.otpInput}
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            ref={(el) => (inputRefs.current[index] = el)}
            autoFocus={index === 0}
          />
        ))}
      </div>

      <p className={styles.instruction}>
        {/* Please enter the code sent by SMS to
        <br /> */}
      </p>

      {timer > 0 ? (
        <p className={styles.timerText}>
          Resend OTP in <strong>{timer}</strong>s
        </p>
      ) : (
        <button className={styles.resendBtn}  onClick={handleResendOtp}>
          {resendOtpLoader ? "Resending..." : "Resend"}
        </button>
      )}
    <br/>
      <button className={styles.submitBtn} disabled={verifyPhoneNumberLoader}  onClick={handleSubmit}>
        {verifyPhoneNumberLoader ? (
                <Spin
                  indicator={
                    <LoadingOutlined spin style={{ color: "white" }} />
                  }
                />
              ) : (
                'Verify'
              )}
      </button>
    </div>
  );
};

export default OTPVerificationMultiStep;
