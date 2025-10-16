import { useEffect, useState } from "react";
import styles from "./searchAccountantLevel3.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setbuyerRequestData,
  setBuyerStep,
  setcitySerach,
  getCityName,
} from "../../store/Buyer/BuyerSlice";
import BuyerRegistration from "../buyerPanel/PlaceNewRequest/BuyerRegistration/BuyerRegistration";
import { message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SearchAccountantLeve3 = ({
  title = "",
  defaultService,
  isNeedS = false,
  isSingular = false,
  extraText = "",
}) => {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const { postCodeLoader } = useSelector((state) => state.buyer);

  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isPostcodeSelected, setIsPostcodeSelected] = useState(false);

  const showToast = (type, content) => message[type](content);

  const handleClose = () => {
    setShowModal(false);
    setPincode("");
    setIsPostcodeSelected(false);
  };

  useEffect(() => {
    const checkPendingModal = () => {
      const pendingModal = JSON.parse(
        localStorage.getItem("pendingBuyerModal")
      );

      if (pendingModal?.shouldOpen) {
        dispatch(setbuyerRequestData(pendingModal.buyerRequest));
        dispatch(setcitySerach(pendingModal.city));
        setShowModal(true);
        dispatch(setBuyerStep(7));
      }
    };

    checkPendingModal();
  }, [dispatch]);

  const handleContinue = async () => {
    if (!pincode) {
      showToast("error", "Please enter a valid postcode or town.");
      return;
    }

    if (userToken?.active_status === 1) {
      showToast("error", "You are not a buyer.");
      return;
    }

    try {
      const response = await dispatch(getCityName({ postcode: pincode }));
      if (response?.data?.city) {
        const cityName = response.data.city;
        setCity(cityName);
        dispatch(setcitySerach(cityName));
        // dispatch(
        //   setbuyerRequestData({
        //     postcode: pincode,
        //     city: cityName,
        //   })
        // );
        setIsPostcodeSelected(true);
        setShowModal(true);
      } else {
        showToast("error", "Please enter a valid postcode!");
      }
    } catch (error) {
      showToast("error", "Please enter a valid postcode!");
    }
  };

  return (
    <div className={styles.searchcontainer}>
      <h1 style={{ color: "white" }}>
        Find {isSingular ? "a " : ""}
        <span className={styles.heading}>
          {title}
          {isNeedS ? "s" : ""}
        </span>{" "}
        Near You {extraText}
      </h1>
      <div className={styles.searchBoxContainer} style={{ margin: "auto" }}>
        <p>Tell us where you need it?</p>
        <div className={styles.searchInputContainer}>
          <input
            maxLength={8}
            className={styles.searchInput}
            placeholder="Enter Postcode (No Spaces)"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
              setIsPostcodeSelected(false);
            }}
          />
          <button onClick={handleContinue} disabled={postCodeLoader}>
            {postCodeLoader ? (
              <Spin
                size="small"
                indicator={<LoadingOutlined spin style={{ color: "white" }} />}
              />
            ) : (
              "Go"
            )}
          </button>
        </div>
      </div>

      {showModal && (userToken?.active_status === 2 || !userToken) && (
        <BuyerRegistration
          closeModal={handleClose}
          postcode={pincode}
          serviceName={defaultService}
          postalCodeValidate={isPostcodeSelected}
          city={city}
        />
      )}
    </div>
  );
};

export default SearchAccountantLeve3;
