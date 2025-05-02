import React, { useRef, useState } from "react";
import styles from "./OtpVerification.module.css";
import { verifyPhoneNumberData } from "../../../../../store/Buyer/BuyerSlice";
import { showToast } from "../../../../../utils";
import { useDispatch, useSelector } from "react-redux";

const OtpVerification = ({ open, onClose ,nextStep, previousStep}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const dispatch = useDispatch()
  const { requestDataList,createRequestToken } = useSelector((state)=> state.buyer)
console.log(requestDataList?.phone,"requestDataList")
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
      user_id: requestDataList?.user_id,
      otp: enteredOtp,
    };
  
    dispatch(verifyPhoneNumberData(data)).then((result) => {
      if (result?.success) {
        showToast("success", result?.message);
        nextStep();
      } else {
        showToast("error", result?.message || "OTP verification failed");
      }
    });
  };
  

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>OTP Verification</h2>

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
          Enter the code from the sms we sent to
          <br />
          <span>+ {requestDataList?.phone}</span>
        </p>

        <button className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default OtpVerification;
