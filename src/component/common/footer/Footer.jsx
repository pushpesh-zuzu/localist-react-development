import { useEffect, useState } from "react";
import styles from "./footer.module.css";
import logo from "../../../assets/Images/footerLogo.svg";
import facebookIcon from "../../../assets/Icons/facebook.svg";
import pinterestIcon from "../../../assets/Icons/pinterest.svg";
import instagramIcon from "../../../assets/Icons/instagram.svg";
import trustpilotLogo from "../../../assets/Icons/trustpilot.svg";
import mailIcon from "../../../assets/Icons/emailIcon.svg";
import callIcon from "../../../assets/Icons/callIcon.svg";
import timerIcon from "../../../assets/Icons/timer.svg";
import { Collapse } from "antd";
const { Panel } = Collapse;
import { CaretRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { showToast } from "../../../utils";
import OtpVerification from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/OtpVerification/OtpVerification";
import NumberVerified from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/NumberVerified/NumberVerified";

const FooterContent = () => (
  <>
    <div className={styles.footerRight}>
      <div className={styles.socialIcons}>
        <img src={facebookIcon} alt="Facebook" />
        <img src={pinterestIcon} alt="Pinterest" />
        <img src={instagramIcon} alt="Instagram" />
      </div>
      <div className={styles.countryDropdown}>
        <select>
          <option>🇬🇧 UK</option>
          <option>🇮🇳 India</option>
          <option>🇺🇸 USA</option>
        </select>
      </div>
      <div className={styles.trustpilot}>
        <img src={trustpilotLogo} alt="Trustpilot Rating" />
      </div>
    </div>

    <div className={styles.footerContactSection}>
      <div className={styles.contactMthods}>
        <img src={mailIcon} alt="email" />
        <p>india@localist.com</p>
      </div>
      <div className={styles.contactMthods}>
        <img src={callIcon} alt="phone" />
        <p>+91 0000000000</p>
      </div>
      <div className={styles.contactMthods}>
        <img src={timerIcon} alt="working hours" />
        <p>(Mon-Fri, 9:00am-6:00pm)</p>
      </div>
    </div>
  </>
);

const Footer = () => {
  const [activeKeys, setActiveKeys] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 520);
  const navigate = useNavigate();
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isNumberVerifiedModalOpen, setIsNumberVerifiedModalOpen] =
    useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 520);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onChange = (key) => {
    setActiveKeys(key);
  };
  const { userToken } = useSelector((state) => state.auth);
  const { registerToken } = useSelector((state) => state.findJobs);
  const handleJoinAsProfessional = () => {
    if (userToken || registerToken) {
      showToast("info", "You're already logged in.");
    } else {
      navigate("/sellers/create");
      window.scrollTo(0, 0);
    }
  };
  const handleHelpCenter = () => {
    navigate("/help-center");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLeft}>
          <div className={styles.logo}>
            <img
              src={logo}
              alt="Localist Logo"
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 0);
              }}
            />
          </div>

          <p className={styles.footerDesc}>
            Localist is the world’s fastest-growing marketplace, and we have no
            intention of slowing down any time soon.
          </p>

          <div className={styles.contactSection}>
            <h2>Need Help?</h2>

            <button>Contact Us</button>
          </div>
        </div>

        <div className={styles.footerLinks}>
          <div>
            <h4>For Customers</h4>
            <ul>
              <li onClick={handleJoinAsProfessional}>Find a Professional</li>
              <li
                onClick={() => {
                  navigate("/how-it-works");
                  window.scrollTo(0, 0);
                }}
              >
                How it works
              </li>
              <li
                onClick={() => {
                  if (userToken || registerToken) {
                    showToast("info", "You're already logged in.");
                  } else {
                    navigate("/login");
                    window.scrollTo(0, 0);
                  }
                }}
              >
                Login
              </li>
              <li>Mobile App</li>
            </ul>
          </div>

          <div>
            <h4>For Professionals</h4>
            <ul>
              <li
              // onClick={() => {
              //   navigate("/how-it-works");
              //   window.scrollTo(0, 0);
              // }}
              >
                How it works
              </li>
              <li onClick={() => navigate("/pricing")}>Pricing</li>
              <li onClick={handleJoinAsProfessional}>Join as a Professional</li>
              <li onClick={handleHelpCenter}>Help Centre</li>
              <li>Mobile App</li>
            </ul>
          </div>

          <div>
            <h4>About</h4>
            <ul>
              <li>About Bark</li>
              <li>Careers</li>
              <li onClick={() => setIsOtpModalOpen(true)}>Blog</li>
              <li onClick={() => setIsNumberVerifiedModalOpen(true)}>Press</li>
            </ul>
          </div>
        </div>

        <Collapse
          defaultActiveKey={activeKeys}
          accordion
          expandIcon={({ isActive }) => (
            <CaretRightOutlined
              style={{ color: "#00AFE3", fontSize: "24px" }}
              rotate={isActive ? -90 : 90}
            />
          )}
          bordered={false}
          onChange={onChange}
          expandIconPosition="end"
          className={styles.footerLinkMobile}
        >
          <Panel
            className={styles.footerNavLinks}
            header="For Customers"
            key="1"
          >
            <ul>
              <li
                onClick={() => {
                  navigate("/sellers/create/");
                  window.scrollTo(0, 0);
                }}
              >
                Find a Professional
              </li>
              <li
                onClick={() => {
                  navigate("/how-it-works");
                  window.scrollTo(0, 0);
                }}
              >
                How it works
              </li>
              <li
                onClick={() => {
                  if (userToken || registerToken) {
                    showToast("info", "You're already logged in.");
                  } else {
                    navigate("/login");
                    window.scrollTo(0, 0);
                  }
                }}
              >
                Login
              </li>
              <li>Mobile App</li>
            </ul>
          </Panel>
          <Panel
            className={styles.footerNavLinks}
            header="For Professionals"
            key="2"
          >
            <ul>
              <li
              // onClick={() => {
              //   navigate("/how-it-works");
              //   window.scrollTo(0, 0);
              // }}
              >
                How it works
              </li>
              <li onClick={() => navigate("/pricing")}>Pricing</li>
              <li onClick={handleJoinAsProfessional}>Join as a Professional</li>
              <li>Help Centre</li>
              <li>Mobile App</li>
            </ul>
          </Panel>
          <Panel className={styles.footerNavLinks} header="About" key="3">
            <ul>
              <li>About Bark</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </Panel>
        </Collapse>

        {isMobile ? (
          <span className={styles.contactCountyWrapper}>
            <FooterContent />
          </span>
        ) : (
          <FooterContent />
        )}
      </div>

      <div className={styles.footerBottom}>
        <p>
          © 2025 Localist. Terms & Conditions / Cookie policy / Privacy policy
        </p>

        <div className={styles.trustpilotMobile}>
          <img src={trustpilotLogo} alt="Trustpilot Rating" />
        </div>
      </div>
      <OtpVerification
        open={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
      />
      <NumberVerified
        open={isNumberVerifiedModalOpen}
        onClose={() => setIsNumberVerifiedModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
