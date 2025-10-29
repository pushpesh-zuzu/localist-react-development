import { Helmet } from "react-helmet-async";
import { useMemo, Suspense, lazy } from "react";
import SearchAndFindAnAccountant from "../SearchAndFindAnAccountant";
import {
  TREE_SURGEON_AVERAGE_PRICE,
  TREE_SURGEON_BREADCRUMB_CONFIG,
  TREE_SURGEON_CONFIG_TOP,
  TREE_SURGEON_CONTENT_CONFIG,
  TREE_SURGEON_FIND_SERVICE_CONTENT,
  TREE_SURGEON_HOW_IT_WORK,
  TREE_SURGEON_META,
  TREE_SURGEON_REGION_DATA,
  TREE_SURGEON_REVIEWS_DATA,
  TREE_SURGEON_FAQ,
  TREE_SURGEON_OTHER_SERVICES_DATA,
} from "./TreeSurgeonData";
import TreeSugeon2 from "../banners/TreeSugeon2.webp";
import { transformData } from "../../../utils/allServicesUtils";
import FullScreenSpinner from "../../common/fullScreenSpinner/FullScreenSpinner";

// Lazy-load heavy components
const HowItWorks = lazy(() => import("../../subCategory/workSteps/HowItWorks"));
const FindServiceLevel3 = lazy(() => import("../FindServiceLevel3"));
const Frequently = lazy(() => import("../../subCategory/Faq/Frequently"));
const AveragePrice = lazy(() =>
  import("../../subCategory/AveragePrice/AveragePrice")
);
const Reviews = lazy(() => import("../../subCategory/Reviews/Reviews"));
const GetQuotesLevel3 = lazy(() => import("../GetQuotesLevel3"));
const RegionsComponent = lazy(() =>
  import("../../subCategory/Regions/Regions")
);
const Slider = lazy(() =>
  import("../../common/slider/Slider")
);
function TreeSurgeonImage2() {
  const transformedRegions = useMemo(
    () => transformData(TREE_SURGEON_REGION_DATA, "Tree Surgeon"),
    []
  );

  const faqData = useMemo(() => TREE_SURGEON_FAQ["Tree Surgeon"], []);
  const reviewData = useMemo(
    () => TREE_SURGEON_REVIEWS_DATA["Tree Surgeon"],
    []
  );
  const avgPriceData = useMemo(
    () => TREE_SURGEON_AVERAGE_PRICE["Tree Surgeon"],
    []
  );
   const otherServicesData = useMemo(
    () => TREE_SURGEON_OTHER_SERVICES_DATA["Tree Surgeon"],
    []
  );
  TREE_SURGEON_OTHER_SERVICES_DATA
  const findServiceContent = useMemo(
    () => TREE_SURGEON_FIND_SERVICE_CONTENT["Tree Surgeon"],
    []
  );
  const howItWorksData = useMemo(
    () => TREE_SURGEON_HOW_IT_WORK["Tree Surgeon"],
    []
  );

  const topConfig = useMemo(() => TREE_SURGEON_CONFIG_TOP["Tree Surgeon"], []);
  const contentConfig = useMemo(
    () => TREE_SURGEON_CONTENT_CONFIG["Tree Surgeon"],
    []
  );
  const breadcrumbConfig = useMemo(
    () => TREE_SURGEON_BREADCRUMB_CONFIG["Tree Surgeon"],
    []
  );
  const metaConfig = useMemo(() => TREE_SURGEON_META["Tree Surgeon"], []);

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
        bannerImage={TreeSugeon2}
        para1={contentConfig?.para1}
        para2={contentConfig?.para2}
        defaultService={"Tree Surgeon"}
        isNeedS={false}
        isSingular={true}
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
       <Slider
        sliderdata={otherServicesData}
        title="you may be interested in"
        blueTitle="Other services "
      />
      <Suspense fallback={<FullScreenSpinner />}>
        <Reviews RELATED_REVIEW={reviewData} />
      </Suspense>

      <Suspense fallback={<FullScreenSpinner />}>
        <GetQuotesLevel3 needSString={false} message={topConfig?.ctaText} />
      </Suspense>
    </>
  );
}

export default TreeSurgeonImage2;
