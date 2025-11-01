import { Helmet } from "react-helmet-async";
import {
  CANCEL_POPUP_DATA,
  LANDING_DETAIL_BANNERS,
  LANDING_DETAIL_DATA,
  LANDING_HOW_IT_WORK,
  LANDING_SERVICES,
  LANDING_TITLES_AND_META,
  LANDING_WELCOM_MODAL_BUTTON_TITLE,
  LANDING_WELCOM_MODAL_TITLE,
  META_TAG_LANDING_PAGE,
  ServiceId,
} from "./landingPageData";
import FindDetailAndBannerWrapper from "./FindDetailAndBannerWrapper/FindDetailAndBannerWrapper";
import LandingHowItWork from "./LandingHowItWork/LandingHowItWork";
import CalonicalTags from "../common/CalonicalTags/CalonicalTags";
import NavigationDetectorDesktop from "../common/navigationDetected/NavigationDetectorDesktop";
import NavigationDetectorWithConfirmations from "../common/navigationDetected/NavigationDetectorWithConfirmations";
import { useEffect, useState } from "react";

const LandinPatioServiceAwin = () => {
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
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <CalonicalTags
        bannerImage={LANDING_DETAIL_BANNERS["patio_services_ppc"]?.banner}
      />
      <FindDetailAndBannerWrapper
        title={LANDING_TITLES_AND_META["patio_services_ppc"]?.title}
        paragraphs={LANDING_DETAIL_DATA["patio_services_ppc"].paragraphs}
        defaultService={LANDING_SERVICES["patio_services_ppc"]}
        isNeedS={false}
        bannerImage={LANDING_DETAIL_BANNERS["patio_services_ppc"]?.banner}
        cancelHeading={CANCEL_POPUP_DATA.cancelHeading}
        cancelPara={CANCEL_POPUP_DATA.cancelPara}
        serviceId={ServiceId.patio_services_ppc}
        welcomModalTitle={LANDING_WELCOM_MODAL_TITLE["patio_services_ppc"]}
        welcomModalButtonText={
          LANDING_WELCOM_MODAL_BUTTON_TITLE["patio_services_ppc"]
        }
      />

      <LandingHowItWork WORK_STEPS={LANDING_HOW_IT_WORK["landscaping_ppc"]} />
    </>
  );
};

export default LandinPatioServiceAwin;
