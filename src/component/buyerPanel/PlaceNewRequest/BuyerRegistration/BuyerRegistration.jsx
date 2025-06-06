// import React, { useEffect, useState } from "react";
// import styles from "./BuyerRegistration.module.css";
// import WhatServiceYouNeed from "./WhatServiceYouNeed/WhatServiceYouNeed";
// import QuestionModal from "../../../common/questionModal/QuestionModal";
// import { useDispatch, useSelector } from "react-redux";
// import { setBuyerStep } from "../../../../store/Buyer/BuyerSlice";
// import ViewYourMatches from "./ViewYourMatches/ViewYourMatches";
// import DescribeYourRequest from "./DescribeYourRequest/DescribeYourRequest";
// import EmailMatch from "./EmailMatch/EmailMatch";
// import NameMatch from "./NameMatch/NameMatch";
// import BidsList from "./BidsList/BidsList";
// import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
// import OtpVerification from "./OtpVerification/OtpVerification";
// import NumberVerifiedModal from "./NumberVerified/NumberVerified";

// const BuyerRegistration = ({
//   closeModal,
//   serviceId,
//   serviceName,
//   postcode,
// }) => {
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [shouldClose, setShouldClose] = useState(false);
//   const [email, setEmails] = useState("");
//   const dispatch = useDispatch();
//   const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
//     useSelector((state) => state.buyer);
//   const { userToken, } = useSelector((state) => state.auth);
//   const { registerData, registerLoader,registerToken,authToken } = useSelector(
//     (state) => state.findJobs
//   );
//   console.log(registerData, "registerData");
//   const isAdminOrRemembered = authToken;
// const checkLocalStorage=()=>{
//   const barkToken=JSON.parse(localStorage.getItem("barkUserToken"));
//   const registerDataToken=JSON.parse(localStorage.getItem("registerDataToken"));
//   if(barkToken || registerDataToken){
//     return true;
//   }

//   return false;
// }
// const isAuthenticated=isAdminOrRemembered|| checkLocalStorage();

//   const stepFlow = isAuthenticated
//     ? [2, 3, 6, 7, 8]
//     : [1, 2, 3, 4, 5, 7, 8];

//   const nextStep = () => {
//     const currentIndex = stepFlow.indexOf(buyerStep);
//     if (currentIndex < stepFlow.length - 1) {
//       dispatch(setBuyerStep(stepFlow[currentIndex + 1]));
//     }
//   };

//   const previousStep = () => {
//     const currentIndex = stepFlow.indexOf(buyerStep);
//     if (currentIndex > 0) {
//       dispatch(setBuyerStep(stepFlow[currentIndex - 1]));
//     }
//   };

//   useEffect(() => {
//     const initialStep = isAdminOrRemembered ? 2 : 1;
//     dispatch(setBuyerStep(initialStep));
//   }, [dispatch, isAdminOrRemembered]);

//   useEffect(() => {
//     if (buyerStep) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [buyerStep]);

//   useEffect(() => {
//     if (shouldClose) {
//       dispatch(setBuyerStep(1));
//       closeModal();
//     }
//   }, [shouldClose]);

//   const handleClose = () => {
//     closeModal();
//   };

//   const confirmClose = () => {
//     setShowConfirmModal(false);
//     setShouldClose(true);
//   };

//   return (
//     <div className={styles.modal}>
//       <div className={styles.modalContent}>
//         {buyerStep === 1 && (
//           <EmailMatch
//             nextStep={nextStep}
//             previousStep={previousStep}
//             onClose={handleClose}
//             formData={buyerRequest}
//             setEmails={setEmails}
//             setShowConfirmModal={setShowConfirmModal}
//           />
//         )}
//         {buyerStep === 2 && (
//           <WhatServiceYouNeed
//             nextStep={nextStep}
//             formData={buyerRequest}
//             serviceId={serviceId}
//             serviceName={serviceName}
//             onClose={handleClose}
//             pincodes={postcode}
//             setShowConfirmModal={setShowConfirmModal}
//           />
//         )}

//         {buyerStep === 3 && (
//           <QuestionModal
//             questions={questionanswerData}
//             nextStep={nextStep}
//             previousStep={previousStep}
//             onClose={handleClose}
//             loading={questionLoader}
//             setShowConfirmModal={setShowConfirmModal}
//             formData={buyerRequest}
//           />
//         )}

