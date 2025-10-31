import { useEffect, useRef, useState } from "react";
import styles from "./searchpostandbanner.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCityName,
  setbuyerRequestData,
  setBuyerStep,
  setcitySerach,
} from "../../../store/Buyer/BuyerSlice";
import { message, Spin } from "antd";
import BuyerRegistrationLandingPage from "../BuyerRegistrationLandingPage/BuyerRegistrationLandingPage";
import { LoadingOutlined } from "@ant-design/icons";

const SearchPostAndBanner = ({
  title = "",
  defaultService,
  isNeedS = false,
  cancelHeading,
  cancelPara,
  serviceId,
  welcomModalTitle,
  welcomModalButtonText,
}) => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const [isStartWithQuestionModal, setIsStartWithQuestionModal] =
    useState(false);
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);
  const { postCodeLoader, buyerRequest } = useSelector((state) => state.buyer);
  const showToast = (type, content) => message[type](content);

  const handleClose = () => {
    setShowModal(false);
    setPincode("");
    setIsStartWithQuestionModal(false);
  };

  // Auto open modal after delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowModal(true);
      setIsStartWithQuestionModal(true);
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Check pending modal in localStorage
  useEffect(() => {
    const checkPendingModal = () => {
      const pendingModal = JSON.parse(
        localStorage.getItem("pendingBuyerModal")
      );

      if (pendingModal?.shouldOpen) {
        setTimeout(() => {
          dispatch(setbuyerRequestData(pendingModal.buyerRequest));
          dispatch(setcitySerach(pendingModal.city));

          setShowModal(true);
          dispatch(setBuyerStep(7));
        }, 200);
      }
    };

    checkPendingModal();
  }, [dispatch]);

  // ✅ handle search + city API check
  const handleContinue = async () => {
    if (!pincode.trim()) {
      showToast("error", "Please enter a valid postcode or town.");
      return;
    }

    if (userToken?.active_status === 1) {
      showToast("error", "You are not a buyer.");
      return;
    }

    try {
      // ✅ call the getCityName API
      const response =
        (await dispatch(getCityName({ postcode: pincode })).unwrap?.()) ??
        (await dispatch(getCityName({ postcode: pincode })));

      // agar API response sahi aata hai
      if (response?.data?.city) {
        setCity(response.data.city);
        console.log(response, "rrrrr");
        dispatch(setcitySerach(response.data.city));
        setbuyerRequestData({
          ...buyerRequest,
          postcode: response.data.postcode,
          city: response.data.city,
        });
        setShowModal(true);
        // dispatch(
        //   setbuyerRequestData({
        //     postcode: pincode,
        //     city: response.data.city,
        //   })
        // );
      } else {
        showToast("error", "Please enter a valid postcode!");
        return;
      }
    } catch (error) {
      // API fail hone par flow yahin ruk jaayega
      showToast("error", "Please enter a valid postcode!");
      console.error("City fetch failed:", error);
      return;
    }
  };
  const [hasMountedDetector, setHasMountedDetector] = useState(false);

  // useEffect(() => {
  //   if (!hasMountedDetector && buyerRequest?.questions?.length > 0) {
  //     setHasMountedDetector(true);
  //   }
  // }, [hasMountedDetector]);

  return (
    <div className={styles.searchcontainer}>
      <h1
        style={{ color: "white", background: "rgba(0,0,0,.5)", padding: "4px" }}
      >
        Compare{" "}
        <span className={styles.heading}>FREE QUOTES{isNeedS ? "s" : ""}</span>{" "}
        from local {title}!
      </h1>

      <div className={styles.searchBoxContainer} style={{ margin: "auto" }}>
        <div className={styles.searchInputContainer}>
          <input
            className={styles.searchInput}
            placeholder="Enter Postcode (No Spaces)"
            ref={inputRef}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <button disabled={postCodeLoader} onClick={handleContinue}>
            {postCodeLoader ? (
              <Spin
                indicator={<LoadingOutlined spin style={{ color: "white" }} />}
              />
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>

      {showModal && (userToken?.active_status === 2 || !userToken) && (
        <BuyerRegistrationLandingPage
          closeModal={handleClose}
          postcode={pincode}
          postalCodeValidate={true}
          serviceName={defaultService}
          cancelHeading={cancelHeading}
          cancelPara={cancelPara}
          isStartWithQuestionModal={isStartWithQuestionModal}
          serviceId={serviceId}
          welcomModalTitle={welcomModalTitle}
          welcomModalButtonText={welcomModalButtonText}
        />
      )}
    </div>
  );
};

export default SearchPostAndBanner;
