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

const LandingGatePPC = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <CalonicalTags />
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
        welcomModalButtonText={LANDING_WELCOM_MODAL_BUTTON_TITLE["gates_ppc"]}
      />

      <LandingHowItWork WORK_STEPS={LANDING_HOW_IT_WORK["landscaping_ppc"]} />
    </>
  );
};

export default LandingGatePPC;