//         {buyerStep === 4 && (
//           <OtpVerification
//             nextStep={nextStep}
//             previousStep={previousStep}
//             open={true}
//             // setShowConfirmModal={setShowConfirmModal}
//             // onClose={handleClose}
//           />
//         )}
//         {buyerStep === 5 && (
//           <NumberVerifiedModal
//             nextStep={nextStep}
//             previousStep={previousStep}
//             open={true}
//             setShowConfirmModal={setShowConfirmModal}
//           />
//         )}
//         {buyerStep === 6 && (
//           <ViewYourMatches
//             nextStep={nextStep}
//             previousStep={previousStep}
//             onClose={handleClose}
//             formData={buyerRequest}
//             // setShowConfirmModal={setShowConfirmModal}
//           />
//         )}
//         {buyerStep === 7 && (
//           <DescribeYourRequest
//             nextStep={nextStep}
//             onClose={handleClose}
//             // setShowConfirmModal={setShowConfirmModal}
//           />
//         )}

//         {buyerStep === 8 && (
//           <BidsList
//             nextStep={nextStep}
//             previousStep={previousStep}
//             onClose={handleClose}
//           />
//         )}

//         {/* {buyerStep === 1 && (
//           <WhatServiceYouNeed
//             nextStep={nextStep}
//             formData={buyerRequest}
//             serviceId={serviceId}
//             serviceName={serviceName}
//             onClose={handleClose}
//             pincodes={postcode}
//           />
//         )}

//         {buyerStep === 2 && (
//           <QuestionModal
//             questions={questionanswerData}
//             nextStep={nextStep}
//             previousStep={previousStep}
//             onClose={handleClose}
//             loading={questionLoader}
//             formData={buyerRequest}
//           />
//         )}

//         {buyerStep === 3 && (
//           <EmailMatch
//             nextStep={nextStep}
//             previousStep={previousStep}
//             onClose={handleClose}
//             formData={buyerRequest}
//             setEmails={setEmails}
//           />
//         )}

//         {/* {buyerStep === 4 && (
//           <NameMatch
//             nextStep={nextStep}
//             previousStep={previousStep}
//             onClose={handleClose}
//             formData={buyerRequest}
//             email={email}
//             // loading={registerLoader}
//           />
//         )}

//         {buyerStep === 4 && (
//           <ViewYourMatches
//             nextStep={nextStep}
//             previousStep={previousStep}
//             onClose={handleClose}
//             formData={buyerRequest}
//           />
//         )}

//         {buyerStep === 5 && (
//           <DescribeYourRequest nextStep={nextStep} onClose={handleClose} />
//         )}

//         {buyerStep === 6 && (
//           <BidsList
//             nextStep={nextStep}
//             previousStep={previousStep}
//             onClose={handleClose}
//           />
//         )}
//       </div> */}

//         {/* {showConfirmModal && (
//           <ConfirmationModal
//             onConfirm={confirmClose}
//             onCancel={() => setShowConfirmModal(false)}
//             setShowConfirmModal={setShowConfirmModal}
//           />
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default BuyerRegistration;

import React, { useEffect, useState } from "react";
import styles from "./BuyerRegistration.module.css";
import WhatServiceYouNeed from "./WhatServiceYouNeed/WhatServiceYouNeed";
import QuestionModal from "../../../common/questionModal/QuestionModal";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerStep } from "../../../../store/Buyer/BuyerSlice";
import ViewYourMatches from "./ViewYourMatches/ViewYourMatches";
import DescribeYourRequest from "./DescribeYourRequest/DescribeYourRequest";
import EmailMatch from "./EmailMatch/EmailMatch";
import NameMatch from "./NameMatch/NameMatch";
import BidsList from "./BidsList/BidsList";
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";
import OtpVerification from "./OtpVerification/OtpVerification";
import NumberVerifiedModal from "./NumberVerified/NumberVerified";

