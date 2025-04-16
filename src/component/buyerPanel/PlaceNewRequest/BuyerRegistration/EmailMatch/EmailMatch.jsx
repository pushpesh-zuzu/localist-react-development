// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styles from "./EmailMatch.module.css";
// import { Spin } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";
// import { registerUserData } from "../../../../../store/FindJobs/findJobSlice";

// const EmailMatch = ({onClose, nextStep, previousStep,setEmails}) => {
//   const dispatch = useDispatch();
//   const { buyerRequest, requestLoader } = useSelector((state) => state.buyer);

//   const [email, setEmail] = useState("");
//   // const [name, setName] = useState(buyerRequest?.name || "");
//   const [error, setError] = useState(false);

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setError(false);
//   };

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleSubmit = () => {
//     if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
//       setError(true);
//       return;
//     }
//     if(setEmails){
//       setEmails(email)
//     }
      
//     // const formData = new FormData();
//     // formData.append("email", email);
//     // formData.append("name", name);
//     // formData.append("form_status", 1);
//     // formData.append("loggedUser", 2);
//     // formData.append("active_status", 2);
//     // formData.append("user_type", 2);

//     // dispatch(registerUserData(formData));
//     nextStep();
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//         <div className={styles.closeButton} onClick={onClose}>
//           x
//         </div>
//         <div className={styles.header}>
//           <h2>View your matches now!</h2>
//         </div>

//         <div className={styles.infoWrapper}>
//           <label htmlFor="email" className={styles.label}>
//             Please enter your email
//           </label>
//           <input
//             type="email"
//             placeholder="Email"
//             className={`${styles.input} ${error ? styles.inputError : ""}`}
//             value={email}
//             onChange={handleEmailChange}
//           />
//           {error && (
//             <span className={styles.errorMessage}>
//               Please enter a valid email address.
//             </span>
//           )}

//           <div className={styles.buttonContainer}>
//             <button className={styles.backButton} onClick={previousStep}>
//               Back
//             </button>
//             <button
//               className={styles.nextButton}
//               onClick={handleSubmit}
//               disabled={requestLoader}
//             >
//               {requestLoader ? (
//                 <Spin
//                   indicator={
//                     <LoadingOutlined spin style={{ color: "white" }} />
//                   }
//                 />
//               ) : (
//                 "View Matches"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmailMatch;


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./EmailMatch.module.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { registerUserData, setbuyerRegisterFormData } from "../../../../../store/FindJobs/findJobSlice";

const EmailMatch = ({ onClose, nextStep, previousStep, setEmails }) => {
  const dispatch = useDispatch();
  // const { buyerRequest, registerLoader } = useSelector((state) => state.buyer);
   const { registerLoader ,buyerRegisterFormData} = useSelector(
        (state) => state.findJobs
      );

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({
    email: false,
    name: false,
    phone: false,
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: false }));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prev) => ({ ...prev, name: false }));
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setErrors((prev) => ({ ...prev, phone: false }));
  };

  const handleSubmit = () => {
    const newErrors = {
      email: !email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
      name: !name.trim(),
      phone: !phone || !/^\d{10}$/.test(phone), // 10-digit phone validation
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError) return;

    if (setEmails) {
      setEmails(email);
    }
    dispatch(setbuyerRegisterFormData({ name, email, phone }))
    // If you want to dispatch the form data:
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("form_status", 1);
    formData.append("loggedUser", 2);
    formData.append("active_status", 2);
    formData.append("user_type", 2);
    dispatch(registerUserData(formData)).then((result)=> {
      if(result?.success) {

        nextStep();
      }
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeButton} onClick={onClose}>
          x
        </div>
        <div className={styles.header}>
          <h2>View your matches now!</h2>
        </div>

        <div className={styles.infoWrapper}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            value={name}
            onChange={handleNameChange}
          />
          {errors.name && (
            <span className={styles.errorMessage}>Name is required.</span>
          )}

          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            value={email}
            onChange={handleEmailChange}
          />
          {errors.email && (
            <span className={styles.errorMessage}>
              Please enter a valid email address.
            </span>
          )}

          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="10-digit phone number"
            className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
            value={phone}
            maxLength={10}
            onChange={handlePhoneChange}
          />
          {errors.phone && (
            <span className={styles.errorMessage}>
              Please enter a valid 10-digit phone number.
            </span>
          )}

          <div className={styles.buttonContainer}>
            <button className={styles.backButton} onClick={previousStep} disabled={registerLoader}>
              Back
            </button>
            <button
              className={styles.nextButton}
              onClick={handleSubmit}
              disabled={registerLoader}
            >
              {registerLoader ? (
                <Spin
                  indicator={<LoadingOutlined spin style={{ color: "white" }} />}
                />
              ) : (
                "View Matches"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailMatch;
