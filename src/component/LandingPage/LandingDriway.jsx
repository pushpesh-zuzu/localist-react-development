import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import {
  CANCEL_POPUP_DATA,
  LANDING_DETAIL_BANNERS,
  LANDING_DETAIL_DATA,
  LANDING_HOW_IT_WORK,
  LANDING_SERVICES,
  LANDING_TITLES_AND_META,
  META_TAG_LANDING_PAGE,
  ServiceId,
} from "./landingPageData";
import FindDetailAndBannerWrapper from "./FindDetailAndBannerWrapper/FindDetailAndBannerWrapper";
import LandingHowItWork from "./LandingHowItWork/LandingHowItWork";
import NotFound from "../../pages/NotFound";

const LandingDriway = ({}) => {
  const { service } = useParams();
  // const breadcrumb = BREADCRUMB_CONFIG[slug];
  // const lastItem = breadcrumb?.[breadcrumb.length - 1]; // last element le lo safely
  // const isServiceAvailable = lastItem?.path === slug;

  // if (!isServiceAvailable) return <NotFound />;
  const isProduction =
    typeof window !== "undefined" &&
    window.location.hostname === "localists.com";
  console.log(
    "is production",
    isProduction,
    "widnow.location.pathname",
    typeof window !== "undefined" && window.location.hostname
  );

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>{META_TAG_LANDING_PAGE["driveways_ppc"]?.title}</title>
        <meta
          name={META_TAG_LANDING_PAGE["driveways_ppc"]?.name}
          content={META_TAG_LANDING_PAGE["driveways_ppc"]?.content}
        />
      </Helmet>

      <FindDetailAndBannerWrapper
        title={LANDING_TITLES_AND_META["driveways_ppc"]?.title}
        paragraphs={LANDING_DETAIL_DATA["driveways_ppc"].paragraphs}
        defaultService={LANDING_SERVICES["driveways_ppc"]}
        isNeedS={false}
        bannerImage={LANDING_DETAIL_BANNERS["driveways_ppc"]?.banner}
        cancelHeading={CANCEL_POPUP_DATA.cancelHeading}
        cancelPara={CANCEL_POPUP_DATA.cancelPara}
        serviceId={ServiceId.driveways_ppc}
      />

      <LandingHowItWork WORK_STEPS={LANDING_HOW_IT_WORK["landscaping_ppc"]} />
    </>
  );
};

export default LandingDriway;
