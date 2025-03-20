import { useNavigate } from "react-router-dom";
import searchIcon from "../../../assets/Images/search.svg";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterStep } from "../../../store/FindJobs/findJobSlice";
import { Popover } from "antd";

const LogSwitch = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const {userToken} = useSelector((state)=> state.auth)
  

  const handleLoginPage = () => {
    navigate("/login");
  };

  const handleOpen = () => {
    navigate("/sellers/create/");
    dispatch(setRegisterStep(1))
  };

  return (
    <div className={styles.logSwitchContainer}>
      <div className={styles.searchContainer}>
        <input placeholder="Search for a service" />
        <img src={searchIcon} alt="search-icon" />
      </div>
      {userToken ?<Popover content={<div className={styles.logoutBtn}>Logout</div>} trigger="hover">
  <div className={styles.loginBtn}>
    {userToken?.name}
  </div>
</Popover> : <div className={styles.logsBtns}>
        <div className={styles.loginBtn} onClick={handleLoginPage}>
          Login
        </div>

        <div className={styles.professionalBtn} onClick={handleOpen}>
          Join as a Professional
        </div>
      </div>}
    </div>
  );
};

export default LogSwitch;
