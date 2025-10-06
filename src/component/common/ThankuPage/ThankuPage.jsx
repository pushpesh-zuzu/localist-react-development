import React from "react";
import styles from "./ThankuPage.module.css";
import { CheckOutlined } from "@ant-design/icons";
import checkboxImg from "../../../assets/Images/Pricing/matchesCheck.svg";
import { useNavigate } from "react-router";
import { useUserGeo } from "../../../utils/geo";
import { Helmet } from "react-helmet-async";

const ThankuPage = ({ nextStep, previousStep }) => {
  const navigate = useNavigate();
  const { country, lang } = useUserGeo();

  const handleSubmit = () => {
    const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
    navigate(
      `${
        pendingModal?.baseRedirectPath === "root"
          ? "/"
          : `/${lang}/${country}/${pendingModal?.baseRedirectPath}`
      }`
    );
  };

  return (
    <>
      <Helmet>
        <script>
          {`
            gtag('event', 'conversion', {
              'send_to': 'AW-17528251553/iVB9CJjZsZMbEKHJj6ZB',
              'value': 1.0,
              'currency': 'GBP'
            });
          `}
        </script>
      </Helmet>
      <div className={styles.pageWrapper}>
        <div className={styles.modalContent}>
          <div className={styles.container}>
            <div className={styles.box}>
              <div className={styles.icon}>
                <CheckOutlined style={{ color: "white" }} />
              </div>
              <h2 className={styles.title}>
                Thank You! Your number has been verified.
              </h2>
            </div>
            <div className={styles.buttons}>
              {/* <button className={styles.backButton} onClick={previousStep}>
      Back
    </button> */}
              <button
                className={styles.viewMatchesButton}
                onClick={handleSubmit}
              >
                <img src={checkboxImg} alt="..." /> View your matches now.
              </button>
            </div>
            <p className={styles.note}>
              Localists may share your information with up to five relevant
              service providers, who may contact you by phone, text or email to
              discuss your request. By submitting this form, you agree that
              professionals can contact you via phone, text or email to offer
              their services. Your consent to be contacted is not a condition
              for purchasing or receiving any services. All data will be handled
              in accordance with our Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankuPage;
