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
  OTHER_SERVICES_DATA,
  POPULARCITY,
  regionsData,
  RELATED_PRICE_DATA,
  RELATED_SERVICES_DATA,
  REVIEWS_DATA,
  TAXRETURNDATA,
} from "../constant/subCategory";
import BannerWithBreadCrum from "../component/category/ServicesHeroSection/BannerWithBreadCrum";
import financeBg from "../assets/Images/financeImg.svg";
import { getDataByKey } from "../utils/databyKey";
import { useParams } from "react-router-dom";
import ServiceBannerWithBreadcrumb from "../component/category/ServicesHeroSection/ServiceBannerWithBreadcrumb";

const transformFenceInstallersData = (rawData, id) => {
  return rawData[id]?.map((region) => ({
    key: region.id, // Convert id to key
    [region.title]: region.items, // Create dynamic key with region title
  }));
};
const CloneSubThreeCategory = ({}) => {
  const { slug } = useParams();
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
      </Helmet>
      <ServiceBannerWithBreadcrumb
        accountHeader={CONTENT_CONFIG_TOP[slug]?.accountHeader}
        title={CONTENT_CONFIG_TOP[slug]?.title}
        level={1}
        breadcrumb={BREADCRUMB_CONFIG[slug]}
        // breadcrumb="Home & Garden / Builders / Fence & Gate Installation"
        service={true}
        panelImage={CONTENT_CONFIG_BANNER[slug]?.banner}
        para1={CONTENT_CONFIG[slug]?.para1}
        para2={CONTENT_CONFIG[slug]?.para2}
        para3={CONTENT_CONFIG[slug]?.para3}
      />
      {/* <FindAccountant title={'Fencer'} breadcrumb=' Home & Garden / Builders / Fence & Gate Installation'/> */}
      <HowItWorks
        HowItWorksData={getHowItWorksData(slug)}
        title={CONTENT_CONFIG_TOP[slug]?.mainTitle}
      />
      <PopularCity
        POPULAR_CITIES_LEVERL_THREE={popularCity}
        title="Popular Cities"
      />
      {/* <Slider sliderdata={popularCity} title={"Popular Cities"} /> */}

      <RegionsComponent
        regionsData={transformedData}
        category={slug} // Optional: if you need to know the category
      />
      <FindAnAccountant
        contentBlocks={contentBlocks}
        title={CONTENT_CONFIG_TOP[slug]?.mainTitle}
      />
      {/* <LocalAccountant title="Fencer" /> */}
      <TaxReturn
        TaxData={TaxData}
        panelImage={CONTENT_CONFIG_BANNER[slug]?.reltatedImage}
        title={CONTENT_CONFIG_TOP[slug]?.mainTitle}
      />
      <Frequently FrequentlyQuestion={FrequentlyQuestion} />
      <AveragePrice
        title={CONTENT_CONFIG_TOP[slug]?.mainTitle}
        RELTED_PRICE={RELTED_PRICE}
      />
      <Slider
        sliderdata={RELATED_OTHER}
        title="You May Be Interested In"
        blueTitle="Other Services "
      />
      {/* no need to change only data change*/}
      <Reviews RELATED_REVIEW={RELATED_REVIEW} />
      {/* no need to change only data change*/}

      <Slider sliderdata={RELATED_SEERVICE} title={"Related Service Guides"} />
      {/* no need to change only data change*/}

      <Slider sliderdata={RELATED_PRICE} title={'Related Price Guides'} />
      {/* no need to change only data change*/}

      <GetQuotes title={CONTENT_CONFIG_TOP[slug]?.mainTitle} />
      {/* no need to change  */}
    </>
  );
};

export default CloneSubThreeCategory;
