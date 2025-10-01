import { Helmet } from "react-helmet-async";
import { useMemo, Suspense, lazy } from "react";
import SearchAndFindAnAccountant from "../SearchAndFindAnAccountant";
import {
  PHYSICS_MATHS_TUTOR_AVERAGE_PRICE,
  PHYSICS_MATHS_TUTOR_BREADCRUMB_CONFIG,
  PHYSICS_MATHS_TUTOR_CONFIG_TOP,
  PHYSICS_MATHS_TUTOR_CONTENT_CONFIG,
  PHYSICS_MATHS_TUTOR_FIND_SERVICE_CONTENT,
  PHYSICS_MATHS_TUTOR_HOW_IT_WORK,
  PHYSICS_MATHS_TUTOR_META,
  PHYSICS_MATHS_TUTOR_REGION_DATA,
  PHYSICS_MATHS_TUTOR_REVIEWS_DATA,
  PHYSICS_MATHS_TUTOR_FAQ,
  PHYSICS_MATHS_TUTOR_OTHER_SERVICES_DATA,
} from "./PhysicsAndMathTutorData";
import PhysicsAndMaths from "../banners/PhysicsAndMaths.webp";
import { transformData } from "../../../utils/allServicesUtils";
import FullScreenSpinner from "../../common/fullScreenSpinner/FullScreenSpinner";
import AveragePrice from "../../subCategory/AveragePrice/AveragePrice";
import Slider from "../../common/slider/Slider";

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

function PhysicsAndMathsTutor() {
  const transformedRegions = useMemo(
    () => transformData(PHYSICS_MATHS_TUTOR_REGION_DATA, "Physics And Maths"),
    []
  );

  const faqData = useMemo(() => PHYSICS_MATHS_TUTOR_FAQ["Physics And Maths"], []);
  const reviewData = useMemo(() => PHYSICS_MATHS_TUTOR_REVIEWS_DATA["Physics And Maths"], []);
  const avgPriceData = useMemo(() => PHYSICS_MATHS_TUTOR_AVERAGE_PRICE["Physics And Maths"], []);
  const findServiceContent = useMemo(
    () => PHYSICS_MATHS_TUTOR_FIND_SERVICE_CONTENT["Physics And Maths"],
    []
  );
  const howItWorksData = useMemo(() => PHYSICS_MATHS_TUTOR_HOW_IT_WORK["Physics And Maths"], []);

  const topConfig = useMemo(() => PHYSICS_MATHS_TUTOR_CONFIG_TOP["Physics And Maths"], []);
  const contentConfig = useMemo(() => PHYSICS_MATHS_TUTOR_CONTENT_CONFIG["Physics And Maths"], []);
  const breadcrumbConfig = useMemo(() => PHYSICS_MATHS_TUTOR_BREADCRUMB_CONFIG["Physics And Maths"], []);
  const metaConfig = useMemo(() => PHYSICS_MATHS_TUTOR_META["Physics And Maths"], []);
const otherServicesData = useMemo(
    () => PHYSICS_MATHS_TUTOR_OTHER_SERVICES_DATA["Physics And Maths"],
    []
  );
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>{metaConfig?.title}</title>
        <meta name={metaConfig?.name} content={metaConfig?.content} />
      </Helmet>

      <SearchAndFindAnAccountant
        title={topConfig?.title}
        findingHeading={topConfig?.findingHeading}
        breadcrumb={breadcrumbConfig}
        bannerImage={PhysicsAndMaths}
        para1={contentConfig?.para1}
        para2={contentConfig?.para2}
        defaultService={"Physics And Maths"}
        isNeedS={false}
        extraText='or Online'
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
        <AveragePrice
          title={topConfig?.avgPriceTitle}
          RELTED_PRICE={avgPriceData}
          isSingular
        />
      </Suspense>
         <Suspense fallback={<FullScreenSpinner />}>
        <Slider
          sliderdata={otherServicesData}
          title="you may be interested in"
          blueTitle="Other services "
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

export default PhysicsAndMathsTutor;
