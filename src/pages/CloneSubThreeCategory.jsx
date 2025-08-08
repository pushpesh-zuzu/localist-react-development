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
  OTHER_SERVICES_DATA,
  RELATED_PRICE_DATA,
  RELATED_SERVICES_DATA,
} from "../constant/subCategory";
import BannerWithBreadCrum from "../component/category/ServicesHeroSection/BannerWithBreadCrum";
import financeBg from "../assets/Images/financeImg.svg";

const CloneSubThreeCategory = () => {
  return (
    <>
      <Helmet>
        <title>Fencers Near Me | Find Fence Installers - Localists</title>
        <meta
          name="description"
          content="Find top-rated local fencers for fence and gate installation. Compare quotes, read reviews, and hire professionals near you with Localists."
        />
      </Helmet>
      <BannerWithBreadCrum level={1} panelImage={financeBg} />
      {/* <FindAccountant title={'Fencer'} breadcrumb=' Home & Garden / Builders / Fence & Gate Installation'/> */}
      <HowItWorks />
      <PopularCity POPULAR_CITIES_LEVERL_THREE={POPULAR_CITIES_LEVERL_THREE} />
      <RegionsComponent />
      <FindAnAccountant />
      <LocalAccountant title="Fencer" />
      <TaxReturn />
      <Frequently />
      <AveragePrice title="Fencers " />
      <Slider
        sliderdata={OTHER_SERVICES_DATA}
        title="You May Be Interested In"
        blueTitle="Other Services "
      />
      {/* no need to change only data change*/}
      <Reviews />
      {/* no need to change only data change*/}

      <Slider
        sliderdata={RELATED_SERVICES_DATA}
        title={<b>Related Service Guides</b>}
      />
      {/* no need to change only data change*/}

      <Slider
        sliderdata={RELATED_PRICE_DATA}
        title={<b>Related Price Guides</b>}
      />
      {/* no need to change only data change*/}

      <GetQuotes message="from Accountants near you" />
      {/* no need to change  */}
    </>
  );
};

export default CloneSubThreeCategory;
