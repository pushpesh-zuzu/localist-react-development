import React, { useEffect, useState } from "react";
import LandingNewPPC from "../component/LandingPage/LandingNewPPC/LandingNewPPC";
import NavigationDetectorDesktop from "../component/common/navigationDetected/NavigationDetectorDesktop";
import NavigationDetectorWithConfirmations from "../component/common/navigationDetected/NavigationDetectorWithConfirmations";

function FencingLandingPagePPC() {
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    //only client side execution
    setIsClient(true);
    setIsDesktop(window.innerWidth > 768);

    // Window resize
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isClient && (
        <div>
          {isDesktop ? (
            <NavigationDetectorDesktop />
          ) : (
            <NavigationDetectorWithConfirmations />
          )}
        </div>
      )}
      <LandingNewPPC
        title="Fencing installers"
        subHeading="fencing pro"
        serviceId={49}
        serviceName="Fence & Gate Installation"
      />
    </>
  );
}

export default FencingLandingPagePPC;
