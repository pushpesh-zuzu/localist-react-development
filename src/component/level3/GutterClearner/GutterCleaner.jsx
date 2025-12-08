import { Helmet } from "react-helmet-async";
import { useMemo, Suspense, lazy } from "react";
import SearchAndFindAnAccountant from "../SearchAndFindAnAccountant";
import {
  GUTTER_CLEANER_AVERAGE_PRICE,
  GUTTER_CLEANER_BREADCRUMB_CONFIG,
  GUTTER_CLEANER_CONFIG_TOP,
  GUTTER_CLEANER_CONTENT_CONFIG,
  GUTTER_CLEANER_FIND_SERVICE_CONTENT,
  GUTTER_CLEANER_HOW_IT_WORK,
  GUTTER_CLEANER_META,
  GUTTER_CLEANER_REGION_DATA,
  GUTTER_CLEANER_REVIEWS_DATA,
  GUTTER_CLEANER_FAQ,
  GUTTER_CLEANER_OTHER_SERVICES_DATA,
  GUTTER_CLEANER_POPULAR_CITIES,
} from "./GutterCleanerData";
import GutterCleanerBanner from "../banners/GutterCleaner.webp";
import { transformData } from "../../../utils/allServicesUtils";
import FullScreenSpinner from "../../common/fullScreenSpinner/FullScreenSpinner";
import CalonicalTags from "../../common/CalonicalTags/CalonicalTags";
import FAQScript from "../../common/FAQScript/FAQScript";

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
const Slider = lazy(() => import("../../common/slider/Slider"));
const PopularCity = lazy(() =>
  import("../../subCategory/famousCities/PopularCity")
);

function GutterCleaner() {
  const transformedRegions = useMemo(
    () => transformData(GUTTER_CLEANER_REGION_DATA, "Gutter Cleaner"),
    []
  );

  const faqData = useMemo(() => GUTTER_CLEANER_FAQ["Gutter Cleaner"], []);
  const reviewData = useMemo(
    () => GUTTER_CLEANER_REVIEWS_DATA["Gutter Cleaner"],
    []
  );
  const avgPriceData = useMemo(
    () => GUTTER_CLEANER_AVERAGE_PRICE["Gutter Cleaner"],
    []
  );
  const findServiceContent = useMemo(
    () => GUTTER_CLEANER_FIND_SERVICE_CONTENT["Gutter Cleaner"],
    []
  );
  const howItWorksData = useMemo(
    () => GUTTER_CLEANER_HOW_IT_WORK["Gutter Cleaner"],
    []
  );

  const topConfig = useMemo(
    () => GUTTER_CLEANER_CONFIG_TOP["Gutter Cleaner"],
    []
  );
  const contentConfig = useMemo(
    () => GUTTER_CLEANER_CONTENT_CONFIG["Gutter Cleaner"],
    []
  );
  const breadcrumbConfig = useMemo(
    () => GUTTER_CLEANER_BREADCRUMB_CONFIG["Gutter Cleaner"],
    []
  );
  const metaConfig = useMemo(() => GUTTER_CLEANER_META["Gutter Cleaner"], []);
  const otherServicesData = useMemo(
    () => GUTTER_CLEANER_OTHER_SERVICES_DATA["Gutter Cleaner"],
    []
  );
  const POPULAR_CITIES = useMemo(() => GUTTER_CLEANER_POPULAR_CITIES, []);

  return (
    <>
      <Helmet>
        {/* <title>{metaConfig?.title}</title>
        <meta name={metaConfig?.name} content={metaConfig?.content} /> */}
      </Helmet>
      <CalonicalTags
        breadcrumb={breadcrumbConfig}
        bannerImage={GutterCleanerBanner}
      />
      <FAQScript FAQ={faqData} />
      <SearchAndFindAnAccountant
        title={topConfig?.title}
        findingHeading={topConfig?.findingHeading}
        breadcrumb={breadcrumbConfig}
        bannerImage={GutterCleanerBanner}
        para1={contentConfig?.para1}
        para2={contentConfig?.para2}
        para3={contentConfig?.para3}
        defaultService={"Gutter Cleaner"}
        isNeedS={false}
      />

      <Suspense fallback={<FullScreenSpinner />}>
        <HowItWorks
          HowItWorksData={howItWorksData}
          title={topConfig?.ctaText}
        />
      </Suspense>
      <Suspense fallback={<FullScreenSpinner />}>
        <PopularCity
          sliderdata={POPULAR_CITIES}
          title="Popular"
          blueText="Cities"
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

export default GutterCleaner;
