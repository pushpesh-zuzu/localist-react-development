import {
  OTHER_SERVICES_DATA,
  RELATED_PRICE_DATA,
  RELATED_SERVICES_DATA,
} from "../../constant/subCategory";
import GetQuotes from "../common/getQuotes/GetQuotes";
import Slider from "../common/slider/Slider";
import FindAnAccountant from "./Accountant/FindAnAccountant";
import LocalAccountant from "./Accountant/LocalAccountant";
import AveragePrice from "./AveragePrice/AveragePrice";
import PopularCity from "./famousCities/PopularCity";
import Frequently from "./Faq/Frequently";
import FindAccountant from "./findAccountant/FindAccountant";
import RegionsComponent from "./Regions/Regions";
import Reviews from "./Reviews/Reviews";
import TaxReturn from "./TaxReturn/TaxReturn";
import HowItWorks from "./workSteps/HowItWorks";

const SubCategory = () => {
  return (
    <>
      <FindAccountant />
      <HowItWorks />
      <PopularCity />
      <RegionsComponent />
      <FindAnAccountant />
      <LocalAccountant />
      <TaxReturn />
      <Frequently />
      <AveragePrice />
      <Slider
        sliderdata={OTHER_SERVICES_DATA}
        title="You May Be Interested In"
        blueTitle="Other Services "
      />
      <Reviews />
      <Slider
        sliderdata={RELATED_SERVICES_DATA}
        title={<b>Related Service Guides</b>}
      />
      <Slider
        sliderdata={RELATED_PRICE_DATA}
        title={<b>Related Price Guides</b>}
      />
      <GetQuotes message="from Accountants near you" />
    </>
  );
};

export default SubCategory;
