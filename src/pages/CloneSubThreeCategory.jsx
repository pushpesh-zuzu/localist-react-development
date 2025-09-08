import { Helmet } from "react-helmet-async";
import GetQuotes from "../component/common/getQuotes/GetQuotes";
import Slider from "../component/common/slider/Slider";
import FindAnAccountant from "../component/subCategory/Accountant/FindAnAccountant";
import LocalAccountant from "../component/subCategory/Accountant/LocalAccountant";
import AveragePrice from "../component/subCategory/AveragePrice/AveragePrice";
import PopularCity from "../component/subCategory/famousCities/PopularCity";
import Frequently from "../component/subCategory/Faq/Frequently";
import FindAccountant from "../component/subCategory/findAccountant/FindAccountant";
import RegionsComponent from "../component/subCategory/Regions/Regions";
import Reviews from "../component/subCategory/Reviews/Reviews";
import TaxReturn from "../component/subCategory/TaxReturn/TaxReturn";
import HowItWorks from "../component/subCategory/workSteps/HowItWorks";
import { POPULAR_CITIES_LEVERL_THREE } from "../constant/cloneLeverThreeData";

import {
  AVERAGE_PRICE,
  BREADCRUMB_CONFIG,
  CONTENT_CONFIG,
  CONTENT_CONFIG_BANNER,
  CONTENT_CONFIG_META,
  CONTENT_CONFIG_TOP,
  FIND_SERVICE_CONTENT,
  FREQUENTLY_DATA,
  HowItWorksData,
  LEVEL_THIRD_SERVICES_NAME,
  OTHER_SERVICES_DATA,
  POPULARCITY,
  regionsData,
  RELATED_PRICE_DATA,
  RELATED_SERVICES_DATA,
  REVIEWS_DATA,
  TAXRETURNDATA,
  POPULAR_CITIES,
} from "../component/level3/level3Data";
import { getDataByKey } from "../utils/databyKey";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import SearchAndFindAnAccountant from "../component/level3/SearchAndFindAnAccountant";
import FindServiceLevel3 from "../component/level3/FindServiceLevel3";
import GetQuotesLevel3 from "../component/level3/GetQuotesLevel3";

const transformFenceInstallersData = (rawData, id) => {
  return rawData[id]?.map((region) => ({
    key: region.id,
    title: region.title,
    items: region.items.map((item) => ({
      name: item.name,
      path: item.path,
    })),
  }));
};

const LevelThreePage = ({}) => {
  const { slug } = useParams();
  const breadcrumb = BREADCRUMB_CONFIG[slug];
  const lastItem = breadcrumb?.[breadcrumb.length - 1]; // last element le lo safely
  const isServiceAvailable = lastItem?.path === slug;

  if (!isServiceAvailable) return <NotFound />;
  function getHowItWorksData(key) {
    return HowItWorksData[slug] || null;
  }
  const transformedData = transformFenceInstallersData(regionsData, slug);
  const popularCity = getDataByKey(POPULARCITY, slug);
  const RELATED_PRICE = getDataByKey(RELATED_PRICE_DATA, slug);
  const RELATED_SEERVICE = getDataByKey(RELATED_SERVICES_DATA, slug);
  const RELATED_REVIEW = getDataByKey(REVIEWS_DATA, slug);
  const RELATED_OTHER = getDataByKey(OTHER_SERVICES_DATA, slug);
  const RELTED_PRICE = getDataByKey(AVERAGE_PRICE, slug);
  const FrequentlyQuestion = getDataByKey(FREQUENTLY_DATA, slug);
  const TaxData = TAXRETURNDATA[slug];
  const contentBlocks = FIND_SERVICE_CONTENT[slug];

  return (
    <>
      <Helmet>
        <title>{CONTENT_CONFIG_META[slug]?.title}</title>
        <meta
          name={CONTENT_CONFIG_META[slug]?.name}
          content={CONTENT_CONFIG_META[slug]?.content}
        />
        <link
          rel="preload"
          href={CONTENT_CONFIG_BANNER[slug]?.banner}
          as="image"
        />
      </Helmet>
      {/* <ServiceBannerWithBreadcrumb
        accountHeader={CONTENT_CONFIG_TOP[slug]?.accountHeader}
        title={CONTENT_CONFIG_TOP[slug]?.title}
        level={1}
        breadcrumb={BREADCRUMB_CONFIG[slug]}
        isNeedS={false}
        panelImage={CONTENT_CONFIG_BANNER[slug]?.banner}
        para1={CONTENT_CONFIG[slug]?.para1}
        para2={CONTENT_CONFIG[slug]?.para2}
        para3={CONTENT_CONFIG[slug]?.para3}
        defaultService={LEVEL_THIRD_SERVICES_NAME[slug]}
      /> */}
      <SearchAndFindAnAccountant
        title={CONTENT_CONFIG_TOP[slug]?.title}
        findingHeading={CONTENT_CONFIG_TOP[slug]?.findingHeading}
        breadcrumb={BREADCRUMB_CONFIG[slug]}
        bannerImage={CONTENT_CONFIG_BANNER[slug]?.banner}
        para1={CONTENT_CONFIG[slug]?.para1}
        para2={CONTENT_CONFIG[slug]?.para2}
        para3={CONTENT_CONFIG[slug]?.para3}
        defaultService={LEVEL_THIRD_SERVICES_NAME[slug]}
        isNeedS={false}
      />
      <HowItWorks
        HowItWorksData={getHowItWorksData(slug)}
        title={CONTENT_CONFIG_TOP[slug]?.ctaText}
      />
      <PopularCity sliderdata={POPULAR_CITIES} title="Popular Cities" />

      <RegionsComponent
        regionsData={transformedData}
        category={slug} // Optional: if you need to know the category
      />
      <FindServiceLevel3
        contentBlocks={contentBlocks}
        title={CONTENT_CONFIG_TOP[slug]?.ctaText}
      />
      {/* <LocalAccountant title="Fencer" /> */}

      {/* later we add */}
      {/* <TaxReturn
        TaxData={TaxData}
        panelImage={CONTENT_CONFIG_BANNER[slug]?.reltatedImage}
        title={CONTENT_CONFIG_TOP[slug]?.mainTitle}
      /> */}
      <Frequently FrequentlyQuestion={FrequentlyQuestion} />
      <AveragePrice
        title={CONTENT_CONFIG_TOP[slug]?.avgPriceTitle}
        RELTED_PRICE={RELTED_PRICE}
        avg_price={CONTENT_CONFIG_TOP[slug]?.showSpeicialits}
        showSpeicialits={CONTENT_CONFIG_TOP[slug]?.showSpeicialits}
        isSingular={CONTENT_CONFIG_TOP[slug]?.isSingular}
        monthlyText={CONTENT_CONFIG_TOP[slug]?.monthlyText}
      />
      <Slider
        sliderdata={RELATED_OTHER}
        title="you may be interested in"
        blueTitle="Other services "
      />
      {/* no need to change only data change*/}
      {/* <Reviews RELATED_REVIEW={RELATED_REVIEW} /> */}
      {/* no need to change only data change*/}

      {/* <Slider sliderdata={RELATED_SEERVICE} title={"Related Service Guides"} /> */}
      {/* Later we need to uncomment or use again*/}

      {/* <Slider sliderdata={RELATED_PRICE} title={"Related Price Guides"} /> */}
      {/* Later we need to uncomment or use again*/}

      <GetQuotesLevel3 message={CONTENT_CONFIG_TOP[slug]?.ctaText} />
      {/* no need to change  */}
    </>
  );
};

export default LevelThreePage;
