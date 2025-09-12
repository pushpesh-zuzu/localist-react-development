import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import {
  CANCEL_POPUP_DATA,
  LANDING_DETAIL_BANNERS,
  LANDING_DETAIL_DATA,
  LANDING_HOW_IT_WORK,
  LANDING_SERVICES,
  LANDING_TITLES_AND_META,
  ServiceId,
} from "./landingPageData";
import FindDetailAndBannerWrapper from "./FindDetailAndBannerWrapper/FindDetailAndBannerWrapper";
import LandingHowItWork from "./LandingHowItWork/LandingHowItWork";
import NotFound from "../../pages/NotFound";

const LandingGatePPC = ({}) => {
  const { service } = useParams();
  // const breadcrumb = BREADCRUMB_CONFIG[slug];
  // const lastItem = breadcrumb?.[breadcrumb.length - 1]; // last element le lo safely
  // const isServiceAvailable = lastItem?.path === slug;

  // if (!isServiceAvailable) return <NotFound />;
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
        {/* <title>{CONTENT_CONFIG_META[slug]?.title}</title>
        <meta
          name={CONTENT_CONFIG_META[slug]?.name}
          content={CONTENT_CONFIG_META[slug]?.content}
        />
        <link
          rel="preload"
          href={CONTENT_CONFIG_BANNER[slug]?.banner}
          as="image"
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
      />

      <LandingHowItWork WORK_STEPS={LANDING_HOW_IT_WORK["landscaping_ppc"]} />
    </>
  );
};

export default LandingGatePPC;
