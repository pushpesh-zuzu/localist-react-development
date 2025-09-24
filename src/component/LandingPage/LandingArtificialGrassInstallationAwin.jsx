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

const LandingArtificialGrassInstallationAwin = ({}) => {
  const { service } = useParams();
  // const breadcrumb = BREADCRUMB_CONFIG[slug];
  // const lastItem = breadcrumb?.[breadcrumb.length - 1]; // last element le lo safely
  // const isServiceAvailable = lastItem?.path === slug;

  // if (!isServiceAvailable) return <NotFound />;
  // console.log(LANDING_HOW_IT_WORK,'LANDING_HOW_IT_WORK')
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
        {/* <title>
          {META_TAG_LANDING_PAGE["artificial_grass_installation_ppc"]?.title}
        </title>
        <meta
          name={
            META_TAG_LANDING_PAGE["artificial_grass_installation_ppc"]?.name
          }
          content={
            META_TAG_LANDING_PAGE["artificial_grass_installation_ppc"]?.content
          }
        /> */}
      </Helmet>

      <FindDetailAndBannerWrapper
        title={
          LANDING_TITLES_AND_META["artificial_grass_installation_ppc"]?.title
        }
        paragraphs={
          LANDING_DETAIL_DATA["artificial_grass_installation_ppc"].paragraphs
        }
        defaultService={LANDING_SERVICES["artificial_grass_installation_ppc"]}
        isNeedS={false}
        bannerImage={
          LANDING_DETAIL_BANNERS["artificial_grass_installation_ppc"]?.banner
        }
        cancelHeading={CANCEL_POPUP_DATA.cancelHeading}
        cancelPara={CANCEL_POPUP_DATA.cancelPara}
        serviceId={ServiceId.artificial_grass_installation_ppc}
      />

      <LandingHowItWork WORK_STEPS={LANDING_HOW_IT_WORK["landscaping_ppc"]} />
    </>
  );
};

export default LandingArtificialGrassInstallationAwin;
