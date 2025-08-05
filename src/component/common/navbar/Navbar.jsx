import LogoComponent from "./LogoComponent";
import LogSwitch from "./LogSwitch";
import styles from "./navbar.module.css";
const Navbar = () => {
  return (
    <div className="fixed top-0 w-full bg-white z-[1000] shadow-md">
      <div
        className="flex justify-between items-center p-2.5
        lg:px-[88px] lg:pt-[18px] lg:pb-6 lg:h-11 lg:pt-[18px]
        lg:pr-[10px] lg:pb-[24px] lg:pl-[88px] md:px-[30px] md:py-[18px]"
      >
        <div
        // className={styles.navbarLeftContainer}
        >
          <LogoComponent />
        </div>
        <div
        //  className={styles.navbarRightContainer}
        >
          <LogSwitch />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
