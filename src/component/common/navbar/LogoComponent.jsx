import styles from "./navbar.module.css";
import logo from "../../../assets/Images/logo.svg";
import downArrow from "../../../assets/Images/downarrow.svg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Popover } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import arrowLeft from "../../../assets/Icons/megamenu/arrow-left.svg";
import arrowIcon from "../../../assets/Icons/megamenu/arrow-right.svg";
import { useEffect, useState } from "react";
import {
  allSubMenuData,
  otherMenuData,
  serviceesData,
  subMenuData,
} from "../../../constant/Megamenu";
import { useSelector } from "react-redux";

const LogoComponent = () => {
  const navigate = useNavigate();
  const [filterItems, setFilterItems] = useState("");
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [mouseHover, setMouseHover] = useState("");
 
const location = useLocation() 
const isAccountPage = location.pathname === "/buyer-account";
  const handleRedirectUrl = () => {
    navigate("/");
  };

  const [placement, setPlacement] = useState("bottomLeft");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1020) {
        setPlacement("bottomLeft");
      } else {
        setPlacement("bottom");
      }
    };

    handleResize(); // Initial call to set the placement
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const content = () => {
    return (
      <>
        <div
          className={styles.popover_container}
          onMouseLeave={() => setShowSubMenu(false)}
        >
          <div className={styles.popover_wrap}>
            <AnimatePresence mode="wait">
              {!showSubMenu ? (
                <motion.div
                  key="mainMenu"
                  initial={{ x: "-100%", height: 0 }}
                  animate={{ x: 0, height: "auto" }}
                  exit={{ x: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <div className={styles.popover_header}>
                    <span>Services</span>
                    <Link to="#">See All</Link>
                  </div>

                  {serviceesData?.map((item, index) => (
                    <div
                      key={index}
                      className={styles.popover_content}
                      onClick={() => {
                        setShowSubMenu(true), setFilterItems(item.key);
                      }}
                      onMouseEnter={() => setMouseHover(index)}
                      onMouseLeave={() => setMouseHover("")}
                    >
                      <span className={styles.text_wrap}>
                        <img
                          src={
                            item?.iconhover && mouseHover === index
                              ? item?.iconhover
                              : item.icon
                          }
                          width={18}
                          height={18}
                          alt="icon"
                        />
                        <Link to="#">{item.name}</Link>
                      </span>
                      <img src={arrowIcon} width={8} alt="arrow" />
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="subMenu"
                  initial={{ x: "100%", height: 0 }}
                  animate={{ x: 0, height: "auto" }}
                  exit={{ x: "0", height: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <div
                    className={styles.popover_back_explore}
                    onClick={() => setShowSubMenu(false)}
                  >
                    <img src={arrowLeft} width={24} />
                    Back to Explore
                  </div>
                  <hr />
                  <div className={styles.popover_header}>
                    <span>Services</span>
                    <Link to="#">See All</Link>
                  </div>
                  {allSubMenuData
                    ?.filter((item) => item?.key == filterItems)
                    .map((item, index) => (
                      <div
                        key={index}
                        className={styles.popover_content}
                        onMouseEnter={() => setMouseHover(index)}
                        onMouseLeave={() => setMouseHover("")}
                      >
                        <span className={styles.text_wrap}>
                          {item.icon && (
                            <img
                              src={
                                item?.iconhover && mouseHover === index
                                  ? item?.iconhover
                                  : item.icon
                              }
                              width={18}
                              height={18}
                              alt="icon"
                            />
                          )}
                          <Link to={item?.path}>{item.name}</Link>
                        </span>
                      </div>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={styles.popover_about_wrap}>
            <div
              className={`${styles.popover_header} ${styles.popover_header_height}`}
            >
              <div className={styles.popover_header_inner}>
                <div className={styles.popover_about_head}>Services</div>
                {subMenuData?.map((item, index) => (
                  <div key={index} className={styles.popover_content}>
                    <Link to={item.path} className={styles.text_wrap}>
                      <Link to="#">{item.name}</Link>
                    </Link>
                  </div>
                ))}
              </div>
              <div className={styles.popover_header_inner}>
                <div className={styles.popover_about_head}>
                  <Link to="#">See All</Link>
                </div>
                {otherMenuData?.map((item, index) => (
                  <div key={index} className={styles.popover_content}>
                    <Link to={item.path} className={styles.text_wrap}>
                      <Link to="#">{item.name}</Link>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={styles.logoContainer}>
      <img
        src={logo}
        alt="logo"
        className={styles.mainLogo}
        onClick={handleRedirectUrl}
      />
   {location.pathname !== "/buyers/create" && !isAccountPage &&  <Popover
        placement={placement}
        content={content}
        arrow={false}
        trigger="hover"
        className="popover_wrap"
      >
        <div className={styles.serviceContainer}>
          <h2 className={styles.serviceText}>Explore Our Services</h2>
          <h2 className={styles.serviceTextMobile}>Our Services</h2>
          <img src={downArrow} alt="down-arrow" />
        </div>
      </Popover>
}
    </div>
  );
};

export default LogoComponent;
