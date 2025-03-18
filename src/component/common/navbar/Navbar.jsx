import LogoComponent from "./LogoComponent";
import LogSwitch from "./LogSwitch";
import styles from "./navbar.module.css";
const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarItems}>
        <div className={styles.navbarLeftContainer}>
          <LogoComponent />
        </div>
        <div className={styles.navbarRightContainer}>
          <LogSwitch />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
