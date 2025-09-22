import { Helmet } from "react-helmet-async";
import { useMemo, Suspense, lazy } from "react";
import SearchAndFindAnAccountant from "../SearchAndFindAnAccountant";
import {
  TUTOR_AVERAGE_PRICE,
  TUTOR_BREADCRUMB_CONFIG,
  TUTOR_CONFIG_TOP,
  TUTOR_CONTENT_CONFIG,
  TUTOR_FIND_SERVICE_CONTENT,
  TUTOR_HOW_IT_WORK,
  TUTOR_META,
  TUTOR_REGION_DATA,
  TUTOR_REVIEWS_DATA,
  TUTOR_FAQ,
} from "./TutorData";
import TutorsNearMe from "../banners/TutorsNearMe.webp";
import { transformData } from "../../../utils/allServicesUtils";
import FullScreenSpinner from "../../common/fullScreenSpinner/FullScreenSpinner";

// Lazy-load heavy components
const HowItWorks = lazy(() => import("../../subCategory/workSteps/HowItWorks"));
const FindServiceLevel3 = lazy(() => import("../FindServiceLevel3"));
const Frequently = lazy(() => import("../../subCategory/Faq/Frequently"));
const AveragePriceTransportServices = lazy(() =>
  import("../../subCategory/AveragePrice/AveragePriceTransportServices")
);
const Reviews = lazy(() => import("../../subCategory/Reviews/Reviews"));
const GetQuotesLevel3 = lazy(() => import("../GetQuotesLevel3"));
const RegionsComponent = lazy(() =>
  import("../../subCategory/Regions/Regions")
);

function Tutor() {
  const transformedRegions = useMemo(
    () => transformData(TUTOR_REGION_DATA, "Tutor"),
    []
  );

  const faqData = useMemo(() => TUTOR_FAQ["Tutor"], []);
  const reviewData = useMemo(() => TUTOR_REVIEWS_DATA["Tutor"], []);
  const avgPriceData = useMemo(() => TUTOR_AVERAGE_PRICE["Tutor"], []);
  const findServiceContent = useMemo(
    () => TUTOR_FIND_SERVICE_CONTENT["Tutor"],
    []
  );
  const howItWorksData = useMemo(() => TUTOR_HOW_IT_WORK["Tutor"], []);

  const topConfig = useMemo(() => TUTOR_CONFIG_TOP["Tutor"], []);
  const contentConfig = useMemo(() => TUTOR_CONTENT_CONFIG["Tutor"], []);
  const breadcrumbConfig = useMemo(() => TUTOR_BREADCRUMB_CONFIG["Tutor"], []);
  const metaConfig = useMemo(() => TUTOR_META["Tutor"], []);

  return (
    <>
      <Helmet>
        <title>{metaConfig?.title}</title>
        <meta name={metaConfig?.name} content={metaConfig?.content} />
      </Helmet>

      <SearchAndFindAnAccountant
        title={topConfig?.title}
        findingHeading={topConfig?.findingHeading}
        breadcrumb={breadcrumbConfig}
        bannerImage={TutorsNearMe}
        para1={contentConfig?.para1}
        para2={contentConfig?.para2}
        defaultService={"Tutor"}
        isNeedS={false}
      />

      <Suspense fallback={<FullScreenSpinner />}>
        <HowItWorks
          HowItWorksData={howItWorksData}
          title={topConfig?.ctaText}
        />
      </Suspense>

      <Suspense fallback={<FullScreenSpinner />}>
        <RegionsComponent regionsData={transformedRegions} />
      </Suspense>

      <Suspense fallback={<FullScreenSpinner />}>
        <FindServiceLevel3
          contentBlocks={findServiceContent}
          title={topConfig?.ctaText}
        />
      </Suspense>

      <Suspense fallback={<FullScreenSpinner />}>
        <Frequently FrequentlyQuestion={faqData} />
      </Suspense>

      <Suspense fallback={<FullScreenSpinner />}>
        <AveragePriceTransportServices
          title={topConfig?.avgPriceTitle}
          RELTED_PRICE={avgPriceData}
          isSingular
        />
      </Suspense>

      <Suspense fallback={<FullScreenSpinner />}>
        <Reviews RELATED_REVIEW={reviewData} />
      </Suspense>

      <Suspense fallback={<FullScreenSpinner />}>
        <GetQuotesLevel3 needSString={false} message={topConfig?.ctaText} />
      </Suspense>
    </>
  );
}

export default Tutor;
