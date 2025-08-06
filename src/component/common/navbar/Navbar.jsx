import LogoComponent from "./LogoComponent";
import LogSwitch from "./LogSwitch";
const Navbar = () => {
  return (
    <div className="fixed top-0 w-full bg-white z-[1000] shadow-md">
      <div className="flex justify-between items-center p-2.5 lg:px-[88px] lg:pt-[18px] lg:pb-6 lg:pb-[24px] md:px-[30px] md:py-[18px]">
        <div>
          <LogoComponent />
        </div>
        <div>
          <LogSwitch />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
