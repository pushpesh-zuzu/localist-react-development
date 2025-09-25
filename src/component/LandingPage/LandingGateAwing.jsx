import { Helmet } from "react-helmet-async";
import {
  CANCEL_POPUP_DATA,
  LANDING_DETAIL_BANNERS,
  LANDING_DETAIL_DATA,
  LANDING_HOW_IT_WORK,
  LANDING_SERVICES,
  LANDING_TITLES_AND_META,
  LANDING_WELCOM_MODAL_TITLE,
  META_TAG_LANDING_PAGE,
  ServiceId,
} from "./landingPageData";
import FindDetailAndBannerWrapper from "./FindDetailAndBannerWrapper/FindDetailAndBannerWrapper";
import LandingHowItWork from "./LandingHowItWork/LandingHowItWork";

const LandingGatePPCAwin = ({}) => {
  const isProduction =
    typeof window !== "undefined" &&
    window.location.hostname === "localists.com";
  // console.log(
  //   "is production",
  //   isProduction,
  //   "widnow.location.pathname",
  //   typeof window !== "undefined" && window.location.hostname
  // );

  return (
    <>
      <Helmet>
        {/* <title>{META_TAG_LANDING_PAGE["gates_ppc"]?.title}</title>
        <meta
          name={META_TAG_LANDING_PAGE["gates_ppc"]?.name}
          content={META_TAG_LANDING_PAGE["gates_ppc"]?.content}
        /> */}
        <meta name="robots" content="noindex" />
      </Helmet>

      <FindDetailAndBannerWrapper
        title={LANDING_TITLES_AND_META["gates_ppc"]?.title}
        paragraphs={LANDING_DETAIL_DATA["gates_ppc"].paragraphs}
        defaultService={LANDING_SERVICES["gates_ppc"]}
        isNeedS={false}
        bannerImage={LANDING_DETAIL_BANNERS["gates_ppc"]?.banner}
        cancelHeading={CANCEL_POPUP_DATA.cancelHeading}
        cancelPara={CANCEL_POPUP_DATA.cancelPara}
        serviceId={ServiceId.fencing_ppc}
        welcomModalTitle={LANDING_WELCOM_MODAL_TITLE["gates_ppc"]}    
      />

      <LandingHowItWork WORK_STEPS={LANDING_HOW_IT_WORK["landscaping_ppc"]} />
    </>
  );
};

export default LandingGatePPCAwin;
