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
import { useDispatch, useSelector } from "react-redux";
import { getAllServiceList, getCategoriesList, getPopularServiceList } from "../../../store/FindJobs/findJobSlice";
import hiring from "../../../assets/Images/ServicePanel/hiring.svg";
import { BASE_IMAGE_URL, BASE_URL_IMAGE } from "../../../utils";


const LogoComponent = () => {
  const navigate = useNavigate();
  const [filterItems, setFilterItems] = useState("");
  const [showSubMenu, setShowSubMenu] = useState(false);
  // const [showAllCategories, setShowAllCategories] = useState(false);

  const [mouseHover, setMouseHover] = useState("");
  const { userToken } = useSelector((state) => state.auth)
  const { registerData, popularList, CategoriesList, allServiceList } = useSelector(
    (state) => state.findJobs
  );
  const location = useLocation();
  const dispatch = useDispatch()
  const isAccountPage = location.pathname === "/account/setting";
  const isNotification = location.pathname === "/user/notification";

  const [visibleCount, setVisibleCount] = useState(5); // Start with 1
  const totalItems = allServiceList?.length || 0;

  const handleToggle = () => {
    if (visibleCount >= totalItems) {
      // Decrease by 1 until min 1
      setVisibleCount(prev => Math.max(5, prev - 5));
    } else {
      // Increase by 1 until max totalItems
      setVisibleCount(prev => Math.min(prev + 5, totalItems));
    }
  };

  const isAllVisible = visibleCount >= totalItems;
  //   const handleRedirectUrl = () => {
  //     if (userToken?.active_status  == 1 ) {
  //       navigate("/settings");
  //     }
  //     else if(userToken?.active_status  == 2){
  // navigate("/buyers/create")
  //     }
  //     else {
  //       navigate("/")

  //     }
  //   };
  console.log(allServiceList, "popularList")
  useEffect(() => {
    dispatch(getPopularServiceList())
    dispatch(getCategoriesList())
    dispatch(getAllServiceList())
  }, [])
  const handleRedirectUrl = () => {
    const status = registerData?.active_status || userToken?.active_status;

    if (status == 1) {
      navigate("/leads");
    } else if (status == 2) {
      navigate("/buyers/create");
    } else {
      navigate("/");
    }
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

                  {/* {CategoriesList?.map((item, index) => (
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
                          src={item?.category_icon
                                                ? `${BASE_URL_IMAGE}/${item?.category_icon}`
                                                : hiring
                                            }
                            // item?.iconhover && mouseHover === index
                            //   ? item?.iconhover
                            //   : item.icon
                          
                          width={18}
                          height={18}
                          alt="icon"
                        />
                        <Link to="#">{item.name}</Link>
                      </span>
                      <img src={arrowIcon} width={8} alt="arrow" />
                    </div>
                  ))} */}
                  {allServiceList?.slice(0, visibleCount).map((item, index) => (
                    <div
                      key={index}
                      className={styles.popover_content}
                      onClick={() => {
                        setShowSubMenu(true);
                        setFilterItems(item.name);
                      }}
                      onMouseEnter={() => setMouseHover(index)}
                      onMouseLeave={() => setMouseHover("")}
                    >
                      <span className={styles.text_wrap}>
                        <img
                          src={item?.category_icon ? `${BASE_URL_IMAGE}/${item?.category_icon}` : hiring}
                          width={18}
                          height={18}
                          alt="icon"
                        />
                        <Link to="#">{item.name}</Link>
                      </span>
                      <img src={arrowIcon} width={8} alt="arrow" />
                    </div>
                  ))}

                  {/* See More / Show Less Button */}
                  {totalItems > 5 && (
                    <div
                      className={styles.popover_content}
                      style={{ cursor: 'pointer', fontWeight: 'bold' }}
                      onClick={handleToggle}
                    >
                      <span className={styles.text_wrap}>
                        {isAllVisible ? 'Show Less ▲' : 'See More ▼'}
                      </span>
                    </div>
                  )}
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
                  {allServiceList
                    ?.filter((item) => item?.name == filterItems) // Filter by the selected category key
                    .map((item, index) => (
                      <div key={index}>
                        <div
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
                            {/* <Link to={item?.path}>{item.name}</Link> */}
                          </span>
                        </div>

                        {/* Display subcategories here */}
                        {/* {item.subcategory?.map((sub, subIndex) => (
                          <>
                        const slug = item.name.toLowerCase().replace(/\s+/g, '-');
                          <div
                          key={subIndex}
                          className={styles.popover_content}
                          onMouseEnter={() => setMouseHover(subIndex)}
                          onMouseLeave={() => setMouseHover("")}
                          >
                            <span className={styles.text_wrap}>
                              <Link to={`/sub-category/${slug}`}>{sub.name}</Link>
                            </span>
                          </div>
                          </>
                        ))} */}
                        {item.subcategory?.map((sub, subIndex) => {
  const slug = sub.name.toLowerCase().replace(/\s+/g, '-'); // slug based on subcategory name

  return (
    <div
      key={subIndex}
      className={styles.popover_content}
      onMouseEnter={() => setMouseHover(subIndex)}
      onMouseLeave={() => setMouseHover("")}
    >
      <span className={styles.text_wrap}>
        <Link to={`/sub-category/${slug}`}>{sub.name}</Link>
      </span>
    </div>
  );
})}
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
                {/* {popularList?.map((item, index) => (
                  <div key={index} className={styles.popover_content}>
                    <Link to={item.path} className={styles.text_wrap}>
                      <Link to={item?.path}>{item?.name}</Link>
                    </Link>
                  </div>
                ))} */}
                {/* {popularList?.slice(0, 5)?.map((item, index) => (
                  <div key={index} className={styles.popover_content}>
                    <Link to={item.path} className={styles.text_wrap}>
                      <Link to={`${/category}`}>{item?.name}</Link>
                    </Link>
                  </div>
                ))} */}
                {popularList?.slice(0, 5)?.map((item, index) => {
  const slug = item.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div key={index} className={styles.popover_content}>
      <Link to={`/category/${slug}`} className={styles.text_wrap}>
        {/* {item?.name} */}
        <Link to={`/category/${slug}`}>{item?.name}</Link>
      </Link>
    </div>
  );
})}
              </div>
              <div className={styles.popover_header_inner}>
                <div className={styles.popover_about_head}>
                  <Link to="#">See All</Link>
                </div>
                {otherMenuData?.map((item, index) => (
                  <div key={index} className={styles.popover_content}>
                    <Link to={item.path} className={styles.text_wrap}>
                      <Link to={"/category"}>{item.name}</Link>
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
      {location.pathname !== "/buyers/create" &&
        !isAccountPage &&
        !isNotification && (
          <Popover
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
        )}
    </div>
  );
};

export default LogoComponent;
