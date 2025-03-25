import { useNavigate, useParams } from "react-router-dom";
import searchIcon from "../../../assets/Images/search.svg";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterStep } from "../../../store/FindJobs/findJobSlice";
import { Popover } from "antd";
import { userLogout } from "../../../store/Auth/authSlice";
import { showToast } from "../../../utils";

const LogSwitch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const {selectedServiceId,registerToken,registerData} = useSelector((state) => state.findJobs);
  const {serviceTitle} = useParams();
 
  const handleLoginPage = () => {
    navigate("/login");
  };

  const handleBuyer = () => {
    navigate("/buyers/create")
  }
  const handleOpen = () => {
    navigate("/sellers/create/");
    dispatch(setRegisterStep(1));
  };
  const handleLogout = () => {
    dispatch(userLogout())
      .then((result) => {
        if (result) {
          navigate("/login");
          showToast("info", "logout successful!");
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.logSwitchContainer}>
      <div className={styles.searchContainer}>
        <input placeholder="Search for a service" />
        <img src={searchIcon} alt="search-icon" />
      </div>
      {(registerToken || userToken) ? (
        <Popover
          content={ <>
            <div className={styles.logoutBtn}  onClick={() => handleBuyer()}>
              Switch to Buyer
            </div>
             <div className={styles.logoutBtn}onClick={() => handleLogout()}>
             Logout
           </div>
           </>
          }
          trigger="hover"
        >
          <div className={styles.loginBtn}>{userToken ? userToken?.name : registerData?.name}</div>
        </Popover>
      ) : (
       <div className={styles.logsBtns}>
          <div className={styles.loginBtn} onClick={handleLoginPage}>
            Login
          </div>
          {!selectedServiceId && !serviceTitle &&
          <div className={styles.professionalBtn} onClick={handleOpen}>
            Join as a Professional
          </div>
}
        </div>
      )}
    </div>
  );
};

export default LogSwitch;