const BuyerRegistration = ({
  closeModal,
  serviceId,
  serviceName,
  postcode,
  city,
  postalCodeValidate,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);
  const [email, setEmails] = useState("");
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer);
  const { userToken, adminToken } = useSelector((state) => state.auth);
  const { registerData, registerLoader, authToken } = useSelector(
    (state) => state.findJobs
  );
  console.log(registerData, "registerData");
  const isAdminOrRemembered = authToken || userToken?.remember_tokens;

  const stepFlow = isAdminOrRemembered
    ? [2, 3, 6, 7, 8]
    : [1, 2, 3, 4, 5, 7, 8];

  const nextStep = () => {
    const currentIndex = stepFlow.indexOf(buyerStep);
    if (currentIndex < stepFlow.length - 1) {
      dispatch(setBuyerStep(stepFlow[currentIndex + 1]));
    }
  };

  const previousStep = () => {
    const currentIndex = stepFlow.indexOf(buyerStep);
    if (currentIndex > 0) {
      dispatch(setBuyerStep(stepFlow[currentIndex - 1]));
    }
  };

  useEffect(() => {
    const initialStep = isAdminOrRemembered ? 2 : 1;
    dispatch(setBuyerStep(initialStep));
  }, [dispatch, isAdminOrRemembered]);

  useEffect(() => {
    if (buyerStep) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [buyerStep]);

  useEffect(() => {
    if (shouldClose) {
      dispatch(setBuyerStep(1));
      closeModal();
    }
  }, [shouldClose]);

  const handleClose = () => {
    closeModal();
  };

  const confirmClose = () => {
    setShowConfirmModal(false);
    setShouldClose(true);
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {buyerStep === 1 && (
          <EmailMatch
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
            formData={buyerRequest}
            setEmails={setEmails}
            setShowConfirmModal={setShowConfirmModal}
          />
        )}
        {buyerStep === 2 && (
          <WhatServiceYouNeed
            nextStep={nextStep}
            formData={buyerRequest}
            serviceId={serviceId}
            serviceName={serviceName}
            onClose={handleClose}
            pincodes={postcode}
            setShowConfirmModal={setShowConfirmModal}
            postalCodeIsValidate={postalCodeValidate}
          />
        )}

        {buyerStep === 3 && (
          <QuestionModal
            questions={questionanswerData}
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
            loading={questionLoader}
            setShowConfirmModal={setShowConfirmModal}
            formData={buyerRequest}
          />
        )}

        {buyerStep === 4 && (
          <OtpVerification
            nextStep={nextStep}
            previousStep={previousStep}
            open={true}
            // setShowConfirmModal={setShowConfirmModal}
            // onClose={handleClose}
          />
        )}
        {buyerStep === 5 && (
          <NumberVerifiedModal
            nextStep={nextStep}
            previousStep={previousStep}
            open={true}
            setShowConfirmModal={setShowConfirmModal}
          />
        )}
        {buyerStep === 6 && (
          <ViewYourMatches
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
            formData={buyerRequest}
            // setShowConfirmModal={setShowConfirmModal}
          />
        )}
        {buyerStep === 7 && (
          <DescribeYourRequest
            nextStep={nextStep}
            onClose={handleClose}
            // setShowConfirmModal={setShowConfirmModal}
          />
        )}

        {buyerStep === 8 && (
          <BidsList
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
          />
        )}

        {/* {buyerStep === 1 && (
          <WhatServiceYouNeed
            nextStep={nextStep}
            formData={buyerRequest}
            serviceId={serviceId}
            serviceName={serviceName}
            onClose={handleClose}
            pincodes={postcode}
          />
        )}

        {buyerStep === 2 && (
          <QuestionModal
            questions={questionanswerData}
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
            loading={questionLoader}
            formData={buyerRequest}
          />
        )}

        {buyerStep === 3 && (
          <EmailMatch
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
            formData={buyerRequest}
            setEmails={setEmails}
          />
        )}

        {/* {buyerStep === 4 && (
          <NameMatch
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
            formData={buyerRequest}
            email={email}
            // loading={registerLoader}
          />
        )} 

        {buyerStep === 4 && (
          <ViewYourMatches
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
            formData={buyerRequest}
          />
        )}

        {buyerStep === 5 && (
          <DescribeYourRequest nextStep={nextStep} onClose={handleClose} />
        )}

        {buyerStep === 6 && (
          <BidsList
            nextStep={nextStep}
            previousStep={previousStep}
            onClose={handleClose}
          />
        )}
      </div> */}

        {showConfirmModal && (
          <ConfirmationModal
            onConfirm={confirmClose}
            onCancel={() => setShowConfirmModal(false)}
            setShowConfirmModal={setShowConfirmModal}
          />
        )}
      </div>
    </div>
  );
};

export default BuyerRegistration;
