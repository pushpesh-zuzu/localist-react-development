import { useEffect, useState } from "react";
import styles from "./footer.module.css";
// import logo from "../../../assets/Images/footerLogo.svg";
import logo from "../../../assets/Images/logo.svg";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { showToast } from "../../../utils";

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
          {/* <option>🇮🇳 India</option>
          <option>🇺🇸 USA</option> */}
        </select>
      </div>
      <div className={styles.trustpilot}>
        <img src={trustpilotLogo} alt="Trustpilot Rating" />
      </div>
    </div>

    <div className={styles.footerContactSection}>
      <div className={styles.contactMthods}>
        <img src={mailIcon} alt="email" />
        <p>contact@localists.com</p>
      </div>
      {/* <div className={styles.contactMthods}>
        <img src={callIcon} alt="phone" />
        <p>+91 0000000000</p>
      </div> */}
      <div className={styles.contactMthods}>
        <img src={timerIcon} alt="working hours" />
        <p>(Mon-Fri, 9:00am-6:00pm)</p>
      </div>
    </div>
  </>
);

const Footer = () => {
      const { lang, country } = useParams(); 
      const currentLang = lang || "en";
      const currentCountry = country || "gb";
  
  const [activeKeys, setActiveKeys] = useState("");
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 520
  );
  const navigate = useNavigate();

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
    }
  };
  const handleHelpCenter = () => {
    navigate("/help-center");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLeft}>
          <Link to={`/${currentLang}/${currentCountry}`} className={styles.link}>
            <div className={styles.logo}>
              <img src={logo} alt="Localist Logo" />
            </div>
          </Link>
          <p className={styles.footerDesc}>
            Localists is the world’s fastest-growing marketplace, and we have no
            intention of slowing down any time soon.
          </p>

          <div className={styles.contactSection}>
            <span>Need Help?</span>
            <Link to={`/${currentLang}/${currentCountry}/contact-us`} className={styles.link}>
              <button>Contact Us</button>
            </Link>
          </div>
        </div>

        {/* Desktop Links */}
        <div className={styles.footerLinks}>
          <div>
            <h4>For Customers</h4>
            <ul>
              <Link to={`/${currentLang}/${currentCountry}`} className={styles.link}>
                <li>Find a Professional</li>
              </Link>

              <Link className={styles.link} to={`/${currentLang}/${currentCountry}/how-it-works-for-customers`}>
                <li
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  How it works
                </li>
              </Link>

              <Link
                to={(!userToken || !registerToken) && `/${currentLang}/${currentCountry}/login`}
                className={styles.link}
              >
                <li
                  onClick={() => {
                    if (userToken || registerToken) {
                      showToast("info", "You're already logged in.");
                    } else {
                      navigate(`/${currentLang}/${currentCountry}/login`);
                      window.scrollTo(0, 0);
                    }
                  }}
                >
                  Login
                </li>
              </Link>
            </ul>
          </div>

          <div>
            <h4>For Professionals</h4>
            <ul>
              <Link to={`/${currentLang}/${currentCountry}/how-it-works-for-sellers`} className={styles.link}>
                <li>How it works</li>
              </Link>
              <Link className={styles.link} to={`/${currentLang}/${currentCountry}/sellers/pricing`}>
                <li>Pricing</li>
              </Link>
              <Link
                className={styles.link}
                to={(!userToken || !registerToken) && `/${currentLang}/${currentCountry}/sellers/create`}
              >
                <li
                  onClick={() => {
                    (userToken || registerToken) && handleJoinAsProfessional();
                  }}
                >
                  Join as a Professional
                </li>
              </Link>
              {/* {userToken && (userToken?.user_type === 1 || userToken?.user_type === 3) && (
                <Link to="/sellers/leads" className={styles.link}>
                  <li > New Leads</li>
                </Link>
              )}
              {userToken && (userToken?.user_type === 1 || userToken?.user_type === 3) && (
                <Link to="/sellers/leads/save-for-later" className={styles.link}>
                  <li > Saved Leads</li>
                </Link>
              )}
              {userToken && (userToken?.user_type === 1 || userToken?.user_type === 3) && (
                <Link to="/sellers/leads/my-responses" className={styles.link}>
                  <li >  My Responses</li>
                </Link>
              )}
              {userToken && (userToken?.user_type === 1 || userToken?.user_type === 3) && (
                <Link to="/settings" className={styles.link}>
                  <li >  Settings</li>
                </Link>
              )}
              {userToken && (userToken?.user_type === 1 || userToken?.user_type === 3) && (
                <Link to="/help-center" className={styles.link}>
                  <li >  Help</li>
                </Link>
              )} */}
              {/* <Link to="/help-center" className={styles.link}>
                <li onClick={handleHelpCenter}>Help Centre</li>
              </Link> */}
            </ul>
          </div>

          <div>
              <h4>About</h4>
            <ul>
              <Link className={styles.link} to={`/${currentLang}/${currentCountry}/about-us`}>
                <li>About Localists</li>
              </Link>
            </ul>
          </div>
        </div>

        {/* Mobile Links (NO styles.link here) */}
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
              <Link to="/">
                <li className={styles.mobileItem}>Find a Professional</li>
              </Link>
              <Link to={`/${currentLang}/${currentCountry}/how-it-works-for-customers`}>
                <li className={styles.mobileItem}>How it works</li>
              </Link>
              <Link to={(!userToken || !registerToken) && `/${currentLang}/${currentCountry}/login`}>
                <li className={styles.mobileItem}
                  onClick={() => {
                    if (userToken || registerToken) {
                      showToast("info", "You're already logged in.");
                    } else {
                      navigate(`/${currentLang}/${currentCountry}/login`);
                      window.scrollTo(0, 0);
                    }
                  }}
                >
                  Login
                </li>
              </Link>
            </ul>
          </Panel>

          <Panel
            className={styles.footerNavLinks}
            header="For Professionals"
            key="2"
          >
            <ul>
              <Link to={`/${currentLang}/${currentCountry}/how-it-works-for-sellers`}>
                <li className={styles.mobileItem}>How it works</li>
              </Link>
              <Link to={`/${currentLang}/${currentCountry}/sellers/pricing`}>
                <li className={styles.mobileItem}>Pricing</li>
              </Link>
              <Link to={(!userToken || !registerToken) && `/${currentLang}/${currentCountry}/sellers/create`}>
                <li className={styles.mobileItem} onClick={handleJoinAsProfessional}>
                  Join as a Professional
                </li>
              </Link>
              {/* <Link to="/help-center">
                <li>Help Centre</li>
              </Link> */}
            </ul>
          </Panel>

          <Panel className={styles.footerNavLinks} header="About" key="3">
            <ul>
              <Link to={`/${currentLang}/${currentCountry}/about-us`}>
                <li className={styles.mobileItem}>About Localists</li>
              </Link>
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
          © 2025 Localists. Terms & Conditions / Cookie policy / Privacy policy
        </p>

        <div className={styles.trustpilotMobile}>
          <img src={trustpilotLogo} alt="Trustpilot Rating" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
