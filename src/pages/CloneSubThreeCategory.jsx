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
import FenchandGet from "../assets/Images/FenchandGet.jpg";

import {
  AVERAGE_PRICE,
  CONTENT_CONFIG,
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
const transformFenceInstallersData = (rawData) => {
  return rawData["fence-installers"].map((region) => ({
    key: region.id, // Convert id to key
    [region.title]: region.items, // Create dynamic key with region title
  }));
};

const CloneSubThreeCategory = ({
  title = "Fencer",
  categoryKey = "fence-installers",
}) => {
  function getHowItWorksData(key) {
    return HowItWorksData["fence-installers"] || null;
  }
  const transformedData = transformFenceInstallersData(regionsData);

  const popularCity = getDataByKey(POPULARCITY, "fence-installers");
  const RELATED_PRICE = getDataByKey(RELATED_PRICE_DATA, "fence-installers");
  const RELATED_SEERVICE = getDataByKey(
    RELATED_SERVICES_DATA,
    "fence-installers"
  );
  const RELATED_REVIEW = getDataByKey(REVIEWS_DATA, "fence-installers");
  const RELATED_OTHER = getDataByKey(OTHER_SERVICES_DATA, "fence-installers");
  const RELTED_PRICE = getDataByKey(AVERAGE_PRICE, "fence-installers");
  const FrequentlyQuestion = getDataByKey(FREQUENTLY_DATA, "fence-installers");
  const TaxData = TAXRETURNDATA["fence-installers"];
  console.log(FrequentlyQuestion, "FrequentlyQuestion");
  return (
    <>
      <Helmet>
        <title>Fencers Near Me | Find Fence Installers - Localists</title>
        <meta
          name="description"
          content="Find top-rated local fencers for fence and gate installation. Compare quotes, read reviews, and hire professionals near you with Localists."
        />
      </Helmet>
      <BannerWithBreadCrum
        header="Fence Installation"
        subHeader="Professional Fencing Services"
        accountHeader="Fence Installation"
        level={1}
        breadcrumb="Home & Garden / Builders / Fence & Gate Installation"
        service={true}
        panelImage={FenchandGet}
        title="Fencing"
        para1={CONTENT_CONFIG[categoryKey].para1}
        para2={CONTENT_CONFIG[categoryKey].para2}
        para3={CONTENT_CONFIG[categoryKey].para3}
      />
      {/* <FindAccountant title={'Fencer'} breadcrumb=' Home & Garden / Builders / Fence & Gate Installation'/> */}
      <HowItWorks HowItWorksData={getHowItWorksData("fence-installers")} title={title} />
      {/* <PopularCity POPULAR_CITIES_LEVERL_THREE={POPULAR_CITIES_LEVERL_THREE} /> */}
      <Slider sliderdata={popularCity} title={'Popular Cities'} />

      <RegionsComponent
        regionsData={transformedData}
        category="fence-installers" // Optional: if you need to know the category
      />
      <FindAnAccountant title={"fencher"} />
      {/* <LocalAccountant title="Fencer" /> */}
      <TaxReturn TaxData={TaxData} panelImage={FenchandGet} title={title} />
      <Frequently FrequentlyQuestion={FrequentlyQuestion} />
      <AveragePrice title="Fencers " RELTED_PRICE={RELTED_PRICE} />
      <Slider
        sliderdata={RELATED_OTHER}
        title="You May Be Interested In"
        blueTitle="Other Services "
      />
      {/* no need to change only data change*/}
      <Reviews RELATED_REVIEW={RELATED_REVIEW} />
      {/* no need to change only data change*/}

      <Slider
        sliderdata={RELATED_SEERVICE}
        title={<b>Related Service Guides</b>}
      />
      {/* no need to change only data change*/}

      <Slider sliderdata={RELATED_PRICE} title={<b>Related Price Guides</b>} />
      {/* no need to change only data change*/}

      <GetQuotes title={title} />
      {/* no need to change  */}
    </>
  );
};

export default CloneSubThreeCategory;
